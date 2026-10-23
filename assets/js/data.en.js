/* 英文内容层：按 id 覆盖到 data.js 上，缺译自动回退中文。
   新增藏品只需在 data.js 里写中文，这里补一条英文即可。 */
(() => {
  const M = (window.MOD = window.MOD || {});

  /* ---------------- 形制 ---------------- */
  const FORMS_EN = {
    null:    { n: "Null Pointer",     d: "hollow inside; collapses on contact",      c: "the third frame of the call stack returned null" },
    oob:     { n: "Out of Bounds",    d: "reaches one past its own end",             c: "the index was one larger than the length" },
    tz:      { n: "Time Zone",        d: "wakes at odd hours",                       c: "off by eight hours" },
    float:   { n: "Floating Point",   d: "a hair's width, a thousand miles off",     c: "0.1 + 0.2 ≠ 0.3" },
    cache:   { n: "Stale Cache",      d: "an old shadow that will not update",       c: "the cache was never cleared and nothing took effect" },
    dep:     { n: "Dependency",       d: "pull one thread, everything moves",        c: "version conflict; the lockfile fought itself" },
    charset: { n: "Encoding",         d: "characters that refuse to form words",     c: "it was not UTF-8" },
    race:    { n: "Race Condition",   d: "two hands, no agreed order",               c: "two writers hit the same row at once" },
    reg:     { n: "Regex",            d: "bogs down on anything complicated",        c: "greedy matching swallowed the whole line" },
    net:     { n: "Network",          d: "open, then closed, then open",             c: "no timeout was set, so it simply waited" },
    haunt:   { n: "The Unexplained",  d: "no cause found; fixed by restart",         c: "it started working again after a restart" },
    oom:     { n: "Out of Memory",    d: "asks and asks, receives nothing",          c: "memory was never released and the OOM killer arrived" },
    inject:  { n: "Injection",        d: "carries something inside its words",       c: "user input was treated as code" },
    typo:    { n: "Typo",             d: "one keystroke of difference",              c: "one character short in the command" },
    uaf:     { n: "Use After Free",   d: "still holding what has already decayed",   c: "the object was freed; the pointer still pointed at it" },
    intov:   { n: "Integer Overflow", d: "counts past its limit and wraps around",   c: "the value exceeded what the type could hold" },
    unit:    { n: "Unit Mismatch",    d: "same measure, different rule",             c: "pound-force seconds on one side, newton-seconds on the other" },
    supply:  { n: "Supply Chain",     d: "lives inside someone else's house",        c: "a package in the dependency tree had been altered" },
    fork:    { n: "The Split",        d: "one origin, two roads",                    c: "fixing one flaw meant breaking away from the past" }
  };

  /* ---------------- 结语 ---------------- */
  const CLOSINGS_EN = [
    "The fixer left no name — only a commit line.",
    "Beyond saving. Sealed where it fell.",
    "Kept here, for those who come after.",
    "Small as it was, it once lit up every dashboard.",
    "The museum holds several of this form.",
    "No one fully understood why it worked afterwards."
  ];

  /* ---------------- 断代 ---------------- */
  const ERAS_EN = [
    ["太古 · 前 Web 纪", "Primeval · Before the Web"],
    ["远古 · Web 1.0 纪", "Ancient · Web 1.0"],
    ["上古 · Web 2.0 纪", "Classical · Web 2.0"],
    ["中古 · 移动互联网纪", "Medieval · Mobile Internet"],
    ["近世 · 云原生纪", "Early Modern · Cloud Native"],
    ["当下 · AI 协同时代", "Present · The AI Era"]
  ];

  /* ---------------- 个人示例藏品 ---------------- */
  const DEMO_EN = {
    "MD-2016-0001": { name: "The Ghost Null",        site: "Users / login module",         cause: "the third frame of the call stack returned null" },
    "MD-2018-0002": { name: "The Mojibake Stele",    site: "Export service / CSV",         cause: "Excel opened it as garbage; the file was not UTF-8" },
    "MD-2021-0003": { name: "Dependency Hell",       site: "Build pipeline / CI",          cause: "CI and my laptop installed two different versions" },
    "MD-2022-0004": { name: "Eight Hours Off",       site: "Dashboard / daily stats",      cause: "the server ran UTC; the chart rendered local time" },
    "MD-2024-0005": { name: "Zero Point One",        site: "Billing / revenue split",      cause: "0.1 + 0.2 ≠ 0.3, and the ledger was a cent short" },
    "MD-2026-0006": { name: "The Silent Double Write", site: "Order service / stock",      cause: "two writers hit the same row; the later one won" }
  };

  /* ---------------- 世界厅 ---------------- */
  const WORLD_EN = {
    "CVE-2026-109618": {
      name: "php2shell · Out of Memory",
      site: "PHP core / out-of-memory path",
      cause: "longjmp aborts a request with memory half-initialised; cleanup treats it as valid",
      cost: "CVSS 9.2 — WordPress, Laravel, Drupal, most of the PHP web",
      note: "Unearthed on 21 October 2026, two days before this museum opened. It lives in no framework — only in the runtime's own memory ledger, which is perhaps the unsettling part. Fixed in 8.2.35 / 8.3.36 / 8.4.27 / 8.5.12."
    },
    "CVE-2026-109619": {
      name: "php2shell · Stale State",
      site: "PHP core / cross-request globals",
      cause: "the request's memory is freed, but a global still points at it; the next request catches the ghost",
      cost: "CVSS 9.2, unauthenticated remote code execution",
      note: "Unearthed the same day, of an adjacent form. It only fires on the second request handled by the same worker — the first buries it, the second sets it off. The hardest kind to reproduce: you have to wait, and wait correctly."
    },
    "CVE-2021-44228": {
      name: "The Door in the Log",
      site: "Log4j 2 / message formatting",
      cause: "a log line evaluates ${jndi:ldap://…} and dials the attacker's server",
      cost: "CVSS 10.0 — one weekend, every engineer on earth",
      note: "9 December 2021. You did not have to call any API; the string only had to be written to a log. That week, a great many people opened their dependency tree for the first time and saw Log4j."
    },
    "CVE-2015-4852": {
      name: "The Door in Deserialization",
      site: "Apache Commons Collections / Java deserialization",
      cause: "a chain of harmless classes, assembled by the input, becomes an execution path",
      cost: "WebLogic, JBoss, Jenkins, WebSphere — a generation of Java middleware",
      note: "November 2015. It taught the Java world one thing: control the deserialization input and you control the machine. For the next decade almost every Java RCE came through this door."
    },
    "CVE-2018-1002105": {
      name: "The Connection Left Open",
      site: "kube-apiserver / aggregated API proxy",
      cause: "an upgrade request finished, but the backend connection was never closed; the next caller took over a channel that should have died",
      cost: "any authenticated API user could become cluster admin",
      note: "December 2018. The channel existed for long-lived connections; nobody imagined it would simply stay open. A control plane written in Go, undone by the life and death of a socket."
    },
    "npm left-pad": {
      name: "Left Pad",
      site: "npm / the dependency chain",
      cause: "an eleven-line package was unpublished by its author; thousands of builds failed at once",
      cost: "a few hours, half the front-end ecosystem",
      note: "22 March 2016. Nobody deleted anyone's code — someone simply took back their own. It turned out a great many people lived in a house whose load-bearing wall was someone else's toothpick."
    },
    "colors.js 2022": {
      name: "The Author's Will",
      site: "npm / colors and faker",
      cause: "the maintainer pushed an odd version suffix, then wrote an infinite loop into the code",
      cost: "thousands of projects failed to build that night; consoles went blank",
      note: "January 2022. He did not delete the repository — he made the code spin. That night a lot of people realised the thing they imported every day was maintained by someone, for free."
    },
    "Python 3.0": {
      name: "Two and Three",
      site: "CPython / str and bytes",
      cause: "to fix the str/bytes confusion, Python chose not to be compatible with its own past",
      cost: "twelve years, two runtimes, countless from __future__ imports",
      note: "December 2008. On the day Python 3.0 shipped, nobody knew how long they would be writing compatibility shims. It worked in the end — it just took twelve years, and 2.7 kept receiving fixes until 2020."
    },
    "CVE-2014-0160": {
      name: "Heartbleed",
      site: "OpenSSL 1.0.1 / heartbeat extension",
      cause: "the heartbeat claimed 64KB of payload and delivered one byte; the server read 64KB of memory anyway",
      cost: "an estimated half a million certificates affected",
      note: "April 2014. It wrote nothing and changed nothing — it only read memory back out: private keys, session tickets, other people's passwords. The fix was two lines of length checking. Those two lines had been missing for two years."
    },
    "CVE-2014-6271": {
      name: "The Door in the Environment",
      site: "GNU Bash / environment variables",
      cause: "bash treated environment values beginning () { :; } as function definitions and ran them; web servers happened to put request headers into the environment",
      cost: "CVSS 10.0, a generation of CGI endpoints taken outright",
      note: "September 2014. A feature that had existed since 1989 became a backdoor twenty-five years later, through a usage nobody designed for. Not one line of your application code had to be wrong."
    },
    "CVE-2024-24576": {
      name: "A Speck of Rust",
      site: "std::process::Command / Windows argument quoting",
      cause: "arguments handed to cmd.exe were not fully escaped; text inside an argument became another command",
      cost: "CVSS 10.0 — a crack in the safety story",
      note: "April 2024. Windows only, and only one narrow calling pattern — but it was Rust, a language whose entire pitch is memory safety. It reminds you that safety is layered, and the language is only one layer."
    },
    "CVE-2024-3094": {
      name: "The Gap in xz",
      site: "xz-utils 5.6.0 / build scripts",
      cause: "two and a half years of patiently earned maintainer access, spent hiding a backdoor in test binaries",
      cost: "very nearly inside the sshd of major distributions",
      note: "March 2024. An engineer noticed sshd taking 500 milliseconds longer to start — that was all. Following that half second led to a two-and-a-half-year social engineering campaign. Open source got lucky that time."
    },
    "Flight 501": {
      name: "Ariane 5",
      site: "Inertial navigation / code inherited from Ariane 4",
      cause: "a 64-bit float converted to a 16-bit integer; the value did not fit; the conversion aborted",
      cost: "about $370 million, thirty-seven seconds after launch",
      note: "4 June 1996. The offending routine had run for nine years on Ariane 4 without a single fault — because Ariane 4's trajectory never pushed it out of range. Reusing correct code is itself a risk."
    },
    "MCO": {
      name: "Mars Climate Orbiter",
      site: "Ground navigation software / thruster data",
      cause: "the ground computed pound-force seconds; the spacecraft expected newton-seconds — a factor of 4.45",
      cost: "about $125 million",
      note: "23 September 1999. It did not explode and it did not crash. It simply passed a hundred kilometres lower than planned, went behind Mars, and was never heard from again."
    },
    "Knight Capital": {
      name: "Knight Capital",
      site: "Production deploy / eight servers, seven updated",
      cause: "seven of eight machines received the new build; the eighth was still running code that had been retired",
      cost: "$440 million in forty-five minutes",
      note: "1 August 2012. Forty-five minutes after the open, a twenty-year-old market maker no longer existed. The software did not crash — it executed orders nobody wanted, very diligently."
    },
    "S3 2017-02-28": {
      name: "One Command",
      site: "us-east-1 / an operator's terminal",
      cause: "a command typed while debugging billing had one extra parameter; far more servers were removed than intended",
      cost: "hours, and half the internet returning 502",
      note: "28 February 2017. The status page was down, because the status page was also on S3. A lot of people learned one thing that day: before you press enter, confirm which machine you are on."
    },
    "GitLab 2017-01-31": {
      name: "Five Backups",
      site: "db1.cluster.gitlab.com / primary",
      cause: "a delete ran on the wrong host, and five separate backup mechanisms failed at once",
      cost: "six hours of production data, and a very public postmortem",
      note: "31 January 2017. They restored from a snapshot taken six hours earlier that nobody remembered existed. A backup you have never restored is not a backup."
    },
    "Y2K": {
      name: "The Millennium Bug",
      site: "Date fields, everywhere",
      cause: "years stored as two decimal digits; 1999 plus one carried over into 1900",
      cost: "hundreds of billions of dollars of inspection and remediation",
      note: "Two bytes saved per field, in an era when storage was priced in kilobytes. It was a sound trade. Humanity spent thirty years paying it back — and it is one of the rare incidents that was successfully held down."
    },
    "GCC 5 CXX11 ABI": {
      name: "Two ABIs",
      site: "libstdc++ / std::string and std::list",
      cause: "conforming to C++11 changed how string and list were laid out; the binaries stopped matching",
      cost: "every prebuilt C++ library had to be rebuilt, or lived behind _GLIBCXX_USE_CXX11_ABI",
      note: "April 2015. Not one line of code changed and the link failed. C++ has no ABI standard, so every improvement can also be a fracture — that macro is still in build scripts today."
    },
    "CVE-2014-1266": {
      name: "Two Identical Lines",
      site: "Apple SecureTransport / TLS handshake",
      cause: "a copy-paste put goto fail on two consecutive lines; the second one skipped every certificate check",
      cost: "TLS on iOS and OS X was effectively decorative",
      note: "February 2014. The extra line always ran, so every check after it became dead code. The compiler said nothing — it was perfectly legal."
    },
    "Morris Worm": {
      name: "The First Worm",
      site: "fingerd / a gets() buffer",
      cause: "gets() does not check length; an overlong input overwrote the return address on the stack",
      cost: "about six thousand machines — a tenth of the internet at the time",
      note: "2 November 1988. It only meant to count how large the internet was, and copied itself too many times. CERT exists because of this."
    },
    "Java Integer Cache": {
      name: "One Hundred and Twenty-Seven",
      site: "java.lang.Integer / IntegerCache",
      cause: "values from -128 to 127 are cached and reused; outside that range you get two different objects",
      cost: "the first trap question of every Java interview",
      note: "Not a bug — an optimisation. Caching makes small integers cheap to box and compare, at the price of == changing its mind between 127 and 128. Still unfixed, because fixing it would hurt more."
    },
    "JS typeof null": {
      name: "Null Is an Object",
      site: "JavaScript / the typeof operator",
      cause: "types were tagged in the low bits; null's tag was 0, which collided with object",
      cost: "unfixable since 1995",
      note: "A language written in ten days, and one afternoon's oversight. Brendan Eich has publicly called it a mistake, but fixing it would silently break half the JavaScript in the world. The museum's clearest exhibit of a thing that cannot be repaired."
    },
    "Go loop var": {
      name: "The Same Variable",
      site: "Go / the for-range loop variable",
      cause: "the loop variable existed once for the whole loop; closures and goroutines all captured it",
      cost: "ten years, and countless goroutines printing the same value",
      note: "2012 to 2024. Everyone knew to write i := i, and everyone forgot. Go 1.22 finally gave each iteration its own variable — one of the few language-level defects actually repaired."
    },
    "Python mutable default": {
      name: "The Default List",
      site: "Python / function default arguments",
      cause: "defaults are evaluated once, at definition time; every call shares the same object",
      cost: "the first lesson of every Python beginner",
      note: "def f(a, b=[]) — you think each call gets a fresh list; in fact the whole world shares that one. It is design, not a bug, so it will never be fixed — only moved to chapter one of the tutorial."
    },
    "PHP loose compare": {
      name: "Zero Equals Apple",
      site: "PHP / loose comparison",
      cause: "comparing a string with a number converts the string; anything not starting with digits becomes 0",
      cost: "twenty years of login checks quietly bypassed",
      note: "Before PHP 8, 0 == \"apple\" was true. The form is famous enough to have its own name: type juggling. PHP 8 changed the comparison rules in 2020, and only then did it come to this museum."
    },
    "MySQL utf8": {
      name: "The False UTF-8",
      site: "MySQL / the utf8 character set",
      cause: "the charset named utf8 is really utf8mb3 — three bytes at most, too few for a four-byte emoji",
      cost: "a decade of nicknames turning into question marks on insert",
      note: "It is called utf8, and it is not UTF-8. To store one emoji you had to move to utf8mb4 — a choice available since 2010, and one that a great many people only discovered in 2018."
    }
  };

  /* ---------------- 合并 ---------------- */
  Object.keys(FORMS_EN).forEach((k) => {
    if (M.FORMS[k]) Object.assign(M.FORMS[k], { n_en: FORMS_EN[k].n, d_en: FORMS_EN[k].d, c_en: FORMS_EN[k].c });
  });
  M.CLOSINGS_EN = CLOSINGS_EN;
  M.ERAS_EN = ERAS_EN;
  M.DEMO.forEach((d) => {
    const e = DEMO_EN[d.id];
    if (e) Object.assign(d, { name_en: e.name, site_en: e.site, cause_en: e.cause });
  });
  M.WORLD.forEach((w) => {
    const e = WORLD_EN[w.id];
    if (e) Object.assign(w, { name_en: e.name, site_en: e.site, cause_en: e.cause, cost_en: e.cost, note_en: e.note });
  });
})();
