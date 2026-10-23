/* 策展层：挑选 6 件藏品，生成展厅海报 */
(() => {
  const M = (window.MOD = window.MOD || {});
  const { $, $$, esc } = M.util;
  const t = (k) => M.i18n.t(k);

  const NEED = 6;
  let picked = [];

  function openCurate() {
    const total = M.store.count();
    if (total < NEED) return M.util.toast(t("curate.need").replace("{n}", NEED - total));
    picked = M.store.all().slice(0, NEED).map((x) => x.id);
    renderPick();
    M.ui.openModal("m-curate");
  }

  function renderPick() {
    const grid = $("#pick-grid");
    grid.innerHTML = M.store
      .all()
      .map(
        (it) => `
      <div class="pick${picked.includes(it.id) ? " on" : ""}" data-id="${esc(it.id)}">
        <div>${M.art.artFor(it, 62)}</div>
        <span class="pick-name">${esc(M.i18n.pick(it, "name"))}</span>
      </div>`
      )
      .join("");

    const label = $("#pick-label");
    if (label) label.textContent = t("curate.count");
    $("#pick-n").textContent = picked.length;
    const btn = $("#btn-poster");
    btn.disabled = picked.length !== NEED;
    if (!btn.disabled) btn.textContent = t("curate.make");

    $$(".pick", grid).forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        if (picked.includes(id)) {
          picked = picked.filter((p) => p !== id);
        } else {
          if (picked.length >= NEED) return M.util.toast(t("curate.max"));
          picked.push(id);
        }
        renderPick();
      });
    });
  }

  async function makePoster() {
    if (picked.length !== NEED) return;
    const btn = $("#btn-poster");
    btn.disabled = true;
    btn.textContent = t("curate.making");
    const list = picked.map((id) => M.store.find(id)).filter(Boolean);
    try {
      const cv = await M.exporter.buildPosterCanvas(list);
      M.ui.closeModal($("#m-curate"));
      M.exporter.deliver(cv);
    } catch (e) {
      M.util.toast(t("toast.posterfail"));
    }
    btn.disabled = false;
    btn.textContent = t("curate.make");
  }

  function bind() {
    $("#btn-curate").addEventListener("click", openCurate);
    $("#btn-poster").addEventListener("click", makePoster);
  }

  /* 主题或语言切换后重画挑选项 */
  function refresh() {
    if ($("#m-curate").classList.contains("open")) renderPick();
  }

  M.curate = { bind, openCurate, refresh };
})();
