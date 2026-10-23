/* 工具层：DOM 选择、哈希、伪随机、断代、文案拼装、轻提示 */
(() => {
  const M = (window.MOD = window.MOD || {});

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    let s = seed || 1;
    return () => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  const pad = (n, w) => String(n).padStart(w, "0");

  /* 断代：把年份映射成“朝代”，覆盖 1996–2026（中英由 i18n 决定） */
  function eraOf(dateStr) {
    return M.i18n ? M.i18n.era(dateStr) : "";
  }

  function fmtDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d)) return dateStr;
    return `${d.getFullYear()}.${pad(d.getMonth() + 1, 2)}.${pad(d.getDate(), 2)}`;
  }

  /* 个人藏品的展签说明由模板拼出（中英由 i18n 决定） */
  function noteFor(it) {
    return M.i18n ? M.i18n.note(it) : "";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1, 2)}-${pad(d.getDate(), 2)}`;
  }

  M.util = { $, $$, hashStr, rng, pad, eraOf, fmtDate, noteFor, esc, toast, todayStr };
})();
