// 每日英语单词追加脚本（2026-09-30 第 92 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-30';

const newWords = [
  {
    word: "throughput",
    phonetic: "/ˈθruːpʊt/",
    meaning: "吞吐量，处理量；（生产、系统的）产出效率",
    example: "Upgrading the server doubled our throughput without adding any staff.",
    example_cn: "升级服务器后，我们的处理量翻了一倍，却没增加人手。",
    tip: "through（穿过）+ put（放）→ 「从这头放进去、那头出来的量」，核心画面是「单位时间能过多少货、多少数据」。技术上是系统吞吐量（network throughput 网络吞吐量、high-throughput 高吞吐），工厂和团队里是产能——boost throughput（提升产能）。关键区分：output 是「总产出」，不看时间；throughput 是「按时间算的流速」。重音在前 THROUGH-，th 是清音 /θ/，别读成 /t/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "downtime",
    phonetic: "/ˈdaʊntaɪm/",
    meaning: "（机器、系统的）停机时间，停工期；休息时间",
    example: "We scheduled the update at midnight to keep downtime under ten minutes.",
    example_cn: "我们把更新安排在半夜，好把停机时间控制在十分钟以内。",
    tip: "down（停摆）+ time（时间）→ 「停着不动的那段时间」。IT 运维高频：planned downtime（计划内停机）、unplanned downtime（意外停机）；反义词 uptime（正常运行时间），两者合起来算 availability（可用率）。口语里还能指「休息时间」——I need some downtime（我得歇会儿）。重音在前 DOWN-，别和 shutdown（关机/停工这个动作）混。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "arbitration",
    phonetic: "/ˌɑːbɪˈtreɪʃn/",
    meaning: "仲裁，公断（请第三方居中裁决争议）",
    example: "The two companies settled the dispute through arbitration instead of going to court.",
    example_cn: "两家公司通过仲裁而非上法庭解决了纠纷。",
    tip: "arbit（判断，同 arbitrary「随意的」、arbiter「裁决者」）+ -ation → 「由中立方来断」。三个近义概念要分清：arbitration 仲裁（第三方裁决，结果有约束力）、mediation 调解（第三方撮合，双方自愿）、negotiation 谈判（只有当事双方）。商务合同里常见 arbitration clause（仲裁条款）。重音在第三音节 -TRA- /ˌɑːbɪˈtreɪʃn/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "ladle",
    phonetic: "/ˈleɪdl/",
    meaning: "长柄汤勺，汤瓢；用勺舀",
    example: "She ladled the soup into five bowls and set them on the table.",
    example_cn: "她用汤勺把汤舀进五个碗里，端上了桌。",
    tip: "联想 lade（装载）→ 「用来装东西的勺」。厨房里这几把勺别搞混：ladle 是深斗长柄的汤勺，spoon 是吃饭用的普通勺，skimmer 是漏勺，whisk 是打蛋器。动词用法就是「舀」——ladle out the soup（舀汤），引申义 ladle out praise（大把地夸人）。-dle 结尾读 /dl/，只算一个音节，别读成「雷斗」。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "hedge",
    phonetic: "/hedʒ/",
    meaning: "树篱，灌木篱笆；防备、对冲（风险）；闪烁其词",
    example: "They planted a hedge along the fence so the neighbors couldn't see into the yard.",
    example_cn: "他们沿着围栏种了一排树篱，这样邻居就看不到院子里了。",
    tip: "一词三义，靠场景分：园艺上是「树篱」（trim the hedge 修剪树篱）；金融上是「对冲」（hedge against inflation 对冲通胀、hedge fund 对冲基金）；说话上是「留余地、不把话说死」（hedge your bets 两边下注、别孤注一掷）。三个意思共用同一个画面——给自己围一道「挡一挡」的屏障。h 要发音 /h/，整词一个音节。",
    date_added: DATE,
    lang: "en"
  }
];

let src = fs.readFileSync(FILE, 'utf8');
const lines = src.split('\n');

// 定位 EMBEDDED_EN 数组结尾的 '];'（首个独立成行的 '];'）
let endIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '];') { endIdx = i; break; }
}
if (endIdx < 0) { console.error('ERROR: 未找到 EMBEDDED_EN 结束行'); process.exit(1); }

// 去重校验
const enStart = lines.findIndex(l => l.includes('EMBEDDED_EN'));
const arrText = lines.slice(enStart, endIdx + 1).join('\n');
const sIdx = arrText.indexOf('[');
const existing = eval(arrText.slice(sIdx));
const existingWords = existing.map(x => x.word);
const dup = newWords.map(w => w.word).filter(w => existingWords.includes(w));
if (dup.length) { console.error('ERROR: 重复词 ->', dup.join(', ')); process.exit(1); }

// 上一行补逗号
const prevLine = lines[endIdx - 1];
if (!/,\s*$/.test(prevLine)) lines[endIdx - 1] = prevLine + ',';

// 插入新行（最后一行不加逗号，与既有风格一致）
const newLines = newWords.map((w, k) => '  ' + JSON.stringify(w) + (k < newWords.length - 1 ? ',' : ''));
lines.splice(endIdx, 0, ...newLines);

fs.writeFileSync(FILE, lines.join('\n'), 'utf8');
console.log('OK: 已追加', newWords.length, '词，EN 词数', existingWords.length, '->', existingWords.length + newWords.length);
