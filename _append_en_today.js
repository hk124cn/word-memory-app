// 每日英语单词追加脚本（2026-10-05 第 96 期 · 当天第二批）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-05';

const newWords = [
  {
    word: "collateral",
    phonetic: "/kəˈlætərəl/",
    meaning: "抵押品，担保物（借款时提供的抵押资产）",
    example: "He used his house as collateral to secure the business loan.",
    example_cn: "他用房子作抵押，为这笔生意贷款做了担保。",
    tip: "collateral = col（共同）+ later（侧面）+ -al，字面「并排在旁边的（担保）」，指借钱时押在旁边的资产——还不上钱，债主就处置它。最常和 loan / mortgage 搭配：put up sth as collateral（拿某物作抵押）、collateral for a loan（贷款抵押物）。引申义：collateral damage 附带损害（军事用语，指误伤的平民或建筑，新闻高频）。区分一组：collateral（抵押品）、guarantee（担保/保证）、mortgage（按揭，特指房产抵押贷款）、pledge（质押/承诺）。重音在第二音节 -LAT-，读 /kəˈlætərəl/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "severance",
    phonetic: "/ˈsevərəns/",
    meaning: "遣散费，离职补偿金；切断，分离",
    example: "She received six months' severance after being laid off.",
    example_cn: "被裁员后，她拿到了六个月的遣散费。",
    tip: "severance 来自 sever（切断、割断），所以核心是「断开」。职场里几乎专指 severance pay / severance package——公司裁员时给员工的补偿金（通常按工龄算，如 N+1）。搭配：a generous severance package 优厚的离职补偿、severance agreement 离职协议、pay severance 支付遣散费。别和 severance tax（美国部分州对开采自然资源征的税）搞混。同源词：sever（切断，如 sever ties with 与……断绝关系）。重音在首音节 SEV-，读 /ˈsevərəns/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "pillow",
    phonetic: "/ˈpɪloʊ/",
    meaning: "枕头；把……枕在……上",
    example: "I need a softer pillow; this one is too firm for my neck.",
    example_cn: "我需要个软一点的枕头，这个对我脖子来说太硬了。",
    tip: "床上用品一起记：pillow 枕头、pillowcase / pillow slip 枕套、duvet / quilt 被子、sheet 床单、mattress 床垫、blanket 毛毯、bedspread 床罩。常用搭配：pillow fight 枕头大战（派对/孩子游戏）、pillow talk 枕边话（私密闲聊，含感情色彩）、take a pillow 带个枕头。动词用法也很形象：pillow one's head on sth（把头枕在某物上）。读音注意：llow 读 /loʊ/，重音在首音节 PIL-，读 /ˈpɪloʊ/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "towel",
    phonetic: "/ˈtaʊəl/",
    meaning: "毛巾，手巾；用毛巾擦干",
    example: "Grab a towel and dry your hair before you go out.",
    example_cn: "出门前拿条毛巾把头发擦干。",
    tip: "浴室场景高频词，按用途分：bath towel 浴巾、hand towel 擦手巾、face towel 面巾、beach towel 沙滩巾、paper towel 纸巾（厨房用）。常用搭配：throw in the towel 认输、放弃（源自拳击扔毛巾投降，超地道）、towel off 用毛巾擦干、towel rack 毛巾架。动词直接用：towel yourself dry（把自己擦干）。拼写小坑：英式有时拼 towelling / towelled（双 l），美式 toweled（单 l）。读音 /ˈtaʊəl/，ow 读 /aʊ/，像「涛」，重音在首音节。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "blanket",
    phonetic: "/ˈblæŋkɪt/",
    meaning: "毯子，毛毯；覆盖层；（作定语）总括的，一揽子的",
    example: "It's freezing tonight, so I grabbed an extra blanket.",
    example_cn: "今晚冷得厉害，我多拿了一条毯子。",
    tip: "本义是毯子（electric blanket 电热毯、wool blanket 羊毛毯、wet blanket 扫兴的人——字面「湿毯子」，盖灭火苗，很形象）。作形容词时非常实用：blanket ban 全面禁令、blanket coverage 全覆盖、blanket rule 一刀切的规定、blanket insurance 总括保险——都表示「覆盖一切的」。作动词：Snow blanketed the city.（大雪覆盖了整座城市。）记忆点：blanket 来自古法语「白色织物」，与 blank（空白、白色）同源，联想「一片白茫茫盖下来」。重音在首音节 BLAN-，读 /ˈblæŋkɪt/。",
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
