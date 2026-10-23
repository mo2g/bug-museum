/* 入藏层：形制选择、随机填充、表单提交 */
(() => {
  const M = (window.MOD = window.MOD || {});
  const { $, $$, todayStr } = M.util;
  const t = (k) => M.i18n.t(k);

  let curTag = "null";

  function buildTags() {
    $("#f-tags").innerHTML = M.TAG_ORDER.map(
      (k) =>
        `<button type="button" class="tag${k === curTag ? " on" : ""}" data-tag="${k}">${M.i18n.form(k).n}</button>`
    ).join("");
  }

  function setTag(k) {
    curTag = k;
    $$("#f-tags .tag").forEach((b) => b.classList.toggle("on", b.dataset.tag === k));
    const cause = $("#f-cause");
    if (!cause.value.trim() || cause.dataset.auto === "1") {
      cause.value = M.i18n.form(k).c;
      cause.dataset.auto = "1";
    }
  }

  function openAdd() {
    $("#form-add").reset();
    $("#f-date").value = todayStr();
    $("#f-cause").dataset.auto = "1";
    curTag = "null";
    buildTags();
    $("#f-cause").value = M.i18n.form("null").c;
    M.ui.openModal("m-add");
    setTimeout(() => $("#f-name").focus(), 320);
  }

  const POOL = {
    zh: {
      names: ["幽灵空指针", "沉默的越界", "八小时时差", "零点零一", "幽灵缓存", "依赖地狱", "乱码碑", "双写之殇", "贪婪之口", "超时之墙", "重启自愈者", "午夜回滚"],
      sites: ["用户中心 / 登录模块", "支付网关 / 回调", "订单服务 / 库存扣减", "数据看板 / 图表", "消息队列 / 消费者", "移动端 / 首页", "定时任务 / 对账"]
    },
    en: {
      names: ["The Ghost Null", "The Silent Overflow", "Eight Hours Off", "Zero Point One", "The Phantom Cache", "Dependency Hell", "The Mojibake Stele", "The Double Write", "The Greedy Mouth", "The Timeout Wall", "He Who Restarted Himself", "The Midnight Rollback"],
      sites: ["Users / login module", "Payment gateway / callback", "Order service / stock", "Dashboard / charts", "Message queue / consumer", "Mobile / home", "Cron job / reconciliation"]
    }
  };

  function randomFill() {
    const pool = POOL[M.i18n.lang()] || POOL.zh;
    const k = M.TAG_ORDER[Math.floor(Math.random() * M.TAG_ORDER.length)];
    $("#f-name").value = pool.names[Math.floor(Math.random() * pool.names.length)];
    $("#f-site").value = pool.sites[Math.floor(Math.random() * pool.sites.length)];
    $("#f-fixer").value = "";
    $("#f-cause").dataset.auto = "1";
    setTag(k);
  }

  function submit(e) {
    e.preventDefault();
    const name = $("#f-name").value.trim();
    const site = $("#f-site").value.trim();
    const date = $("#f-date").value || todayStr();
    if (!name) return M.util.toast(t("toast.name"));
    if (!site) return M.util.toast(t("toast.site"));

    const it = {
      id: M.store.makeId(date),
      name: name.slice(0, 24),
      site: site.slice(0, 32),
      tag: curTag,
      cause: $("#f-cause").value.trim().slice(0, 60),
      date: date,
      fixer: $("#f-fixer").value.trim().slice(0, 16)
    };
    M.store.add(it);
    M.render.renderGallery();
    M.render.renderWorld();
    M.ui.closeModal($("#m-add"));
    M.util.toast(t("toast.added"));
    setTimeout(() => M.exhibit.openItem(it.id), 380);
  }

  function bind() {
    buildTags();
    $("#f-tags").addEventListener("click", (e) => {
      const b = e.target.closest(".tag");
      if (b) setTag(b.dataset.tag);
    });
    $("#f-cause").addEventListener("input", (e) => {
      e.target.dataset.auto = "0";
    });
    $("#btn-add").addEventListener("click", openAdd);
    $("#btn-add-2").addEventListener("click", openAdd);
    $("#btn-random").addEventListener("click", randomFill);
    $("#form-add").addEventListener("submit", submit);
  }

  M.form = { bind, openAdd, rebuildTags: buildTags };
})();
