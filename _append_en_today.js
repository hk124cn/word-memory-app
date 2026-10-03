// 每日英语单词追加脚本（2026-10-04 第 94 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-04';

const newWords = [
  {
    word: "merit",
    phonetic: "/ˈmerɪt/",
    meaning: "优点，长处，价值；功绩；值得，应得",
    example: "We should judge the proposal on its own merits, not on who submitted it.",
    example_cn: "我们应当就提案本身的价值来评判它，而不是看是谁提交的。",
    tip: "merit 本义是「值得、应得」（同 meritocracy 精英治国），引申为「值得称赞之处」即「优点」。职场高频搭配：on its (own) merits（就其本身价值而言）、merit pay / merit raise（绩效工资/绩效加薪）、merit-based（以能力/业绩为依据的，如 merit-based promotion 择优晋升）。别和 virtue 混：merit 偏「值得肯定的地方」（可量化、可评判），virtue 偏「品德、美德」（道德层面）。作动词时很正式：The case merits further attention.（此事值得进一步关注。）重音在首音节 MER-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "liability",
    phonetic: "/ˌlaɪəˈbɪləti/",
    meaning: "责任，义务（法律上的）；负债，债务；累赘，麻烦的人或事",
    example: "The company accepted full liability for the damage caused by the leak.",
    example_cn: "公司对泄漏造成的损害承担全部责任。",
    tip: "li（捆绑，同 bind、ligature）+ -ability → 「被绑住的义务」，所以是「责任」。三层意思要分清：① 法律责任（legal liability、limited liability company 有限责任公司）；② 财务上的「负债」（与 asset 资产相对，balance sheet 资产负债表的右栏）；③ 口语里指「拖后腿的人或事」：He's a liability to the team.（他是团队的累赘。）形容词 liable 也常用：be liable for（对…负责）、be liable to do（容易/倾向于…）。复数 liabilities，注意 y 变 ies。重音在第三音节 -BIL-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "endorsement",
    phonetic: "/ɪnˈdɔːrsmənt/",
    meaning: "认可，支持，背书；（名人的）代言，推荐；（文件上的）签名背书",
    example: "The new policy won the endorsement of several industry leaders.",
    example_cn: "这项新政策赢得了多位行业领袖的支持。",
    tip: "en（使…进入）+ dors（背部，同 dorsal 背部的）+ -ment → 原指「在票据背面签字」，引申为「站台背书、公开支持」。三个场景记住它：① 职场/政界——win/earn an endorsement（赢得支持）、official endorsement（官方认可）；② 商业——celebrity endorsement（明星代言）、product endorsement（产品代言）；③ 金融——endorse a check（在支票背面签名）。动词 endorse 更常见：I fully endorse this plan.（我完全支持这个计划。）重音在第二音节 -DORSE-，读 /ɪnˈdɔːrsmənt/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "scarf",
    phonetic: "/skɑːrf/",
    meaning: "围巾，披巾，头巾；围（围巾等）",
    example: "She wrapped a wool scarf around her neck before going out in the cold.",
    example_cn: "出门前，她在冷天里把一条羊毛围巾围在脖子上。",
    tip: "冬天穿戴一组记牢：scarf 围巾（长条形，绕脖子）、shawl 披肩（大而宽，搭肩上）、gloves 手套、beanie 毛线帽、mittens 连指手套。动词用法很形象：scarf down 是口语「狼吞虎咽地吃」（She scarfed down her lunch.）——像围巾一样把食物一卷而空。复数特殊：scarves（f 变 ves，同 leaf→leaves）。发音注意：ar 读 /ɑːr/，是 /skɑːrf/ 不是 /skærf/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "broom",
    phonetic: "/bruːm/",
    meaning: "扫帚；金雀花（一种黄色花的灌木）",
    example: "He grabbed a broom and swept the leaves off the porch.",
    example_cn: "他抓起一把扫帚，把门廊上的落叶扫掉。",
    tip: "打扫工具一组记牢：broom 扫帚（扫地）、mop 拖把（拖地）、dustpan 簸箕（配 broom 用，a broom and dustpan 一套扫具）、vacuum cleaner 吸尘器、brush 刷子。固定搭配：a new broom sweeps clean（新官上任三把火，英谚，来自「新扫帚扫得干净」）。动词就是「扫」：broom the floor。注意 -oo 是长音 /uː/，读 /bruːm/，与 room 同韵。别和 bloom（开花）混——只差一个字母。",
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
