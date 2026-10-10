// 每日英语单词追加脚本（2026-10-10 第 100 期）
const fs = require('fs');
const FILE = 'words.js';
const DATE = '2026-10-10';

const newWords = [
  {
    word: "surplus",
    phonetic: "/ˈsɜːrpləs/",
    meaning: "盈余，剩余；过剩的，多余的",
    example: "The company ended the year with a surplus of two million dollars.",
    example_cn: "公司年底盈余两百万美元。",
    tip: "sur-（超过、在上）+ plus（更多），字面就是「多出来的那部分」。财务/新闻高频：trade surplus 贸易顺差、budget surplus 预算盈余、surplus cash 闲置资金。反义词是 deficit（赤字、亏损），这俩几乎总是成对出现，一起记最省力：盈余 vs 赤字。生活里也能用：surplus food 剩余的食物、surplus stock 库存尾货。重音在首音节 SUR-，注意 plus 部分读 /pləs/ 不是 /plʌs/。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "deficit",
    phonetic: "/ˈdefɪsɪt/",
    meaning: "赤字，亏损；不足额，缺口",
    example: "The government is trying to reduce the budget deficit.",
    example_cn: "政府正设法削减预算赤字。",
    tip: "de-（缺、向下）+ fic（做、产生）+ -it，本义「该有的没做够」→ 缺口。财政/新闻第一梯队词汇：budget deficit 财政赤字、trade deficit 贸易逆差、fiscal deficit 财政亏空。抽象用法同样高频：attention deficit 注意力缺失（ADHD 全称 attention deficit hyperactivity disorder）、sleep deficit 睡眠不足、a deficit of trust 信任缺失。反义词 surplus（盈余），与它成对记忆。重音在首音节 DEF-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "affiliate",
    phonetic: "/əˈfɪlieɪt/ (v) /əˈfɪliət/ (n)",
    meaning: "使隶属，使附属；附属机构，关联公司，分支机构",
    example: "The hospital is affiliated with a top medical university.",
    example_cn: "这家医院隶属于一所顶尖医科大学。",
    tip: "源自拉丁 affilia-re（收作儿子），核心是「挂靠到某个更大的主体下面」。注意词性决定读音：动词尾音读 /eɪt/（/əˈfɪlieɪt/），名词尾音弱化为 /ət/（/əˈfɪliət/）——这是英语里 -ate 结尾词的经典规律（associate、graduate 同理）。常见搭配：be affiliated with 隶属于、an affiliate company 关联公司、affiliate marketing 联盟营销（网上推广拿佣金那种）。名词近亲：affiliation 隶属关系。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "slipper",
    phonetic: "/ˈslɪpər/",
    meaning: "拖鞋；（室内穿的）便鞋",
    example: "Please take off your shoes and put on these slippers.",
    example_cn: "请脱鞋，换上这双拖鞋。",
    tip: "slip（滑、轻快地穿脱）+ -er（物），本义「一 slip 就能穿进去的鞋」。生活超高频，尤其在日本、中国家庭和酒店场景：a pair of slippers 一双拖鞋、hotel slippers 酒店拖鞋、bathroom slippers 浴室拖鞋。注意「人字拖」另有专词 flip-flops，室内棉拖才叫 slipper；拖鞋类统称 slippers（习惯用复数）。顺带记 slip 家族：slip on 迅速穿上、slip off 溜走/脱掉、a slip of the tongue 口误。重音在首音节 SLIP-。",
    date_added: DATE,
    lang: "en"
  },
  {
    word: "drain",
    phonetic: "/dreɪn/",
    meaning: "排水，排干；下水道，排水管；（精力、资源）耗尽",
    example: "Leaves blocked the drain, so the water couldn't go down.",
    example_cn: "树叶堵住了下水道，水流不下去。",
    tip: "本义「把液体排走」，一条词从家务一路用到职场，性价比极高。生活面：kitchen drain 厨房下水口、clogged drain 堵塞的下水道、drain the pasta 把意面沥干。抽象面是重点：drain one's energy 耗尽某人的精力、a drain on resources 对资源的消耗（a drain on = ……的负担/无底洞）、brain drain 人才流失。近义区分：drain 指「排走/耗尽」，gutter 是「路边的排水沟」，sewer 是「地下污水管」。单音节词，读 /dreɪn/，dr- 别读成「德瑞」。",
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
