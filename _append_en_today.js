// 每日英语单词追加脚本（2026-10-02 第 93 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-02';

const newWords = [
  {
    word: "supervision",
    phonetic: "/ˌsuːpərˈvɪʒn/",
    meaning: "监督，管理，指导；（对工作、人员的）监管",
    example: "New staff work under close supervision for the first three months.",
    example_cn: "新员工头三个月要在密切监督下工作。",
    tip: "super（在上）+ vis（看，同 vision、visible）+ -ion → 「在上面看着」，画面感极强：站在高处盯着你干活。职场三兄弟要分清：supervision 监督（有人看着、把关）、management 管理（管人管事管资源，层级更高）、leadership 领导（带方向、给动力）。高频搭配：under supervision（在监督下）、close supervision（严密监督）、supervision fee（监理费）。重音在第三音节 -VI-，读 /ˌsuːpərˈvɪʒn/，-sion 是 /ʒn/ 不是 /ʃn/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "subsidy",
    phonetic: "/ˈsʌbsədi/",
    meaning: "补贴，补助金（政府或机构给的资助）",
    example: "The government offers a subsidy to farmers who switch to solar power.",
    example_cn: "政府给改用太阳能的农民提供补贴。",
    tip: "sub（下面、辅助）+ sid（坐，同 sit、reside）+ -y → 「从底下托你一把的钱」。这组「给钱」的词别混：subsidy 补贴（政府给产业/群体的，不用还）、allowance 津贴（按规则定期发给个人，如住房津贴）、bonus 奖金（额外奖励）、pension 养老金。新闻高频：government subsidy（政府补贴）、housing subsidy（住房补贴）、cut/phase out subsidies（削减/逐步取消补贴）。复数 subsidies，注意 y 变 ies。重音在首音节 SUB-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "acquisition",
    phonetic: "/ˌækwɪˈzɪʃn/",
    meaning: "收购，并购；获得，取得；收购物",
    example: "The acquisition of the small startup gave the company access to new technology.",
    example_cn: "收购这家小初创公司让该公司获得了新技术。",
    tip: "ac（去、朝向）+ quisit（寻求、得到，同 acquire、require、question 的 quis-）+ -ion → 「弄到手」这个动作，商业上就是「收购」。商务必分清：acquisition 收购（买下整个公司或控股权）、merger 合并（两家并成一家，常写作 M&A = mergers and acquisitions）、takeover 接管（可善意也可敌意，语气更硬）。另一层意思「习得」也很常用：language acquisition（语言习得）。重音在第三音节 -ZI-，qu 读 /kw/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "shampoo",
    phonetic: "/ʃæmˈpuː/",
    meaning: "洗发水，洗发剂；洗头",
    example: "I ran out of shampoo, so I bought a new bottle at the convenience store.",
    example_cn: "我的洗发水用完了，就在便利店买了一瓶新的。",
    tip: "来自印地语 chāmpo（按摩、揉搓），所以拼写是双 o 结尾。浴室四件套记一组：shampoo 洗发水、conditioner 护发素、body wash 沐浴露、soap 香皂。既可作名词（a bottle of shampoo 一瓶洗发水，不可数）、也可作动词（shampoo my hair 洗头）。重音在第二音节 -POO-，读 /ʃæmˈpuː/；注意 -oo 是长音 /uː/，别读成 /ʊ/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "bandage",
    phonetic: "/ˈbændɪdʒ/",
    meaning: "绷带，纱布；包扎",
    example: "She put a bandage on the cut to stop the bleeding.",
    example_cn: "她在伤口上贴了绷带止血。",
    tip: "band（带子、箍）+ -age → 「缠上去的带子」。急救词按用途排一排：bandage 绷带（包扎伤口用，可指纱布卷或创可贴式）、plaster 创可贴（英式说法；美式多说 Band-Aid）、gauze 纱布、sling 悬臂吊带（吊胳膊用）。动词就是「包扎」：bandage the wound（包扎伤口）、bandage up his knee（把他的膝盖包起来）。重音在首音节 BAN-，-age 弱读成 /ɪdʒ/。",
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
