// 每日英语单词追加脚本（2026-10-11 第 101 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-11';

const newWords = [
  {
    word: "franchise",
    phonetic: "/ˈfræntʃaɪz/",
    meaning: "特许经营权；加盟店，连锁店；授予……特许经营权",
    example: "He bought a fast-food franchise and opened three stores in his city.",
    example_cn: "他买下一个快餐连锁品牌的特许经营权，在本市开了三家店。",
    tip: "商业高频词，指「借别人的品牌和模式开店、按规矩交钱」的那套授权。词根 franc- 与「自由」同源（同 frank 坦白的），本义是「被给予的特权」。常见搭配：a franchise owner 加盟商、franchise fee 加盟费、fast-food franchise 快餐连锁店。也可作动词：The chain franchises its brand worldwide.（这个连锁把品牌授权到全球。）区分记忆：chain 指「连锁店」这个整体，franchise 强调「加盟／授权」这层法律关系。重音在首音节 FRAN-，词尾 -chise 读 /tʃaɪz/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "orchestrate",
    phonetic: "/ˈɔːrkɪstreɪt/",
    meaning: "精心安排，统筹策划；为管弦乐队谱写（改编）",
    example: "She orchestrated the entire product launch, from design to marketing.",
    example_cn: "她统筹了整个产品发布，从设计到市场推广一手安排。",
    tip: "本义是「为管弦乐队（orchestra）编曲」，引申为「像指挥一样把各方协调起来」——职场里形容「操盘、统筹」的高级动词，比 organize 更有画面感。常见搭配：orchestrate a campaign 统筹一场活动、orchestrate a merger 操盘一桩并购。名词 orchestration 意为统筹安排。注意重音在首音节 OR-，-chestrate 读 /kɪstreɪt/（ch 发 /k/），别读成「奥克斯」。近义辨析：orchestrate 强调多方协调，arrange 偏安排次序，coordinate 偏对接配合。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "custodian",
    phonetic: "/kʌˈstoʊdiən/",
    meaning: "保管人，管理人；（学校、大楼的）勤杂工，保洁员",
    example: "The bank acts as custodian of the family's assets.",
    example_cn: "这家银行担任该家族资产的托管人。",
    tip: "词根 custodi-（看守、保管，同 custody 监护／保管），指「负责看管某物或某地的人」。金融面：custodian bank 托管银行（替你保管证券的机构）、asset custodian 资产托管人。日常面（美式英语高频）：学校的 custodian 就是「校工／清洁管理员」，比 janitor 更正式也更礼貌，很多学校官方职称就用它。同根名词 custody 有「监护权、拘留」两义，如 child custody 子女监护权。重音在第二音节 -TO-，读 /kʌˈstoʊdiən/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "beanie",
    phonetic: "/ˈbiːni/",
    meaning: "毛线帽，无檐便帽",
    example: "Wear a beanie — it's freezing outside.",
    example_cn: "戴顶毛线帽吧，外面冻得厉害。",
    tip: "指那种贴头、没有帽檐、常见带毛球的针织帽，秋冬必备词。同义说法：knit cap、woolly hat（英式）。常见搭配：a woolen beanie 羊毛毛线帽、pull on a beanie 套上毛线帽。别混淆：cap 是有帽檐的棒球帽，hat 是帽子统称，beanie 专指无檐针织帽。读音 BEE-nee，重音在前，别读成「比尼」。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "lotion",
    phonetic: "/ˈloʊʃn/",
    meaning: "乳液，润肤露；洗剂，护肤液",
    example: "Apply some lotion to your hands after washing them.",
    example_cn: "洗完手后抹点护手霜。",
    tip: "词根 lot-（洗，同 lavatory 盥洗室、lather 泡沫），本义是「用来洗或涂抹的液体」。生活超高频：body lotion 身体乳、hand lotion 护手霜、sunscreen lotion 防晒乳、calamine lotion 炉甘石洗剂（止痒）。搭配动词用 apply / put on / rub in：apply lotion 涂抹乳液。注意与 cream 区分：lotion 质地更稀、偏水乳；cream 更稠、偏霜膏。读音 /ˈloʊʃn/，-tion 读 /ʃn/，重音在前 LO-。",
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
