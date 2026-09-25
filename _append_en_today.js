// 每日英语单词追加脚本（2026-09-25 第 87 期，当天第二次触发）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-25';

const newWords = [
  {
    word: "cadence",
    phonetic: "/ˈkeɪdns/",
    meaning: "节奏，节拍；（工作的）韵律、频率",
    example: "Our team meets on a weekly cadence to review progress.",
    example_cn: "我们团队按每周一次的节奏开会复盘进展。",
    tip: "本义是音乐里乐句收尾的「终止式」，也指行进的步调；商务语境借用成「固定的节奏、频率」—— the cadence of meetings（例会频率）、a quarterly cadence（季度节奏）。比 frequency 更强调「有规律的起落」。词根 cad- 表「落下」，同源的还有 cascade（瀑布）、decay（衰败）。重音在前 /ˈkeɪ-/，-dence 弱读。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "bandwidth",
    phonetic: "/ˈbændwɪdθ/",
    meaning: "带宽；（口语）精力、时间、承受能力",
    example: "I don't have the bandwidth to take on another project this week.",
    example_cn: "我这周没有多余的精力再接一个项目了。",
    tip: "本义是通信、网络的「频带宽度」，指单位时间能传多少数据。职场口语里引申为「可支配的精力、时间」，极其高频：I have no bandwidth for this（我实在腾不出手）。和 capacity 近义，但 bandwidth 更口语、更强调「当下手头的余量」。由 band（带）+ width（宽度）合成，读作 BAND-width，重音在前。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "retention",
    phonetic: "/rɪˈtenʃn/",
    meaning: "保留，保持；（员工、客户的）留存率",
    example: "The new benefits package improved employee retention.",
    example_cn: "新的福利方案提高了员工留存率。",
    tip: "动词 retain（保留）+ 名词后缀 -tion。商业里两个王牌搭配：customer retention（客户留存）、employee retention（员工留存），常和 turnover（人员流失率）成对出现——retention 高就是留得住人。学习场景也用 retention rate（记忆保持率）。重音在中间 /-ˈten-/，别念成 RE-tention。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "apron",
    phonetic: "/ˈeɪprən/",
    meaning: "围裙；（机场的）停机坪",
    example: "She put on an apron before cooking dinner.",
    example_cn: "做晚饭前她系上了围裙。",
    tip: "厨房里系在身前的那块围裙，也指木工用的围裙式工作服。机场里 apron 指飞机停靠、加油的「停机坪」——形状像围裙铺在航站楼前。拼写只有一个 p，读 /ˈeɪprən/；词首那个 r 其实是旧拼写 napron 被误拆分来的（a napron → an apron）。搭配：tie an apron、wear an apron。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "dishwasher",
    phonetic: "/ˈdɪʃwɔːʃər/",
    meaning: "洗碗机；洗碗的人",
    example: "Just put the plates in the dishwasher instead of washing them by hand.",
    example_cn: "盘子直接放进洗碗机就行，不用手洗。",
    tip: "由 dish（盘子）+ washer（洗涤器）合成，字面就是「洗碗的东西」，也可指餐馆里「洗盘子的人」。口语里常省略说 the dishwasher，搭配 load the dishwasher（往洗碗机里装碗）。同类家电合成词一串：washing machine（洗衣机）、dryer（烘干机）、fridge（冰箱）。重音在前 /ˈdɪʃ-/。",
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
