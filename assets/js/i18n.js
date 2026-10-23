/* 语言层：中 / 英切换。静态文案走 data-i18n 属性，动态内容走 pick() */
(() => {
  const M = (window.MOD = window.MOD || {});
  const KEY = "mod.lang.v1";

  let cur = "zh";

  const UI = {
    zh: {
      "brand": "Bug 博物馆",
      "count.pre": "馆藏",
      "count.unit": "件",
      "hero.kicker": "EST. 2026 · 一座只收藏失败的小型博物馆",
      "hero.title": "每一件藏品<br /><em>都曾被修复</em>",
      "hero.sub": "把那些让你熬夜的 bug 收进展柜，为它写一张展签。<br class=\"br-desk\" />它们不该被删除，而该被收藏。",
      "hero.add": "入藏一件",
      "hero.curate": "策展 · 生成海报",
      "gallery.title": "馆 藏 目 录",
      "gallery.tip": "点击展品查看展签",
      "empty.text": "本馆尚无藏品。<br />第一件，往往是最难忘的那一件。",
      "empty.btn": "入藏第一件",
      "wing.title": "世 界 厅",
      "wing.tip": "外部馆藏 · 可借展",
      "wing.intro": "人类历史上最贵的那些失误。它们不属于你，但你一定见过它们的后代。",
      "wing.note": "以上均为公开历史记录，只述因果，不含任何利用细节。",
      "wing.all": "全部",
      "wing.stats": "<b>{n}</b> 件藏品 · 覆盖 <b>{l}</b> 种语言 · 最早可追溯至 {y} 年",
      "wing.stats.one": "本厅当前展出 <b>{n}</b> 件 · {lang}",
      "foot.lead": "关于本馆",
      "foot.p1": "这里只收藏失败。每一件被修掉的 bug 都会被编目、断代、写成展签，然后放进属于你的展柜。世界厅另收一批不属于你的藏品——那些真正改变过行业的事故，你可以把它们借进自己的馆里。",
      "foot.p2": "全部藏品仅保存在你的浏览器本地，不上传、不联网。",
      "foot.dim": "Museum of Bugs · Bug 博物馆 · 由 WorkBuddy 制作",
      "add.kicker": "入 藏 登 记",
      "add.title": "新 藏 品",
      "add.random": "随机一件",
      "add.name": "藏品名称",
      "add.name.ph": "例：幽灵空指针",
      "add.site": "出土位置",
      "add.site.ph": "例：用户中心 / 登录模块",
      "add.form": "形制",
      "add.form.hint": "选一个最接近的",
      "add.cause": "亡故之因",
      "add.cause.ph": "例：调用链第 3 层返回 null",
      "add.date": "断代",
      "add.fixer": "修复者",
      "add.fixer.hint": "选填",
      "add.fixer.ph": "留名或留空",
      "add.submit": "收 入 馆 藏",
      "view.found": "出土位置",
      "view.cause": "亡故之因",
      "view.date": "断代",
      "view.cost": "代价",
      "view.fixer": "修复者",
      "view.unknown": "不详",
      "view.noname": "未留名",
      "view.borrow": "收入我的博物馆",
      "view.borrowed": "已在你的馆中",
      "view.export": "导出展签图",
      "view.exporting": "正在绘制…",
      "view.del": "撤出馆藏",
      "view.del.confirm": "再点一次确认",
      "curate.kicker": "策 展",
      "curate.title": "挑出 6 件，生成一张海报",
      "curate.style": "展陈风格",
      "curate.style.hint": "全站与导出的图同步",
      "curate.hint": "点击可增减；海报会按选择顺序排布。",
      "curate.count": "已选",
      "curate.make": "生成海报",
      "curate.making": "正在布展…",
      "curate.need": "还需 {n} 件藏品才能策展",
      "curate.max": "最多选 6 件",
      "theme.night": "夜展",
      "theme.day": "日展",
      "toast.added": "已收入馆藏",
      "toast.name": "请先给这件藏品起个名字",
      "toast.site": "它是在哪里被挖出来的？",
      "toast.borrowed": "已借入，它现在归你管了",
      "toast.already": "这件已经在你的馆里了",
      "toast.removed": "已撤出馆藏",
      "toast.exported": "展签图已保存",
      "toast.exportfail": "导出失败，请重试",
      "toast.postered": "海报已保存",
      "toast.posterfail": "生成失败，请重试",
      "preview.hint": "图片已生成。长按或右键图片即可保存。",
      "canvas.poster.title": "Bug 博物馆",
      "canvas.poster.sub": "每一件藏品，都曾被修复。",
      "canvas.poster.foot": "它们不再被删除，而是被收藏。",
      "canvas.sign": "Bug 博物馆 · MUSEUM OF BUGS",
      "canvas.made": "MUSEUM OF BUGS · 由 WorkBuddy 制作"
    },
    en: {
      "brand": "Museum of Bugs",
      "count.pre": "Collection",
      "count.unit": "",
      "hero.kicker": "Est. 2026 · A small museum of things that broke",
      "hero.title": "Every piece here<br /><em>was once repaired.</em>",
      "hero.sub": "Put the bugs that kept you up into a vitrine, and write them a label.<br class=\"br-desk\" />They should not be deleted. They should be kept.",
      "hero.add": "Acquire a piece",
      "hero.curate": "Curate · Make a poster",
      "gallery.title": "COLLECTION",
      "gallery.tip": "Click a piece to read its label",
      "empty.text": "Nothing in the collection yet.<br />The first one is usually the one you cannot forget.",
      "empty.btn": "Acquire the first piece",
      "wing.title": "WORLD HALL",
      "wing.tip": "On loan · borrowable",
      "wing.intro": "The most expensive mistakes in the history of the craft. They are not yours — but you have certainly met their descendants.",
      "wing.note": "All entries are public record. Cause only, no exploit details.",
      "wing.all": "All",
      "wing.stats": "<b>{n}</b> pieces · <b>{l}</b> languages · earliest dated {y}",
      "wing.stats.one": "<b>{n}</b> on display · {lang}",
      "foot.lead": "About",
      "foot.p1": "Only failures are collected here. Every bug you fix is catalogued, dated, given a label, and placed in your own vitrine. The World Hall holds another set — incidents that genuinely changed the industry. You may borrow them into your collection.",
      "foot.p2": "Everything is stored in your browser alone. Nothing is uploaded, nothing calls out.",
      "foot.dim": "Museum of Bugs · Made with WorkBuddy",
      "add.kicker": "ACQUISITION",
      "add.title": "NEW PIECE",
      "add.random": "Randomise",
      "add.name": "Name",
      "add.name.ph": "e.g. The Ghost Null",
      "add.site": "Found in",
      "add.site.ph": "e.g. Users / login module",
      "add.form": "Form",
      "add.form.hint": "pick the closest one",
      "add.cause": "Cause of death",
      "add.cause.ph": "e.g. the third frame returned null",
      "add.date": "Dated",
      "add.fixer": "Fixed by",
      "add.fixer.hint": "optional",
      "add.fixer.ph": "a name, or leave it blank",
      "add.submit": "ADD TO COLLECTION",
      "view.found": "Found in",
      "view.cause": "Cause",
      "view.date": "Dated",
      "view.cost": "Cost",
      "view.fixer": "Fixed by",
      "view.unknown": "Unknown",
      "view.noname": "Unnamed",
      "view.borrow": "Add to my museum",
      "view.borrowed": "Already in your museum",
      "view.export": "Export label",
      "view.exporting": "Drawing…",
      "view.del": "Withdraw",
      "view.del.confirm": "Click again",
      "curate.kicker": "CURATING",
      "curate.title": "Pick six, make a poster",
      "curate.style": "Style",
      "curate.style.hint": "Applies to the site and the export",
      "curate.hint": "Click to add or remove. The poster follows your selection order.",
      "curate.count": "Selected",
      "curate.make": "Make poster",
      "curate.making": "Installing…",
      "curate.need": "{n} more pieces are needed to curate",
      "curate.max": "Six at most",
      "theme.night": "Night",
      "theme.day": "Day",
      "toast.added": "Added to the collection",
      "toast.name": "Give it a name first",
      "toast.site": "Where was it found?",
      "toast.borrowed": "Borrowed — it is yours to look after now",
      "toast.already": "This one is already in your museum",
      "toast.removed": "Withdrawn from the collection",
      "toast.exported": "Label image saved",
      "toast.exportfail": "Export failed. Try again",
      "toast.postered": "Poster saved",
      "toast.posterfail": "Generation failed. Try again",
      "preview.hint": "Image ready. Long-press or right-click to save.",
      "canvas.poster.title": "Museum of Bugs",
      "canvas.poster.sub": "Every piece here was once repaired.",
      "canvas.poster.foot": "No longer deleted. Now kept.",
      "canvas.sign": "MUSEUM OF BUGS",
      "canvas.made": "MUSEUM OF BUGS · MADE WITH WORKBUDDY"
    }
  };

  function t(key) {
    const d = UI[cur] || UI.zh;
    return key in d ? d[key] : UI.zh[key] !== undefined ? UI.zh[key] : key;
  }

  /* 取字段：英文优先，缺译回退中文 */
  function pick(obj, base) {
    if (!obj) return "";
    if (cur === "en" && obj[base + "_en"]) return obj[base + "_en"];
    return obj[base];
  }

  function form(key) {
    const f = M.FORMS[key] || M.FORMS.null;
    return {
      n: cur === "en" && f.n_en ? f.n_en : f.n,
      d: cur === "en" && f.d_en ? f.d_en : f.d,
      c: cur === "en" && f.c_en ? f.c_en : f.c
    };
  }

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function era(dateStr) {
    const y = new Date((dateStr || "2026-01-01") + "T00:00:00").getFullYear();
    let zh;
    if (y <= 2000) zh = "太古 · 前 Web 纪";
    else if (y <= 2008) zh = "远古 · Web 1.0 纪";
    else if (y <= 2014) zh = "上古 · Web 2.0 纪";
    else if (y <= 2019) zh = "中古 · 移动互联网纪";
    else if (y <= 2024) zh = "近世 · 云原生纪";
    else zh = "当下 · AI 协同时代";
    if (cur !== "en") return zh;
    const hit = (M.ERAS_EN || []).find((e) => e[0] === zh);
    return hit ? hit[1] : zh;
  }

  function note(it) {
    const f = form(it.tag);
    const d = new Date((it.date || "2026-01-01") + "T00:00:00");
    const y = d.getFullYear();
    const m = d.getMonth();
    const closings = cur === "en" && M.CLOSINGS_EN ? M.CLOSINGS_EN : M.CLOSINGS;
    const c = closings[M.util.hashStr(it.id || it.name) % closings.length];
    const cause = (pick(it, "cause") || "").replace(/[。.]$/, "");
    if (cur === "en") {
      return `Unearthed in ${MONTHS[m]} ${y} from ${pick(it, "site") || "somewhere"}. Form: ${f.n} — ${f.d}.${cause ? " " + cause + "." : ""} ${c}`;
    }
    return `此物于 ${y} 年 ${m + 1} 月出土于「${pick(it, "site") || "某处"}」，形制属${f.n}，${f.d}。${cause ? cause + "。" : ""}${c}`;
  }

  function applyStatic() {
    M.util.$$("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    M.util.$$("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    M.util.$$("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPh));
    });
    document.title = cur === "en" ? "Museum of Bugs" : "Bug 博物馆 · Museum of Bugs";
  }

  function syncButtons() {
    M.util.$$("[data-lang-btn]").forEach((b) => {
      b.classList.toggle("on", b.dataset.langBtn === cur);
    });
  }

  function apply(lang) {
    cur = lang === "en" ? "en" : "zh";
    document.documentElement.setAttribute("lang", cur === "en" ? "en" : "zh-CN");
    document.documentElement.classList.toggle("lang-en", cur === "en");
    try { localStorage.setItem(KEY, cur); } catch (e) { /* 忽略 */ }
    applyStatic();
    syncButtons();
  }

  function set(lang) {
    if (lang === cur) return;
    apply(lang);
    if (M.render) {
      M.render.renderGallery();
      M.render.renderWorld();
      M.render.renderFilter();
      M.render.updateStats();
    }
    if (M.curate && M.curate.refresh) M.curate.refresh();
    if (M.exhibit && M.exhibit.refreshView) M.exhibit.refreshView();
    M.form.rebuildTags();
  }

  function init() {
    let saved = "zh";
    try { saved = localStorage.getItem(KEY) || "zh"; } catch (e) { /* 忽略 */ }
    apply(saved);
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lang-btn]");
      if (b) set(b.dataset.langBtn);
    });
  }

  M.i18n = { init, set, t, pick, form, era, note, applyStatic, lang: () => cur };
})();
