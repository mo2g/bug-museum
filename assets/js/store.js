/* 状态层：个人馆藏的唯一数据源。
   容器内优先用平台 Storage 持久化，localStorage 作为同步缓存与降级方案。 */
(() => {
  const M = (window.MOD = window.MOD || {});

  let items = [];
  let seq = 0;
  let ready = false;
  let hadLocal = false;

  /* 平台能力：容器自动注入 window.xhs，未注入时返回 null */
  function platform() {
    const mt = window.xhs && window.xhs.miniTool;
    return mt && typeof mt.getStorage === "function" && typeof mt.setStorage === "function" ? mt : null;
  }

  function persist() {
    if (!ready) return;
    const payload = JSON.stringify(items);
    try {
      localStorage.setItem(M.KEY, payload);
      localStorage.setItem(M.KEY_SEQ, String(seq));
    } catch (e) {
      /* 隐私模式或本地存储不可用 */
    }
    const mt = platform();
    if (mt) {
      mt.setStorage({ key: M.KEY, data: payload, fail: function () {} });
      mt.setStorage({ key: M.KEY_SEQ, data: String(seq), fail: function () {} });
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(M.KEY);
      if (raw) {
        hadLocal = true;
        const parsed = JSON.parse(raw);
        items = Array.isArray(parsed) ? parsed : M.DEMO.slice();
      } else {
        items = M.DEMO.slice();
      }
      seq = parseInt(localStorage.getItem(M.KEY_SEQ) || "0", 10) || items.length;
    } catch (e) {
      items = M.DEMO.slice();
      seq = items.length;
    }
    ready = true;
    persist();
    return items;
  }

  /* 首次在本容器内启动时，把平台存储里的旧数据接回来 */
  function hydrate() {
    if (hadLocal) return;
    const mt = platform();
    if (!mt) return;
    mt.getStorage({
      key: M.KEY,
      success: function (res) {
        const raw = res && res.data;
        if (typeof raw !== "string" || !raw) return;
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          return;
        }
        if (!Array.isArray(parsed) || !parsed.length) return;
        items = parsed;
        ready = true;
        try {
          localStorage.setItem(M.KEY, raw);
        } catch (e) {
          /* 忽略 */
        }
        if (M.render) {
          M.render.renderGallery();
          M.render.renderWorld();
        }
      },
      fail: function () {}
    });
  }

  M.store = {
    load,
    hydrate,
    all: () => items,
    count: () => items.length,
    find: (id) => items.find((x) => x.id === id),
    has: (id) => items.some((x) => x.id === id),
    /* 新藏品的编号：MD-年份-序号 */
    makeId(dateStr) {
      seq += 1;
      const y = new Date((dateStr || "2026-01-01") + "T00:00:00").getFullYear();
      return `MD-${y}-${M.util.pad(seq, 4)}`;
    },
    add(it) {
      items.unshift(it);
      persist();
      return it;
    },
    remove(id) {
      items = items.filter((x) => x.id !== id);
      persist();
    },
    /* 借展：世界厅藏品以原编号复制进个人馆 */
    borrow(w) {
      if (this.has(w.id)) return false;
      items.unshift(Object.assign({}, w));
      persist();
      return true;
    },
    reset() {
      items = M.DEMO.slice();
      ready = true;
      persist();
    }
  };
})();
