// 每日英语单词追加脚本（2026-10-09 第 99 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-09';

const newWords = [
  {
    word: "certification",
    phonetic: "/ˌsɜːrtɪfɪˈkeɪʃn/",
    meaning: "认证，资格证明；证书；颁发证书",
    example: "You need a valid certification before you can work on the site.",
    example_cn: "你必须持有有效证书才能在这个工地工作。",
    tip: "certify（证明、担保）+ -ation（名词后缀），核心是「由权威方出具的书面证明」。职场高频：professional certification 职业资格认证、ISO certification ISO 认证、get certified 取得认证。要区分三个近亲：certificate 是那张「证书」（具体物件），certification 是「取得/颁发证书这件事或这套资格」（抽象过程），certify 是动词「认证」。面试里说 I have a certification in... 比 I have a certificate 更强调你具备这项资格。重音在倒数第三音节 -FI-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "specialize",
    phonetic: "/ˈspeʃəlaɪz/",
    meaning: "专门从事，专攻；使专门化",
    example: "This clinic specializes in treating sports injuries.",
    example_cn: "这家诊所专门治疗运动损伤。",
    tip: "special（专门的）+ -ize（动词后缀，使……化），本义「让自己变得专门」。搭配固定用 specialize **in**（不是 on/at）：specialize in marketing 专攻市场营销、a specialized team 专业团队。名词是 specialty（美）/ speciality（英）专长、specialist 专家、specialization 专业化分工。职场万能句：What do you specialize in? 你擅长哪一块？——比 What's your job? 更聚焦「你的专业领域」。拼写注意：英式也写 specialise，-ize 更通用。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "remittance",
    phonetic: "/rɪˈmɪtns/",
    meaning: "汇款，汇款额；付款",
    example: "Please confirm the remittance within three working days.",
    example_cn: "请在三个工作日内确认这笔汇款。",
    tip: "re-（回）+ mit（送）+ -ance，字面「把钱送过去」，比 payment 更书面、更偏向「跨账户/跨国转账」。商务财务常用：remittance advice 汇款通知单、remittance slip 汇款凭条、bank remittance 银行汇款、remittance service 汇款服务。外来务工者寄回家的钱，经济学里就叫 remittances（侨汇），是很多国家的重要外汇来源。动词是 remit（汇款；免除），记忆口诀：把钱 remit 过去，就是一笔 remittance。重音在 -MIT-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "flashlight",
    phonetic: "/ˈflæʃlaɪt/",
    meaning: "手电筒；（手机）闪光灯",
    example: "The power went out, so we grabbed a flashlight.",
    example_cn: "停电了，我们赶紧抓了个手电筒。",
    tip: "flash（闪光）+ light（灯），美式说 flashlight，英式习惯说 torch（对，就是「火把」那个词，英式里也指手电筒，别被绕晕）。生活高频：turn on / shine a flashlight 打开手电筒、flashlight app 手电筒应用、phone flashlight 手机闪光灯。注意「闪光灯」（拍照用的那个）严格说是 flash，但口语里 phone flashlight 也很常见。停电、找钥匙、露营、夜间遛狗——这是生活场景出现率极高的词，比 torch 更值得先记。重音在首音节 FLASH-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "doorknob",
    phonetic: "/ˈdɔːrnɑːb/",
    meaning: "门把手，球形门柄",
    example: "The doorknob is loose and needs to be tightened.",
    example_cn: "这个门把手松了，得拧紧一下。",
    tip: "door（门）+ knob（圆形凸起、球状物），特指那种「圆球形的门把手」；如果是长条下压式的，叫 door handle。家里维修、租房看房超高频：turn the doorknob 转动门把手、a loose doorknob 松动的门把手。knob 这个词本身也泛指各种「旋钮」：volume knob 音量旋钮、door knob 门把、knob 还有「一小块黄油」的意思（a knob of butter）。注意读音：knob 的 k 不发音，读 /nɑːb/，别读成「克诺布」。",
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
