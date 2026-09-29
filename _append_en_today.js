// 每日英语单词追加脚本（2026-09-29 第 91 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-29';

const newWords = [
  {
    word: "attrition",
    phonetic: "/əˈtrɪʃn/",
    meaning: "（人员的）自然流失、损耗；逐渐削弱",
    example: "We lost three engineers last quarter, but most of it was natural attrition.",
    example_cn: "上季度我们走了三位工程师，但大部分属于自然流失。",
    tip: "记法：at-（加强）+ trit（摩擦，同 trib- 一族，见 trite「磨旧的」）+ -ion → 「被磨掉的部分」。HR 高频词：attrition rate（流失率）、natural attrition（自然流失，即不主动裁员、靠人自己走）、attrition war / war of attrition（消耗战）。关键区分：attrition 是「慢慢流失」，turnover 强调「进出流动的总量」。重音在第二音节 -TRI- /əˈtrɪʃn/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "delegation",
    phonetic: "/ˌdelɪˈɡeɪʃn/",
    meaning: "授权，委派（把任务交给下属）；代表团",
    example: "Good managers know that delegation isn't about dumping work on others.",
    example_cn: "好的管理者明白，授权不是把活儿甩给别人。",
    tip: "de-（向下/离开）+ leg（法律、委托，同 legal）+ -ation → 「按规矩把事情交出去」。两个意思靠场景分：管理学里是「授权」（effective delegation 有效授权），外交商务里是「代表团」（a trade delegation 贸易代表团）。动词 delegate 读音会变：名词/动词 /ˈdelɪɡeɪt/ 重音在前，但 delegation 重音跑到第三音节 -GA-。别和 relegation（降级）混。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "calibration",
    phonetic: "/ˌkælɪˈbreɪʃn/",
    meaning: "校准（仪器）；(标准、预期的）对齐、调整",
    example: "The scale needs calibration before we use it for the experiment.",
    example_cn: "这个天平在我们做实验前需要校准。",
    tip: "caliber（口径、水准）→ calibration，本义是「量口径」，所以核心画面是「拿标准去对表」。两种用法：硬件上 calibration 是仪器校准（a calibration check）；抽象上指「预期校准」——calibrate expectations（调整预期）、a calibration issue（标准没对齐）。职场常用被动语态：We need to recalibrate the timeline（得重新调整时间表）。重音在第三音节 -BRA-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "razor",
    phonetic: "/ˈreɪzə(r)/",
    meaning: "剃须刀，刮胡刀；（razor-sharp）极锋利的",
    example: "He forgot to pack his razor, so he had to buy one at the airport.",
    example_cn: "他忘带剃须刀了，只好在机场买了一把。",
    tip: "raze（铲平、刮掉）+ -or（工具）→ 「刮东西的工具」，同构词还有 razor blade（刀片）、electric razor / shaver（电动剃须刀）。地道表达：razor-sharp（像刀片一样锋利，形容逻辑、言辞或感觉）——razor-sharp wit（极机敏的机智）、a razor-thin margin（毫厘之差，选举/比分高频）。经典逻辑工具 Occam's razor（奥卡姆剃刀）。重音在前 RA-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "mop",
    phonetic: "/mɒp/",
    meaning: "拖把；用拖把拖（地）；(mop up) 清理、扫尾",
    example: "I'll sweep the floor first, then mop it while you do the dishes.",
    example_cn: "我先扫地，然后你去洗碗的时候我来拖地。",
    tip: "短词好记：mop 既是名词「拖把」也是动词「拖地」，一词两用（mop the floor）。固定搭配 mop up 有两层意思：家务上是「把地拖干净」，职场/军事上是「收尾、清扫残局」——mop up the remaining tasks（把剩下的活儿收个尾）。别混 broom（扫把，扫干垃圾）和 mop（拖把，擦湿污渍），这是家务英语里最常见的错配。",
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
