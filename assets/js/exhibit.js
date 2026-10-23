/* 展签层：打开/填充展签、借展、撤展 */
(() => {
  const M = (window.MOD = window.MOD || {});
  const { $, esc, fmtDate, eraOf, noteFor } = M.util;
  const t = (k) => M.i18n.t(k);

  let viewingId = null;
  let viewingMode = "item";
  let delArmed = false;

  function langColorOf(o) {
    const l = M.LANGS[o.lang];
    return l ? M.theme.langColor(l) : "";
  }

  function fillView(o) {
    const form = M.i18n.form(o.tag).n;
    const rows = [
      [t("view.found"), M.i18n.pick(o, "site")],
      [t("view.cause"), M.i18n.pick(o, "cause")],
      [t("view.date"), fmtDate(o.date)],
      o.cost
        ? [t("view.cost"), M.i18n.pick(o, "cost")]
        : [t("view.fixer"), o.fixer || t("view.noname")]
    ];
    const lang = M.LANGS[o.lang];
    const note = M.i18n.pick(o, "note") || noteFor(o);

    $("#view-body").innerHTML = `
      <div class="labelcard">
        <div class="lc-head">
          <span class="lc-no">${esc(o.id)}</span>
          <span class="lc-era">${eraOf(o.date)}</span>
        </div>
        <h2 class="lc-name" id="m-view-title">${esc(M.i18n.pick(o, "name"))}</h2>
        <p class="lc-form">${t("add.form")} · ${esc(form)}${
          lang ? `　<span class="lc-lang" style="color:${langColorOf(o)}">${esc(lang.n)}</span>` : ""
        }</p>
        <dl class="lc-meta">
          ${rows
            .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd${k === t("view.cost") ? ' class="cost"' : ""}>${esc(
              v || t("view.unknown")
            )}</dd></div>`)
            .join("")}
        </dl>
        <p class="lc-note">${esc(note)}</p>
      </div>`;
  }

  function setViewBtns(mode, owned) {
    const b = $("#btn-borrow");
    const del = $("#btn-del");
    const exp = $("#btn-export");
    const world = mode === "world";
    b.style.display = world ? "block" : "none";
    del.style.display = world ? "none" : "block";
    b.disabled = !!owned;
    b.textContent = owned ? t("view.borrowed") : t("view.borrow");
    b.className = "btn " + (owned ? "btn-ghost" : "btn-primary");
    exp.className = "btn " + (world ? "btn-ghost" : "btn-primary");
    exp.textContent = t("view.export");
  }

  function openItem(id) {
    const it = M.store.find(id);
    if (!it) return;
    viewingId = id;
    viewingMode = "item";
    delArmed = false;
    const btnDel = $("#btn-del");
    btnDel.textContent = t("view.del");
    btnDel.dataset.armed = "0";
    setViewBtns("item", false);
    fillView(it);
    M.ui.openModal("m-view");
  }

  function openWorld(id) {
    const w = M.WORLD.find((x) => x.id === id);
    if (!w) return;
    viewingId = id;
    viewingMode = "world";
    setViewBtns("world", M.store.has(w.id));
    fillView(w);
    M.ui.openModal("m-view");
  }

  /* 语言或主题切换后重画当前展签 */
  function refreshView() {
    const box = $("#m-view");
    if (!box || !box.classList.contains("open")) return;
    const o = M.store.find(viewingId) || M.WORLD.find((x) => x.id === viewingId);
    if (!o) return;
    if (viewingMode === "item") {
      delArmed = false;
      const btnDel = $("#btn-del");
      btnDel.textContent = t("view.del");
      btnDel.dataset.armed = "0";
      setViewBtns("item", false);
    } else {
      setViewBtns("world", M.store.has(viewingId));
    }
    fillView(o);
  }

  function borrow() {
    const w = M.WORLD.find((x) => x.id === viewingId);
    if (!w) return;
    if (!M.store.borrow(w)) return M.util.toast(t("toast.already"));
    M.render.renderGallery();
    M.render.renderWorld();
    M.ui.closeModal($("#m-view"));
    M.util.toast(t("toast.borrowed"));
  }

  function removeItem() {
    const btn = $("#btn-del");
    if (btn.dataset.armed !== "1") {
      btn.dataset.armed = "1";
      btn.textContent = t("view.del.confirm");
      return;
    }
    M.store.remove(viewingId);
    M.render.renderGallery();
    M.render.renderWorld();
    M.ui.closeModal($("#m-view"));
    M.util.toast(t("toast.removed"));
  }

  M.exhibit = {
    openItem,
    openWorld,
    borrow,
    removeItem,
    refreshView,
    currentId: () => viewingId,
    current: () => M.store.find(viewingId) || M.WORLD.find((x) => x.id === viewingId)
  };
})();
