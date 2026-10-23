/* 数据层：常量、形制表、示例藏品、世界厅馆藏
   全局命名空间 MOD，供其余脚本按需取用。 */
(() => {
  const M = (window.MOD = window.MOD || {});

  M.KEY = "mod.items.v1";
  M.KEY_SEQ = "mod.seq.v1";

  M.SERIF = '"Songti SC","STSong","Songti TC","SimSun",serif';
  M.SANS = '-apple-system,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif';
  M.MONO = '"SF Mono",ui-monospace,Menlo,Consolas,monospace';
  M.GOLD = "#c8a96a";

  /* 形制：n=名称 d=文言描述 c=默认死因 */
  M.FORMS = {
    null:    { n: "空指针", d: "空心之器，外实内虚，触之即溃", c: "调用链第 3 层返回 null" },
    oob:     { n: "越界",   d: "越界之器，其末常断",           c: "下标比长度大了 1" },
    tz:      { n: "时区",   d: "时差之器，昼伏夜出",           c: "差 8 小时" },
    float:   { n: "浮点",   d: "微分之器，差之毫厘，谬以千里", c: "0.1 + 0.2 ≠ 0.3" },
    cache:   { n: "缓存",   d: "旧影之器，不随新变",           c: "缓存没清，改了半天不生效" },
    dep:     { n: "依赖",   d: "连锁之器，牵一发而动全身",     c: "依赖版本冲突，锁文件打架" },
    charset: { n: "编码",   d: "乱文之器，字不成句",           c: "编码不是 UTF-8" },
    race:    { n: "并发",   d: "并驱之器，先后无序",           c: "两处同时写同一行" },
    reg:     { n: "正则",   d: "回溯之器，遇繁则滞",           c: "贪婪匹配把整段吃掉了" },
    net:     { n: "网络",   d: "断续之器，时通时塞",           c: "超时没设，一直等" },
    haunt:   { n: "玄学",   d: "无因之器，重启自愈",           c: "重启之后自己好了" },
    oom:     { n: "内存耗尽", d: "渴竭之器，求而不得",          c: "内存没释放，进程被 OOM Killer 带走了" },
    inject:  { n: "注入",   d: "夹带之器，言中有物",           c: "用户输入被当成了代码" },
    typo:    { n: "手误",   d: "毫厘之器，一念之差",           c: "命令少敲了一个字符" },
    uaf:     { n: "释放后使用", d: "去形之器，已朽犹握",        c: "对象已释放，指针还指着它" },
    intov:   { n: "整数溢出", d: "越量之器，计穷而返",          c: "数值超过了类型能表示的范围" },
    unit:    { n: "单位失配", d: "错刻之器，度同而制异",        c: "一边用磅力秒，一边用牛顿秒" },
    supply:  { n: "供应链", d: "寄居之器，托身于人",           c: "依赖里的某个包被人改过" },
    fork:    { n: "分裂",   d: "分道之器，同源而异途",          c: "为了修一个缺陷，把体系劈成了两半" }
  };

  /* 入藏表单里可选的形制（个人会遇到的） */
  M.TAG_ORDER = [
    "null", "oob", "tz", "float", "cache", "dep", "charset", "race", "reg", "net",
    "haunt", "oom", "inject", "typo"
  ];

  /* 语言：c 为夜展色，cd 为日展色（浅色底上需要压深才读得清） */
  M.LANGS = {
    php:  { n: "PHP",        c: "#8A8FC4", cd: "#5A5E9C" },
    java: { n: "Java",       c: "#E8823C", cd: "#AF5516" },
    go:   { n: "Go",         c: "#3CBEDC", cd: "#157E96" },
    js:   { n: "JavaScript", c: "#E8CF4B", cd: "#877010" },
    py:   { n: "Python",     c: "#5B9BC9", cd: "#2C6795" },
    c:    { n: "C",          c: "#7FA8D8", cd: "#3A6DA6" },
    cpp:  { n: "C++",        c: "#7C8FD6", cd: "#44559E" },
    rust: { n: "Rust",       c: "#DEA584", cd: "#9E5533" },
    ada:  { n: "Ada",        c: "#9AA8C4", cd: "#55648A" }
  };

  M.CLOSINGS = [
    "修复者未留名，只余一行提交记录。",
    "经抢救无效，已就地封存。",
    "现存本馆，供后人凭吊。",
    "此物虽小，曾令全线告警。",
    "同类形制，本馆已藏数件。",
    "修复之时，无人知其所以然。"
  ];

  /* 首次访问预置的个人藏品 */
  M.DEMO = [
    { id: "MD-2016-0001", name: "幽灵空指针", site: "用户中心 / 登录模块", tag: "null", cause: "调用链第 3 层返回 null", date: "2016-08-14", fixer: "" },
    { id: "MD-2018-0002", name: "乱码碑", site: "导出服务 / CSV", tag: "charset", cause: "Excel 打开全是乱码，编码不是 UTF-8", date: "2018-04-09", fixer: "" },
    { id: "MD-2021-0003", name: "依赖地狱", site: "构建流水线 / CI", tag: "dep", cause: "锁文件打架，CI 与本地装出两个版本", date: "2021-09-27", fixer: "" },
    { id: "MD-2022-0004", name: "八小时时差", site: "数据看板 / 日报统计", tag: "tz", cause: "服务器 UTC，前端按本地时间渲染", date: "2022-11-03", fixer: "" },
    { id: "MD-2024-0005", name: "零点零一", site: "财务系统 / 分账", tag: "float", cause: "0.1 + 0.2 ≠ 0.3，账差了 1 分钱", date: "2024-02-11", fixer: "" },
    { id: "MD-2026-0006", name: "沉默的双写", site: "订单服务 / 库存扣减", tag: "race", cause: "两处同时写同一行，后到的覆盖了先到的", date: "2026-06-21", fixer: "" }
  ];

  /* 世界厅：18 件外部馆藏。lang 为空的表示与具体语言无关的工程事故。 */
  M.WORLD = [
    {
      id: "CVE-2026-109618", name: "php2shell · 内存耗尽", year: 2026, date: "2026-10-21",
      tag: "oom", lang: "php", hot: true,
      site: "PHP 内核 / 内存耗尽处理路径",
      cause: "longjmp 中断请求时内存尚未初始化，清理阶段却把它当成有效数据继续走",
      cost: "CVSS 9.2，波及 WordPress、Laravel、Drupal 等绝大多数 PHP 站点",
      note: "此物于 2026 年 10 月 21 日出土，比本馆开馆还早两天。它不在任何框架里，而在语言运行时自己的内存账本上——这大概是它最让人不安的地方。修复版本：8.2.35 / 8.3.36 / 8.4.27 / 8.5.12。"
    },
    {
      id: "CVE-2026-109619", name: "php2shell · 陈旧状态", year: 2026, date: "2026-10-21",
      tag: "uaf", lang: "php", hot: true,
      site: "PHP 内核 / 跨请求全局状态",
      cause: "请求内存已释放，全局引用仍指向它；下一个请求正好接住了这份幽灵",
      cost: "CVSS 9.2，无需认证即可远程执行代码",
      note: "与前一件同日出土，形制相邻。它只在同一个 worker 的第二个请求里发作——第一个请求埋下它，第二个请求引爆它。这类缺陷最难复现，因为你要等，还要等对。"
    },
    {
      id: "CVE-2021-44228", name: "日志里的门", year: 2021, date: "2021-12-09",
      tag: "inject", lang: "java",
      site: "Log4j 2 / 日志格式化",
      cause: "一条日志把 ${jndi:ldap://…} 当成表达式，跑去连了攻击者的服务器",
      cost: "CVSS 10.0，全球工程师的那个周末",
      note: "2021 年 12 月 9 日。它不需要你调用任何接口——只要那串字符被写进日志，它就开始工作了。那一周，很多人第一次打开依赖树，看见了 Log4j。"
    },
    {
      id: "CVE-2015-4852", name: "反序列化的门", year: 2015, date: "2015-11-06",
      tag: "inject", lang: "java",
      site: "Apache Commons Collections / Java 反序列化",
      cause: "反序列化时，一串可以链式调用的类被拼成了执行链",
      cost: "WebLogic、JBoss、Jenkins、WebSphere——一整个 Java 中间件世代",
      note: "2015 年 11 月。它提醒了整个 Java 世界一件事：只要你能控制反序列化的输入，就等于能控制那台机器。此后十年，Java 的每一次 RCE 几乎都从这个门进来。"
    },
    {
      id: "CVE-2018-1002105", name: "常开的连接", year: 2018, date: "2018-12-03",
      tag: "uaf", lang: "go",
      site: "kube-apiserver / 聚合层代理",
      cause: "一次 upgrade 请求结束后，后端连接没有跟着关闭；下一个人接上了这条本该断掉的通道",
      cost: "任何普通 API 用户可提权至集群管理员",
      note: "2018 年 12 月。这条通道原本是为长连接设计的，只是没人想过它会一直开着。用 Go 写的控制面，最终栽在连接的生死上。"
    },
    {
      id: "npm left-pad", name: "左补齐", year: 2016, date: "2016-03-22",
      tag: "supply", lang: "js",
      site: "npm / 生态依赖链",
      cause: "一个 11 行的包被作者取消发布，成千上万个构建同时失败",
      cost: "数小时，半个前端生态",
      note: "2016 年 3 月 22 日。没有人删掉任何人的代码，只是有人收回了自己的。原来那么多人住的房子，承重墙是别人家的一根牙签。"
    },
    {
      id: "colors.js 2022", name: "作者的意志", year: 2022, date: "2022-01-08",
      tag: "supply", lang: "js",
      site: "npm / colors 与 faker",
      cause: "维护者把版本推到奇怪的后缀，然后在代码里写下了一个无限循环",
      cost: "数千个项目当晚构建失败，控制台一片空白",
      note: "2022 年 1 月。他没有删库，只是让代码开始转圈。那天晚上很多人才意识到，自己每天 import 的东西，是别人无偿维护的。"
    },
    {
      id: "Python 3.0", name: "二与三", year: 2008, date: "2008-12-03",
      tag: "fork", lang: "py",
      site: "CPython / 字符串与字节",
      cause: "为了修掉 str 与 bytes 混用这个缺陷，Python 决定不再兼容过去",
      cost: "十二年，两套运行时，无数行 from __future__ import",
      note: "2008 年 12 月。Python 3.0 发布那天，没人知道自己要写多久的兼容代码。它最后成功了，只是花了整整十二年——而 2.7 直到 2020 年才停止支持。"
    },
    {
      id: "CVE-2014-0160", name: "心脏出血", year: 2014, date: "2014-04-07",
      tag: "oob", lang: "c",
      site: "OpenSSL 1.0.1 / 心跳扩展",
      cause: "心跳包声称带了 64KB 内容，实际只给了 1 字节，服务器就照着 64KB 读了内存",
      cost: "据估算约 50 万张证书受影响",
      note: "2014 年 4 月。它不写入，不篡改，只是把内存原样读回来——私钥、会话票据、别人的密码。修复只需两行长度校验，而这两行缺席了两年。"
    },
    {
      id: "CVE-2014-6271", name: "环境里的门", year: 2014, date: "2014-09-24",
      tag: "inject", lang: "c",
      site: "GNU Bash / 环境变量",
      cause: "bash 把环境变量里以 () { :; } 开头的内容当成函数定义执行，而 Web 服务器恰好把请求头塞进了环境变量",
      cost: "CVSS 10.0，大量 CGI 站点可被直接拿下",
      note: "2014 年 9 月。一个 1989 年就存在的特性，在二十五年后被 CGI 的用法变成了后门。它不需要你写错任何一行业务代码。"
    },
    {
      id: "CVE-2024-24576", name: "锈斑", year: 2024, date: "2024-04-09",
      tag: "inject", lang: "rust",
      site: "std::process::Command / Windows 参数拼接",
      cause: "把参数交给 cmd.exe 时转义没做全，参数里的内容变成了另一条命令",
      cost: "CVSS 10.0，Rust 安全叙事上的一道裂缝",
      note: "2024 年 4 月。它只影响 Windows，也只影响一种很窄的调用方式，但那是 Rust——一个以内存安全为招牌的语言。它提醒人们：安全是分层的事，语言只是其中一层。"
    },
    {
      id: "CVE-2024-3094", name: "xz 之隙", year: 2024, date: "2024-03-29",
      tag: "supply", lang: "c",
      site: "xz-utils 5.6.0 / 构建脚本",
      cause: "用两年半时间换来的维护者权限，把后门藏进了测试用的二进制数据里",
      cost: "差一点进入主流发行版的 sshd",
      note: "2024 年 3 月。一位工程师发现 sshd 启动慢了 500 毫秒——仅此而已。顺着这半秒查下去，是一个经营了两年半的社会工程。开源世界那次是运气好。"
    },
    {
      id: "Flight 501", name: "阿丽亚娜 5 号", year: 1996, date: "1996-06-04",
      tag: "intov", lang: "ada",
      site: "惯性导航系统 / 自阿丽亚娜 4 号继承的代码",
      cause: "64 位浮点转成 16 位整数，数值超出范围，转换中断",
      cost: "约 3.7 亿美元，发射后 37 秒",
      note: "1996 年 6 月 4 日。出问题的那段代码在阿丽亚娜 4 号上跑了九年，从未出错——因为 4 号的弹道不会让它超范围。复用一段正确的代码，本身也是一种风险。"
    },
    {
      id: "MCO", name: "火星气候探测器", year: 1999, date: "1999-09-23",
      tag: "unit", lang: "",
      site: "地面导航软件 / 推进器数据",
      cause: "地面用磅力秒，探测器用牛顿秒，中间差了 4.45 倍",
      cost: "约 1.25 亿美元",
      note: "1999 年 9 月 23 日。它没有爆炸，也没有坠毁。它只是比预定轨道低了 100 公里，从火星背后经过，然后再没有出现。"
    },
    {
      id: "Knight Capital", name: "骑士资本", year: 2012, date: "2012-08-01",
      tag: "typo", lang: "",
      site: "生产部署 / 8 台服务器中的第 8 台",
      cause: "8 台机器部署了 7 台，漏掉的那台还跑着早已废弃的旧代码",
      cost: "4.4 亿美元，45 分钟",
      note: "2012 年 8 月 1 日。开盘 45 分钟后，一家二十年历史的做市商不再存在。它的软件没有崩溃，只是非常努力地执行了没人想要的指令。"
    },
    {
      id: "S3 2017-02-28", name: "一条命令", year: 2017, date: "2017-02-28",
      tag: "typo", lang: "",
      site: "us-east-1 / 运维终端",
      cause: "排查计费异常时敲下的命令，参数多打了一个，删掉的服务器比预期多得多",
      cost: "数小时，半个互联网跟着 502",
      note: "2017 年 2 月 28 日。状态页打不开，因为状态页本身也在 S3 上。那天很多人学会了一件事：敲回车之前，先确认自己在哪台机器上。"
    },
    {
      id: "GitLab 2017-01-31", name: "五个备份", year: 2017, date: "2017-01-31",
      tag: "typo", lang: "",
      site: "db1.cluster.gitlab.com / 主库",
      cause: "在错误的机器上执行了删除，五种备份机制同时失效",
      cost: "6 小时生产数据，以及一场公开直播的事故复盘",
      note: "2017 年 1 月 31 日。他们最后从 6 小时前一次没人记得的快照里恢复。没演练过的备份，不算备份。"
    },
    {
      id: "Y2K", name: "千年虫", year: 2000, date: "2000-01-01",
      tag: "intov", lang: "",
      site: "无数系统的日期字段",
      cause: "用两位十进制数存年份，1999 的下一年进位溢出，变成了 1900",
      cost: "全球数千亿美元的排查与改造",
      note: "为了省下每个字段两个字节——在那个存储以 KB 计价的年代，这是一笔划算的账。后来人类花了三十年偿还它。它也是一次罕见的、被成功按住的事故。"
    },
    {
      id: "GCC 5 CXX11 ABI", name: "双 ABI", year: 2015, date: "2015-04-22",
      tag: "fork", lang: "cpp",
      site: "libstdc++ / std::string 与 std::list",
      cause: "为了符合 C++11，标准库改了 string 和 list 的实现，二进制从此对不上",
      cost: "所有预编译的 C++ 库必须重编，或者靠 _GLIBCXX_USE_CXX11_ABI 活着",
      note: "2015 年 4 月。代码一行没改，链接却失败了。C++ 没有 ABI 标准，所以每一次「改进」都可能是一次断裂——那个宏至今还留在很多构建脚本里。"
    },
    {
      id: "CVE-2014-1266", name: "两行一样的代码", year: 2014, date: "2014-02-21",
      tag: "typo", lang: "c",
      site: "Apple SecureTransport / TLS 握手",
      cause: "一次复制粘贴让 goto fail 出现了两次，第二行跳过了所有证书校验",
      cost: "iOS 与 OS X 全线的 TLS 形同虚设",
      note: "2014 年 2 月。多出来的那一行永远执行，于是后面所有校验代码都成了摆设。编译器没有报警——因为它完全合法。"
    },
    {
      id: "Morris Worm", name: "第一个蠕虫", year: 1988, date: "1988-11-02",
      tag: "oob", lang: "c",
      site: "fingerd / gets() 缓冲区",
      cause: "gets() 不检查长度，超长输入直接覆盖了栈上的返回地址",
      cost: "约六千台机器，占当时互联网的十分之一",
      note: "1988 年 11 月 2 日。它本意只是想数一数互联网有多大，却把自己复制了太多次。这件事之后，人类才有了 CERT。"
    },

    /* —— 语言级标本：从未引发事故，但每个写过这门语言的人都踩过 —— */
    {
      id: "Java Integer Cache", name: "一百二十七", year: 2004, date: "2004-09-30",
      tag: "cache", lang: "java",
      site: "java.lang.Integer / IntegerCache",
      cause: "-128 到 127 被装箱缓存复用，超出这个范围就是两个不同的对象",
      cost: "每一届 Java 面试的第一道陷阱题",
      note: "它不是一个 bug，是一个优化。缓存让小整数比较又快又省，代价是 == 在 127 和 128 之间突然改变主意。至今未修复——因为修它会伤到更多东西。"
    },
    {
      id: "JS typeof null", name: "空即对象", year: 1995, date: "1995-05-01",
      tag: "null", lang: "js",
      site: "JavaScript / typeof 运算符",
      cause: "当初用低位标签表示类型，null 的标签是 0，与 object 撞了",
      cost: "自 1995 年起，无法修复",
      note: "十天写成的语言，一个下午的疏忽。Brendan Eich 后来公开说过这是个错误，但改掉它会让全世界一半的 JavaScript 静默崩溃。本馆最典型的「不能修」标本。"
    },
    {
      id: "Go loop var", name: "同一个变量", year: 2012, date: "2012-03-28",
      tag: "race", lang: "go",
      site: "Go / for range 循环变量",
      cause: "循环变量在整个循环里只有一个，闭包和 goroutine 抓到的都是它",
      cost: "十年，无数个 goroutine 打印出了同一个值",
      note: "2012 到 2024。所有人都知道要写 i := i，所有人都忘过。Go 1.22 终于让每次迭代拥有自己的变量——这是少数被真正修好的语言级缺陷。"
    },
    {
      id: "Python mutable default", name: "默认的空列表", year: 1991, date: "1991-02-20",
      tag: "cache", lang: "py",
      site: "Python / 函数默认参数",
      cause: "默认参数在函数定义时求值一次，此后所有调用共用同一个对象",
      cost: "每一个 Python 新手的第一课",
      note: "def f(a, b=[]) —— 你以为每次都是新的空列表，其实全世界共用那一个。它是设计，不是 bug，所以永远不会被修复，只会被写进教程第一章。"
    },
    {
      id: "PHP loose compare", name: "零等于苹果", year: 1995, date: "1995-06-08",
      tag: "unit", lang: "php",
      site: "PHP / 松散比较 ==",
      cause: "字符串与数字比较时字符串被转成数字，非数字开头一律变 0",
      cost: "二十年里，无数个登录校验被绕过",
      note: "在 PHP 8 之前，0 == \"apple\" 是 true。这个形制出名到有了自己的名字：类型 juggling。2020 年 PHP 8 改了比较规则，它才被送进本馆。"
    },
    {
      id: "MySQL utf8", name: "假 UTF-8", year: 2003, date: "2003-03-01",
      tag: "charset", lang: "",
      site: "MySQL / utf8 字符集",
      cause: "名为 utf8 的字符集其实是 utf8mb3，最多三个字节，存不下四字节的 emoji",
      cost: "十年里，无数条昵称在插入时变成了问号",
      note: "它的名字叫 utf8，但它不是 UTF-8。要存一个 emoji，你得改用 utf8mb4——这个选择 2010 年就有了，而很多人是在 2018 年才发现。"
    }
  ];

  /* 世界厅按年代倒序陈列，同一年保持插入顺序 */
  M.WORLD.sort((a, b) => b.year - a.year);
})();
