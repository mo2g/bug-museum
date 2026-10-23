/* 启动层：弹层控制、事件接线、深链路由 */
(() => {
  const M = window.MOD;
  const { $, $$ } = M.util;

  /* ---------- 弹层 ---------- */
  const openModal = (id) => {
    const m = document.getElementById(id);
    m.classList.add("open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (m) => {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  M.ui = { openModal, closeModal, close: closeModal };

  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-close]");
    if (c) {
      const m = c.closest(".modal");
      if (m) closeModal(m);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".modal.open").forEach(closeModal);
  });

  /* ---------- 深链：#/w/<id> 世界厅藏品，#/i/<id> 个人藏品 ---------- */
  function route() {
    const m = location.hash.match(/^#\/(w|i)\/(.+)$/);
    if (!m) return;
    const id = decodeURIComponent(m[2]);
    if (m[1] === "w") M.exhibit.openWorld(id);
    else M.exhibit.openItem(id);
  }

  /* ---------- 启动 ---------- */
  M.i18n.init();
  M.theme.init();
  M.store.load();
  M.form.bind();
  M.curate.bind();
  $("#btn-borrow").addEventListener("click", M.exhibit.borrow);
  $("#btn-del").addEventListener("click", M.exhibit.removeItem);
  $("#btn-export").addEventListener("click", M.exporter.exportCard);

  M.render.renderGallery();
  M.render.renderFilter();
  M.render.renderWorld();
  M.render.updateStats();
  M.store.hydrate();

  setTimeout(route, 120);
  window.addEventListener("hashchange", route);
})();
