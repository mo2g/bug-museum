<div align="center">

<img src="assets/icon.svg" width="88" height="88" alt="Museum of Bugs" />

# Museum of Bugs

**Every bug you fixed deserves a vitrine and a label.**

<sub>Static · No dependencies · No build step · Stored locally</sub>

<sub>**English** · [中文](README.md)</sub>

</div>

![Home](submission/screenshots/01-home.png)

---

## What it is

Museum of Bugs is an online exhibition hall that collects nothing but failures. When you finish fixing something, while it is still fresh, you spend a minute filing it in — a name, a form, one line about the cause. The museum dates it against a dynasty timeline, writes a label, casts it into a geometric artifact generated procedurally, and places it in your vitrine.

The point is simple: **the things that kept you up at night should not be deleted. They should be kept.**

## What it looks like

| A single label | The World Hall |
|:---:|:---:|
| ![Label](submission/screenshots/02-label.png) | ![World Hall](submission/screenshots/03-world.png) |
| **Day mode (paper & ink)** | **Curatorial poster** |
| ![Day mode](submission/screenshots/04-day.png) | ![Poster](submission/screenshots/06-poster.png) |

## Features

- **Acquisition** — 19 forms (null pointer, time zone, race condition, the unexplained, out of memory, supply chain…). Each comes with a line of classical-sounding description and a default cause, so choosing one fills in the rest.
- **Automatic labels** — dated into a dynasty timeline (Primeval · Before the Web → Present · The AI Era) and assembled into a short museum note.
- **Procedural artifacts** — every piece is an SVG sculpture derived from its form and a hash of its id. Same form, same lineage; no two pieces identical. There is not a single image asset in the project.
- **Export** — 1000×1400 label cards and 1080×1350 curatorial posters, drawn entirely with the native Canvas API.
- **World Hall** — 27 real incidents across 9 languages. Filter by language, or borrow a piece into your own collection and hang it next to your own bugs.
- **Bilingual · two themes** — Chinese/English and Night/Day, freely combined. Exports follow the current theme.

## The World Hall

Nothing here is invented — it is all public record:

| Language | Pieces |
|---|---|
| PHP | php2shell · Out of Memory, php2shell · Stale State (CVE-2026-109618 / 109619) |
| Java | The Door in the Log (Log4Shell), The Door in Deserialization (Commons Collections) |
| Go | The Connection Left Open (Kubernetes CVE-2018-1002105), The Same Variable |
| JavaScript | Left Pad, The Author's Will (colors.js), Null Is an Object |
| Python | Two and Three (Py2 → Py3), The Default List |
| C | Heartbleed, The Door in the Environment (Shellshock), The Gap in xz, Two Identical Lines (goto fail), The First Worm |
| C++ / Rust / Ada | Two ABIs, A Speck of Rust, Ariane 5 |
| Any language | Mars Climate Orbiter, Knight Capital, One Command (S3), Five Backups (GitLab), The Millennium Bug, The False UTF-8 |

Cause only, no exploit details.

## Run it

No build step, no dependencies.

```bash
open index.html

# or serve it statically (recommended — avoids some browsers' file:// restrictions)
python3 -m http.server 8080
```

## Project layout

```
index.html              entry point
assets/
  css/                  base · layout · exhibit · modal
  js/                   data · data.en · util · i18n · theme · art
                        store · render · exhibit · form · curate · export · app
  icon.svg              icon
submission/             submission copy and UI screenshots
```

**Why classic `<script>` instead of ES modules**: ES modules are blocked by CORS under `file://`, so double-clicking the file gives you a blank page. The scripts cooperate through a `window.MOD` namespace and load in dependency order — which also works when opened straight from disk.

## Technical notes

- Plain HTML / CSS / JavaScript with **no third-party libraries, no CDN, no bundler**.
- Data lives in `localStorage`; inside the mini-tool container it also writes through to the platform Storage API.
- Artifacts are assembled as SVG strings, with a deterministic pseudo-random generator seeded by an id hash and an LCG.
- Export uses the native Canvas API: the SVG is converted to an Image via a data URI, then `drawImage`d. A 3% noise layer sits on top of the large dark gradients, otherwise they band badly.
- The compatibility baseline is **Chrome 61** (the WebView shipped with Android 8.1) — no `clamp()`, no flex `gap`, no `color-mix()`, no `inset`.

## Also

`BugMuseum-minitool.zip` is the packaged build for the Xiaohongshu mini-tool container (built locally, not committed): the container forbids `a[download]`, so export goes through `saveImageToPhotosAlbum` and falls back to an in-page preview elsewhere.

---

<div align="center">
<sub>Built for the WorkBuddy 1024 Challenge · 2026</sub>
</div>
