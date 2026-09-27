// 每日英语单词追加脚本（2026-09-27 第 88 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-27';

const newWords = [
  {
    word: "caveat",
    phonetic: "/ˈkæviæt/",
    meaning: "警告，提醒；（附带）限制条件、前提",
    example: "One caveat: the discount only applies to online orders.",
    example_cn: "有一点需要提醒：这个折扣只适用于线上订单。",
    tip: "源自拉丁语，本义是「让他当心」。日常和职场都高频，用来给结论加个「但是」：with one caveat（有一个前提）、a caveat to that（对此要补充一点）。语气比 warning 轻，更像「善意的提醒／需要注意的限制条件」。重音在前 /ˈkæ-/，后半读 /-viæt/，别念成 /kəˈveɪt/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "escalation",
    phonetic: "/ˌeskəˈleɪʃn/",
    meaning: "升级，事态扩大；（问题的）上报、逐级处理",
    example: "If the client still isn't satisfied, we'll move to the next level of escalation.",
    example_cn: "如果客户仍不满意，我们就进入下一级上报流程。",
    tip: "动词 escalate（逐步上升、加剧）+ 名词后缀 -ion。两副面孔：一是「事态恶化升级」—— the escalation of the conflict（冲突升级）；二是职场流程「把问题往上级报」—— escalation path / escalation matrix（上报路径／上报矩阵），客服、运维天天用。同源的 escalator 是「自动扶梯」，都在往上走。重音在 -LA-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "headcount",
    phonetic: "/ˈhedkaʊnt/",
    meaning: "员工人数，人员编制；（招聘）名额",
    example: "We can't hire anyone new until we get headcount approved.",
    example_cn: "在人员编制获批之前，我们不能招新人。",
    tip: "head（头）+ count（计数）= 数人头 = 员工总数。职场里最常出现在预算和招聘语境：headcount freeze（冻结招聘编制）、additional headcount（新增编制）、a headcount of 200（200 人的规模）。和 staff number 同义，但 headcount 更口语，也更强调「编制额度」这层意思。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "toothbrush",
    phonetic: "/ˈtuːθbrʌʃ/",
    meaning: "牙刷",
    example: "Don't forget to pack your toothbrush before the trip.",
    example_cn: "出发旅行前别忘了带上牙刷。",
    tip: "tooth（牙）+ brush（刷子）合成，复数是 toothbrushes。搭配：electric toothbrush（电动牙刷）、a tube of toothpaste（一管牙膏）——注意牙刷是 brush、牙膏是 paste，别混用。同类合成词一串：hairbrush（发刷）、nail brush（指甲刷）。读作 TOOTH-brush，重音在前。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "sponge",
    phonetic: "/spʌndʒ/",
    meaning: "海绵，洗碗海绵；用海绵擦拭；（口语）白吃白拿的人",
    example: "Use a sponge to wipe down the kitchen counter.",
    example_cn: "用海绵把厨房台面擦一遍。",
    tip: "生活里就是「海绵、洗碗海绵」，搭配 a damp sponge（湿海绵）、sponge down（擦洗）。动词还表示「白蹭、揩油」：sponge off his parents（靠父母养着）。职场比喻义很好用—— sponge up knowledge（像海绵一样吸收知识）。注意 o 发 /ʌ/，读 /spʌndʒ/，和 sponge cake（海绵蛋糕）同源。",
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
