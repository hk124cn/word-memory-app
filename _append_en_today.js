// 每日英语单词追加脚本（2026-10-07 第 98 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-07';

const newWords = [
  {
    word: "governance",
    phonetic: "/ˈɡʌvərnəns/",
    meaning: "治理，管理；统治方式，管理制度",
    example: "Good corporate governance builds long-term trust with investors.",
    example_cn: "良好的公司治理能为企业建立与投资者的长期信任。",
    tip: "govern（治理）+ -ance（名词后缀），指「治理这件事 / 这套机制」，强调制度和过程，而不是某个具体的人或机构。职场高频搭配：corporate governance 公司治理、data governance 数据治理、IT governance IT 治理、good governance 善治。辨析要清楚：government 是「政府」这个机构，governance 是「怎么管」这套规则和流程；一家公司没有 government，但一定有 governance。重音在首音节 GOV-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "ledger",
    phonetic: "/ˈledʒər/",
    meaning: "账簿，总账；分类账；（财务）台账",
    example: "Every transaction must be recorded in the general ledger.",
    example_cn: "每一笔交易都必须记入总账。",
    tip: "源自中古英语 leggen「放置」，原义是「放在固定位置、供长期查阅的账本」，所以它比 account 更强调「一本本存着的记录」。财务常用：general ledger 总账、subsidiary ledger 明细账、ledger balance 账面余额、keep a ledger 记账。引申义很生动：the ledger of history 历史的账本（记录功过）。易混词：legend 传奇、leverage 杠杆——拼写像但意思差得远，注意 -dger 结尾读 /dʒər/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "uptime",
    phonetic: "/ˈʌptaɪm/",
    meaning: "（系统的）正常运行时间，可用时间；开机时长",
    example: "The server's uptime last month was 99.99%.",
    example_cn: "上个月这台服务器的正常运行率是 99.99%。",
    tip: "up（运转中）+ time（时间），字面「保持 up 状态的时间」。IT / 运维高频：system uptime 系统可用时间、uptime guarantee 可用性承诺、check the uptime 查看运行时长、SLA 里的 99.9% uptime 是标准指标。反义词是 downtime（宕机时间，9-30 期已收录），两者成对记忆最省力：up 就是「活着在跑」，down 就是「挂了」。重音在首音节 UP-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "bucket",
    phonetic: "/ˈbʌkɪt/",
    meaning: "桶，提桶；一桶的量；（计划中的）一篮子、一组",
    example: "He filled a bucket with water and mopped the floor.",
    example_cn: "他接了一桶水，把地板拖了一遍。",
    tip: "生活里最直白的就是「桶」：a bucket of water 一桶水、ice bucket 冰桶、bucket list 遗愿清单（来自 kick the bucket「翘辫子」，所以「死之前要做的事」）。引申义很常用：a bucket of 一大堆（a bucket of praise 一堆夸奖）、bucket 在商业里指「分类归集的池子」（bucket pricing 分档定价、按桶分组的预算）。日常搭配：bucket and spade 小孩的桶和小铲。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "cutlery",
    phonetic: "/ˈkʌtləri/",
    meaning: "餐具（刀、叉、匙等）；刀具",
    example: "Could you set the cutlery on the table before dinner?",
    example_cn: "晚饭前你能把餐具摆到桌上吗？",
    tip: "来自古法语 coutel「小刀」（同源词 cutlass 短剑），本义就是「刀类」，后来扩展成整套刀叉匙。英式英语日常就说 cutlery，美式更常说 silverware 或 flatware；a set of cutlery 一套餐具、cutlery drawer 餐具抽屉、plastic cutlery 一次性塑料餐具。注意它是**不可数**集合名词，不说 a cutlery / cutleries，要说 a piece of cutlery 或 a cutlery set。",
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
