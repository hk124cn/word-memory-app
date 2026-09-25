// 每日英语单词追加脚本（2026-09-25 第 86 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-25';

const newWords = [
  {
    word: "napkin",
    phonetic: "/ˈnæpkɪn/",
    meaning: "餐巾，餐巾纸",
    example: "She wiped her mouth with a napkin and reached for her phone.",
    example_cn: "她用餐巾擦了擦嘴，伸手去拿手机。",
    tip: "餐桌必备词，注意和 tissue（抽纸、面巾纸）区分：napkin 是吃饭时摆在手边、铺在腿上的那块餐巾，tissue 是随手抽的纸。正式场合的规矩是铺在腿上，用完放在盘子左侧而不是揉成一团。英式、澳式有时说 serviette。词源是拉丁 mappa「布」。重音在前 /ˈnæp-/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "thermostat",
    phonetic: "/ˈθɜːrməstæt/",
    meaning: "恒温器，温度调节器",
    example: "Turn the thermostat down to 20 degrees before you go to bed.",
    example_cn: "睡前把恒温器调到 20 度。",
    tip: "thermo-（热）+ stat（保持不变的装置）→ 让温度恒定的小盒子。口语里常省着说 turn the heat up/down，也可以用 the stat 代指。th 是咬舌音 /θ/，别念成 /s/；重音在前 /ˈθɜːr-/。相关：thermometer（温度计）、thermal（热的）。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "cubicle",
    phonetic: "/ˈkjuːbɪkl/",
    meaning: "办公隔间；（更衣、淋浴用的）小隔间",
    example: "He decorated his cubicle with photos and a small plant.",
    example_cn: "他用照片和一盆小植物装饰自己的办公隔间。",
    tip: "cube（立方体）的指小形式，本义就是「方方正正的小空间」。办公室里指用隔板隔开的工位，略带自嘲色彩：cubicle farm（格子间农场）、cubicle life。也指更衣室、淋浴间的小隔间或图书馆的自习小间。重音在前 /ˈkjuː-/，词尾 -cle 只发 /kl/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "layout",
    phonetic: "/ˈleɪaʊt/",
    meaning: "布局，布置；版面设计，排版",
    example: "The new office layout gives everyone more natural light.",
    example_cn: "新的办公室布局让每个人都有更多自然光。",
    tip: "由动词短语 lay out（铺开、摆放）名词化而来，连写成一个词后重音也前移：lay OUT → LAYout。三大高频场景：房间/办公室布局、网页与杂志排版（page layout）、键盘布局（keyboard layout）。做方案或 PPT 时常说 the layout feels cramped（排版太挤）。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "rebate",
    phonetic: "/ˈriːbeɪt/",
    meaning: "返款，折扣返还；退还款",
    example: "The store offers a 10% rebate if you pay in cash.",
    example_cn: "这家店付现金可返 10%。",
    tip: "re-（回）+ bate（打、削减）→ 把钱「打回来」。和 discount 的关键区别：discount 是当场少付，rebate 是先付全款、之后才返还（往往要填表、寄凭证或等入账）。常见搭配 tax rebate（退税）、mail-in rebate（寄回凭证返现）、a rebate on…。重音在前 /ˈriː-/，别念成 re-BATE。",
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
