/* 启动前置：在样式生效前定好主题与语言，避免首屏闪一下。
   容器 CSP 禁止内联脚本，因此这段必须外置。 */
(function () {
  var root = document.documentElement;
  try {
    if (localStorage.getItem("mod.theme.v1") === "day") {
      root.setAttribute("data-theme", "day");
    }
    if (localStorage.getItem("mod.lang.v1") === "en") {
      root.className += " lang-en";
      root.setAttribute("lang", "en");
    }
  } catch (e) {
    /* 本地存储不可用时按默认主题与语言渲染 */
  }
})();
