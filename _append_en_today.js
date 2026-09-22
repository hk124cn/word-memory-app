// 每日英语单词追加脚本（2026-09-22 第 84 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-09-22';

const newWords = [
  {
    word: 'sunscreen',
    phonetic: '/ˈsʌnskriːn/',
    meaning: '防晒霜，防晒乳',
    example: 'Don\'t forget to put on sunscreen before you go to the beach.',
    example_cn: '去海滩之前别忘了涂防晒霜。',
    tip: 'sun（太阳）+ screen（屏障、遮挡物）→ 挡太阳的那层「屏幕」。美式日常多说 sunscreen，成分术语叫 sunblock（物理防晒），英式常说 sun cream。搭配：put on / apply / wear sunscreen，SPF 50 sunscreen。重音在前 /ˈsʌn-/。',
    date_added: DATE,
    lang: 'en'
  },
  {
    word: 'charger',
    phonetic: '/ˈtʃɑːrdʒər/',
    meaning: '充电器；充电线（也指装填器、战马）',
    example: 'I left my phone charger at the hotel again.',
    example_cn: '我又把手机充电器落在酒店了。',
    tip: 'charge 是「充电」，加 -er 变成「充电的那个东西」。注意和 cable（数据线）区分：charger 常指充电头/整套充电设备，cable 只是线。wall charger 插墙充电头，car charger 车载充电器。重音在前 /ˈtʃɑːr-/。',
    date_added: DATE,
    lang: 'en'
  },
  {
    word: 'vacuum',
    phonetic: '/ˈvækjuːm/',
    meaning: '吸尘器；用吸尘器打扫；（物理上的）真空',
    example: 'I need to vacuum the living room before the guests arrive.',
    example_cn: '客人到之前我得把客厅吸一吸尘。',
    tip: '一个词三种身份：名词 vacuum cleaner（吸尘器）、动词 vacuum the floor（吸尘）、名词 in a vacuum（真空 / 与外界隔绝的状态）。拉丁语 vacuus 是「空的」——吸尘器就是把空气抽走形成负压。拼写有两个 u 连着，念「VAK-yoom」，第一个 u 不发音。',
    date_added: DATE,
    lang: 'en'
  },
  {
    word: 'memo',
    phonetic: '/ˈmemoʊ/',
    meaning: '备忘录，内部便条（公司内部通报）',
    example: 'The manager sent a memo reminding everyone about the new policy.',
    example_cn: '经理发了一份备忘录，提醒大家注意新规定。',
    tip: '是 memorandum 的口语缩写，办公室里几乎只用 memo。和 email 的区别：memo 强调「正式的内部书面通知」，多用于自上而下传达政策。搭配：send / circulate a memo、a memo from HR。念「MEM-oh」，重音在前。',
    date_added: DATE,
    lang: 'en'
  },
  {
    word: 'freelance',
    phonetic: '/ˈfriːlæns/',
    meaning: '自由职业的；做自由职业（接单工作）',
    example: 'She quit her office job and went freelance as a graphic designer.',
    example_cn: '她辞掉了办公室的工作，转做自由职业平面设计师。',
    tip: '中世纪「free lance」指不受领主约束、谁给钱就给谁打仗的雇佣骑士——那把「自由的枪矛」。现在指不属于任何公司、按项目接活。用法：形容词 a freelance writer、动词 go freelance、副词 work freelance。名词 freelancer 是「自由职业者」。',
    date_added: DATE,
    lang: 'en'
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
