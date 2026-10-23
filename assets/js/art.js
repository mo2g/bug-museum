/* 文物图形：按形制生成确定性几何雕塑（SVG 字符串，无外部资源）
   同一形制共享母题，靠 id 哈希做微扰，因此每件都略有不同。 */
(() => {
  const M = (window.MOD = window.MOD || {});

  function artFor(it, size) {
    const r = M.util.rng(M.util.hashStr((it.id || "") + "|" + (it.tag || "")));
    const j = (n) => (r() - 0.5) * n;
    const GOLD = M.theme.artInk();
    const F = M.theme.artFill();
    let inner = "";

    switch (it.tag) {
      case "null": {
        const rad = 50 + j(9);
        inner =
          `<circle cx="100" cy="100" r="${rad.toFixed(1)}" fill="none" stroke="${GOLD}" stroke-width="2.4"/>` +
          `<circle cx="100" cy="100" r="${(rad * 0.42).toFixed(1)}" fill="${F}" stroke="${GOLD}" stroke-width="1.2"/>` +
          `<line x1="${(100 - rad).toFixed(1)}" y1="100" x2="${(100 + rad).toFixed(1)}" y2="100" stroke="${GOLD}" stroke-width="1" stroke-dasharray="3 9" opacity=".45"/>`;
        break;
      }
      case "oob": {
        const g = 10 + Math.abs(j(14));
        const off = j(14);
        inner =
          `<rect x="92" y="34" width="16" height="${(58 - g / 2).toFixed(1)}" fill="${F}" stroke="${GOLD}" stroke-width="1.5"/>` +
          `<rect x="${(92 + off).toFixed(1)}" y="${(100 + g / 2).toFixed(1)}" width="16" height="${(58 - g / 2).toFixed(1)}" fill="none" stroke="${GOLD}" stroke-width="1.5"/>` +
          `<line x1="62" y1="166" x2="138" y2="166" stroke="${GOLD}" stroke-width="1" opacity=".4"/>`;
        break;
      }
      case "tz": {
        const a = ((-50 + j(50)) * Math.PI) / 180;
        inner =
          `<circle cx="100" cy="100" r="54" fill="none" stroke="${GOLD}" stroke-width="2"/>` +
          `<circle cx="100" cy="100" r="3" fill="${GOLD}"/>` +
          `<line x1="100" y1="100" x2="${(100 + 44 * Math.cos(a)).toFixed(1)}" y2="${(100 + 44 * Math.sin(a)).toFixed(1)}" stroke="${GOLD}" stroke-width="1.8"/>` +
          `<line x1="100" y1="100" x2="${(100 + 30 * Math.cos(a + 2.1)).toFixed(1)}" y2="${(100 + 30 * Math.sin(a + 2.1)).toFixed(1)}" stroke="${GOLD}" stroke-width="1.2" opacity=".65"/>` +
          `<circle cx="100" cy="46" r="2" fill="${GOLD}" opacity=".5"/>`;
        break;
      }
      case "float": {
        let s = "";
        for (let i = 0; i < 10; i++) {
          const x = 34 + r() * 128;
          const y = 34 + r() * 128;
          const w = 6 + r() * 18;
          const rot = r() * 90;
          s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(w * 0.62).toFixed(1)}" fill="${i % 3 ? "none" : F}" stroke="${GOLD}" stroke-width="1.2" opacity="${(0.42 + r() * 0.58).toFixed(2)}" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
        }
        inner = s;
        break;
      }
      case "cache": {
        let s = "";
        for (let i = 0; i < 3; i++) {
          const o = i * 11;
          s += `<rect x="${(44 + o).toFixed(1)}" y="${(54 + o).toFixed(1)}" width="82" height="58" fill="${i === 0 ? F : "none"}" stroke="${GOLD}" stroke-width="1.2" opacity="${(1 - i * 0.28).toFixed(2)}"/>`;
        }
        inner = s;
        break;
      }
      case "dep": {
        const pts = [[100, 42], [56, 122], [144, 122], [100, 164]];
        let s = "";
        [[0, 1], [0, 2], [1, 3], [2, 3]].forEach(([a, b]) => {
          s += `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${GOLD}" stroke-width="1" opacity=".5"/>`;
        });
        pts.forEach(([x, y], i) => {
          s += `<circle cx="${x}" cy="${y}" r="${i === 0 ? 9 : 5}" fill="${i === 0 ? F : "none"}" stroke="${GOLD}" stroke-width="1.5"/>`;
        });
        inner = s;
        break;
      }
      case "charset": {
        let s = "";
        for (let i = 0; i < 4; i++) {
          for (let k = 0; k < 4; k++) {
            if (r() < 0.26) continue;
            s += `<rect x="${48 + k * 27}" y="${48 + i * 27}" width="19" height="19" fill="${r() < 0.3 ? F : "none"}" stroke="${GOLD}" stroke-width="1.1" opacity="${(0.55 + r() * 0.45).toFixed(2)}"/>`;
          }
        }
        inner = s;
        break;
      }
      case "race": {
        inner =
          `<path d="M40 68 C 78 68, 122 132, 160 132" fill="none" stroke="${GOLD}" stroke-width="1.6"/>` +
          `<path d="M40 132 C 78 132, 122 68, 160 68" fill="none" stroke="${GOLD}" stroke-width="1.6" opacity=".55"/>` +
          `<circle cx="100" cy="100" r="15" fill="${F}" stroke="${GOLD}" stroke-width="1.2"/>`;
        break;
      }
      case "reg": {
        let d = "M100 100";
        let ang = 0;
        let rad = 2;
        for (let i = 0; i < 110; i++) {
          ang += 0.34;
          rad += 0.48;
          d += ` L${(100 + Math.cos(ang) * rad).toFixed(1)} ${(100 + Math.sin(ang) * rad).toFixed(1)}`;
        }
        inner = `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="1.3" opacity=".85"/>`;
        break;
      }
      case "net": {
        inner =
          `<circle cx="44" cy="100" r="6" fill="none" stroke="${GOLD}" stroke-width="1.4"/>` +
          `<circle cx="156" cy="100" r="6" fill="none" stroke="${GOLD}" stroke-width="1.4"/>` +
          `<line x1="54" y1="100" x2="82" y2="100" stroke="${GOLD}" stroke-width="1.3" stroke-dasharray="7 7"/>` +
          `<line x1="118" y1="100" x2="146" y2="100" stroke="${GOLD}" stroke-width="1.3" stroke-dasharray="7 7"/>` +
          `<path d="M92 90 L104 100 L92 110" fill="none" stroke="${GOLD}" stroke-width="1.1" opacity=".45"/>`;
        break;
      }
      case "oom": {
        const s = 44 + Math.abs(j(6));
        inner =
          `<rect x="${s.toFixed(1)}" y="${s.toFixed(1)}" width="${(200 - s * 2).toFixed(1)}" height="${(200 - s * 2).toFixed(1)}" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity=".4"/>` +
          `<path d="M100 76 L128 128 L72 128 Z" fill="${F}" stroke="${GOLD}" stroke-width="1.6"/>` +
          `<line x1="100" y1="52" x2="100" y2="68" stroke="${GOLD}" stroke-width="1" opacity=".3"/>` +
          `<line x1="100" y1="136" x2="100" y2="152" stroke="${GOLD}" stroke-width="1" opacity=".3"/>` +
          `<line x1="52" y1="100" x2="68" y2="100" stroke="${GOLD}" stroke-width="1" opacity=".3"/>` +
          `<line x1="132" y1="100" x2="148" y2="100" stroke="${GOLD}" stroke-width="1" opacity=".3"/>`;
        break;
      }
      case "uaf": {
        inner =
          `<rect x="52" y="52" width="80" height="80" fill="none" stroke="${GOLD}" stroke-width="1.2" stroke-dasharray="5 8" opacity=".5"/>` +
          `<circle cx="142" cy="142" r="9" fill="${F}" stroke="${GOLD}" stroke-width="1.6"/>` +
          `<line x1="134" y1="134" x2="108" y2="108" stroke="${GOLD}" stroke-width="1.2"/>` +
          `<circle cx="108" cy="108" r="2.5" fill="${GOLD}"/>`;
        break;
      }
      case "intov": {
        let s = `<line x1="40" y1="112" x2="138" y2="112" stroke="${GOLD}" stroke-width="1.3"/>`;
        for (let i = 0; i < 7; i++) {
          s += `<line x1="${40 + i * 16}" y1="104" x2="${40 + i * 16}" y2="120" stroke="${GOLD}" stroke-width="1" opacity=".55"/>`;
        }
        s +=
          `<path d="M138 112 C 170 112, 170 74, 146 66" fill="none" stroke="${GOLD}" stroke-width="1.2" stroke-dasharray="4 5" opacity=".8"/>` +
          `<path d="M152 60 L144 66 L152 71" fill="none" stroke="${GOLD}" stroke-width="1.1"/>`;
        inner = s;
        break;
      }
      case "unit": {
        let s = `<line x1="40" y1="86" x2="160" y2="86" stroke="${GOLD}" stroke-width="1.3"/>`;
        s += `<line x1="40" y1="116" x2="160" y2="116" stroke="${GOLD}" stroke-width="1.1" opacity=".55"/>`;
        for (let i = 0; i < 5; i++) {
          s += `<line x1="${48 + i * 26}" y1="78" x2="${48 + i * 26}" y2="94" stroke="${GOLD}" stroke-width="1.2"/>`;
          s += `<line x1="${62 + i * 24}" y1="108" x2="${62 + i * 24}" y2="124" stroke="${GOLD}" stroke-width="1" opacity=".55"/>`;
        }
        inner = s;
        break;
      }
      case "typo": {
        let s = "";
        const cy = 104;
        for (let i = 0; i < 6; i++) {
          const x = 42 + i * 21;
          if (i === 3) {
            s += `<rect x="${x}" y="${cy - 24}" width="16" height="16" fill="${F}" stroke="${GOLD}" stroke-width="1.2"/>`;
          } else {
            s += `<rect x="${x}" y="${cy}" width="16" height="16" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity=".85"/>`;
          }
        }
        s += `<line x1="42" y1="130" x2="156" y2="130" stroke="${GOLD}" stroke-width="0.8" opacity=".25"/>`;
        inner = s;
        break;
      }
      case "supply": {
        let s = "";
        for (let i = 0; i < 5; i++) {
          const broken = i === 2;
          s += `<ellipse cx="${44 + i * 28}" cy="100" rx="13" ry="32" fill="${broken ? "none" : F}" stroke="${GOLD}" stroke-width="${broken ? 1.2 : 1.5}" ${broken ? 'stroke-dasharray="6 8"' : ""} opacity="${broken ? 0.55 : 1}"/>`;
        }
        inner = s;
        break;
      }
      case "inject": {
        let s = `<rect x="46" y="46" width="108" height="108" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity=".45"/>`;
        for (let i = 0; i < 3; i++) {
          for (let k = 0; k < 3; k++) {
            if (i === 1 && k === 1) continue;
            s += `<rect x="${58 + k * 30}" y="${58 + i * 30}" width="22" height="22" fill="none" stroke="${GOLD}" stroke-width="1" opacity=".35"/>`;
          }
        }
        s += `<path d="M100 78 L118 116 L82 116 Z" fill="${F}" stroke="${GOLD}" stroke-width="1.6"/>`;
        inner = s;
        break;
      }
      case "fork": {
        const lean = j(14);
        inner =
          `<line x1="100" y1="42" x2="100" y2="98" stroke="${GOLD}" stroke-width="1.6"/>` +
          `<path d="M100 98 C 100 122, ${(68 + lean).toFixed(1)} 118, ${(66 + lean).toFixed(1)} 148" fill="none" stroke="${GOLD}" stroke-width="1.5"/>` +
          `<path d="M100 98 C 100 122, ${(132 + lean).toFixed(1)} 118, ${(134 + lean).toFixed(1)} 148" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity=".7"/>` +
          `<circle cx="${(66 + lean).toFixed(1)}" cy="152" r="6" fill="${F}" stroke="${GOLD}" stroke-width="1.4"/>` +
          `<circle cx="${(134 + lean).toFixed(1)}" cy="152" r="6" fill="none" stroke="${GOLD}" stroke-width="1.4" opacity=".7"/>` +
          `<line x1="84" y1="66" x2="116" y2="66" stroke="${GOLD}" stroke-width="1" opacity=".3" stroke-dasharray="3 5"/>`;
        break;
      }
      default: {
        const n = 7;
        const pts = [];
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          const rr = 38 + r() * 26;
          pts.push([100 + Math.cos(a) * rr, 100 + Math.sin(a) * rr]);
        }
        inner =
          `<polygon points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="${F}" stroke="${GOLD}" stroke-width="1.5"/>` +
          `<circle cx="100" cy="100" r="5" fill="none" stroke="${GOLD}" stroke-width="1" opacity=".5"/>`;
      }
    }

    const sz = size || 180;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${sz}" height="${sz}">${inner}</svg>`;
  }

  M.art = { artFor };
})();
