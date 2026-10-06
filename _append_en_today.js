// 每日英语单词追加脚本（2026-10-06 第 97 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-06';

const newWords = [
  {
    word: "curtain",
    phonetic: "/ˈkɜːrtn/",
    meaning: "窗帘，帷幕；（舞台）幕布；遮蔽物",
    example: "Please draw the curtains; the sunlight is too bright.",
    example_cn: "请把窗帘拉上，阳光太刺眼了。",
    tip: "生活中最常用的是「窗帘」：draw / open / close the curtains（拉上 / 拉开窗帘）、shower curtain 浴帘、blackout curtain 遮光帘、curtain rod 窗帘杆。引申义很地道：behind the curtain 在幕后、bring down the curtain on sth 结束某事、curtain call 谢幕（演出结束后演员返场）。作动词：curtain off 用帘子隔开。拼写小坑：curtain 与 certain 只差一个字母，但读音完全不同——curtain 读 /ˈkɜːrtn/，-tain 弱化成 /tn/，重音在首音节 CUR-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "hanger",
    phonetic: "/ˈhæŋər/",
    meaning: "衣架，挂衣钩；挂钩，挂物架",
    example: "There are no hangers left in the closet, so my shirts are all piled up.",
    example_cn: "衣柜里没衣架了，我的衬衫全堆在一起。",
    tip: "hanger = hang（悬挂）+ -er（做某事的工具），字面就是「用来挂东西的物件」。生活中：coat hanger 衣架、wire / plastic / wooden hanger 铁质 / 塑料 / 木质衣架、clothes hanger 衣架。易混词：cliffhanger 悬念（字面「挂在悬崖上的人」，形容吊人胃口的剧情）、hanger-on 攀附者、缠着不走的人。特别注意同音异形词 hangar——那是「飞机库」，读音一样 /ˈhæŋər/，只差一个字母，别写混。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "outsourcing",
    phonetic: "/ˈaʊtsɔːrsɪŋ/",
    meaning: "外包（把业务或工序交给外部公司完成）",
    example: "The company cut costs by outsourcing its customer service to a third party.",
    example_cn: "公司把客服外包给第三方，以此削减成本。",
    tip: "out（向外）+ source（来源）+ -ing，字面「从外部找来源」，指把原本自己做的活儿交给外部供应商。搭配：outsource sth to sb（把某事外包给某人）、outsourcing contract 外包合同、BPO = business process outsourcing（业务流程外包）。反义方向要会区分：insourcing 内包（把外部工作收回自己做）、in-house 内部自行完成的。记忆点：out 就是「往外给」，in-house 就是「留在家里做」。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "credential",
    phonetic: "/krəˈdenʃl/",
    meaning: "资格证书，资历；证件（常用复数 credentials）",
    example: "Her credentials include a master's degree and ten years of industry experience.",
    example_cn: "她的资历包括一个硕士学位和十年行业经验。",
    tip: "来自 cred（相信，同 credit 信用、credible 可信的），核心是「能让人相信你能力的东西」。求职场景几乎都用复数：check sb's credentials 核实某人的资历、academic credentials 学历背景、present one's credentials 出示证件 / 证明实力。三词辨析：credential 资历 / 资格证明、certificate 证书（具体那张纸）、qualification 资格（偏条件、门槛）。重音在中间音节 -DEN-，读 /krəˈdenʃl/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "liaison",
    phonetic: "/liˈeɪzɑːn/",
    meaning: "联络人，联系人；联络，沟通（工作）",
    example: "She acts as the liaison between the design team and the factory.",
    example_cn: "她担任设计团队与工厂之间的联络人。",
    tip: "源自法语，拼写和读音坑最多：中间是 -ai-，结尾 -son 不读「森」而读 /zɑːn/，整体读 /liˈeɪzɑːn/（美式也常读 /ˈliːəzɑːn/）。职场高频：liaison officer 联络官、act as a liaison between A and B（充当 A 与 B 之间的联络人）、maintain close liaison with sb（与某人保持密切联系）。记忆点：把 liaison 想成「拉线人」——专门在两边拉线、传话、对接的那个人。",
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
