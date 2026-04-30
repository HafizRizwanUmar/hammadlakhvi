const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Article = require('./models/Article');
const Video = require('./models/Video');
const User = require('./models/User');

dotenv.config();

// Helper to convert **bold** to <strong>bold</strong> and handle newlines for Rich Text Editor
const formatContentToHTML = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .split('\n')
    .map(para => para.trim() ? `<p>${para.trim()}</p>` : '')
    .join('');
};

const ARTICLES_DATA = [
  {
    id: "dawat-e-deen-khawateen",
    title: "دعوت دین میں خواتین کا کردار",
    titleEn: "The Role of Women in Dawah",
    journal: "N/A",
    year: "2024",
    lang: "urdu",
    category: "Contemporary",
    authors: "Prof. Dr. Muhammad Hammad Lakhvi",
    thumbnail: "/article2.jpeg",
    url: "https://youtu.be/10Ya6NKAy-Q?si=U1nDYqSr2e9BD2ob",
    abstract: "اس مضمون میں اسلام کی روشنی میں دعوت دین کے حوالے سے خواتین کی ذمہ داریاں اور ان کے اہم کردار کا جائزہ لیا گیا ہے۔ یہ گفتگو پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللّٰہ کی مکہ مکرمہ کی آن لائن دعوت دین کانفرنس سے ماخوذ ہے۔",
    content: `دعوت دین میں خواتین کا کردار
(پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللّٰہ کی مرکز بصیرت مکہ مکرمہ کی آن لائن دعوت دین کانفرنس میں کی جانے والی گفتگو سے ماخُوذ )

وَمَنْ اَحْسَنُ قَوْلًا مِّمَّنْ دَعَآ اِلَى اللّٰهِ وَعَمِلَ صَالِحًـا وَّقَالَ اِنَّنِيْ مِنَ الْمُسْلِمِيْنَ (سورۃ الفصلت:33)
ترجمہ: اور اس شخص سے اچھی بات کس کی ہوسکتی ہے جس نے اللہ کی طرف بلایا اور نیک عمل کئے اور کہا کہ میں (اللہ کا) فرمان بردار ہوں۔

**1) دعوت دین ہر مرد و عورت پر فرض :**
دعوت دین ہر مسلمان مرد و عورت کا compulsory مضمون (فریضہ) ہے۔
{ خواتین کے لیے نصیحت: دعوت دین عورتوں پر بھی ایسے ہی فرض ہے جیسے مردوں پر۔}

**2) ہر شخص داعی ہوتا ہے :**
ہر شخص کسی دوسرے سے inspire (متاثر) ہورہا ہوتا ہے۔یا کسی دوسرے کو inspire کر رہا ہوتا ہے۔گویا یا تو کوئی ہماری دعوت کا شکار ہو رہا ہوتا یا ہم کسی سے دعوت لے رہے ہوتے یعنی اس کی دعوت کا شکار ہو رہا ہو رہا ہوتا ہے۔جو شخص اپنی زندگی میں ، کردار و اقدار میں مضبوط ہوتا ہے تو لوگ اس سے دعوت حاصل کر رہے ہوتے ہیں گویا وہ داعی ہوتا ہے۔اگر وہ مضبوط نہیں ہے تو کسی کی دعوت کا شکار ہو رہا ہورہا ہوتا ہے۔جیسے بچے بڑوں سے متاثر ہوتے ہیں۔شاگرد اساتذہ سے متاثر ہوتے ہیں ۔
{ خواتین کے لیے نصیحت: خواتین بطور ماں /استاد آنے والی نسلوں کو کیسے inspire کر رہی ہیں تا کہ ایک اچھا مسلمان معاشرہ پراوان چڑھے؟کیا خواتین کردار ، اقدار ، دین میں اتنی مضبوط ہیں کہ ان سے inspire ہونے والے بچے کسی غیر اللہ کی دعوت کا شکار نہ ہو جایئں؟}

**3) داعی الی اللہ یا داعی الی غیر اللہ**
لوگ دو طرح کے ہیں ۔خیر کی طرف دعوت دینے والے یا شر کی طرف دعوت دینے والے. ہر مسلمان مرد و عورت کو داعی الی اللہ ہونا ، داعی الی الخیر یعنی "مفاتیح الخیر"۔۔ خیر کے دروازے کھولنے والے،خیر کی طرف دعوت دینے والے ہونا چاہیے۔اسے شریعت کی اصطلاح "امر بالمعروف و نہی عن المنکر"کہتے ہیں۔اگر کوئی خیر کی طرف دعوت دے رہا ہے یا برائی سے روک رہا ہے تو وہ "داعی الی الخیر" ہے۔یہ ہر مسلمان مرد و عورت پر فرض ہے اس کو ترک کرنے ولا سزا کا مستحق ٹہرتا ہے۔
قَالَتْ: سَمِعْتُ رَسُوْلَ اللهِ صلی الله عليه وآله وسلم يَقُوْلُ: مُرُوْا بِالْمَعْرُوْفِ وَانْهَوْا عَنِ الْمُنْکَرِ، قَبْلَ أَنْ تَدْعُوْا فَـلَا يُسْتَجَابُ لَکُمْ.(رَوَاهُ ابْنُ مَاجَه وَالطَّبَرَانِيُّ )
ترجمہ:ایک اور روایت میں حضرت عائشہ صدیقہ رضی اللہ عنها بیان کرتی ہیں: میں نے رسول اللہ ﷺ کو فرماتے ہوئے سنا: نیکی کا حکم دو اور برائی سے منع کرو قبل اس کے کہ (ایسا وقت آجائے جب) تم اللہ تعالیٰ سے دعا مانگو (مگر) تمہاری دعا کو قبول نہ کیا جائے۔
یہاں ایک اور بات بھی گوش گزار کر لیں کہ امر بالمعروف ونهی عن المنکر کے ساتھ ساتھ دعوت کا ایک اہم پہلو یہ بھی ہے جو ایک داعی کو جاننا چاہیے کہ داعی صرف وہ نہیں ہے جو لمبی لمبی تقاریر کرے داعی وہ بھی ہے کہ جس کو دیکھ کر جس کے پاس بیٹھ کر چاہے وہ خاموش ہو اسے دیکھ کر "اللہ" یاد آ جائے۔جیسا کہ رسول اللہ ﷺ جب شام کی منڈی میں خضرت خدیجہ رضی اللہ عنھا کا مال لے کر گئے، غلے پر بارش پڑ گئی تو رسول اللہ ﷺ نے گیلا مال علیحدہ کر دیا اور خشک مال علیحدہ کر دیا ، آپ کی اس دیانت داری سے پوری منڈی میں آپ صدیق و امانت دار تاجر کے طور پر مشہور ہو گئے، یعنی آپ ﷺ نے اپنے کردار اپنی صداقت سے لوگوں کو متاثر کیا اور انہے صدق کی دعوت دی بغیر کسی تقریر کے۔
{ خواتین کے لیے نصیحت: کیا ہماری خواتین بھی امر بالمعروف و نہی عن المنکر کا اہتمام کرتی ہیں؟ اور کیا انہوں نے دین کو اس طرح اپنایا ہے کہ ان کو دیکھ کر"اللہ" یاد آ جائے؟ کیا خواتین کا ہر قول ، فعل ،ان کا لباس ، ان کا کردار، ان کی زندگی کا ہر پہلو قرآن و سنت کے مطابق ہے کہ ان کو دیکھ کر پتہ چلے یہ حقیقی داعیہ ہے اور وہ بھی داعیہ الی اللّٰہ نا کہ الی غیر اللّٰہ؟}

**4) دعوت کے کاموں میں /دین کے کاموں میں اہم مشورے فراہم کرنا :**
حضرت خدیجہ نے رسول اللہ ﷺ کو پہلی وحی کے موقع سے لے کر ان پر دین کی راہ میں آنے والے ہر مشکل وقت میں ، دین کے ہر معاملے میں رسول اللہﷺ کو نا صرف مفید مشورے فراہم کیے بلکہ حوصلہ اور support بھی فراہم کی۔حضرت خدیجہ ہر موقع پر رسول اللہ ﷺ کو تسلی دیا کرتی تھیں ان کا حوصلہ بنا کرتی تھیں۔حضرت خدیجہ کا وجود دین کی اشاعت کا ذریعہ بنا بہت سے مرد و خواتین ان کی دعوت سے مسلمان ہوئے۔سیرت ابن ہشام میں آتا ہے کہ:
کانت (خديجة) له وزیر صدق علی الإسلام یشکو إليها. (سیرت ابن ہشام).
ترجمہ:حضرت خدیجہ نبی اکرم ﷺ کے لیےتبلیغ اسلام میں سچی مددگار تھیں آپ ﷺ ان سے مشاورت کیا کرتے تھے۔
{ خواتین کے لیے نصیحت: خواتین کو بھی اپنے باپ ، بھائی ، شوہر، بیٹے اور دیگر مسلمان مردوں کو اللہ کی طرف سے عطا کردہ حکمت و دانائی کو استعمال کرتے ہوئے دین اسلام کے لیے مفید مشورے فراہم کرنے چاہیے , مشکل مرحلوں میں ان کا حوصلہ بننا چاہیے تا کہ دین اسلام کو فائدہ پہنچ سکے جیسے ام المونین خدیجہ رضی اللہ عنھا کے زریعے پہنچا۔}

**5) دین کی تعلیم حاصل کر کے اس کی اشاعت میں کردار اداد کریں :**
حضرت عائشہ صدیقہ ایک عالمہ تھیں ۔ایک عرصہ تک آپ نے گھر کے معاملات کے حوالے سے صحابہ و صحابیات کو تو تعلیم دی ہی تھی، اس کے علاوہ آپ بہت سے دیگر علوم کی ماہر تھیں ۔۔جیسے "قرآن کے علوم ،عرب کی تاریخ، علم الفرائض ، تاریخ العرب ، عرب کی شاعری" وغیرہ جیسے بڑے بڑے علوم کی عالمہ تھیں اور دین اسلام کی اشاعت کا بہت دیر تک آپ فریضہ سر انجام دیتی رہینہ۔ہشام بن عروہ کا ایک قول علامہ ذہبی نے نقل کیا ہےتذکرۃ الحفاظ کے اندر کہ:
 "حضرت عائشہ سے جتنے علوم لوگوں نے سیکھے ہیں اور جتنے علوم کی وہ ماہرہ تھیں ان سے بڑی کوئی ماہر خاتون نہیں تھیں"۔
اسی طرح حضرت سودہ ، حضرت صفیہ ، حضرت اسماء ،حضرت زینب ، حضرت فاطمہ ، حضرت رقیہ (رضی اللہ عنھن) نے دین کی اشاعت میں بہت مثبت کردار ادا کیا۔حضرت اسماء بنت یزید تو "خطیبۃ النساء" کے نام سےمشہور تھیں۔تقریر و خطبے کا ان کو ملکہ حاصل تھا باذن اللہ۔انہوں نے رسول اللہ ﷺ کے سامنے خواتین کا مقدمہ بھی رکھا تھا۔
{ خواتین کے لیے نصیحت: آج بھی خواتین کو دینی علوم پر مضبوط و گہری دسترس حاصل ہونی چاہیے ، دینی علوم کی تعلیم حاصل کرنی چاہیے اور دین اسلام کے بتائے ہوئے defined دائرہ کاراور طریقے کے مطابق اپنی صلاحیتوں کو بہترین طریقے سے بروئے کار لاتے ہوئے اس علم کی احسن انداز سے اشاعت میں اپنا نمایاں کردار ادا کرنا چاہیے۔}

**6) دین کے مختلف مواقع پر خواتین کا کردار و ساتھ :**
دین اسلام کے آغاز سے لے کر ہر موقع دیکھ لیں تو ہمیں خواتین کا نمایاں کردار نظر آتا ہے۔ بیعت عقبہ اولی اور ثانی ، ہجرت مدینہ ، غزوات گویا ہر موقع پر خواتین साथ تھیں ۔غزوات میں خواتین مختلف طریقوں سے اپنا کردار ادا کرتی تھیں۔پانی پلاتی تھیں ، مرہم پٹی کرتی تھیں۔
{ خواتین کے لیے نصیحت: انہی امہات المومنین اور صحابیات کے نقش قدم پر چلتے ہوئے آج بھی خواتین کو ہر موقع پر اپنے دائرہ کار اور اسلامی تعلیمات کے مطابق جہاں بھی جب بھی دین کے لیے کچھ پیش کرنے کی ضرورت ہو کوئی قربانی دینی ہو یا اپنی صلاحیتیں بروئے کار لاتے ہوئے دین کے لیے کچھ کرنا ہو تو پیش پیش رینا چاہیے۔} 

**7) گھروں میں دعوت دین کا باقاعدہ و لازمی احتمام کرنا**
وَاذْكُرْنَ مَا يُتْلٰى فِيْ بِيُوْتِكُنَّ مِنْ اٰيٰتِ اللّٰهِ وَالْحِكْمَةِ 
ترجمہ: اور جو تمہارے گھروں میں اللہ کی آیات اور حکمت کی باتیں پڑھ کر سنائی جاتی ہیں انھیں یاد رکھو۔
یہ خواتین کے لیے "خاص" حکم ہے۔یعنی قرآن و حدیث جوتم پر پڑھا جاتا ہے اس کے تذکرے کا خاص اہتمام کیا کرو اپنے گھروں میں ۔عورت کا چونکہ دائرہ کار گھر ہے تو وہ اپنے گھروں میں جب قرآن و حدیث کی محافل سجائے گی، دروس کا اہتمام کرے گی تو اس کے اثرات سے گھر میں برکات کے نزول کے ساتھ ساتھ مردوں کے اوپر بھی اس کا اثر ہوتا ہے جیسا کہ حضرت عمر فاروق جیسے سخت گیر آدمی گھر میں بہن کے قرآن کی تلاوت سننے سے متاثر ہو کر اسلام لے آئے۔
{ خواتین کے لیے نصیحت: آج بھی خواتین جب گھروں میں قرآن کی تلاوت کا نبی اکرم ﷺ کی احادیث کا ان کے تذکرے اور مذاکرے کا اہتمام گھروں میں کر یں گی تو اس سے نہ صرف کہ دین کی دعوت خواتین کے اندر پھیلے گی بلکہ گھر کے مرد ، بچے بھی اس سے متاثر ہوں گے اور ان بچوں کی پرورش زمانی قرآن و حدیث کے بھیچ ہو گی اس طرح کہ ان کو گھر میں مائیں ، بہنیں ،ماحول ایسا فراہم کریں گی کہ جہاں ہر وقت قرآن و حدیث کا ذکر ہو تو خود بجود وہ کردار کے مضبوط بنیں گے یعنی وہ داعی الی اللہ کے طور پر پروان چڑھیں گے اور ایک اچھا مسلم معاشرہ تشکیل پائے گا اور لوگ ان سے متاثر ہوں گے اور ان سے دین کی دعوت حاصل کریں گے}

**حاصل کلام :** اسلام کی تاریخ سے پتہ چلتا ہے کہ آج تک دین اسلام صرف مسلمان مردوں کی وجہ سے اشاعت پذیر نہیں ہوا بلکہ اس میں عورتوں نے برابر کردار ادا کیا ہےاور دعوت دین کی جتنی ذمہ داری مسلمان مردوں کی ہے اتنی ہی ذمہ داری مسلمان عورتوں کی بھی ہے۔اللہ تعالی مرد و خواتین دونوں کو اپنی ذمہ داری بخوبی سر انجام دینے کی توفیق دے۔آمین`
  }
];

const VIDEOS_DATA = [
  // Short Clips
  { id: "5RuqA4c_8GQ", title: "تفسیر سورۃ الفاتحہ", subtitle: "Tafseer Surah Al-Fatiha", type: "CLIP" },
  { id: "yDa1JTOf0xA", title: "حدیث جبرئیل — کامل درس", subtitle: "Hadith Jibril — Full Explanation", type: "CLIP" },
  { id: "nmBwd3MkPSY", title: "توحید کا مفہوم و اہمیت", subtitle: "Concept & Importance of Tawheed", type: "CLIP" },
  { id: "HBbQMQkz3GE", title: "نماز — اہمیت اور فضائل", subtitle: "Salah — Significance & Virtues", type: "CLIP" },
  { id: "S5PkGChDv9U", title: "رمضان المبارک کی تیاری", subtitle: "Preparing for Ramadan", type: "CLIP" },
  { id: "Xk4uGYkbBFg", title: "اسلام میں صبر کا مقام", subtitle: "The Station of Patience in Islam", type: "CLIP" },

  // Long Videos
  { id: "long-1", title: "تفسیر القرآن — مکمل درس سلسلہ", subtitle: "Complete Tafseer Series — Pegham TV", type: "LONG", duration: "45 min" },
  { id: "long-2", title: "حدیث اور علوم حدیث — جامع درس", subtitle: "Sciences of Hadith — Full Lecture", type: "LONG", duration: "60 min" },
  { id: "long-3", title: "اسلامی فلسفہ اور مغربی فکر", subtitle: "Islamic Philosophy vs Western Thought", type: "LONG", duration: "52 min" },
  { id: "long-4", title: "مسلم خاندانی نظام", subtitle: "Islamic Family System — University Lecture", type: "LONG", duration: "70 min" },

  // Lecture Series
  {
    id: "khulasa-quran-2026",
    title: "خلاصہ مضامین قرآن | رمضان ۲۰۲۶",
    subtitle: "Khulasa e Mazameen e Quran | Ramadan 2026",
    type: "SERIES",
    channel: "Official Channel",
    thumbnail: "/t1.jpg",
    description: "🎙️ Dr Muhammad Hammad Bin Mohiyudin Lakhvi. A comprehensive summary of Quranic themes for Ramadan 2026.",
    videos: [
      { id: "5zZPlHzkFnc", title: "Day 1 | Para 1", ep: "Day 1" },
      { id: "v0d0EqHMizQ", title: "Day 2 | Para 2", ep: "Day 2" },
      { id: "K2sEgEBQJlU", title: "Day 3 | Para 3", ep: "Day 3" },
      { id: "WmgFaw2xFUU", title: "Day 4 | Para 4", ep: "Day 4" },
      { id: "ybebuUNURbE", title: "Day 5 | Para 5 Complete", ep: "Day 5" },
      { id: "OTF9Ksj9m38", title: "Day 6 | Para 6 & 7", ep: "Day 6" },
      { id: "L-i3XxTxMzc", title: "Day 7 | Para 8 & 9", ep: "Day 7" },
      { id: "_VmYWv0PZ2w", title: "Day 8 | Para 9 & 10", ep: "Day 8" },
      { id: "pu_jjCc1WpI", title: "Day 9 | Para 11 & 12", ep: "Day 9" },
      { id: "YwfdAS-uNkY", title: "Day 10 | Para 12 & 13", ep: "Day 10" },
      { id: "SP_vI_MlHAM", title: "Day 11 | Para 14", ep: "Day 11" },
      { id: "lQgCo0OwGOM", title: "Day 12 | Para 15", ep: "Day 12" },
      { id: "IC4ZlULRMgA", title: "Day 13 | Para 16", ep: "Day 13" },
      { id: "b27gKt-lipg", title: "Day 14 | Para 17", ep: "Day 14" },
      { id: "ESd-u0xHBII", title: "Day 15 | Para 18", ep: "Day 15" },
      { id: "DKz0LeQgGlE", title: "Day 16 | Para 19", ep: "Day 16" },
      { id: "M_mU9XazSdI", title: "Day 17 | Para 20", ep: "Day 17" },
      { id: "LKcoxiKxHxU", title: "Day 18 | Para 21", ep: "Day 18" },
      { id: "BjEug95IqjE", title: "Day 19 | Para 22", ep: "Day 19" },
      { id: "x5PU32kZk7M", title: "Day 20 | Para 23", ep: "Day 20" },
    ]
  },
  {
    id: "walidayn",
    title: "والدین کی ذمہ داریاں",
    subtitle: "Walidayn Ki Zimaydaarian",
    type: "SERIES",
    channel: "Official Channel",
    thumbnail: "/t2.jpg",
    description: "A comprehensive 9-part series on the responsibilities of parents in Islam.",
    videos: [
      { id: "x04g-Hg8POo", title: "Part 1", ep: "Part 1" },
      { id: "iJo7_Cvdlbs", title: "Part 2", ep: "Part 2" },
      { id: "Je-KTWMYmpo", title: "Part 3", ep: "Part 3" },
      { id: "d4cRFz7OvBI", title: "Part 4", ep: "Part 4" },
      { id: "naDC7UYChZg", title: "Part 5", ep: "Part 5" },
      { id: "IFj7NOIQMyE", title: "Part 6", ep: "Part 6" },
      { id: "U-9VVg-ngFc", title: "Part 7", ep: "Part 7" },
      { id: "PUWNhcOILUU", title: "Part 8", ep: "Part 8" },
      { id: "OECVk9qvY-A", title: "Part 9", ep: "Part 9" },
    ]
  },

  // Payam-e-Subah Archive
  {
    id: "payam-2019",
    year: "2019",
    label: "۲۰۱۹",
    type: "PAYAM_SUBAH",
    title: "پیام صبح ۲۰۱۹",
    thumbnail: "/payam2019.jpeg",
    facebookUrl: "https://www.facebook.com/share/1GUoLS5Qvu/",
    episodes: [
      { month: "April 2019", date: "April 9, 2019", topic: "اللّٰہ کی راہ پر راضی رہنا", youtubeId: "Mo-wfqoMiGE" },
      { month: "April 2019", date: "April 16, 2019", topic: "نیکی کسے کہتے ہیں؟", youtubeId: "jVCaKWIyNd8" },
      { month: "June 2019", date: "June 11, 2019", topic: "سفر کے آداب", youtubeId: null },
      { month: "June 2019", date: "June 18, 2019", topic: "شیطان کو سرپرست بنانا", youtubeId: null },
      { month: "July 2019", date: "July 18, 2019", topic: "دین کے پیغام کو آگے پینچانا", youtubeId: "InKOLWNCimI" },
      { month: "July 2019", date: "July 23, 2019", topic: "سورة البقرة أية ٢٥٠", youtubeId: "ktZ0JVKx65U" },
      { month: "July 2019", date: "July 31, 2019", topic: "سورة النمل البقرة أية ١٩", youtubeId: "RGXxW0VIvjg" },
      { month: "August 2019", date: "August 6, 2019", topic: "101 سورة يوسف", youtubeId: "6uw3WqMtELQ" },
      { month: "August 2019", date: "August 21, 2019", topic: "البقرہ ٢٥٠", youtubeId: "v_hcN36Tvas" },
      { month: "August 2019", date: "August 22, 2019", topic: "آل عمران آیت 38 & 39", youtubeId: "LNNgTbZ-Sgw" },
      { month: "August 2019", date: "August 27, 2019", topic: "سورة آل عمران أية 194", youtubeId: "b5q3vgy7qM8" },
      { month: "September 2019", date: "September 16, 2019", topic: "سورة التحريم أية ١١", youtubeId: "vJKGJV-NIwI" },
      { month: "September 2019", date: "September 23, 2019", topic: "سورة القصص أية 16 & 17", youtubeId: "KYZ71RV7ZvM" },
      { month: "October 2019", date: "October 30, 2019", topic: "سیرت کا مطالعہ کیوں ضروری ہے؟", youtubeId: "HdxpZBD3u18" },
      { month: "November 2019", date: "November 4, 2019", topic: "اسوہ رسول صلی اللّٰہ علیہ وآلہ وسلم", youtubeId: "OXtZhQfooCE" },
      { month: "November 2019", date: "November 19, 2019", topic: "النساء آیت 25", youtubeId: "-H7vvZG1kBU" },
      { month: "December 2019", date: "December 30, 2019", topic: "سورة آل الشورى أية ١٩ & ٢٠", youtubeId: "KMMLoHsDFxE" },
    ]
  },
  { id: "payam-2020", year: "2020", label: "۲۰۲۰", type: "PAYAM_SUBAH", title: "پیام صبح ۲۰۲۰", thumbnail: "/payam-2020.jpg", facebookUrl: "https://www.facebook.com/share/p/1AwA1ZwbMo/", episodes: [] },
  { id: "payam-2021", year: "2021", label: "۲۰۲۱", type: "PAYAM_SUBAH", title: "پیام صبح ۲۰۲۱", thumbnail: "/payam-2021.jpg", facebookUrl: "https://www.facebook.com/share/1C6XUADaac/", episodes: [] },
  { id: "payam-2022", year: "2022", label: "۲۰۲۲", type: "PAYAM_SUBAH", title: "پیام صبح ۲۰۲۲", thumbnail: "/payam-2022.jpg", facebookUrl: "https://www.facebook.com/share/p/1DVhDGJz8U/", episodes: [] },

  // TV Programs
  {
    id: "tafseer-al-quran",
    slug: "tafseer-al-quran",
    title: "تفسیر القرآن",
    subtitle: "Tafseer Al-Quran",
    type: "TV_PROGRAM",
    icon: "📖",
    channel: "Pegham TV",
    channelColor: "#1A5C3A",
    videos: [
      { id: "5RuqA4c_8GQ", title: "تفسیر سورۃ الفاتحہ", ep: "Episode 1" },
      { id: "yDa1JTOf0xA", title: "تفسیر سورۃ البقرہ", ep: "Episode 2" },
      { id: "nmBwd3MkPSY", title: "تفسیر سورۃ آل عمران", ep: "Episode 3" },
      { id: "HBbQMQkz3GE", title: "تفسیر سورۃ النساء", ep: "Episode 4" },
    ]
  },
  { id: "payam-e-subah", slug: "payam-e-subah", title: "پیام صبح", subtitle: "Payam-e-Subah", type: "TV_PROGRAM", icon: "🌅", channel: "Dunya News", channelColor: "#C8102E", videos: [] },
  {
    id: "dua-momin-ka-hathiyar",
    slug: "dua-momin-ka-hathiyar",
    title: "دعا مومن کا ہتھیار",
    subtitle: "Dua — The Believer's Weapon",
    type: "TV_PROGRAM",
    icon: "🙏",
    channel: "Peace TV",
    channelColor: "#0066CC",
    videos: [
      { id: "5RuqA4c_8GQ", title: "دعا کی اہمیت اور فضیلت", ep: "Episode 1" },
      { id: "yDa1JTOf0xA", title: "قرآنی دعائیں", ep: "Episode 2" },
      { id: "nmBwd3MkPSY", title: "نبوی دعائیں", ep: "Episode 3" },
    ]
  },
  {
    id: "islam-aur-ilhad",
    slug: "islam-aur-ilhad",
    title: "اسلام اور الحاد",
    subtitle: "Islam & Atheism",
    type: "TV_PROGRAM",
    icon: "💡",
    channel: "Peace TV",
    channelColor: "#0066CC",
    videos: [
      { id: "HBbQMQkz3GE", title: "الحاد کا تعارف اور تاریخ", ep: "Episode 1" },
      { id: "S5PkGChDv9U", title: "وجود خدا کے دلائل", ep: "Episode 2" },
      { id: "Xk4uGYkbBFg", title: "قرآن اور جدید سائنس", ep: "Episode 3" },
    ]
  },
  {
    id: "hadith-jibril",
    slug: "hadith-jibril",
    title: "حدیث جبرئیل",
    subtitle: "Hadith Jibril",
    type: "TV_PROGRAM",
    icon: "⚖️",
    channel: "Peace TV",
    channelColor: "#0066CC",
    videos: [
      { id: "5RuqA4c_8GQ", title: "حدیث جبرئیل — تعارف", ep: "Episode 1" },
      { id: "yDa1JTOf0xA", title: "ایمان کے ارکان", ep: "Episode 2" },
      { id: "nmBwd3MkPSY", title: "اسلام کے ارکان", ep: "Episode 3" },
      { id: "HBbQMQkz3GE", title: "احسان — اعلی مقام", ep: "Episode 4" },
    ]
  },
  {
    id: "roshni",
    slug: "roshni",
    title: "روشنی",
    subtitle: "Roshni",
    type: "TV_PROGRAM",
    icon: "🌙",
    channel: "Lahore News",
    channelColor: "#8B4513",
    videos: [
      { id: "S5PkGChDv9U", title: "روشنی — ایمان کی کرن", ep: "Episode 1" },
      { id: "Xk4uGYkbBFg", title: "اخلاق اسلامی", ep: "Episode 2" },
      { id: "5RuqA4c_8GQ", title: "صبر اور رضا", ep: "Episode 3" },
    ]
  },
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Update Admin User
    await User.deleteMany({});
    const username = process.env.ADMIN_USERNAME || 'hammadlakhvi_admin';
    const password = process.env.ADMIN_PASSWORD || 'LakhviAdmin#2026';
    console.log(`Creating Admin: Username=[${username}], Password=[${password}]`);
    const adminUser = new User({
      username,
      password
    });
    await adminUser.save();
    console.log('Admin User Created.');

    // 2. Sync Articles
    await Article.deleteMany({});
    const articlesToInsert = ARTICLES_DATA.map(art => ({
      ...art,
      content: formatContentToHTML(art.content)
    }));
    await Article.insertMany(articlesToInsert);
    console.log(`${articlesToInsert.length} Articles Synced.`);

    await Video.deleteMany({});
    await Video.insertMany(VIDEOS_DATA);
    console.log(`${VIDEOS_DATA.length} Video Entries Synced.`);

    console.log('Database sync completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
