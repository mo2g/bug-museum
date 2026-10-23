/* 渲染层：个人馆藏网格、世界厅网格、语言筛选与统计 */
(() => {
  const M = (window.MOD = window.MOD || {});
  const { $, $$, esc, eraOf } = M.util;

  let activeLang = "";

  const LANG_KEYS = Object.keys(M.LANGS);
  const usedLangs = () => LANG_KEYS.filter((k) => M.WORLD.some((w) => w.lang === k));

  function sealHTML(langKey) {
    const l = M.LANGS[langKey];
    if (!l) return "";
    return `<span class="seal" style="color:${M.theme.langColor(l)}">${esc(l.n)}</span>`;
  }

  /* ---------- 个人馆藏 ---------- */
  function renderGallery() {
    const g = $("#gallery");
    const empty = $("#empty");
    const items = M.store.all();
    $("#stat-count").textContent = items.length;

    if (!items.length) {
      g.innerHTML = "";
      g.hidden = true;
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    g.hidden = false;

    g.innerHTML = items
      .map((it, i) => `
      <article class="vitrine" data-id="${esc(it.id)}" style="animation-delay:${Math.min(i * 40, 400)}ms">
        <div class="vitrine-art">${M.art.artFor(it, 200)}</div>
        <div class="vitrine-label">
          <span class="vno">${esc(it.id)}</span>
          <h3>${esc(M.i18n.pick(it, "name"))}</h3>
          <span class="vera">${eraOf(it.date)}</span>
        </div>
      </article>`)
      .join("");

    $$(".vitrine", g).forEach((el) => {
      el.addEventListener("click", () => M.exhibit.openItem(el.dataset.id));
    });
  }

  /* ---------- 世界厅 ---------- */
  function renderWorld() {
    const g = $("#world-grid");
    if (!g) return;
    const list = activeLang ? M.WORLD.filter((w) => w.lang === activeLang) : M.WORLD;

    g.innerHTML = list
      .map((w, i) => {
        const owned = M.store.has(w.id);
        const form = M.i18n.form(w.tag).n;
        return `
      <article class="wcard${owned ? " owned" : ""}" data-id="${esc(w.id)}" style="animation-delay:${Math.min(i * 28, 340)}ms">
        <div class="wcard-art">${M.art.artFor(w, 66)}</div>
        <div class="wcard-body">
          <div class="wcard-top">
            <span class="wyear">${w.year}</span>
            <span class="wform">${esc(form)}</span>
            ${w.hot ? `<span class="whot">${M.i18n.lang() === "en" ? "NEW" : "新"}</span>` : ""}
            ${owned ? `<span class="wowned">${M.i18n.lang() === "en" ? "borrowed" : "已借展"}</span>` : ""}
            ${sealHTML(w.lang)}
          </div>
          <h3 class="wname">${esc(M.i18n.pick(w, "name"))}</h3>
          <p class="wsite">${esc(M.i18n.pick(w, "site"))}</p>
        </div>
      </article>`;
      })
      .join("");

    $$(".wcard", g).forEach((el) => {
      el.addEventListener("click", () => M.exhibit.openWorld(el.dataset.id));
    });
  }

  /* ---------- 语言筛选条 ---------- */
  function renderFilter() {
    const box = $("#lang-filter");
    if (!box) return;
    const keys = usedLangs();
    const chip = (key, label, color) =>
      `<button type="button" class="chip${activeLang === key ? " on" : ""}" data-lang="${key}"${
        color ? ` style="--chip:${color}"` : ""
      }>${label}</button>`;

    box.innerHTML =
      chip("", M.i18n.t("wing.all")) + keys.map((k) => chip(k, M.LANGS[k].n, M.theme.langColor(M.LANGS[k]))).join("");

    $$(".chip", box).forEach((el) => {
      el.addEventListener("click", () => {
        activeLang = el.dataset.lang;
        renderFilter();
        renderWorld();
        updateStats();
      });
    });
  }

  function fill(tpl, data) {
    return tpl.replace(/\{(\w+)\}/g, (_, k) => (data[k] !== undefined ? data[k] : ""));
  }

  function updateStats() {
    const el = $("#world-stats");
    if (!el) return;
    const n = activeLang ? M.WORLD.filter((w) => w.lang === activeLang).length : M.WORLD.length;
    const langs = usedLangs().length;
    const minYear = M.WORLD.reduce((a, w) => Math.min(a, w.year), 9999);
    el.innerHTML = activeLang
      ? fill(M.i18n.t("wing.stats.one"), { n, lang: M.LANGS[activeLang].n })
      : fill(M.i18n.t("wing.stats"), { n: M.WORLD.length, l: langs, y: minYear });
  }

  M.render = { renderGallery, renderWorld, renderFilter, updateStats };
})();
