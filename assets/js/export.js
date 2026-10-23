/* 导出层：用原生 Canvas 绘制展签图与展厅海报，配色跟随当前主题 */
(() => {
  const M = (window.MOD = window.MOD || {});
  const { SERIF, MONO } = M;
  const { fmtDate, eraOf, noteFor } = M.util;
  const t = (k) => M.i18n.t(k);

  function svgToImage(svgStr) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
    });
  }

  /* 叠极淡噪点：夜展用来消除暗部色带，日展用来给纸面一点颗粒感 */
  function addGrain(ctx, w, h, mode) {
    const dark = mode === "dark";
    const nc = document.createElement("canvas");
    nc.width = 160;
    nc.height = 160;
    const nx = nc.getContext("2d");
    const id = nx.createImageData(160, 160);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = 120 + Math.random() * 135;
      id.data[i] = dark ? 0 : v;
      id.data[i + 1] = dark ? 0 : v;
      id.data[i + 2] = dark ? 0 : v;
      id.data[i + 3] = dark ? 150 + Math.random() * 105 : 255;
    }
    nx.putImageData(id, 0, 0);
    ctx.save();
    ctx.globalCompositeOperation = dark ? "source-over" : "lighter";
    ctx.globalAlpha = dark ? 0.04 : 0.03;
    ctx.fillStyle = ctx.createPattern(nc, "repeat");
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let line = "";
    for (const ch of Array.from(text)) {
      const test = line + ch;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = ch;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  /* 交付图片：容器内优先存入相册，其余环境改为页内预览（不触发任何下载） */
  function previewCanvas(dataUrl) {
    const img = M.util.$("#preview-img");
    if (!img) return;
    img.src = dataUrl;
    M.ui.openModal("m-preview");
  }

  function deliver(canvas) {
    let dataUrl = "";
    try {
      dataUrl = canvas.toDataURL("image/png");
    } catch (e) {
      dataUrl = "";
    }
    const mt = window.xhs && window.xhs.miniTool;
    if (dataUrl && mt && typeof mt.saveImageToPhotosAlbum === "function") {
      mt.saveImageToPhotosAlbum({
        filePath: dataUrl,
        success() { M.util.toast(t("toast.exported")); },
        fail() { previewCanvas(dataUrl); }
      });
      return;
    }
    previewCanvas(dataUrl);
  }

  function paintGround(x, W, H, P) {
    x.fillStyle = P.bg;
    x.fillRect(0, 0, W, H);
    const g = x.createRadialGradient(W / 2, 140, 0, W / 2, 140, 840);
    g.addColorStop(0, P.glow[0]);
    g.addColorStop(0.35, P.glow[1]);
    g.addColorStop(0.68, P.glow[2]);
    g.addColorStop(0.9, P.glow[3]);
    g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
    addGrain(x, W, H, P.grain);
  }

  /* ---------- 单件展签 1000×1400 ---------- */
  async function buildCardCanvas(it) {
    const P = M.theme.palette();
    const W = 1000;
    const H = 1400;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const x = cv.getContext("2d");

    paintGround(x, W, H, P);

    x.textAlign = "center";
    x.fillStyle = P.brand;
    x.font = `500 18px ${MONO}`;
    x.fillText("MUSEUM OF BUGS", W / 2, 96);

    const img = await svgToImage(M.art.artFor(it, 400));
    x.drawImage(img, (W - 400) / 2, 140, 400, 400);

    x.strokeStyle = P.hair;
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(110, 612);
    x.lineTo(890, 612);
    x.stroke();

    x.textAlign = "left";
    x.fillStyle = P.brand;
    x.font = `500 19px ${MONO}`;
    x.fillText(it.id, 110, 668);

    x.fillStyle = P.title;
    const nameText = M.i18n.pick(it, "name");
    let nameSize = 62;
    x.font = `600 ${nameSize}px ${SERIF}`;
    while (x.measureText(nameText).width > 780 && nameSize > 34) {
      nameSize -= 3;
      x.font = `600 ${nameSize}px ${SERIF}`;
    }
    x.fillText(nameText, 110, 748);

    x.fillStyle = P.sub;
    x.font = `400 24px ${SERIF}`;
    const formText = `${t("add.form")} · ${M.i18n.form(it.tag).n}`;
    x.fillText(formText, 110, 796);
    const wForm = x.measureText(formText).width;
    x.fillStyle = P.hair;
    x.fillText("｜", 110 + wForm + 18, 796);

    const lang = M.LANGS[it.lang];
    let cursor = 110 + wForm + 50;
    if (lang) {
      x.fillStyle = M.theme.langColor(lang);
      x.fillText(lang.n, cursor, 796);
      cursor += x.measureText(lang.n).width + 22;
      x.fillStyle = P.hair;
      x.fillText("｜", cursor, 796);
      cursor += 28;
    }
    x.fillStyle = P.sub;
    x.fillText(eraOf(it.date), cursor, 796);

    const rows = [
      [t("view.found"), M.i18n.pick(it, "site") || "—"],
      [t("view.cause"), M.i18n.pick(it, "cause") || t("view.unknown")],
      [t("view.date"), fmtDate(it.date)],
      it.cost ? [t("view.cost"), M.i18n.pick(it, "cost")] : [t("view.fixer"), it.fixer || t("view.noname")]
    ];
    let y = 872;
    rows.forEach(([k, v]) => {
      x.fillStyle = P.brand;
      x.font = `400 19px ${SERIF}`;
      x.fillText(k, 110, y);
      x.fillStyle = k === t("view.cost") ? P.cost : P.body;
      x.font = `400 23px ${SERIF}`;
      const lines = wrapText(x, v, 560);
      lines.slice(0, 2).forEach((ln, i) => x.fillText(ln, 250, y + i * 32));
      y += Math.max(1, Math.min(lines.length, 2)) * 32 + 22;
    });

    x.strokeStyle = P.hair2;
    x.beginPath();
    x.moveTo(110, y);
    x.lineTo(890, y);
    x.stroke();

    const note = M.i18n.pick(it, "note") || noteFor(it);
    const noteTop = y + 40;
    const avail = 1302 - noteTop;
    let fs = 17;
    let lineH = 28;
    let lines = [];
    for (const cand of [23, 21, 19, 17]) {
      const lh = Math.round(cand * 1.66);
      x.font = `400 ${cand}px ${SERIF}`;
      const ls = wrapText(x, note, 760);
      fs = cand;
      lineH = lh;
      lines = ls;
      if (ls.length * lh <= avail) break;
    }
    x.fillStyle = P.note;
    x.font = `400 ${fs}px ${SERIF}`;
    const cap = Math.max(1, Math.floor(avail / lineH));
    lines.slice(0, cap).forEach((ln, i) => x.fillText(ln, 110, noteTop + i * lineH));

    x.fillStyle = P.foot;
    x.font = `400 16px ${MONO}`;
    x.fillText(t("canvas.sign"), 110, 1340);

    return cv;
  }

  /* ---------- 策展海报 1080×1350 ---------- */
  async function buildPosterCanvas(list) {
    const P = M.theme.palette();
    const W = 1080;
    const H = 1350;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const x = cv.getContext("2d");

    paintGround(x, W, H, P);

    x.textAlign = "center";
    x.fillStyle = P.brand;
    x.font = `500 17px ${MONO}`;
    x.fillText("MUSEUM OF BUGS", W / 2, 104);

    x.fillStyle = P.title;
    x.font = `400 60px ${SERIF}`;
    x.fillText(t("canvas.poster.title"), W / 2, 194);

    x.fillStyle = P.sub;
    x.font = `400 22px ${SERIF}`;
    x.fillText(t("canvas.poster.sub"), W / 2, 246);

    x.strokeStyle = P.hair;
    x.beginPath();
    x.moveTo(120, 300);
    x.lineTo(960, 300);
    x.stroke();

    const cols = [180, 540, 900];
    const rowsY = [372, 752];
    const artSize = 190;

    for (let i = 0; i < 6; i++) {
      const it = list[i];
      if (!it) continue;
      const cx = cols[i % 3];
      const top = rowsY[Math.floor(i / 3)];
      const img = await svgToImage(M.art.artFor(it, artSize));
      x.drawImage(img, cx - artSize / 2, top, artSize, artSize);

      x.fillStyle = P.foot;
      x.font = `400 13px ${MONO}`;
      x.fillText(it.id, cx, top + artSize + 34);

      x.fillStyle = P.title;
      const nm = M.i18n.pick(it, "name");
      let ns = 26;
      x.font = `500 ${ns}px ${SERIF}`;
      while (x.measureText(nm).width > 330 && ns > 16) {
        ns -= 1;
        x.font = `500 ${ns}px ${SERIF}`;
      }
      x.fillText(nm, cx, top + artSize + 74);

      x.fillStyle = P.note;
      x.font = `400 17px ${SERIF}`;
      x.fillText(eraOf(it.date), cx, top + artSize + 104);
    }

    x.strokeStyle = P.hair2;
    x.beginPath();
    x.moveTo(120, 1150);
    x.lineTo(960, 1150);
    x.stroke();

    x.fillStyle = P.note;
    x.font = `400 20px ${SERIF}`;
    x.fillText(t("canvas.poster.foot"), W / 2, 1206);

    x.fillStyle = P.foot;
    x.font = `400 15px ${MONO}`;
    x.fillText(t("canvas.made"), W / 2, 1266);

    return cv;
  }

  async function exportCard() {
    const it = M.exhibit.current();
    if (!it) return;
    const btn = M.util.$("#btn-export");
    btn.disabled = true;
    btn.textContent = t("view.exporting");
    try {
      const cv = await buildCardCanvas(it);
      deliver(cv);
    } catch (e) {
      M.util.toast(t("toast.exportfail"));
    }
    btn.disabled = false;
    btn.textContent = t("view.export");
  }

  M.exporter = { buildCardCanvas, buildPosterCanvas, deliver, exportCard };
})();
