// 每日英语单词追加脚本（2026-10-05 第 95 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-05';

const newWords = [
  {
    word: "margin",
    phonetic: "/ˈmɑːrdʒɪn/",
    meaning: "页边空白；边缘，界限；（利润）毛利，利润率；余地，差距",
    example: "The store operates on a very thin profit margin, so every sale counts.",
    example_cn: "这家店的利润率非常薄，所以每一笔销售都至关重要。",
    tip: "margin 本义是「页边留白」，引申出「边缘、余地」。三个高频场景：① 财务——profit margin 利润率（gross margin 毛利率、net margin 净利率），thin/slim margin 薄利，a wide margin 高利润；② 差距——win by a narrow margin（以微弱优势获胜，体育/选举常见）；③ 余地——margin of error 误差范围、margin for error 犯错空间。注意与 markup（加价率）区分：margin 分母是售价，markup 分母是成本。重音在首音节 MAR-，ar 读 /ɑːr/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "sourcing",
    phonetic: "/ˈsɔːrsɪŋ/",
    meaning: "采购，寻源（寻找并确定供应商、货源的过程）",
    example: "The company is shifting its sourcing to local suppliers to cut lead times.",
    example_cn: "公司正把采购转向本地供应商，以缩短交货周期。",
    tip: "sourcing 来自 source（源头），字面就是「找源头」，指在采购链条中「寻源、定供应商」这一步——比 buying（单纯买）更靠前、更战略。常见搭配：global sourcing 全球采购、strategic sourcing 战略寻源、dual sourcing 双源采购（避免单一供应商断供风险）、outsourcing 外包（注意 out- 前缀是「向外」的意思，别搞混）。相关岗位：sourcing manager 寻源/采购经理。动词 source：We source materials from three countries. 注意拼写，读音 /ˈsɔːrsɪŋ/，重音在首音节。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "succession",
    phonetic: "/səkˈseʃn/",
    meaning: "继承，继任；（连续的）一系列，接连发生",
    example: "The board has a clear succession plan for the CEO position.",
    example_cn: "董事会对 CEO 职位有明确的继任计划。",
    tip: "succession = suc（在下面）+ cess（走）+ -ion，字面「跟在后面走」，所以是「接替、连续」。职场最常用 succession plan（继任计划）——公司提前培养接班人，避免关键岗位断档。固定搭配：in succession（接连地，= one after another）：He won three games in succession. 一组形近词分清：success（成功）、succession（继承/连续）、successive（连续的，形容词）、successor（继任者）——注意 successor 是「继任者」，不是「成功者」（成功者是 a success / a successful person）。重音在第二音节 -CESS-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "porch",
    phonetic: "/pɔːrtʃ/",
    meaning: "门廊，走廊（房屋入口处带顶棚的平台）",
    example: "We sat on the porch and watched the sunset.",
    example_cn: "我们坐在门廊上看着日落。",
    tip: "房屋周边一组记牢：porch 门廊（入口带顶的平台，美式常见）、balcony 阳台（楼上外挑）、terrace 露台（大而平，可种花）、patio 庭院平台（地面层，铺砖）、veranda 游廊（大而长的廊）。固定搭配：front porch 前廊、porch light 门廊灯（晚上留着照明+安全）。美式文化里 porch 是邻里闲聊的地方，所以有 sit on the porch（坐在门廊上）这种画面感表达。读音 /pɔːrtʃ/，or 读 /ɔːr/，与 torch（火把）同韵。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "utensil",
    phonetic: "/juːˈtensl/",
    meaning: "（厨房）用具，器皿，工具",
    example: "Wash all the kitchen utensils before you start cooking.",
    example_cn: "开始做饭前，把所有厨房用具都洗一遍。",
    tip: "utensil 源自拉丁语 uti（使用），和 use、utility 同源，指「干活用的器具」。最常见是 kitchen utensils（厨房用具：锅铲、汤勺、打蛋器等小工具）——注意它不是 cutlery（刀叉勺餐具，摆桌上吃的），也不是 appliance（家电，如冰箱、微波炉）。烹饪场景搭配：cooking utensils 炊具、utensil holder 厨具收纳筒。也可泛指任何工具：gardening utensils 园艺工具、writing utensils 书写工具。重音在第二音节 -TEN-，读 /juːˈtensl/。",
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
