// 每日英语单词追加脚本（2026-09-28 第 90 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-28';

const newWords = [
  {
    word: "alignment",
    phonetic: "/əˈlaɪnmənt/",
    meaning: "对齐，成一条直线；（目标、意见的）一致、共识",
    example: "The meeting was mainly to get alignment on next year's priorities.",
    example_cn: "这次会议主要是为了在明年的优先事项上达成一致。",
    tip: "a-（使）+ line（线）+ -ment（名词后缀）→ 让几样东西排到同一条线上，所以既是「对齐」，也是「意见一致」。职场万能句：get / be in alignment with（与……保持一致）、strategic alignment（战略对齐）。同族动词 align：align our goals（统一我们的目标）。重音在第二音节 -LIGN- /əˈlaɪn-/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "tenure",
    phonetic: "/ˈtenjə(r)/",
    meaning: "任期，在职年限；（大学的）终身教职；土地/房产的保有期",
    example: "She was promoted after only two years of tenure at the company.",
    example_cn: "她在公司任职仅两年后就升职了。",
    tip: "来自拉丁语 tenere（持有）→ 「持有职位的时间」。简历和 HR 场景高频：during my tenure as manager（在我担任经理期间）、a long tenure（资历深）。学术圈特指「终身教职」——拿到 tenure 意味着铁饭碗。美式读 /ˈtenjər/，英式常读 /ˈtenjə/，重音在第一音节 TEN-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "redundancy",
    phonetic: "/rɪˈdʌndənsi/",
    meaning: "冗余，多余；（英式）裁员，失业",
    example: "The company announced 200 redundancies in its European offices.",
    example_cn: "公司宣布在欧洲各办公室裁员 200 人。",
    tip: "redundant（多余的）+ -cy → 「多出来、用不上」。两个语境要分清：技术语境是「冗余」——data redundancy（数据冗余）、redundancy in a system（系统冗余，反而是好事，指备份容错）；英式职场语境是委婉的「裁员」——be made redundant（被裁）、voluntary redundancy（自愿离职）。美式英语说 layoff 更多。重音在第二音节 -DUN-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "blender",
    phonetic: "/ˈblendə(r)/",
    meaning: "搅拌机，破壁机",
    example: "I make a smoothie in the blender every morning.",
    example_cn: "我每天早上用搅拌机做一杯果昔。",
    tip: "blend（混合）+ -er（做某事的工具）→ 「混合器」，同构词还有 mixer、grinder。厨房三件套别混：blender（打果汁/奶昔的搅拌机）、mixer（打蛋/和面的搅拌器）、food processor（切碎食材的料理机）。搭配：put it in the blender（放进搅拌机）、blender jug（搅拌杯）。重音在前 BLEND-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "balcony",
    phonetic: "/ˈbælkəni/",
    meaning: "阳台，露台；（剧院的）楼座",
    example: "We had breakfast on the balcony while watching the sunrise.",
    example_cn: "我们在阳台上边吃早饭边看日出。",
    tip: "记忆点：balcony 和「balcony seat」是同一词——剧院里从上方俯视的楼座，跟家里探出去俯瞰街景的阳台画面完全一致，一次记住两个意思。拼写坑：-col- 里的 l 常被漏掉（× bacony）。搭配：a balcony view（阳台景观）、step out onto the balcony（走到阳台上）。重音在第一音节 BAL-。",
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
