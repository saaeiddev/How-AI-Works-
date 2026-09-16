const LABELS = {
  home: {
    en: ['AI GUIDE','NEURAL CORE','INTERACTIVE 3D MASCOT'],
    fa: ['راهنمای هوش مصنوعی','هسته عصبی','ربات سه‌بعدی تعاملی']
  },
  introduction: {
    en: ['INPUT DATA','AI MODEL','OUTPUT'],
    fa: ['داده ورودی','مدل هوش مصنوعی','خروجی']
  },
  'artificial-neuron': {
    en: ['INPUTS','WEIGHTS + BIAS','ACTIVATION','OUTPUT'],
    fa: ['ورودی‌ها','وزن‌ها + بایاس','تابع فعال‌سازی','خروجی']
  },
  'neural-network': {
    en: ['INPUT LAYER','HIDDEN LAYER 1','HIDDEN LAYER 2','OUTPUT LAYER'],
    fa: ['لایه ورودی','لایه پنهان ۱','لایه پنهان ۲','لایه خروجی']
  },
  training: {
    en: ['PREDICTION','LOSS','BACKPROPAGATION','UPDATE'],
    fa: ['پیش‌بینی','تابع خطا','پس‌انتشار','به‌روزرسانی']
  },
  'training-data': {
    en: ['TEXT DATA','IMAGE DATA','AUDIO DATA','LABELS'],
    fa: ['داده متنی','داده تصویری','داده صوتی','برچسب‌ها']
  },
  'machine-learning': {
    en: ['SUPERVISED','UNSUPERVISED','REINFORCEMENT'],
    fa: ['یادگیری نظارت‌شده','یادگیری بدون‌نظارت','یادگیری تقویتی']
  },
  'deep-learning': {
    en: ['EARLY FEATURES','HIDDEN REPRESENTATIONS','DEEP FEATURES','PREDICTION'],
    fa: ['ویژگی‌های اولیه','نمایش‌های پنهان','ویژگی‌های عمیق','پیش‌بینی']
  },
  'model-training': {
    en: ['TRAINING BATCH','MODEL PARAMETERS','LOSS','OPTIMIZER'],
    fa: ['بچ آموزشی','پارامترهای مدل','خطا','بهینه‌ساز']
  },
  tokens: {
    en: ['TOKEN 01','TOKEN 02','TOKEN 03','TOKEN IDS'],
    fa: ['توکن ۰۱','توکن ۰۲','توکن ۰۳','شناسه توکن‌ها']
  },
  embeddings: {
    en: ['EMBEDDING VECTOR','SEMANTIC SPACE','SIMILAR CONCEPTS'],
    fa: ['بردار امبدینگ','فضای معنایی','مفاهیم مشابه']
  },
  llm: {
    en: ['CONTEXT','TRANSFORMER LAYERS','NEXT-TOKEN SCORES','NEXT TOKEN'],
    fa: ['زمینه','لایه‌های ترنسفورمر','امتیاز توکن بعدی','توکن بعدی']
  },
  transformer: {
    en: ['TOKEN EMBEDDINGS','MULTI-HEAD ATTENTION','FEED FORWARD','RESIDUAL PATH'],
    fa: ['امبدینگ توکن‌ها','توجه چندسری','شبکه پیش‌خور','مسیر باقیمانده']
  },
  attention: {
    en: ['QUERY','KEY','VALUE','ATTENTION WEIGHTS'],
    fa: ['Query','Key','Value','وزن‌های توجه']
  },
  prompt: {
    en: ['PROMPT','TOKENIZATION','EMBEDDINGS','MODEL CONTEXT'],
    fa: ['پرامپت','توکن‌سازی','امبدینگ‌ها','زمینه مدل']
  },
  generation: {
    en: ['CONTEXT','TOKEN PROBABILITIES','SAMPLING','GENERATED TOKEN'],
    fa: ['زمینه','احتمال توکن‌ها','نمونه‌گیری','توکن تولیدشده']
  },
  'generative-ai': {
    en: ['LEARNED PATTERNS','LATENT REPRESENTATION','GENERATION','NEW CONTENT'],
    fa: ['الگوهای آموخته‌شده','نمایش نهفته','تولید','محتوای جدید']
  },
  'computer-vision': {
    en: ['PIXELS','VISUAL FEATURES','OBJECT DETECTION','PREDICTION'],
    fa: ['پیکسل‌ها','ویژگی‌های بصری','تشخیص شیء','پیش‌بینی']
  },
  'image-generation': {
    en: ['RANDOM NOISE','DENOISING','LATENT IMAGE','FINAL IMAGE'],
    fa: ['نویز تصادفی','حذف نویز','تصویر نهفته','تصویر نهایی']
  },
  hallucinations: {
    en: ['MODEL PREDICTION','PLAUSIBLE TEXT','UNVERIFIED CLAIM','VERIFICATION'],
    fa: ['پیش‌بینی مدل','متن محتمل','ادعای تأییدنشده','راستی‌آزمایی']
  },
  'ai-pipeline': {
    en: ['DATA','TRAINING','MODEL','INFERENCE','OUTPUT'],
    fa: ['داده','آموزش','مدل','استنتاج','خروجی']
  }
};

const POSITIONS = [
  {left:'51%',top:'28%',side:'left'},
  {left:'66%',top:'43%',side:'right'},
  {left:'47%',top:'61%',side:'left'},
  {left:'70%',top:'68%',side:'right'},
  {left:'58%',top:'77%',side:'left'}
];

const style = document.createElement('style');
style.textContent = `
  #modelLabels{position:fixed;inset:0;z-index:8;pointer-events:none;overflow:hidden}
  .model-label{position:absolute;display:flex;align-items:center;gap:9px;transform:translate(-50%,-50%);filter:drop-shadow(0 12px 22px rgba(0,0,0,.4));animation:labelFloat 3.4s ease-in-out infinite;white-space:nowrap}
  .model-label:nth-child(2){animation-delay:-.8s}.model-label:nth-child(3){animation-delay:-1.7s}.model-label:nth-child(4){animation-delay:-2.3s}.model-label:nth-child(5){animation-delay:-1.1s}
  .model-label .pin{width:9px;height:9px;border-radius:50%;background:#48efff;box-shadow:0 0 0 4px rgba(72,239,255,.12),0 0 22px rgba(72,239,255,.95);flex:none}
  .model-label .line{width:42px;height:1px;background:linear-gradient(90deg,rgba(72,239,255,.9),rgba(121,92,255,.22));box-shadow:0 0 9px rgba(72,239,255,.45)}
  .model-label .tag{padding:8px 11px;border:1px solid rgba(151,232,255,.22);border-radius:10px;background:linear-gradient(135deg,rgba(9,26,49,.82),rgba(29,20,56,.68));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#eafaff;font:700 10px/1.1 Inter,system-ui,sans-serif;letter-spacing:.09em;text-transform:uppercase;box-shadow:inset 0 1px rgba(255,255,255,.08)}
  html[lang=fa] .model-label .tag{font-family:Vazirmatn,Inter,sans-serif;letter-spacing:0;text-transform:none;font-size:11px}
  .model-label.right{flex-direction:row-reverse}.model-label.right .line{background:linear-gradient(270deg,rgba(72,239,255,.9),rgba(121,92,255,.22))}
  .model-label:after{content:'';position:absolute;width:3px;height:3px;border-radius:50%;background:#fff;box-shadow:0 0 11px #48efff;left:4px;top:50%}
  @keyframes labelFloat{0%,100%{margin-top:0}50%{margin-top:-6px}}
  @media(max-width:700px){.model-label .line{width:20px}.model-label .tag{font-size:8px;padding:6px 8px}.model-label:nth-child(n+4){display:none}#modelLabels{z-index:9}.model-label:nth-child(1){left:55%!important;top:27%!important}.model-label:nth-child(2){left:70%!important;top:39%!important}.model-label:nth-child(3){left:57%!important;top:54%!important}}
`;
document.head.appendChild(style);

const layer = document.createElement('div');
layer.id = 'modelLabels';
document.body.appendChild(layer);

function currentSlug(){
  const raw = location.hash.replace(/^#\/?/,'');
  return raw || 'home';
}

function currentLang(){
  return document.documentElement.lang === 'fa' ? 'fa' : 'en';
}

function renderLabels(){
  const slug = currentSlug();
  const lang = currentLang();
  const labels = (LABELS[slug] || LABELS.home)[lang] || [];
  layer.innerHTML = labels.map((text,i)=>{
    const p=POSITIONS[i%POSITIONS.length];
    return `<div class="model-label ${p.side}" style="left:${p.left};top:${p.top}"><span class="pin"></span><span class="line"></span><span class="tag">${text}</span></div>`;
  }).join('');
}

window.addEventListener('hashchange',()=>requestAnimationFrame(renderLabels));
new MutationObserver(()=>requestAnimationFrame(renderLabels)).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});

renderLabels();
