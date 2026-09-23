// 每日英语单词追加脚本（2026-09-23 第 85 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-23';

const newWords = [
  {
    word: "kettle",
    phonetic: "/ˈketl/",
    meaning: "水壶，烧水壶",
    example: "Put the kettle on and we'll have some tea.",
    example_cn: "把水壶烧上，我们喝点茶。",
    tip: "英式生活的核心词——put the kettle on 字面是「把壶放上」，实际就是「烧壶水」，等于「咱们喝茶吧」。和 pot 区分：kettle 是烧水的壶，teapot 才是泡茶用的茶壶。美式多说 electric kettle。拼写双 t，念 /ˈketl/，第二个 e 不发音。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "umbrella",
    phonetic: "/ʌmˈbrelə/",
    meaning: "雨伞；总括的，涵盖多方的",
    example: "Take an umbrella — the forecast says it'll rain this afternoon.",
    example_cn: "带把伞吧，预报说下午有雨。",
    tip: "职场高频引申义：umbrella term（统称、总称）、umbrella organization（总机构、伞形组织）、under the umbrella of（在…的统一框架下）。词源是拉丁 umbra「阴影」，本义就是遮出阴影的东西。重音在中间 /ʌmˈbre-/，别念成「UM-brella」。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "whiteboard",
    phonetic: "/ˈwaɪtbɔːrd/",
    meaning: "白板",
    example: "Let's write the main points on the whiteboard so everyone can see them.",
    example_cn: "我们把要点写在白板上，让大家都看得见。",
    tip: "white（白）+ board（板）。互联网公司里派生的 whiteboarding 指「一群人围着白板一起画方案、推设计」这种协作方式，面试里的 whiteboard interview 就是让你当场在白板上写代码/画架构。对照 blackboard（黑板）、noticeboard（布告栏）。重音在前 /ˈwaɪt-/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "prototype",
    phonetic: "/ˈproʊtətaɪp/",
    meaning: "原型，样机（初版试制品）",
    example: "We showed the prototype to the client and got useful feedback.",
    example_cn: "我们把原型拿给客户看，拿到了很有用的反馈。",
    tip: "proto-（最初、第一）+ type（类型）→ 第一个样本。工程和产品语境里指「先做出来试用、还没定型的早期版本」，比 sample（样品）更强调未定型。常搭配 build / test / refine a prototype。相关词：MVP（最小可行产品）、pilot（试点）。重音在前 /ˈproʊ-/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "cushion",
    phonetic: "/ˈkʊʃn/",
    meaning: "靠垫，坐垫；缓冲，减轻（冲击）",
    example: "The sofa comes with two cushions in a matching color.",
    example_cn: "这张沙发配两个同色靠垫。",
    tip: "名词是「垫子」，动词引申为「缓冲」——cushion the blow（减轻打击）、cushion the impact（缓冲影响）。理财和职场里说 a cash cushion / a financial cushion 就是「应急储备金」。词源是拉丁 coxa（臀部、大腿），本来就是垫屁股的东西。念 /ˈkʊʃn/，两个音节，-ion 只发 /ʃn/。",
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
