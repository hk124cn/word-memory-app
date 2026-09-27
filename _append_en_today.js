// 每日英语单词追加脚本（2026-09-27 第 89 期，当天第二批）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-27';

const newWords = [
  {
    word: "pipeline",
    phonetic: "/ˈpaɪplaɪn/",
    meaning: "管道，输油管；（工作/项目的）流程、在推进中的储备；（销售）商机漏斗",
    example: "We have three new products in the pipeline for next quarter.",
    example_cn: "我们下个季度有三个新产品在推进中。",
    tip: "pipe（管）+ line（线）→ 一根接一根的管子，画面是「东西排着队往前走」，所以引申成一串待办的事。职场两个高频用法：in the pipeline（在筹备/推进中）、sales pipeline（销售漏斗/商机池）。技术圈还有 CI/CD pipeline（持续集成流水线）。重音在前 /ˈpaɪp-/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "overhead",
    phonetic: "/ˈəʊvəhed/",
    meaning: "经常开支，管理费用（房租、水电、行政等固定成本）；头顶上的",
    example: "Working from home helped us cut our overhead by 30 percent.",
    example_cn: "居家办公帮我们把固定开支削减了 30%。",
    tip: "over（在上）+ head（头）→ 悬在头顶上的东西，就是那些「躲不开的固定花销」。名词常作不可数：overhead costs（间接成本）、cut overhead（削减开支），与直接成本 direct cost 相对。作形容词时重音后移读 /ˌəʊvəˈhed/：an overhead light（吊灯）。靠重音区分词性。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "protocol",
    phonetic: "/ˈprəʊtəkɒl/",
    meaning: "规程，流程；（正式）协议；（外交）礼仪；网络通信协议",
    example: "Please follow the safety protocol before entering the lab.",
    example_cn: "进入实验室前请遵守安全规程。",
    tip: "一词三吃：① 规程/流程—— safety protocol、emergency protocol（应急预案）；② 正式协议—— the Kyoto Protocol（京都议定书）；③ 技术里的通信协议—— HTTP、TCP/IP。记法：proto-（最初）+ col（粘上去的纸）→ 最早贴出来的那张告示，大家都要遵守。重音在第一音节 PRO-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "wardrobe",
    phonetic: "/ˈwɔːdrəʊb/",
    meaning: "衣柜，衣橱；（某人的）全部衣物、行头",
    example: "I need to clear out my wardrobe before the move.",
    example_cn: "搬家前我得把衣柜清一清。",
    tip: "ward（看守）+ robe（长袍）→ 古时「看管衣服的地方」，现在既指衣柜，也指一整套行头：a new winter wardrobe（一柜子新冬装）。英式英语的 wardrobe 就是美式的 closet。常见搭配 wardrobe malfunction（衣着意外走光，口语梗）。重音在前 WARD-，-robe 弱读。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "thermometer",
    phonetic: "/θəˈmɒmɪtə(r)/",
    meaning: "温度计，体温计",
    example: "The nurse took my temperature with a digital thermometer.",
    example_cn: "护士用电子体温计给我量了体温。",
    tip: "thermo-（热）+ meter（测量仪）→ 量热的仪器。同族词一串：thermostat（恒温器）、thermometer reading（温度读数）、a clinical thermometer（医用体温计）。两个发音坑：th 是咬舌音 /θ/，别读成 /t/；-meter 读 /mɪtə/ 不是 /miːtə/，重音在第二音节 -MOM-。",
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
