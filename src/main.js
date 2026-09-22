import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const lessons = [
  ['introduction','AI Basics','What Is Artificial Intelligence?','هوش مصنوعی چیست؟','AI systems transform input data through learned mathematical parameters to produce predictions, decisions, or generated output.','سامانه‌های هوش مصنوعی داده ورودی را با پارامترهای آموخته‌شده پردازش می‌کنند تا پیش‌بینی، تصمیم یا خروجی جدید بسازند.'],
  ['artificial-neuron','Neural Networks','Artificial Neuron','نورون مصنوعی','A neuron combines inputs with weights and bias, then uses an activation function to create an output.','نورون مصنوعی ورودی‌ها را با وزن‌ها و بایاس ترکیب می‌کند و با تابع فعال‌سازی خروجی می‌سازد.'],
  ['neural-network','Neural Networks','Neural Network','شبکه عصبی','Neural networks connect many neurons into layers that progressively transform information.','شبکه عصبی نورون‌های زیادی را در لایه‌ها به هم متصل می‌کند تا اطلاعات مرحله‌به‌مرحله تغییر کنند.'],
  ['training','Learning','How AI Learns','هوش مصنوعی چگونه یاد می‌گیرد؟','Training compares a prediction with the target, measures loss, and updates model parameters.','در آموزش، پیش‌بینی با هدف مقایسه می‌شود، خطا اندازه‌گیری می‌شود و پارامترها به‌روزرسانی می‌شوند.'],
  ['training-data','Learning','Training Data','داده‌های آموزشی','Models learn statistical structure from examples such as text, images, audio, labels, and sensor data.','مدل‌ها ساختار آماری را از نمونه‌هایی مانند متن، تصویر، صدا، برچسب و داده حسگر یاد می‌گیرند.'],
  ['machine-learning','Learning','Machine Learning','یادگیری ماشین','Machine learning includes supervised, unsupervised, and reinforcement learning.','یادگیری ماشین شامل روش‌های نظارت‌شده، بدون‌نظارت و تقویتی است.'],
  ['deep-learning','Neural Networks','Deep Learning','یادگیری عمیق','Deep learning stacks many layers so simple features can become richer internal representations.','یادگیری عمیق لایه‌های متعدد را روی هم قرار می‌دهد تا ویژگی‌های ساده به نمایش‌های پیچیده‌تر تبدیل شوند.'],
  ['model-training','Learning','AI Model Training','آموزش مدل هوش مصنوعی','Batches move through the model, produce loss, and an optimizer changes parameters across many steps.','بچ‌های داده وارد مدل می‌شوند، خطا تولید می‌شود و بهینه‌ساز در چندین مرحله پارامترها را تغییر می‌دهد.'],
  ['tokens','Language Models','Tokens','توکن‌ها','Language models read text as tokens rather than as whole sentences.','مدل‌های زبانی متن را به صورت توکن‌ها می‌خوانند، نه یک جمله کامل انسانی.'],
  ['embeddings','Language Models','Embeddings','امبدینگ‌ها','Embeddings map tokens and concepts into vectors in a learned numerical space.','امبدینگ‌ها توکن‌ها و مفاهیم را به بردارهایی در یک فضای عددی آموخته‌شده تبدیل می‌کنند.'],
  ['llm','Language Models','Large Language Models','مدل‌های زبانی بزرگ','LLMs process context through transformer layers and predict scores for possible next tokens.','مدل‌های زبانی بزرگ زمینه را در لایه‌های ترنسفورمر پردازش می‌کنند و برای توکن بعدی امتیاز می‌سازند.'],
  ['transformer','Language Models','Transformer','ترنسفورمر','Transformers combine token embeddings, attention, feed-forward networks, and residual connections.','ترنسفورمر امبدینگ توکن، Attention، شبکه پیش‌خور و مسیرهای باقیمانده را ترکیب می‌کند.'],
  ['attention','Language Models','Attention Mechanism','مکانیزم Attention','Attention computes relationships between queries, keys, and values to mix useful context.','Attention رابطه میان Query، Key و Value را محاسبه می‌کند تا اطلاعات مهم زمینه ترکیب شوند.'],
  ['prompt','Language Models','How AI Processes a Prompt','هوش مصنوعی چگونه پرامپت را پردازش می‌کند؟','The prompt becomes tokens, embeddings, contextual hidden states, and finally next-token predictions.','پرامپت به توکن، امبدینگ، نمایش‌های زمینه‌ای و در نهایت پیش‌بینی توکن بعدی تبدیل می‌شود.'],
  ['generation','Language Models','How AI Generates an Answer','هوش مصنوعی چگونه پاسخ تولید می‌کند؟','Generation repeats a loop of scoring tokens, selecting one, appending it, and predicting again.','تولید پاسخ چرخه‌ای از امتیازدهی توکن‌ها، انتخاب یک توکن، افزودن آن و پیش‌بینی مجدد است.'],
  ['generative-ai','Generative AI','Generative AI','هوش مصنوعی مولد','Generative AI turns learned patterns and latent representations into new content.','هوش مصنوعی مولد الگوهای آموخته‌شده و نمایش نهفته را به محتوای جدید تبدیل می‌کند.'],
  ['computer-vision','AI Vision','Computer Vision','بینایی ماشین','Vision models transform pixels into visual features, object representations, and predictions.','مدل‌های بینایی پیکسل‌ها را به ویژگی بصری، نمایش اشیا و پیش‌بینی تبدیل می‌کنند.'],
  ['image-generation','Generative AI','AI Image Generation','تولید تصویر با هوش مصنوعی','Diffusion-style generation iteratively transforms noise into a structured image.','تولید تصویر مبتنی بر Diffusion در چند مرحله نویز را به تصویر ساختاریافته تبدیل می‌کند.'],
  ['hallucinations','AI Basics','AI Hallucinations','هذیان‌های هوش مصنوعی','A fluent model output can still contain unsupported claims, so verification matters.','خروجی روان مدل ممکن است همچنان ادعای تأییدنشده داشته باشد؛ بنابراین راستی‌آزمایی مهم است.'],
  ['ai-pipeline','AI Pipeline','Complete AI Pipeline','مسیر کامل هوش مصنوعی','A production AI system links data, training, model parameters, inference, tools, and final output.','یک سامانه هوش مصنوعی عملی داده، آموزش، مدل، استنتاج، ابزارها و خروجی نهایی را به هم متصل می‌کند.']
].map((x,i)=>({slug:x[0],category:x[1],number:i+1,title:{en:x[2],fa:x[3]},basic:{en:x[4],fa:x[5]}}));

const categoryFA = {'AI Basics':'مبانی هوش مصنوعی','Neural Networks':'شبکه‌های عصبی','Learning':'یادگیری','Language Models':'مدل‌های زبانی','Generative AI':'هوش مصنوعی مولد','AI Vision':'بینایی ماشین','AI Pipeline':'مسیر هوش مصنوعی'};
const copy={
  en:{journey:'YOUR AI JOURNEY',map:'AI LAB MAP',museum:'INTERACTIVE 3D AI MUSEUM',hero:'See how <span>AI</span><br>actually works.',desc:'Explore 20 interactive lessons with real 3D callouts connected to the exact objects they explain.',enter:'Enter the AI Lab →',click:'Click the 3D robot',ready:'Your AI guide is ready',basic:'Basic',details:'Details',advanced:'Advanced',previous:'Previous',next:'Next',mark:'Mark complete',completed:'Completed',guide:'3D GUIDE',guideHint:'Click a 3D label to see what that exact part does.',labels:'MODEL LABELS'},
  fa:{journey:'مسیر یادگیری شما',map:'نقشه آزمایشگاه',museum:'موزه تعاملی سه‌بعدی هوش مصنوعی',hero:'ببینید <span>هوش مصنوعی</span><br>واقعاً چگونه کار می‌کند.',desc:'۲۰ درس تعاملی را با لیبل‌هایی ببینید که واقعاً به همان بخش مدل سه‌بعدی متصل هستند.',enter:'ورود به آزمایشگاه ←',click:'روی ربات سه‌بعدی کلیک کنید',ready:'راهنمای هوش مصنوعی آماده است',basic:'ساده',details:'جزئیات',advanced:'پیشرفته',previous:'قبلی',next:'بعدی',mark:'تکمیل درس',completed:'تکمیل شده',guide:'راهنمای سه‌بعدی',guideHint:'روی هر لیبل سه‌بعدی کلیک کنید تا وظیفه همان بخش توضیح داده شود.',labels:'لیبل‌های مدل'}
};

const annotationText={
  home:[['Head Sensors','حسگرهای سر','Tracks the viewer and gives the AI guide an expressive face.','جهت نگاه کاربر را دنبال می‌کند و به ربات حالت زنده می‌دهد.'],['Neural Core','هسته عصبی','The glowing core represents the model that processes information.','هسته درخشان نماد مدلی است که اطلاعات را پردازش می‌کند.'],['Hover Drive','سامانه شناور','The lower ring visually represents the robot’s animated hover system.','حلقه پایینی سامانه شناور انیمیشنی ربات را نشان می‌دهد.']],
  introduction:[['Input Data','داده ورودی','Raw information enters the AI system here.','اطلاعات خام از این بخش وارد سامانه می‌شود.'],['AI Model','مدل هوش مصنوعی','Learned parameters transform the input.','پارامترهای آموخته‌شده ورودی را تبدیل می‌کنند.'],['Output','خروجی','The system returns a prediction, decision, or generated result.','سامانه یک پیش‌بینی، تصمیم یا خروجی تولیدشده برمی‌گرداند.']],
  'artificial-neuron':[['Inputs','ورودی‌ها','Numeric input values enter the neuron.','مقادیر عددی وارد نورون می‌شوند.'],['Weights + Bias','وزن‌ها + بایاس','Weights scale inputs and the bias shifts the combined signal.','وزن‌ها ورودی‌ها را مقیاس می‌کنند و بایاس مجموع را جابه‌جا می‌کند.'],['Activation','تابع فعال‌سازی','A nonlinear function transforms the combined signal.','یک تابع غیرخطی سیگنال ترکیب‌شده را تبدیل می‌کند.'],['Output','خروجی','The neuron passes its result to the next stage.','نورون نتیجه را به مرحله بعد می‌فرستد.']],
  'neural-network':[['Input Layer','لایه ورودی','Receives the original features.','ویژگی‌های اولیه را دریافت می‌کند.'],['Hidden Layer 1','لایه پنهان ۱','Builds intermediate representations.','نمایش‌های میانی را می‌سازد.'],['Hidden Layer 2','لایه پنهان ۲','Combines earlier features into richer patterns.','ویژگی‌های قبلی را به الگوهای غنی‌تر ترکیب می‌کند.'],['Output Layer','لایه خروجی','Produces the final scores or prediction.','امتیازها یا پیش‌بینی نهایی را تولید می‌کند.']],
  training:[['Prediction','پیش‌بینی','The model produces its current answer.','مدل پاسخ فعلی خود را تولید می‌کند.'],['Loss','خطا','Loss measures how far the prediction is from the target.','خطا فاصله پیش‌بینی تا هدف را اندازه می‌گیرد.'],['Backpropagation','پس‌انتشار','Gradients carry error information backward through the model.','گرادیان‌ها اطلاعات خطا را به عقب در مدل منتقل می‌کنند.'],['Parameter Update','به‌روزرسانی پارامتر','The optimizer changes weights to reduce future loss.','بهینه‌ساز وزن‌ها را برای کاهش خطای آینده تغییر می‌دهد.']],
  'training-data':[['Text Data','داده متنی','Text examples teach language patterns.','نمونه‌های متنی الگوهای زبانی را آموزش می‌دهند.'],['Image Data','داده تصویری','Images teach visual structure.','تصاویر ساختار بصری را آموزش می‌دهند.'],['Audio Data','داده صوتی','Audio teaches temporal and acoustic patterns.','صدا الگوهای زمانی و آکوستیک را آموزش می‌دهد.'],['Labels','برچسب‌ها','Labels can provide target answers for supervised learning.','برچسب‌ها پاسخ هدف را برای یادگیری نظارت‌شده فراهم می‌کنند.']],
  'machine-learning':[['Supervised','نظارت‌شده','Learns from examples paired with target labels.','از نمونه‌های دارای برچسب هدف یاد می‌گیرد.'],['Unsupervised','بدون‌نظارت','Finds structure without explicit target labels.','بدون برچسب هدف، ساختار را پیدا می‌کند.'],['Reinforcement','تقویتی','Learns behavior from rewards and penalties.','رفتار را از پاداش و جریمه یاد می‌گیرد.']],
  'deep-learning':[['Early Features','ویژگی‌های اولیه','Early layers detect simpler patterns.','لایه‌های اولیه الگوهای ساده‌تر را تشخیص می‌دهند.'],['Hidden Representation','نمایش پنهان','Middle layers reorganize information into useful features.','لایه‌های میانی اطلاعات را به ویژگی‌های مفید بازآرایی می‌کنند.'],['Deep Features','ویژگی‌های عمیق','Deeper layers represent more abstract patterns.','لایه‌های عمیق‌تر الگوهای انتزاعی‌تر را نمایش می‌دهند.'],['Prediction','پیش‌بینی','The final layer converts features into an output.','لایه نهایی ویژگی‌ها را به خروجی تبدیل می‌کند.']],
  'model-training':[['Training Batch','بچ آموزشی','A small batch of examples is processed together.','یک دسته کوچک از نمونه‌ها با هم پردازش می‌شوند.'],['Model Parameters','پارامترهای مدل','These learned numbers store the model’s behavior.','این اعداد آموخته‌شده رفتار مدل را شکل می‌دهند.'],['Loss','خطا','The objective measures training error.','تابع هدف خطای آموزش را اندازه می‌گیرد.'],['Optimizer','بهینه‌ساز','The optimizer updates parameters using gradients.','بهینه‌ساز با استفاده از گرادیان پارامترها را تغییر می‌دهد.']],
  tokens:[['Token 1','توکن ۱','A piece of the original text.','بخشی از متن اصلی است.'],['Token 2','توکن ۲','Another text fragment represented by an ID.','بخش دیگری از متن که با یک شناسه نمایش داده می‌شود.'],['Token IDs','شناسه توکن‌ها','Tokens become integers before entering the model.','توکن‌ها پیش از ورود به مدل به اعداد صحیح تبدیل می‌شوند.']],
  embeddings:[['Embedding Vector','بردار امبدینگ','A token is represented as many numeric dimensions.','توکن با تعداد زیادی بُعد عددی نمایش داده می‌شود.'],['Semantic Space','فضای معنایی','Vectors live in a learned geometric space.','بردارها در یک فضای هندسی آموخته‌شده قرار می‌گیرند.'],['Similar Concepts','مفاهیم مشابه','Related concepts often occupy nearby regions.','مفاهیم مرتبط معمولاً در نواحی نزدیک‌تری قرار می‌گیرند.']],
  llm:[['Context','زمینه','All currently available tokens form the context.','توکن‌های موجود زمینه فعلی را می‌سازند.'],['Transformer Layers','لایه‌های ترنسفورمر','Many layers repeatedly transform contextual representations.','لایه‌های متعدد نمایش‌های زمینه‌ای را بارها تبدیل می‌کنند.'],['Next-Token Scores','امتیاز توکن بعدی','The model scores many possible next tokens.','مدل برای توکن‌های بعدی ممکن امتیاز می‌سازد.'],['Next Token','توکن بعدی','A decoding rule selects the next token.','یک روش decoding توکن بعدی را انتخاب می‌کند.']],
  transformer:[['Token Embeddings','امبدینگ توکن‌ها','Numeric token vectors enter the transformer block.','بردارهای عددی توکن وارد بلوک ترنسفورمر می‌شوند.'],['Multi-Head Attention','توجه چندسری','Several attention heads mix information across positions.','چند سر Attention اطلاعات موقعیت‌های مختلف را ترکیب می‌کنند.'],['Feed Forward','شبکه پیش‌خور','A neural network transforms each position.','یک شبکه عصبی هر موقعیت را تبدیل می‌کند.'],['Residual Path','مسیر باقیمانده','Skip connections preserve and combine information.','اتصال‌های میان‌بُر اطلاعات را حفظ و ترکیب می‌کنند.']],
  attention:[['Query','Query','Represents what a token is looking for.','نشان می‌دهد یک توکن به دنبال چه اطلاعاتی است.'],['Key','Key','Represents what information a position can match.','نشان می‌دهد هر موقعیت با چه اطلاعاتی تطبیق دارد.'],['Value','Value','Carries the information that can be mixed into the result.','اطلاعاتی را حمل می‌کند که وارد نتیجه ترکیب می‌شود.'],['Attention Weight','وزن Attention','Controls how strongly one position influences another.','شدت اثر یک موقعیت بر موقعیت دیگر را تعیین می‌کند.']],
  prompt:[['Prompt','پرامپت','The user’s input begins the pipeline.','ورودی کاربر آغاز مسیر است.'],['Tokenization','توکن‌سازی','Text is split into model-readable pieces.','متن به قطعات قابل‌خواندن برای مدل تقسیم می‌شود.'],['Embeddings','امبدینگ‌ها','Token IDs become vectors.','شناسه‌های توکن به بردار تبدیل می‌شوند.'],['Model Context','زمینه مدل','Transformer layers build context-sensitive representations.','لایه‌های ترنسفورمر نمایش‌های وابسته به زمینه را می‌سازند.']],
  generation:[['Context','زمینه','The current token sequence conditions the next prediction.','دنباله فعلی توکن‌ها پیش‌بینی بعدی را شرطی می‌کند.'],['Token Probabilities','احتمال توکن‌ها','The model assigns scores to candidate tokens.','مدل به توکن‌های کاندید امتیاز می‌دهد.'],['Sampling','نمونه‌گیری','A decoding strategy selects one candidate.','یک روش decoding یک کاندید را انتخاب می‌کند.'],['Generated Token','توکن تولیدشده','The selected token is appended and the loop repeats.','توکن انتخاب‌شده اضافه می‌شود و چرخه تکرار می‌شود.']],
  'generative-ai':[['Learned Patterns','الگوهای آموخته‌شده','Training stores reusable statistical structure.','آموزش ساختار آماری قابل‌استفاده را ذخیره می‌کند.'],['Latent Representation','نمایش نهفته','A compact internal representation guides generation.','یک نمایش داخلی فشرده تولید را هدایت می‌کند.'],['Generation','تولید','The model converts internal structure into a new sample.','مدل ساختار داخلی را به نمونه جدید تبدیل می‌کند.'],['New Content','محتوای جدید','The final output can be text, image, audio, video, or 3D.','خروجی نهایی می‌تواند متن، تصویر، صدا، ویدئو یا سه‌بعدی باشد.']],
  'computer-vision':[['Pixels','پیکسل‌ها','Raw image pixels enter the model.','پیکسل‌های خام وارد مدل می‌شوند.'],['Visual Features','ویژگی‌های بصری','The model extracts edges, textures, shapes, and richer patterns.','مدل لبه، بافت، شکل و الگوهای غنی‌تر را استخراج می‌کند.'],['Object Representation','نمایش شیء','Features are combined into object-level information.','ویژگی‌ها به اطلاعات سطح شیء ترکیب می‌شوند.'],['Prediction','پیش‌بینی','The system returns a class, box, mask, or other result.','سامانه کلاس، جعبه، ماسک یا نتیجه دیگری برمی‌گرداند.']],
  'image-generation':[['Random Noise','نویز تصادفی','Generation can begin from a noisy latent state.','تولید می‌تواند از یک حالت نهفته پرنویز شروع شود.'],['Denoising','حذف نویز','The model repeatedly predicts how to remove noise.','مدل بارها پیش‌بینی می‌کند چگونه نویز را کم کند.'],['Latent Image','تصویر نهفته','A structured internal image representation emerges.','یک نمایش ساختاریافته داخلی از تصویر شکل می‌گیرد.'],['Final Image','تصویر نهایی','The latent result is decoded into visible pixels.','نتیجه نهفته به پیکسل‌های قابل مشاهده تبدیل می‌شود.']],
  hallucinations:[['Model Prediction','پیش‌بینی مدل','The model predicts plausible continuation, not guaranteed truth.','مدل ادامه محتمل را پیش‌بینی می‌کند، نه حقیقت تضمین‌شده.'],['Plausible Text','متن محتمل','Fluent wording can sound confident.','بیان روان می‌تواند بسیار مطمئن به نظر برسد.'],['Unsupported Claim','ادعای بی‌پشتوانه','A claim may lack reliable evidence.','یک ادعا ممکن است شواهد قابل اتکا نداشته باشد.'],['Verification','راستی‌آزمایی','Reliable sources or tools are used to check important claims.','برای بررسی ادعاهای مهم از منابع یا ابزارهای معتبر استفاده می‌شود.']],
  'ai-pipeline':[['Data','داده','Training examples enter the development pipeline.','نمونه‌های آموزشی وارد مسیر توسعه می‌شوند.'],['Training','آموزش','Optimization learns model parameters.','بهینه‌سازی پارامترهای مدل را یاد می‌گیرد.'],['Model','مدل','The trained parameters are stored in the model.','پارامترهای آموخته‌شده در مدل ذخیره می‌شوند.'],['Inference','استنتاج','New input is processed using learned parameters.','ورودی جدید با پارامترهای آموخته‌شده پردازش می‌شود.'],['Output','خروجی','The final prediction or generated result is returned.','پیش‌بینی یا نتیجه تولیدشده نهایی برگردانده می‌شود.']]
};

let lang=localStorage.getItem('how-ai-works-language')==='fa'?'fa':'en';
let current=-1;
let level='basic';
let progress=new Set();
try{const p=JSON.parse(localStorage.getItem('how-ai-works-progress')||'[]');if(Array.isArray(p))progress=new Set(p);}catch{}

document.documentElement.lang=lang;
document.documentElement.dir=lang==='fa'?'rtl':'ltr';

const root=document.querySelector('#app');
root.innerHTML=`<main class="app-shell"><div id="stage" class="stage"></div><div id="annotationLayer" class="annotation-layer"></div><div id="ui"></div><div id="fallback" class="fallback" hidden><h2>3D mode unavailable</h2><p>The educational content is still available.</p></div></main>`;
const stage=document.querySelector('#stage');
const uiRoot=document.querySelector('#ui');
const annotationLayer=document.querySelector('#annotationLayer');
const fallback=document.querySelector('#fallback');
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const drawer=document.querySelector('#drawer');if(drawer?.classList.contains('open'))document.querySelector('#closeDrawer')?.click();}});

const c=k=>copy[lang][k];
const titleOf=l=>l.title[lang];
const categoryOf=l=>lang==='fa'?(categoryFA[l.category]||l.category):l.category;

function detailText(l){
  if(level==='basic')return l.basic[lang];
  if(level==='details')return lang==='fa'?`${l.basic.fa} این شبیه‌سازی اجزای اصلی این فرایند را جدا می‌کند تا مسیر اطلاعات قابل مشاهده باشد.`:`${l.basic.en} This simulation separates the main components so the information path is easy to see.`;
  return lang==='fa'?`${l.basic.fa} در سامانه‌های واقعی جزئیات معماری، داده، تابع هدف و روش بهینه‌سازی روی رفتار نهایی اثر می‌گذارند.`:`${l.basic.en} In real systems, architecture, data, objective functions, and optimization details all shape the final behavior.`;
}

function renderUI(){
  uiRoot.innerHTML=`
    <header class="topbar glass">
      <button class="brand" id="homeBtn" aria-label="How AI Works — Home"><span class="brand-orb"></span><b>HOW AI WORKS</b></button>
      <div class="journey"><span>${c('journey')}</span><strong>${progress.size}/20</strong><i><em style="width:${progress.size/20*100}%"></em></i></div>
      <div class="top-actions"><div class="language-switch"><button data-lang="en" class="${lang==='en'?'active':''}">EN</button><button data-lang="fa" class="${lang==='fa'?'active':''}">فا</button></div><button class="icon-btn" id="menuBtn" aria-label="${c('map')}" aria-controls="drawer" aria-expanded="false">☰</button></div>
    </header>
    <button class="drawer-backdrop" id="drawerBackdrop" aria-label="Close lessons menu" tabindex="-1"></button>
    <aside class="lesson-drawer glass" id="drawer" role="dialog" aria-modal="true" aria-label="${c('map')}"><div class="drawer-head"><div><p class="eyebrow">EXPLORE</p><h2>${c('map')}</h2></div><button class="icon-btn" id="closeDrawer" aria-label="Close lessons menu">×</button></div><div id="lessonList" class="lesson-list"></div></aside>
    <section class="home-ui" ${current>=0?'hidden':''}><div class="hero-copy"><p class="eyebrow pill">${c('museum')}</p><h1>${c('hero')}</h1><p>${c('desc')}</p><button class="primary" id="enterBtn">${c('enter')}</button><div class="hero-meta"><span>20 interactive lessons</span><span>Anchored 3D labels</span><span>English / فارسی</span></div></div><div class="robot-hint glass"><span class="pulse-dot"></span><b>${c('click')}</b><small>${c('ready')}</small></div></section>
    <section class="lesson-ui" ${current<0?'hidden':''}>
      <div class="lesson-heading glass"><p class="eyebrow" id="lessonCategory"></p><h1 id="lessonTitle"></h1><p id="lessonBasic"></p><div class="level-tabs"><button data-level="basic" class="${level==='basic'?'active':''}">${c('basic')}</button><button data-level="details" class="${level==='details'?'active':''}">${c('details')}</button><button data-level="advanced" class="${level==='advanced'?'active':''}">${c('advanced')}</button></div></div>
      <div class="guide-panel glass" id="guidePanel"><div class="guide-kicker">${c('guide')}</div><h3 id="guideTitle">${c('labels')}</h3><p id="guideText">${c('guideHint')}</p></div>
      <nav class="lesson-nav glass" aria-label="Lesson navigation"><button id="prevBtn" aria-label="${c('previous')}">← <span>${c('previous')}</span></button><button id="completeBtn" class="complete-btn"></button><button id="nextBtn" aria-label="${c('next')}"><span>${c('next')}</span> →</button></nav>
    </section>`;

  const drawer=document.querySelector('#drawer');
  const menuBtn=document.querySelector('#menuBtn');
  drawer.inert=true;
  const closeMenu=()=>{drawer.classList.remove('open');drawer.inert=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.focus({preventScroll:true});};
  menuBtn.onclick=()=>{drawer.classList.add('open');drawer.inert=false;menuBtn.setAttribute('aria-expanded','true');document.querySelector('#closeDrawer').focus({preventScroll:true});};
  document.querySelector('#closeDrawer').onclick=closeMenu;
  document.querySelector('#drawerBackdrop').onclick=closeMenu;
  document.querySelector('#homeBtn').onclick=showHome;
  document.querySelector('#enterBtn')?.addEventListener('click',()=>openLesson(0));
  document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem('how-ai-works-language',lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';renderUI();if(current>=0){updateLessonUI();refreshAnnotationContent();}else buildHomeScene();});
  document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=b.dataset.level;renderUI();if(current>=0)updateLessonUI();});
  renderLessonList();
  if(current>=0)updateLessonUI();
}

function renderLessonList(){
  const list=document.querySelector('#lessonList');
  if(!list)return;
  const cats=[...new Set(lessons.map(l=>l.category))];
  list.innerHTML=cats.map(cat=>`<div class="lesson-group"><p>${lang==='fa'?(categoryFA[cat]||cat):cat}</p>${lessons.filter(l=>l.category===cat).map(l=>`<button class="lesson-link ${current===l.number-1?'selected':''}" data-index="${l.number-1}"><span>${String(l.number).padStart(2,'0')}</span><b>${titleOf(l)}</b><i>${progress.has(l.slug)?'✓':'→'}</i></button>`).join('')}</div>`).join('');
  list.querySelectorAll('[data-index]').forEach(b=>b.onclick=()=>{document.querySelector('#drawer').classList.remove('open');openLesson(Number(b.dataset.index));});
}

function updateLessonUI(){
  const l=lessons[current];if(!l)return;
  document.querySelector('#lessonCategory').textContent=`${String(l.number).padStart(2,'0')} / ${categoryOf(l)}`;
  document.querySelector('#lessonTitle').textContent=titleOf(l);
  document.querySelector('#lessonBasic').textContent=detailText(l);
  const prev=document.querySelector('#prevBtn'),next=document.querySelector('#nextBtn'),complete=document.querySelector('#completeBtn');
  prev.disabled=current===0;next.disabled=current===lessons.length-1;
  prev.onclick=()=>current>0&&openLesson(current-1);next.onclick=()=>current<lessons.length-1&&openLesson(current+1);
  complete.textContent=progress.has(l.slug)?c('completed'):c('mark');
  complete.classList.toggle('done',progress.has(l.slug));
  complete.onclick=()=>{progress.has(l.slug)?progress.delete(l.slug):progress.add(l.slug);localStorage.setItem('how-ai-works-progress',JSON.stringify([...progress]));renderUI();};
}

function showGuide(index){
  if(index<0||index>=annotationTargets.length)return;
  activeAnnotation=index;
  annotationTargets.forEach((a,i)=>a.el?.classList.toggle('active',i===index));
  const data=annotationTargets[index].data;
  const title=document.querySelector('#guideTitle'),text=document.querySelector('#guideText');
  if(title)title.textContent=data[lang==='fa'?1:0];
  if(text)text.textContent=data[lang==='fa'?3:2];
}

function showHome(){current=-1;location.hash='#/';renderUI();buildHomeScene();}
function openLesson(i){current=Math.max(0,Math.min(lessons.length-1,i));location.hash=`#/${lessons[current].slug}`;renderUI();buildLessonScene(current);}

let renderer,scene,camera,controls,robot,vizGroup,raycaster,pointer,mouseX=0,mouseY=0;
const robotParts={};
let annotationTargets=[];
let activeAnnotation=-1;

function init3D(){
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;stage.appendChild(renderer.domElement);
    scene=new THREE.Scene();scene.background=new THREE.Color(0x050b18);scene.fog=new THREE.FogExp2(0x07121f,.035);
    camera=new THREE.PerspectiveCamera(46,innerWidth/innerHeight,.1,100);camera.position.set(0,.65,9);
    controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=5.8;controls.maxDistance=12;controls.target.set(.6,0,0);
    scene.add(new THREE.HemisphereLight(0xc5f7ff,0x130826,2.2));
    const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(4,7,5);scene.add(key);
    const cyan=new THREE.PointLight(0x35efff,22,18);cyan.position.set(-4,2,4);scene.add(cyan);
    const pink=new THREE.PointLight(0xff4fc8,15,16);pink.position.set(4,1,2);scene.add(pink);
    const grid=new THREE.GridHelper(36,36,0x2a7ea0,0x143249);grid.position.y=-2;grid.material.transparent=true;grid.material.opacity=.14;scene.add(grid);
    const starGeo=new THREE.BufferGeometry(),count=180,pos=new Float32Array(count*3);for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*24;pos[i*3+1]=(Math.random()-.5)*14;pos[i*3+2]=-Math.random()*18;}starGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({size:.045,color:0x6defff,transparent:true,opacity:.5})));
    raycaster=new THREE.Raycaster();pointer=new THREE.Vector2();
    renderer.domElement.addEventListener('pointermove',e=>{mouseX=e.clientX/innerWidth-.5;mouseY=e.clientY/innerHeight-.5;});
    renderer.domElement.addEventListener('click',e=>{if(!robot||current>=0)return;pointer.x=e.clientX/innerWidth*2-1;pointer.y=-(e.clientY/innerHeight*2-1);raycaster.setFromCamera(pointer,camera);if(raycaster.intersectObject(robot,true).length)openLesson(0);});
    addEventListener('resize',onResize);animate();
  }catch(err){console.error(err);fallback.hidden=false;stage.style.display='none';}
}

function onResize(){if(!camera||!renderer)return;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);layoutSceneForViewport();}
function layoutSceneForViewport(){if(!vizGroup)return;const mobile=innerWidth<720;vizGroup.scale.setScalar(mobile?.76:1);vizGroup.position.set(mobile?0:-.2,mobile?-.55:0,0);if(robot&&current<0){robot.position.x=mobile?0:2;robot.scale.setScalar(mobile?.85:1.18);}if(controls){controls.target.set(mobile?0:.6,mobile?-.25:0,0);controls.update();}}
function material(color,emissive=0){return new THREE.MeshStandardMaterial({color,roughness:.24,metalness:.48,emissive:emissive?color:0x000000,emissiveIntensity:emissive});}
function glow(color){return new THREE.MeshBasicMaterial({color,transparent:true,opacity:.82});}

function makeRobot(scale=1){
  const g=new THREE.Group();const white=material(0xeefaff),dark=new THREE.MeshStandardMaterial({color:0x071426,roughness:.12,metalness:.55}),cyan=material(0x35efff,4),violet=material(0x7657ff,3),pink=material(0xff4fc8,3);
  const body=new THREE.Mesh(new THREE.SphereGeometry(.72,40,30),white);body.scale.set(1,.9,.76);g.add(body);
  const chest=new THREE.Mesh(new THREE.TorusGeometry(.16,.035,12,36),cyan);chest.position.set(0,.02,.56);g.add(chest);
  const core=new THREE.Mesh(new THREE.SphereGeometry(.07,20,16),violet);core.position.set(0,.02,.58);g.add(core);robotParts.core=core;
  const head=new THREE.Group();head.position.y=1.05;g.add(head);robotParts.head=head;
  const skull=new THREE.Mesh(new THREE.SphereGeometry(.68,40,30),white);skull.scale.set(1.08,.8,.82);head.add(skull);
  const visor=new THREE.Mesh(new THREE.BoxGeometry(1.02,.42,.08),dark);visor.position.z=.52;head.add(visor);
  const eyeL=new THREE.Mesh(new THREE.SphereGeometry(.075,20,16),cyan),eyeR=eyeL.clone();eyeL.position.set(-.22,.02,.59);eyeR.position.set(.22,.02,.59);head.add(eyeL,eyeR);robotParts.eyeL=eyeL;robotParts.eyeR=eyeR;
  const ant=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.34,12),white);ant.position.y=.65;head.add(ant);const tip=new THREE.Mesh(new THREE.SphereGeometry(.07,18,14),pink);tip.position.y=.84;head.add(tip);robotParts.tip=tip;
  for(const side of [-1,1]){const shoulder=new THREE.Mesh(new THREE.SphereGeometry(.14,22,16),white);shoulder.position.set(side*.76,.08,0);g.add(shoulder);const arm=new THREE.Mesh(new THREE.CylinderGeometry(.09,.1,.56,18),white);arm.position.set(side*.92,-.2,0);arm.rotation.z=side*.32;g.add(arm);const hand=new THREE.Mesh(new THREE.SphereGeometry(.13,20,16),white);hand.position.set(side*1.02,-.5,0);g.add(hand);}
  const hover=new THREE.Mesh(new THREE.TorusGeometry(.48,.028,10,48),glow(0x35efff));hover.rotation.x=Math.PI/2;hover.position.y=-.82;g.add(hover);robotParts.hover=hover;
  g.userData={headAnchor:skull,coreAnchor:core,hoverAnchor:hover};g.scale.setScalar(scale);return g;
}

function clearViz(){if(vizGroup)scene.remove(vizGroup);if(robot)scene.remove(robot);vizGroup=new THREE.Group();scene.add(vizGroup);annotationTargets=[];activeAnnotation=-1;annotationLayer.innerHTML='';}
function addNode(x,y,z,color=0x35efff,r=.18,parent=vizGroup){const m=new THREE.Mesh(new THREE.SphereGeometry(r,24,18),material(color,2));m.position.set(x,y,z);parent.add(m);return m;}
function addLine(a,b,color=0x6388a8,parent=vizGroup){const geo=new THREE.BufferGeometry().setFromPoints([a.position.clone(),b.position.clone()]);parent.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:.5})));}
function addBox(x,y,z,color=0x35efff,size=[.7,.42,.35],parent=vizGroup){const m=new THREE.Mesh(new THREE.BoxGeometry(...size),material(color,1.5));m.position.set(x,y,z);parent.add(m);return m;}
function addAnnotation(object,data,side='right'){if(!object||!data)return;annotationTargets.push({object,data,side,el:null});}

function refreshAnnotationContent(){annotationTargets.forEach((a,i)=>{if(a.el){a.el.querySelector('.anno-title').textContent=a.data[lang==='fa'?1:0];a.el.querySelector('.anno-desc').textContent=a.data[lang==='fa'?3:2];}});if(activeAnnotation>=0)showGuide(activeAnnotation);}
function buildAnnotationDOM(){annotationLayer.innerHTML='';annotationTargets.forEach((a,i)=>{const el=document.createElement('button');el.type='button';el.className=`annotation ${a.side}`;el.innerHTML=`<span class="anno-pin"></span><span class="anno-line"></span><span class="anno-card"><b class="anno-title">${a.data[lang==='fa'?1:0]}</b><small class="anno-desc">${a.data[lang==='fa'?3:2]}</small></span>`;el.onclick=e=>{e.stopPropagation();showGuide(i);};annotationLayer.appendChild(el);a.el=el;});if(annotationTargets.length&&current>=0)showGuide(0);}

function addArrow(from,to,color=0x35efff){const dir=to.clone().sub(from);const len=dir.length();const arrow=new THREE.ArrowHelper(dir.clone().normalize(),from,len,color,.18,.1);vizGroup.add(arrow);return arrow;}

function buildHomeScene(){
  if(!scene)return;clearViz();robot=makeRobot(1.18);robot.position.set(2.0,.05,0);scene.add(robot);
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(2.15+i*.38,.015,8,96),new THREE.MeshBasicMaterial({color:[0x35efff,0x7657ff,0xff4fc8,0xffb348][i],transparent:true,opacity:.22}));r.position.set(2,.45,-.25);r.rotation.x=Math.PI/2+i*.1;vizGroup.add(r);}
  const data=annotationText.home;addAnnotation(robot.userData.headAnchor,data[0],'left');addAnnotation(robot.userData.coreAnchor,data[1],'right');addAnnotation(robot.userData.hoverAnchor,data[2],'right');buildAnnotationDOM();layoutSceneForViewport();
}

function semanticData(slug){return annotationText[slug]||annotationText.introduction;}
function buildLessonScene(i){
  if(!scene)return;clearViz();robot=makeRobot(.31);robot.position.set(3.65,-1.35,.6);scene.add(robot);
  const slug=lessons[i].slug,data=semanticData(slug);
  if(['neural-network','deep-learning'].includes(slug))buildLayeredNetwork(data);
  else if(slug==='artificial-neuron')buildNeuron(data);
  else if(['tokens','prompt','generation','llm','transformer','ai-pipeline'].includes(slug))buildPipeline(data,slug);
  else if(slug==='attention')buildAttention(data);
  else if(['training','model-training'].includes(slug))buildTrainingLoop(data);
  else if(slug==='training-data')buildDataTypes(data);
  else if(slug==='machine-learning')buildThreeBranches(data);
  else if(slug==='embeddings')buildEmbeddingSpace(data);
  else if(slug==='computer-vision')buildVision(data);
  else if(slug==='image-generation')buildDiffusion(data);
  else if(slug==='hallucinations')buildVerification(data);
  else if(slug==='generative-ai')buildGenerative(data);
  else buildGenericAI(data);
  buildAnnotationDOM();layoutSceneForViewport();
}

function buildGenericAI(data){const input=addBox(-2.7,.25,0,0x35efff,[1.1,.65,.4]);const model=addNode(.2,.25,0,0x7657ff,.6);const out=addBox(2.65,.25,0,0xa1ff72,[1.1,.65,.4]);addArrow(new THREE.Vector3(-2.05,.25,0),new THREE.Vector3(-.5,.25,0));addArrow(new THREE.Vector3(.9,.25,0),new THREE.Vector3(2.05,.25,0),0xa1ff72);addAnnotation(input,data[0],'left');addAnnotation(model,data[1],'right');addAnnotation(out,data[2],'right');}
function buildNeuron(data){const inputs=[];[-1.2,-.4,.4,1.2].forEach((y,n)=>inputs.push(addNode(-2.8,y,0,[0x35efff,0x7657ff,0xff4fc8,0xffb348][n],.22)));const sum=addNode(-.65,0,0,0xffffff,.48);inputs.forEach(n=>addLine(n,sum));const act=addNode(.9,0,0,0x7657ff,.38);addArrow(new THREE.Vector3(-.15,0,0),new THREE.Vector3(.48,0,0),0x7657ff);const out=addNode(2.6,0,0,0xa1ff72,.3);addArrow(new THREE.Vector3(1.3,0,0),new THREE.Vector3(2.25,0,0),0xa1ff72);addAnnotation(inputs[1],data[0],'left');addAnnotation(sum,data[1],'right');addAnnotation(act,data[2],'right');addAnnotation(out,data[3],'right');}
function buildLayeredNetwork(data){const layers=[4,6,5,3],anchors=[];const all=[];layers.forEach((count,li)=>{const arr=[];for(let n=0;n<count;n++)arr.push(addNode(-3+li*2,(n-(count-1)/2)*.58,0,[0x35efff,0x7657ff,0xff4fc8,0xa1ff72][li],.15));all.push(arr);anchors.push(arr[Math.floor(arr.length/2)]);});for(let li=0;li<all.length-1;li++){all[li].forEach(a=>all[li+1].forEach(b=>addLine(a,b,0x4e7190)));}anchors.forEach((a,idx)=>addAnnotation(a,data[Math.min(idx,data.length-1)],idx<2?'left':'right'));}
function buildPipeline(data,slug){const colors=[0x35efff,0x7657ff,0xff4fc8,0xffb348,0xa1ff72];const count=Math.min(data.length,5),arr=[];for(let n=0;n<count;n++){const x=-3+n*(6/(count-1||1));const box=addBox(x,0,0,colors[n],[.85,.62,.42]);arr.push(box);if(n>0)addArrow(new THREE.Vector3(arr[n-1].position.x+.48,0,0),new THREE.Vector3(x-.48,0,0),colors[n]);addAnnotation(box,data[n],n<Math.ceil(count/2)?'left':'right');}if(slug==='tokens'){arr.forEach((m,n)=>m.rotation.z=(n%2?-.08:.08));}if(slug==='transformer'){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.25,.035,10,72),glow(0x7657ff));ring.rotation.x=Math.PI/2;ring.position.set(0,0,-.5);vizGroup.add(ring);}}
function buildAttention(data){const q=addNode(-2.3,.9,0,0x35efff,.3),k=addNode(-2.3,-.1,0,0x7657ff,.3),v=addNode(-2.3,-1.1,0,0xff4fc8,.3),mix=addNode(1.0,0,0,0xffb348,.58);[q,k,v].forEach((n,idx)=>addLine(n,mix,[0x35efff,0x7657ff,0xff4fc8][idx]));const out=addNode(2.7,0,0,0xa1ff72,.32);addArrow(new THREE.Vector3(1.65,0,0),new THREE.Vector3(2.35,0,0),0xa1ff72);[q,k,v,mix].forEach((o,idx)=>addAnnotation(o,data[idx],idx<2?'left':'right'));}
function buildTrainingLoop(data){const p=addBox(-2.2,.9,0,0x35efff,[1,.55,.4]),loss=addBox(1.5,.9,0,0xff4fc8,[1,.55,.4]),back=addBox(1.5,-1,0,0x7657ff,[1.1,.55,.4]),upd=addBox(-2.2,-1,0,0xa1ff72,[1.1,.55,.4]);addArrow(new THREE.Vector3(-1.6,.9,0),new THREE.Vector3(.9,.9,0));addArrow(new THREE.Vector3(1.5,.55,0),new THREE.Vector3(1.5,-.65,0),0xff4fc8);addArrow(new THREE.Vector3(.9,-1,0),new THREE.Vector3(-1.6,-1,0),0x7657ff);addArrow(new THREE.Vector3(-2.2,-.65,0),new THREE.Vector3(-2.2,.55,0),0xa1ff72);[p,loss,back,upd].forEach((o,idx)=>addAnnotation(o,data[idx],idx%2===0?'left':'right'));}
function buildDataTypes(data){const icons=[];const pos=[[-2.3,.9],[0,.9],[2.3,.9],[0,-1]];pos.forEach((p,n)=>{const g=addBox(p[0],p[1],0,[0x35efff,0x7657ff,0xff4fc8,0xa1ff72][n],[1.2,.75,.42]);icons.push(g);addAnnotation(g,data[n],n%2===0?'left':'right');});}
function buildThreeBranches(data){const center=addNode(0,0,0,0xffffff,.42);const nodes=[addBox(-2.5,.8,0,0x35efff,[1.1,.6,.4]),addBox(0,-1.45,0,0x7657ff,[1.1,.6,.4]),addBox(2.5,.8,0,0xff4fc8,[1.1,.6,.4])];nodes.forEach((n,idx)=>{addLine(n,center);addAnnotation(n,data[idx],idx===0?'left':'right');});}
function buildEmbeddingSpace(data){const cloud=[];for(let i=0;i<34;i++)cloud.push(addNode((Math.random()-.5)*5,(Math.random()-.5)*2.8,(Math.random()-.5)*2,[0x35efff,0x7657ff,0xff4fc8][i%3],.07+Math.random()*.06));const anchor=cloud[4],near=cloud[7],space=cloud[20];addAnnotation(anchor,data[0],'left');addAnnotation(space,data[1],'right');addAnnotation(near,data[2],'right');}
function buildVision(data){const pixels=addBox(-2.8,0,0,0x35efff,[1.2,1.2,.25]);const features=addBox(-.8,0,0,0x7657ff,[1,1,.35]);const object=addNode(1.1,0,0,0xffb348,.5);const pred=addBox(2.8,0,0,0xa1ff72,[1.1,.7,.35]);addArrow(new THREE.Vector3(-2.1,0,0),new THREE.Vector3(-1.35,0,0));addArrow(new THREE.Vector3(-.25,0,0),new THREE.Vector3(.55,0,0),0x7657ff);addArrow(new THREE.Vector3(1.65,0,0),new THREE.Vector3(2.2,0,0),0xa1ff72);[pixels,features,object,pred].forEach((o,idx)=>addAnnotation(o,data[idx],idx<2?'left':'right'));}
function buildDiffusion(data){const stages=[];for(let i=0;i<4;i++){const g=new THREE.Group();g.position.x=-3+i*2;for(let n=0;n<24;n++)addNode((Math.random()-.5)*.8,(Math.random()-.5)*1.2,(Math.random()-.5)*.4,[0x8090a0,0x7657ff,0xff4fc8,0x35efff][i],.045+i*.012,g);vizGroup.add(g);stages.push(g);if(i>0)addArrow(new THREE.Vector3(-3+(i-1)*2+.6,0,0),new THREE.Vector3(-3+i*2-.6,0,0),[0x7657ff,0xff4fc8,0xa1ff72][i-1]);addAnnotation(g,data[i],i<2?'left':'right');}}
function buildVerification(data){const arr=[addBox(-2.7,.9,0,0x35efff,[1.2,.55,.35]),addBox(-.9,.2,0,0x7657ff,[1.3,.55,.35]),addBox(.9,-.5,0,0xff4fc8,[1.35,.55,.35]),addBox(2.7,.5,0,0xa1ff72,[1.2,.55,.35])];for(let i=1;i<arr.length;i++)addArrow(arr[i-1].position.clone().add(new THREE.Vector3(.7,0,0)),arr[i].position.clone().add(new THREE.Vector3(-.7,0,0)),[0x7657ff,0xff4fc8,0xa1ff72][i-1]);arr.forEach((o,idx)=>addAnnotation(o,data[idx],idx<2?'left':'right'));}
function buildGenerative(data){const seed=addNode(-2.7,0,0,0x35efff,.4),latent=new THREE.Mesh(new THREE.TorusKnotGeometry(.55,.14,90,14),material(0x7657ff,2));latent.position.set(-.7,0,0);vizGroup.add(latent);const gen=addBox(1.1,0,0,0xff4fc8,[1.1,.75,.45]),out=addNode(2.9,0,0,0xa1ff72,.45);addArrow(new THREE.Vector3(-2.2,0,0),new THREE.Vector3(-1.35,0,0));addArrow(new THREE.Vector3(0,0,0),new THREE.Vector3(.5,0,0),0xff4fc8);addArrow(new THREE.Vector3(1.75,0,0),new THREE.Vector3(2.4,0,0),0xa1ff72);[seed,latent,gen,out].forEach((o,idx)=>addAnnotation(o,data[idx],idx<2?'left':'right'));}

const clock=new THREE.Clock();
const tempV=new THREE.Vector3();
function updateAnnotations(){
  if(!camera||!annotationTargets.length)return;
  const rect=renderer.domElement.getBoundingClientRect();
  annotationTargets.forEach(a=>{if(!a.el)return;a.object.getWorldPosition(tempV);const v=tempV.clone().project(camera);const visible=v.z>-1&&v.z<1;const x=(v.x*.5+.5)*rect.width+rect.left;const y=(-v.y*.5+.5)*rect.height+rect.top;const margin=70;const inView=x>-margin&&x<innerWidth+margin&&y>-margin&&y<innerHeight+margin;a.el.style.display=visible&&inView?'flex':'none';a.el.style.left=`${Math.max(18,Math.min(innerWidth-18,x))}px`;a.el.style.top=`${Math.max(80,Math.min(innerHeight-70,y))}px`;a.el.classList.toggle('flip',x>innerWidth*.68);});
}
function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();controls?.update();if(robot){const targetY=current<0?.05:-1.35;robot.position.y+=(targetY+Math.sin(t*1.6)*.035-robot.position.y)*.08;if(robotParts.head){robotParts.head.rotation.y+=(mouseX*.35-robotParts.head.rotation.y)*.08;robotParts.head.rotation.x+=(-mouseY*.12-robotParts.head.rotation.x)*.08;}if(robotParts.core)robotParts.core.scale.setScalar(1+Math.sin(t*3)*.14);if(robotParts.tip)robotParts.tip.scale.setScalar(1+Math.sin(t*2.5)*.12);if(robotParts.hover)robotParts.hover.rotation.z=t*.55;const blink=Math.sin(t*.72)>.988?.12:1;if(robotParts.eyeL){robotParts.eyeL.scale.y=blink;robotParts.eyeR.scale.y=blink;}}if(vizGroup&&current>=0)vizGroup.rotation.y+=.0012;updateAnnotations();renderer?.render(scene,camera);}

renderUI();
init3D();
const slug=location.hash.replace(/^#\/?/,'');const initial=lessons.findIndex(l=>l.slug===slug);if(initial>=0)openLesson(initial);else buildHomeScene();
