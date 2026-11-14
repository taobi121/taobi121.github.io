/* ============================================================
   闭涛 · 书式作品集  script.js
   内容声明：以下所有数据均来自闭涛真实经历，双语对照。
   改内容只改本文件的数组即可，页面自动重渲染。
   ============================================================ */

/* ---------- 0) 语言状态 ---------- */
var LANG = localStorage.getItem('bitao-lang') || 'zh';
var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1) 静态界面文案（中/英） ---------- */
var I18N = {
  'nav.home':     { zh: '首页', en: 'HOME' },
  'nav.learn':    { zh: '学习', en: 'LEARN' },
  'nav.work':     { zh: '项目', en: 'PROJECTS' },
  'nav.create':   { zh: '创作', en: 'CREATE' },
  'nav.contact':  { zh: '联系我', en: 'CONTACT' },
  'nav.resume':   { zh: '个人简历', en: 'Resume' },
  'nav.soundOff': { zh: '声音 关', en: 'Sound off' },
  'nav.soundOn':  { zh: '声音 开', en: 'Sound on' },
  'nav.prev':     { zh: '上一页', en: 'Prev' },
  'nav.next':     { zh: '下一页', en: 'Next' },
  'cover.kicker': { zh: '欢迎来到我的世界', en: 'Welcome to my world' },
  'cover.sub':    { zh: '本科 · 华中师范大学信息管理学院 ｜ 已保研至南京大学信息管理学院', en: 'Undergrad · School of Information Management, CCNU ｜ Guaranteed admission to Nanjing University' },
  'cover.subEn':  { zh: '我是一名学生、一名分析师，也是一名创作者。', en: "I'm a student, an analyst, and a creator." },
  'cover.resume': { zh: '📄 查看完整简历', en: '📄 View full resume' },
  'role.learn':   { zh: '学习', en: 'STUDENT' },
  'role.work':    { zh: '工作', en: 'PROFESSIONAL' },
  'role.create':  { zh: '创作', en: 'CREATOR' },
  'learn.title':  { zh: '学习档案 · 书架', en: 'Learning archive · Bookshelf' },
  'learn.note':   { zh: '我的教育经历，与书架上的 13 本「证书之书」。点击书脊，翻阅扫描件。', en: 'My education, and 13 certificate-books on the shelf. Click a spine to read the scan.' },
  'learn.bachelor': { zh: '本科', en: 'BACHELOR' },
  'learn.master':   { zh: '硕士（已保研）', en: 'MASTER (recommended)' },
  'work.title':     { zh: '项目档案', en: 'Project archive' },
  'work.note':      { zh: '7 段项目经历：默认只露标题与成果徽章，点「项目简介 / 个人贡献」展开详情。', en: '7 projects: titles and badges by default; expand with the buttons below each card.' },
  'work.skillsTitle': { zh: '技能工具箱', en: 'Toolbox' },
  'work.introBtn':  { zh: '项目简介', en: 'About' },
  'work.contribBtn':{ zh: '个人贡献', en: 'My work' },
  'work.intro':   { zh: '项目简介', en: 'About the project' },
  'work.handled': { zh: '个人贡献', en: 'What I handled' },
  'create.title': { zh: '创作档案', en: 'Creating archive' },
  'back.title':   { zh: '下一章，写什么？', en: "What's the next chapter?" },
  'back.sub':     { zh: '我对运营、产品与数据交叉领域的机会保持开放，期待用「看数据说话 + 做内容增长」帮团队把事情做扎实。', en: "Open to roles across operations, product and data. I bring evidence-based analysis and content growth that gets things done." },
  'back.quote':   { zh: '也许，我们可以一起写下它。', en: 'Maybe we can write it together.' },
  'back.resume':  { zh: '阅读完整简历', en: 'Read the resume' },
  'page.indicator': { zh: '页 {n} / {t}', en: 'Page {n} of {t}' }
};
function t(key){ return I18N[key] ? I18N[key][LANG] : key; }

/* ---------- 2) 证书书架（13 本，顺序与 images/cert-XX.jpg 对应） ---------- */
var CERTS = [
  { img:'cert-01.jpg', spine:'三创赛全国一等奖',   zh:'三创赛 · 全国一等奖',        en:'"ICE" Challenge · Grand Prize',       sub:{ zh:'第十六届「创新、创意及创业」挑战赛 · 商务大数据分析赛道', en:'16th Innovation, Creativity & Entrepreneurship Challenge, Business Big-Data track' } },
  { img:'cert-02.jpg', spine:'美赛 H 奖',         zh:'美国大学生数学建模竞赛',      en:'MCM/ICM · Honorable Mention',          sub:{ zh:'Honorable Mention（H 奖）· 国际级', en:'Honorable Mention · international' } },
  { img:'cert-03.jpg', spine:'案例大赛收录',       zh:'全国信息资源管理案例大赛',    en:'RUC Case Competition · Accepted',      sub:{ zh:'第四届 · 案例收录（负责人）', en:'4th edition, case accepted (team leader)' } },
  { img:'cert-04.jpg', spine:'大创结项',           zh:'大学生创新创业训练计划',      en:'National Innovation Program',          sub:{ zh:'国家级 A 类 · 结项证书', en:'National level A, concluded' } },
  { img:'cert-05.jpg', spine:'计算机三级',         zh:'全国计算机等级考试 三级',     en:'NCRE Level 3',                         sub:{ zh:'数据库技术', en:'Database technology' } },
  { img:'cert-06.jpg', spine:'计算机四级',         zh:'全国计算机等级考试 四级',     en:'NCRE Level 4',                         sub:{ zh:'数据库工程师', en:'Database engineer' } },
  { img:'cert-07.jpg', spine:'软考中级',           zh:'软考 · 中级（数据库）',       en:'Soft Exam · Intermediate (DB)',        sub:{ zh:'计算机技术与软件专业技术资格', en:'National IT professional qualification' } },
  { img:'cert-08.jpg', spine:'英语六级',           zh:'大学英语六级（CET-6）',       en:'CET-6',                                sub:{ zh:'总分 501 · 2024.12', en:'Score 501 · Dec 2024' } },
  { img:'cert-09.jpg', spine:'博雅丹桂奖学金',     zh:'博雅丹桂奖学金',             en:'Boya Dangui Scholarship',              sub:{ zh:'2025 · 校级（前 10%）', en:'2025 · university, top 10%' } },
  { img:'cert-10.jpg', spine:'少数民族优秀奖学金', zh:'少数民族优秀学生奖学金',      en:'Minority Excellence Scholarship',      sub:{ zh:'2025 · 校级', en:'2025 · university' } },
  { img:'cert-11.jpg', spine:'三好学生',           zh:'校级三好学生',               en:'Merit Student',                        sub:{ zh:'2025', en:'2025' } },
  { img:'cert-12.jpg', spine:'学习积极分子',       zh:'校级学习积极分子',           en:'Learning Pacesetter',                  sub:{ zh:'2024', en:'2024' } },
  { img:'cert-13.jpg', spine:'优秀共青团员',       zh:'校级优秀共青团员',           en:'Outstanding CYL Member',               sub:{ zh:'2025', en:'2025' } }
];

/* ---------- 3) 时间轴（改这里即可增删节点） ---------- */
var TIMELINE = [
  { date:'2026.09', zh:'保研至南京大学（985）信息管理学院', en:'Guaranteed admission to Nanjing University (985)' },
  { date:'2026.08', zh:'三创赛 · 商务大数据分析赛道全国一等奖', en:'Grand Prize, Business Big-Data track ("ICE" Challenge)' },
  { date:'2026.01', zh:'美国大学生数学建模竞赛（MCM/ICM）· H 奖', en:'MCM/ICM · Honorable Mention' },
  { date:'2026.01', zh:'全国信息资源管理案例大赛 · 案例收录（负责人）', en:'RUC Case Competition · case accepted (leader)' },
  { date:'2024.12', zh:'国家级大学生创新创业训练计划 · 结项', en:'National Innovation Training Program · concluded' },
  { date:'2024-2025 学年', zh:'博雅丹桂奖学金 · 校级三好学生', en:'Boya Dangui Scholarship · Merit Student' }
];

/* ---------- 4) 项目文档（7 段经历） ---------- */
var PROJECTS = [
  {
    title:{ zh:'虚实交锋：直播电商数字人直播数据分析与成效研究', en:'Virtual vs. Real: Data Analysis of AI-anchor Livestream E-commerce' },
    badge:{ zh:'🏆 全国一等奖 · 核心成员（A 类赛事）', en:'🏆 Grand Prize (national 1st) · Core member (Category A)' },
    intro:{ zh:'全国大学生电子商务「创新、创意及创业」挑战赛（A 类赛事）商务大数据分析赛道：围绕直播电商数字人主播，构建数字人与真人直播的多模态特征体系，分析话术特征与直播间热度的关联，为数字人直播运营提供数据支撑。', en:'For the "Innovation, Creativity & Entrepreneurship" Challenge (Cat. A), Business Big-Data track: built a multimodal feature system comparing AI digital-human anchors with human hosts, linking speech patterns to livestream popularity to guide operations.' },
    tools:['Qwen3-ASR','RoBERTa-wwm-ext','时间序列分析'],
    bullets:{ zh:['用 Qwen3-ASR 转写直播语音话术','RoBERTa-wwm-ext 微调完成文本分析','对齐互动行为与热度的时间序列','输出可解释的运营建议'], en:['Transcribed livestream speech with Qwen3-ASR','Fine-tuned RoBERTa-wwm-ext for text analysis','Aligned interaction events with popularity time series','Delivered interpretable operations suggestions'] }
  },
  {
    title:{ zh:'基于交流意图识别的学术话语分析框架构建与应用', en:'Academic Discourse Analysis via Communicative Intent Detection' },
    badge:{ zh:'✍️ 第二作者 · 已录用《情报科学》', en:'✍️ 2nd author · accepted by Information Science' },
    intro:{ zh:'针对人工话语分析效率低、规模受限、可复现性差的问题，构建基于交流意图识别的学术话语分析框架：融合弱监督学习与数据增强，自动挖掘多学科话语模式，并在图书情报与管理信息系统两学科语料（6 刊 5247 篇）上完成实证。', en:'Built a discourse-analysis framework based on communicative intent detection, combining weak supervision and data augmentation; empirically validated on LIS and MIS corpora (6 journals, 5,247 papers).' },
    tools:['弱监督学习','数据增强','SciBERT'],
    bullets:{ zh:['负责语料清洗与数据预处理','参与交流意图识别模型（SciBERT 微调）的训练与效果评估'], en:['Led corpus cleaning and data preprocessing','Co-trained and evaluated the SciBERT-based intent detection model'] }
  },
  {
    title:{ zh:'大语言模型驱动的学科话语模式分析方法', en:'LLM-driven Analysis of Disciplinary Discourse Patterns' },
    badge:{ zh:'✍️ 第二作者（导师一作）· 成稿阶段', en:'✍️ 2nd author (advisor first) · in final drafting' },
    intro:{ zh:'将「修辞语步」视为交流意图，用大模型辅助生成的数据微调 Qwen3-8B，识别论文引言的句子级交流意图，从意图分布与意图转移两方面刻画学科话语模式；发现学科可分为生命、社会、数理三大群组并呈组内趋近、组间远离的演化趋势。', en:'Treats rhetorical moves as communicative intents: fine-tuned Qwen3-8B on LLM-augmented data to detect sentence-level intents in paper introductions, revealing three disciplinary clusters converging within and diverging across groups.' },
    tools:['Qwen3-8B','SFT / DPO','Label-Studio'],
    bullets:{ zh:['参与微调语料构建','完成 Qwen3-8B 的 SFT / DPO 训练','搭建 Label-Studio 标注流水线','完成识别结果分析'], en:['Co-built the fine-tuning corpus','Ran SFT / DPO training of Qwen3-8B','Built the Label-Studio annotation pipeline','Analyzed detection results'] }
  },
  {
    title:{ zh:'数据筑基，AI 赋能：城市更新数据资源建设体系与活化路径调研——以「武汉云」为例', en:'Data Foundation, AI Empowerment: Urban Renewal Data Resources — the "Wuhan Cloud" Case' },
    badge:{ zh:'📚 中国人民大学信息资源管理案例大赛 · 案例收录', en:'📚 RUC Information Resource Management Case Competition · accepted' },
    intro:{ zh:'调研「武汉云」城市数据资源体系建设实践，系统梳理其数据归集、治理与活化路径，撰写教学案例与分析报告，被中国人民大学信息资源管理案例大赛收录入库。', en:'Investigated the "Wuhan Cloud" urban data resource system; systematically mapped its data collection, governance and activation paths into a teaching case accepted into the RUC case library.' },
    tools:['实地调研','案例研究','报告撰写'],
    bullets:{ zh:['作为团队负责人带队完成企业调研','主导案例框架设计与撰写','统筹投稿与收录全流程'], en:['Led the team through enterprise field research','Designed the case framework and drafted the report','Managed submission and acceptance end to end'] }
  },
  {
    title:{ zh:'从网页搜索到对话交互：大语言模型对大学生观点极化感知的影响调研', en:'From Web Search to Dialogue: LLMs and Perceived Opinion Polarization' },
    badge:{ zh:'📝 第一作者 · 市场调研课程论文', en:'📝 First author · market research course paper' },
    intro:{ zh:'采用组间实验（N=30）对比网页搜索、无引用与带引用 LLM 对话搜索对大学生观点极化的影响；发现 LLM 对话更易诱导确认性提问，「来源引用」反而增强了用户对立场一致信息的选择性信任。', en:'A between-subjects experiment (N=30) comparing web search, citation-free and cited LLM chat; found LLM dialogue induces confirmatory questioning, and source citations ironically strengthen selective trust in stance-consistent information.' },
    tools:['组间实验','问卷调查','统计分析'],
    bullets:{ zh:['独立完成实验设计与被试招募','执行数据收集与统计分析','完成论文写作（第一作者）'], en:['Designed the experiment and recruited participants','Ran data collection and statistical analysis','Wrote the paper as first author'] }
  },
  {
    title:{ zh:'信管升学信息资源组织系统设计方案', en:'Knowledge-Graph-based Graduate Admission Info System (course project)' },
    badge:{ zh:'🎓 「信息组织」课程设计 · 核心成员', en:'🎓 Information Organization course project · core member' },
    intro:{ zh:'面向信管学生升学信息获取场景，完成系统整体设计：用户需求分析、资源描述与元数据设计、等级体系分类与分面组配设计，并以知识图谱组织升学信息资源。', en:'End-to-end system design for graduate-admission information needs: requirement analysis, metadata and classification scheme design, with a knowledge graph organizing the resources.' },
    tools:['知识图谱','本体设计','可视化'],
    bullets:{ zh:['设计领域本体与实体关系','完成图谱数据组织与可视化落地'], en:['Designed the domain ontology and entity relations','Built the graph data organization and visualization'] }
  },
  {
    title:{ zh:'遗脉智新：非遗数字化传承创新项目策划', en:'Heritage Renewed: ICH Digitization Business Plan' },
    badge:{ zh:'🏅 三创赛常规赛道 · 校级一等奖成员', en:'🏅 "ICE" Challenge regular track · school-level 1st prize member' },
    intro:{ zh:'面向非遗文化传承与活化，以「数刻文脉」团队完成商业化项目策划：产品定位、用户需求分析、服务设计与落地路径规划。', en:'A commercialization plan for intangible cultural heritage revitalization: product positioning, user research, service design and rollout planning with the "ShuKe WenMai" team.' },
    tools:['用户调研','产品原型','服务设计'],
    bullets:{ zh:['独立完成需求分析与产品原型设计','把用户调研结论转化为可演示的交互原型'], en:['Ran requirement analysis and prototype design','Turned research findings into a demonstrable interactive prototype'] }
  }
];

/* ---------- 5) 技能工具箱 ---------- */
var SKILLS = [
  { cat:{ zh:'数据 & 大模型', en:'Data & LLM' },      items:['SQL','Python','文本挖掘','RoBERTa / Qwen3-8B 微调（SFT / DPO）','SHAP 可解释分析','Label-Studio 数据流水线'] },
  { cat:{ zh:'Agent & 看板', en:'Agent & BI' },       items:['Coze Agent 搭建','FineBI 数据看板'] },
  { cat:{ zh:'内容 & 运营', en:'Content & Ops' },     items:['短视频脚本（20+ 条）','剪映','抖音内容运营','小红书自媒体'] },
  { cat:{ zh:'研究 & 协作', en:'Research & Collab' }, items:['实验设计与统计分析','用户调研与需求分析','知识图谱与本体设计'] }
];

/* ---------- 6) 创作档案 ---------- */
var CREATE_STATS = [
  { num:'20+',    zh:'短视频脚本',   en:'video scripts' },
  { num:'2,600+', zh:'单条最高点赞', en:'likes, top video' },
  { num:'13+',    zh:'网站版本迭代', en:'website iterations' },
  { num:'2',      zh:'内容平台运营', en:'content platforms' }
];
var CREATE = [
  { tag:{ zh:'产品设计 · UniPlan 大学计', en:'Product design · UniPlan' }, title:{ zh:'UniPlan 大学计 APP 设计', en:'UniPlan — campus life planner app' }, desc:{ zh:'独立完成 28 页用户体验设计报告：需求调研（150 份问卷）、KANO 模型分析、五模块原型设计与用户测评方案——一款用 AI 把碎片通知变成结构化日程的校园生活管理 App。', en:'Authored a 28-page UX design report: user research (150 responses), KANO analysis, five-module prototype design and an evaluation plan — an AI-powered campus life planner.' }, link:'uniplan-report.pdf', linkText:{ zh:'阅读设计报告', en:'Read the report' } },
  { tag:{ zh:'个人主页 · Vibe Coding', en:'Homepage · Vibe Coding' }, title:{ zh:'这本可以翻的作品集', en:'A portfolio you can flip' }, desc:{ zh:'你正在读的这本书：纯手写零依赖三件套（HTML/CSS/JS），双语翻页交互、证书书架、WebAudio 合成翻页声，Git 全程版本管理。', en:'The book you are reading: hand-coded zero-dependency HTML/CSS/JS, bilingual page-flip interaction, a certificate bookshelf and WebAudio flip sounds.' }, wide:true },
  { tag:{ zh:'抖音 · 内容运营', en:'Douyin · Operations' }, title:{ zh:'招生抖音号内容运营', en:'Douyin recruitment account' }, desc:{ zh:'负责选题策划、脚本撰写与数据复盘，单条视频最高 2,600+ 赞。', en:'Topic planning, scriptwriting and data review; top video earned 2,600+ likes.' } },
  { tag:{ zh:'小红书 · 自媒体', en:'Xiaohongshu · Self-media' }, title:{ zh:'小红书自媒体运营', en:'Xiaohongshu self-media' }, desc:{ zh:'图文内容创作与账号运营，探索「数据选题材、内容做增长」的打法。', en:'Creating image-text content and growing the account with a data-informed approach.' } },
  { tag:{ zh:'短视频 · 创作', en:'Short video · Creation' }, title:{ zh:'短视频脚本与剪辑', en:'Scripts & editing' }, desc:{ zh:'累计撰写 20+ 条短视频脚本，熟悉剪映全流程剪辑。', en:'20+ short-video scripts written; full editing workflow in Jianying (CapCut).' } }
];

/* ---------- 7) 渲染：书架 ---------- */
function renderBooks(){
  var box = document.getElementById('books');
  if (!box) return;
  box.innerHTML = '';
  CERTS.forEach(function(c, i){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'book-spine spine-' + i;
    b.innerHTML = '<i></i>' + c.spine;
    b.setAttribute('aria-label', c.zh + '，点击放大查看');
    b.addEventListener('click', function(){
      document.getElementById('lightboxImg').src = 'images/' + c.img;
      document.getElementById('lightboxImg').alt = c.zh;
      document.getElementById('lightbox').classList.add('open');
      playFlip(.6);
    });
    box.appendChild(b);
  });
}

/* ---------- 8) 渲染：时间轴 ---------- */
function renderTimeline(){
  var box = document.getElementById('timeline');
  if (!box) return;
  box.innerHTML = '';
  TIMELINE.forEach(function(item){
    var el = document.createElement('span');
    el.className = 'tl-item';
    el.innerHTML = '<b>' + item.date + '</b>' + (LANG === 'en' ? item.en : item.zh);
    box.appendChild(el);
  });
}

/* ---------- 9) 渲染：项目卡片（标题+徽章常显，简介/贡献双开关展开） ---------- */
function renderWorkCards(){
  var box = document.getElementById('workCards');
  if (!box) return;
  box.innerHTML = '';
  PROJECTS.forEach(function(p, i){
    var card = document.createElement('article');
    card.className = 'work-card';
    var bullets = (LANG === 'en' ? p.bullets.en : p.bullets.zh).map(function(s){ return '<li>' + s + '</li>'; }).join('');
    var tools = p.tools.map(function(s){ return '<i>' + s + '</i>'; }).join('');
    card.innerHTML =
      '<h3>' + p.title[LANG] + '</h3>' +
      '<span class="wc-badge">' + p.badge[LANG] + '</span>' +
      '<div class="wc-actions">' +
        '<button type="button" class="wc-btn" data-toggle="show-intro" aria-expanded="false">' + t('work.introBtn') + ' ▾</button>' +
        '<button type="button" class="wc-btn" data-toggle="show-contrib" aria-expanded="false">' + t('work.contribBtn') + ' ▾</button>' +
      '</div>' +
      '<div class="wc-detail wc-intro"><p>' + p.intro[LANG] + '</p><div class="doc-tools">' + tools + '</div></div>' +
      '<div class="wc-detail wc-contrib"><h5>' + t('work.handled') + '</h5><ul>' + bullets + '</ul></div>';
    card.querySelectorAll('.wc-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        var cls = btn.getAttribute('data-toggle');
        var open = card.classList.toggle(cls);
        btn.classList.toggle('on', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = btn.textContent.replace(/ [▾▴]$/, open ? ' ▴' : ' ▾');
        playFlip(.35);
      });
    });
    box.appendChild(card);
  });
}

/* ---------- 10) 渲染：技能 ---------- */
function renderSkills(){
  var box = document.getElementById('skills');
  if (!box) return;
  box.innerHTML = '';
  SKILLS.forEach(function(g){
    var el = document.createElement('div');
    el.className = 'skill-group';
    var items = g.items.map(function(s){ return '<i>' + s + '</i>'; }).join('');
    el.innerHTML = '<b>' + g.cat[LANG] + '</b>' + items;
    box.appendChild(el);
  });
}

/* ---------- 11) 渲染：创作档案 ---------- */
function renderCreate(){
  var stats = document.getElementById('createStats');
  if (stats){
    stats.innerHTML = CREATE_STATS.map(function(s){
      return '<div class="stat"><b>' + s.num + '</b><span>' + (LANG === 'en' ? s.en : s.zh) + '</span></div>';
    }).join('');
  }
  var grid = document.getElementById('createGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CREATE.forEach(function(c){
    var el = document.createElement('div');
    el.className = 'create-card' + (c.wide ? ' wide' : '');
    var link = c.link ? '<a class="cc-link" href="' + c.link + '" target="_blank">' + c.linkText[LANG] + ' ↗</a>' : '';
    el.innerHTML = '<span class="cc-tag">' + c.tag[LANG] + '</span><h3>' + c.title[LANG] + '</h3><p>' + c.desc[LANG] + '</p>' + link;
    grid.appendChild(el);
  });
}

/* ---------- 12) 悬浮联系栏：点击复制 ---------- */
function bindContactFloat(){
  document.querySelectorAll('.cf-btn').forEach(function(b){
    b.addEventListener('click', function(){
      copyText(b.getAttribute('data-copy'), b.getAttribute('data-name'));
    });
  });
}

/* ---------- 12) 渲染：封底联系方式 ---------- */
var CONTACTS = [
  { label:{ zh:'QQ：970034813', en:'QQ 970034813' }, copy:'970034813' },
  { label:{ zh:'微信：Sisyphus2026-wh', en:'WeChat Sisyphus2026-wh' }, copy:'Sisyphus2026-wh' },
  { label:{ zh:'邮箱：taobi@mails.ccnu.edu.cn', en:'taobi@mails.ccnu.edu.cn' }, copy:'taobi@mails.ccnu.edu.cn' }
];
function renderContacts(){
  var box = document.getElementById('backContacts');
  if (!box) return;
  box.innerHTML = '';
  CONTACTS.forEach(function(c){
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = c.label[LANG];
    b.addEventListener('click', function(){ copyText(c.copy, c.copy); });
    box.appendChild(b);
  });
}

/* ---------- 13) 静态 UI 文案应用 ---------- */
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    el.innerHTML = t(el.getAttribute('data-i18n'));
  });
  document.documentElement.lang = LANG === 'en' ? 'en' : 'zh-CN';
  document.title = LANG === 'en' ? 'Bitao Bi · Portfolio' : '闭涛 · 个人作品集';
  document.getElementById('langBtn').textContent = LANG === 'en' ? '中文' : 'EN';
  renderTimeline(); renderWorkCards(); renderSkills(); renderCreate(); renderContacts(); renderIndicator();
}

/* ---------- 14) 翻页逻辑 ---------- */
var PAGES = ['page-0','page-1','page-2','page-3','page-4'];
var current = 0;
function goTo(n, silent){
  n = Math.max(0, Math.min(PAGES.length - 1, n));
  var changed = n !== current;
  var oldEl = changed ? document.getElementById(PAGES[current]) : null;
  var newEl = document.getElementById(PAGES[n]);
  // 兜底清理：无论 current 状态是否正确，先把所有非目标页的 active/leaving 全部摘掉
  PAGES.forEach(function(id, i){
    if (i === n) return;
    var el = document.getElementById(id);
    el.classList.remove('active');
    if (el !== oldEl) el.classList.remove('leaving');
  });
  if (changed && oldEl && !REDUCE){
    oldEl.classList.add('leaving');
    setTimeout(function(){ oldEl.classList.remove('leaving','active'); }, 450);
  } else if (oldEl){
    oldEl.classList.remove('active');
  }
  newEl.classList.add('active');
  current = n;
  renderIndicator();
  updateChapters();
  location.hash = ['cover','learn','work','create','back'][n];
  var sheet = newEl.querySelector('.sheet');
  if (sheet) sheet.scrollTop = 0;
  if (!silent) playFlip(1);
}
function renderIndicator(){
  var el = document.getElementById('pageIndicator');
  if (el) el.textContent = t('page.indicator').replace('{n}', current + 1).replace('{t}', PAGES.length);
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === PAGES.length - 1;
}
function updateChapters(){
  document.querySelectorAll('.chapters button').forEach(function(b){
    b.classList.toggle('on', Number(b.getAttribute('data-ch')) === current);
  });
}

/* ---------- 15) 翻页音效：WebAudio 合成，无音频文件 ---------- */
var audioCtx = null, soundOn = localStorage.getItem('bitao-sound') === 'on';
function playFlip(vol){
  if (!soundOn) return;
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    var dur = 0.18, rate = audioCtx.sampleRate;
    var buf = audioCtx.createBuffer(1, rate * dur, rate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++){
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); // 衰减噪声 → 纸张摩擦感
    }
    var src = audioCtx.createBufferSource();
    src.buffer = buf;
    var filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass'; filter.frequency.value = 1400; filter.Q.value = 0.8;
    var gain = audioCtx.createGain();
    gain.gain.value = 0.12 * (vol || 1);
    src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    src.start();
  }catch(e){ /* 音频不可用则静默跳过 */ }
}
function initSoundBtn(){
  var btn = document.getElementById('soundBtn');
  btn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
  btn.querySelector('span').textContent = soundOn ? t('nav.soundOn') : t('nav.soundOff');
  btn.addEventListener('click', function(){
    soundOn = !soundOn;
    localStorage.setItem('bitao-sound', soundOn ? 'on' : 'off');
    btn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    btn.querySelector('span').textContent = soundOn ? t('nav.soundOn') : t('nav.soundOff');
    if (soundOn) playFlip(1);
  });
}

/* ---------- 16) 复制文本（clipboard API + 降级） ---------- */
function fallbackCopy(val){
  var ta = document.createElement('textarea');
  ta.value = val; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  var ok = false;
  try{ ok = document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
  return ok;
}
function copyText(val, label){
  function ok(){ showToast((LANG === 'en' ? 'Copied: ' : '已复制：') + label + ' ✓'); }
  if (navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(val).then(ok, function(){
      showToast(fallbackCopy(val) ? ok() : (LANG === 'en' ? 'Copy blocked: ' : '浏览器拦截了复制：') + val);
    });
  } else {
    showToast(fallbackCopy(val) ? ok() : (LANG === 'en' ? 'Copy blocked: ' : '浏览器拦截了复制：') + val);
  }
}
var toastTimer = null;
function showToast(msg){
  var el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 2200);
}

/* ---------- 17) 事件绑定 ---------- */
document.querySelectorAll('[data-go]').forEach(function(el){
  el.addEventListener('click', function(){ goTo(Number(el.getAttribute('data-go'))); });
});
document.getElementById('prevBtn').addEventListener('click', function(){ goTo(current - 1); });
document.getElementById('nextBtn').addEventListener('click', function(){ goTo(current + 1); });
document.addEventListener('keydown', function(e){
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});
/* 手机滑动翻页 */
var touchX = null;
document.addEventListener('touchstart', function(e){ touchX = e.touches[0].clientX; }, { passive:true });
document.addEventListener('touchend', function(e){
  if (touchX === null) return;
  var dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 60) goTo(current + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive:true });
/* 灯箱关闭 */
document.getElementById('lightbox').addEventListener('click', function(){
  this.classList.remove('open');
});
/* 封底 Email：mailto + 复制双保险 */
document.getElementById('emailBtn').addEventListener('click', function(){
  copyText('taobi@mails.ccnu.edu.cn', 'taobi@mails.ccnu.edu.cn');
  window.location.href = 'mailto:taobi@mails.ccnu.edu.cn';
});
/* 语言切换 */
document.getElementById('langBtn').addEventListener('click', function(){
  LANG = LANG === 'zh' ? 'en' : 'zh';
  localStorage.setItem('bitao-lang', LANG);
  applyI18n(); initSoundBtn(); playFlip(1);
});
/* 哈希路由：刷新/直达某章 */
function fromHash(){
  var idx = ['cover','learn','work','create','back'].indexOf(location.hash.replace('#',''));
  if (idx > 0) goTo(idx, true);  // 不再强行 current=0：由 goTo 内部清理所有页面状态
}
window.addEventListener('hashchange', fromHash);

/* ---------- 18) 启动 ---------- */
applyI18n();
renderBooks();
bindContactFloat();
initSoundBtn();
document.getElementById('page-0').classList.add('active');
updateChapters();
renderIndicator();
fromHash();
