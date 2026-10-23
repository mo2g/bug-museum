/* 主题层：夜展 / 日展。样式走 <html data-theme>，导出图的调色板走 PALETTE */
(() => {
  const M = (window.MOD = window.MOD || {});
  const KEY = "mod.theme.v1";

  let cur = "night";

  /* 导出图与程序化图形共用同一套调色板 */
  const PALETTE = {
    night: {
      bg: "#08080a",
      glow: ["rgba(255,224,178,.095)", "rgba(255,224,178,.045)", "rgba(255,224,178,.018)", "rgba(255,224,178,.005)"],
      brand: "rgba(200,169,106,.5)",
      title: "#f2ecdf",
      sub: "rgba(233,228,218,.52)",
      body: "rgba(233,228,218,.88)",
      note: "rgba(233,228,218,.56)",
      foot: "rgba(200,169,106,.38)",
      hair: "rgba(200,169,106,.22)",
      hair2: "rgba(200,169,106,.16)",
      cost: "#c26558",
      grain: "light"
    },
    day: {
      bg: "#f4f1ea",
      glow: ["rgba(200,169,106,.24)", "rgba(200,169,106,.12)", "rgba(200,169,106,.05)", "rgba(200,169,106,.015)"],
      brand: "rgba(138,109,59,.62)",
      title: "#211e18",
      sub: "rgba(31,28,23,.58)",
      body: "rgba(31,28,23,.9)",
      note: "rgba(31,28,23,.66)",
      foot: "rgba(138,109,59,.58)",
      hair: "rgba(31,28,23,.18)",
      hair2: "rgba(31,28,23,.11)",
      cost: "#a8493c",
      grain: "dark"
    }
  };

  function syncButtons() {
    M.util.$$("[data-theme-btn]").forEach((b) => {
      b.classList.toggle("on", b.dataset.themeBtn === cur);
    });
  }

  function apply(name) {
    cur = name === "day" ? "day" : "night";
    document.documentElement.setAttribute("data-theme", cur);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", cur === "day" ? "#f4f1ea" : "#08080a");
    try { localStorage.setItem(KEY, cur); } catch (e) { /* 忽略 */ }
    syncButtons();
  }

  /* 切换后需要重画：SVG 文物与火漆印的颜色在生成时就烘进去了 */
  function set(name) {
    if (name === cur) return;
    apply(name);
    if (M.render) {
      M.render.renderGallery();
      M.render.renderWorld();
      M.render.renderFilter();
    }
    if (M.curate && M.curate.refresh) M.curate.refresh();
    if (M.exhibit && M.exhibit.refreshView) M.exhibit.refreshView();
  }

  function init() {
    let saved = "night";
    try { saved = localStorage.getItem(KEY) || "night"; } catch (e) { /* 忽略 */ }
    apply(saved);
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-theme-btn]");
      if (b) set(b.dataset.themeBtn);
    });
  }

  M.theme = {
    init,
    set,
    apply,
    current: () => cur,
    isDay: () => cur === "day",
    palette: () => PALETTE[cur],
    langColor: (l) => (l ? (cur === "day" ? l.cd : l.c) : ""),
    artInk: () => (cur === "day" ? "#8a6d3b" : "#c8a96a"),
    artFill: () => (cur === "day" ? "rgba(138,109,59,.11)" : "rgba(200,169,106,.07)")
  };
})();
