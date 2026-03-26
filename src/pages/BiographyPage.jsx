import { COLORS } from "../constants";
import { SectionHeader } from "../components/UI";

const BIO_SECTIONS = [
  { 
    title: "نام و نسب ", 
    icon: "🌳", 
    en: "Name & Lineage", 
    urduContent: `محمد حماد بن محی الدین بن محمد علی بن محی الدین عبد الرحمن بن محمد بن بارک اللّٰہ بن محمد امین۔سلسلہ نسب کے اعتبار سے علوی ہیں حضرت علی ؓ کی غیر فاطمی اولاد حضرت امام محمد بن حنفیہ کے توسط سے آپ کا شجرہ نسب حضرت علی ؓ سے جا ملتا ہے۔`, 
    enContent: "Dr. Lakhvi's lineage traces back to Hazrat Ali (RA) through Imam Muhammad ibn al-Hanafiyyah (RA), belonging to the Alawi family." 
  },
  { 
    title: "پیدائش و جائے پیدائش", 
    icon: "📍", 
    en: "Birth & Workplace", 
    urduContent: `ڈاکٹر محمد حماد لکھوی 9 سمبر 1965 دیپالپور کے نواح میں واقعہ ایک گاؤں قلعہ تارا سنگھ میں پیدا ہوئے۔`, 
    enContent: "Born on December 9, 1965, in Qila Tara Singh, near Dipalpur, Punjab." 
  },
  { 
    title: "خاندانی پس منظر", 
    icon: "🏡", 
    en: "Family Background", 
    urduContent: `برصغیر پاک و ہند کا معروف خاندان لکھوی دین کی اشاعت و تبلیغ میں ان کا ایک طویل سفر ہے جو 300 سال سے زیادہ کے عرصے پر محیط ہے۔آپ کے آباؤ اجداد میں سے حافظ محمد بن بارک اللّٰہ لکھوی میاں نذیر حسین دہلوی کے شاگرد تھے جنہوں نے پنجابی نظم کی صورت میں 30سے زیادہ کتابیں لکھیں جن میں سے نہایت مشہور "احوال الآخرۃ" اور قرآن کی تفسیر"تفسیر محمدی"ہے۔ ابواب الصرف کے نام سے سب سے پہلی کتاب لکھنے کا اعزاز بھی حافظ محمد بن بارک اللّٰہ لکھوی کو حاصل ہے۔ مرزا قادیانی کو فاسق و کاذب قرار دینے کی اولیت میں لکھوی بزرگ بھی شامل ہیں خود مرزا کی کتاب "حقیقت الوحی" میں لکھوی بزرگوں کی خط و کتابت کا تذکرہ بھی اس بات کی دلیل ہے۔ مرزا کے بارے میں مولانا محى الدين عبد الرحمن آپ کے پڑدادا کا اولین فتوی“ان فرعون و هامان و جنودهما کانوا خاطئین" کا مفصل تذکرہ مولانا اسحاق بھٹی صاحب کی کتاب "تذکرہ مولانا محی الدین لکھوی" میں بھی ملتاہے۔مولانا محی الدین عبد الرحمن کے اس فتوے کے جواب میں مرزا غلام احمدقادیانی نے جواب میں آپ کے دادا کو کہا کہ اللّٰہ نے مجھے بھی الہام کیا ہے "انا شانئک ھو الابتر" کہ تیری نسل آگے نہیں چلے گی ۔مرزا کے جھوٹے ہونے اور اس کی تکذیب میں اللّٰہ کے حکم سے مرزے کی زندگی میں ہی اس کی یہ بات جھوٹی ثابت ہوئی اور آپ کےپڑداد اکے گھر آپ کے دادا محمد علی مدنی کی ولادت ہوئی ، مرزا کو جب خبر ہوئی کہنے لگا اب اس سے آگے ان کی نسل بالکل نا چلے گی اس کی یہ بات بھی جھوٹی نکللی اور آج اللّٰہ کے فضل سے ڈاکٹر محمد حماد لکھوی سمیت آپ کے پڑدادا کی اتنی اولاد موجود ہے ماشاء اللّٰہ جو شاید گننا مشکل ہو جائے یہ امر واقع مرزا کے جھوٹے ہونے کی واقعاتی دلیل ہے۔آپ کے پڑدادامحی الدین بن عبدالرحمن جنت بقیع میں مدفون ہیں۔آپ کے دادا مسجد نبوی میں حدیث کے استاد تھے۔آپ کے والد محی الدین لکھوی ایک عالم دین ہونے کے ساتھ ساتھ پاکستان کی پہلی اسمبلی میں منتخب ہوئے آپ کے چچا جو کہ آپ کے سسر بھی ہیں اہل حدیث جماعت کے سربراہ تھے اور کئی بار پاکستان کی پارلیمنٹ میں منتخب ہوئےانہوں نے جنرل ضیاء الحق کی صدارت اور تحریک پاکستان میں نمایاں کرداد ادا کیا۔`, 
    enContent: "The Lakhvi family has a 300-year history of serving Islam. His ancestors were scholars and authors belonging to the Alawi lineage." 
  },
  { 
    title: "تعلیمی مراحل", 
    icon: "🎓", 
    en: "Educational Background", 
    urduContent: `آپ نے ناظرہ قرآن الہ آباد کی جامع مسجد سےپڑھا۔سکول کی ابتدائی تعلیم اپنے گاؤں سے حاصل کی ۔
 میٹرک دیپالپور ہائی سکول سے 1982 میں کیا۔
  ایف ایس سی 1984 میں گورنمنٹ کالج دیپالپور سے کی۔
بی اے کا امتحان1986 میں پنجاب یونیورسٹی سے پاس کیا۔
ایم اے اسلامیات 1988 میں پنجاب یونیورسٹی سے کیا اور پہلی پوزیشن اور گولڈ میدل حاصل کیا۔
ایم اے عربی پنجاب یونیورسٹی ہی سے فرسٹ ڈویژن کے ساتھ سال 1990 میں کیا۔ 
پی ایچ ڈی 2001 میں مکمل ہوئی جس کےمقالے کا موضوع تھا "حریت فرد کا اسلامی تصور"۔
ایل ایل بی کا امتحان 2008 میں پنجاب یونیورسٹی لاء کالج سے پاس کیا۔
پوسٹ ڈاکٹریٹ کی ڈگری آپ نے گورنمنٹ آف پاکستان کے سکالرشپ سے 2007 میں یونیورسٹی آف گلاسگو سکاٹ لینڈ برظانیہ سے حاصل کی۔`, 
    enContent: "PhD in Islamic Studies and Post-Doctorate from Glasgow. Recipient of a Gold Medal in MA." 
  },
  { 
    title: "الاجازہ فی الحدیث", 
    icon: "📜", 
    en: "Ijazah in Hadith", 
    urduContent: `میٹرک کے بعد کچھ عرصہ جامعہ ابی بکر کراچی میں زیر تعلیم رہے۔جامعہ محمدیہ اوکاڑہ میں بطور ناظم دفتر خدمات انجام دیتے رہے تو اسی دوران درس نظامی کی کتب کا مطالعہ بھی کیا۔شیخ الحدیث مولانا عبد الحلیم سے جذوی طور پر حدیث کی کتابیں پڑھیں۔اختتام بخاری کے موقع پر شیخ الجامعہ نے آپ کو سند اور (الاجازہ فی الحدیث) بھی مرحمت فرمائی۔`, 
    enContent: "Formally received Ijazah in Hadith after studying traditional texts under renowned scholars." 
  },
  { 
    title: "تدریسی مراحل", 
    icon: "🏛️", 
    en: "Teaching Career", 
    urduContent: `بطور لیکچرارآپ گورنمنٹ کالج ٹوبہ ٹیک سنگھ میں 1990 میں تعینات ہو ئے۔تھوڑے عرصے بعد دسمبر 1990میں آپ کی پتوکی ٹرانسفر ہوگئی اس کے بعد پریل 1991میں گورنمنٹ کالج اوکاڑہ میں منتقل ہو گئے۔
   1996سے 2005 تک پنجاب یونیورسٹی کےادارہ علوم اسلامیہ میں بطور لیکچرار رہے اور اس دوران پی ایچ ڈی ، ایم فل اور ایم اے کے طالب علموں کی تحقیقی کام کی سرپرستی بھی کی۔
 2005 سے 2010 تک آپ اسی ادارہ میں بطور اسنٹنٹ پروفیسر فائز ہوئے اور اپنی ذمہ داری سرانجام دیتےرہے۔
 2010سے 2014 تک یہاں ہی آپ اسوسیٹ پروفیسر رہے۔
  2014سے 2019 تک آپ وہاں بطور پروفیسر اپنی ذمہ داری ادا کر تے رہے۔
 سال 2019 سے نومبر 2024 تک آپ ادارہ علوم اسلامیہ ہی میں ڈین مقرر رہے اور اب آپ اسی ادارے کے ڈائریکٹر کے طور پر اپنی ذمہ داریاں بخوبی سر انجام دے رہے ہیں۔
 آپ نے 1990 سے اب تک درجہ ذیل مضامین پڑھائے۔
پی ایچ ڈی / ایم فل لیول
• اسلامی نطریہ(منتخب متن کا تنقیدی مطالعہ)
• جدید مغربی ادب میں اسلام کا مطالعہ
• اسلامی تاریخ
• تحقیق کے طریقہ کار (اسلامی تحقیق کا طریقہ کار ، ببلیوگرافی ، خطۃ البحث)
ماسٹر / ایم اے لیول
• تفسیر القرآن 
• اسلامی تاریخ
• اسلام اور فلسفہ(یونانی فلسفہ اور اسلامی نطریہ)
• حدیث و علوم حدیث
• عربی
بی اے لیول
• قرآن (ترجمہ و تفسیر)
• حدیث (منتخب متن)
• فقہ (منتخب متن)
• ابتدائی مسلم تاریخ`, 
    enContent: "Extensive teaching career from Lecturer to Dean at Punjab University, teaching PhD, MA and BA levels." 
  },
  { 
    title: "تعلیمی عہدے", 
    icon: "🎖️", 
    en: "Academic Titles", 
    urduContent: `• صدر فیتھ فاؤنڈیشن
• سابق ڈین کلیہ علوم اسلامیہ جامعہ پنجاب لاہور پاکستان
• ڈائریکٹر ادارہ علوم اسلامیہ جامعہ پنجاب لاہور پاکستان
• ممبر متحدہ علماء بورڈ پنجاب
• وائس چئیرمین پیغام ٹی وی
• پروفیسر،ادارہ علوم اسلامیہ پنجاب یونیورسٹی لاہور۔ پاکستان
• ایڈیٹر، "القلم" (ادارہ علوم اسلامیہ کا ایچ ای سی سے تسلیم شدہ ریسرچ جرنل )۔ (2008-2019)
 کنٹرولر امتحانات ادارہ علوم اسلامیہ، پنجاب یونیورسٹی، لاہورپاکستان
 ممبر بورڈ آف اسٹڈیز ادارہ علوم اسلامیہ، پنجاب یونیورسٹی،لاہور ، پاکستان
 ممبر بورڈ آف فیکلٹی، فیکلٹی شعبہ علوم اسلامیہ &اورینٹل لرننگ، پنجاب یونیورسٹی لاہور (1999-2005)
 ممبر ڈاکٹورل پروگرام کمیٹی، شعبہ علوم اسلامیہ، پنجاب یونیورسٹی
ممبر بورڈ آف فیکلٹی، فیکلٹی شعبہ علوم اسلامیہ، پنجاب یونیورسٹی لاہور۔پاکستان
 ممبر اکیڈمک سٹاف ایسوسی ایشن، پنجاب یونیورسٹی لاہور۔پاکستان
 ممبر اتحاد بن المسلمین کمیٹی حکومت پنجاب (2009 سے آج تک)
 ممبر پنجاب قرآن بورڈ، حکومت پنجاب (2011 سے آج تک)
 اسلامیات کے موضوع کے ماہر(سبجیکٹ ایکسپرٹ) فیڈرل پبلک سروس کمیشن، حکومت۔ پاکستان، لاہور کیمپس۔ (2005، 2008، 2009 اب تک)
 اسلامیات کے مضمون کے ماہر (سبجیکٹ ایکسپرٹ)پنجاب پبلک سروس کمیشن، حکومت پنجاب 
(2010 سے آج تک)
 اسلامیت سبجیکٹ ایکسپرٹ، ورچوئل یونیورسٹی پاکستان (2004)
 ممبرالقلم ایجوکیشنل اینڈ ویلفیئر سوسائٹی (این جی او)، لاہور
 مذہبی ماہر، ریڈیو پاکستان لاہور (2003-2006)
 مذہبی ماہر، ریڈیو رمضان گلاسگو UK (2006-2007)
 مذہبی ماہر ۔پی ٹی وی، اے ٹی وی ،لاہور نیوز،پیغام ٹی وی،جیو نیوز ،دنیا نیوز ٹی وی چینل،وقت ٹی وی(پاکستان)، "ایس"ایم ٹی این ٹی وی۔`, 
    enContent: "Holds major positions including Former Dean and currently Director at Punjab University, as well as President of Faith Foundation." 
  },
  { 
    title: "بین الاقوامی کانفرنسز", 
    icon: "🌍", 
    en: "International Conferences", 
    urduContent: `آپ نے 17 سے زائد ملکی و غیر ملکی بین الاقوامی کانفرنسوں میں شرکت کی اور کئی ایک میں اپنے فکر انگیز مقالے پیش کیے۔`, 
    enContent: "Participant in 17+ national and international conferences." 
  },
  { 
    title: "دینی و تبلیغی خدمات و سرگرمیاں", 
    icon: "🕌", 
    en: "Religious Services & Activities", 
    urduContent: `بتوفیق الٰہی آپ کی پوری زندگی دین کی تبلیغ و اشاعت میں صرف ہوئی ۔ بچپن ہی میں والد محترم کے تبلیغی دوروں میں اکثر آپ اور آپ کے باقی بھائی ان کے ساتھ جایا کرتے تھے، جوانی کی دہلیز پر قدم رکھا تو اپنے والد محترم کے ساتھ بطور ان کے خادم اور معاون بھی سفر تبلیغ دین کے لیے کیے۔
گاؤں میں آپ مولانا محی الدین لکھوی رحمۃ اللّٰہ علیہ کی غیر موجودگی میں خطبہ دیتے ۔1990سے جامعہ محمدیہ اوکاڑہ میں مستقل خطبہ دینا شروع کیا ۔2005 میں برطانیہ چلے گئے اور وہاں ایک مسجد میں انگریزی زبان میں خطبہ دیتے رہے۔2009 سے تاحال مسجد المبارک لاہور میں آپ خطبہ و امامت نماز جمعہ کے فرائض سر انجام دے رہے ہیں۔
"اسلامی تہذیب و تمدن اور تہذیبوں کی عصری صورت حال " پر گورنر ہاؤس لاہور میں سال 2006 میں گورنر پنجاب کو بریفنگ دی۔ سال 2008 سے 2019 تک ادارہ علوم اسلامیہ کے ایچ ای سی سے تسلیم شدہ جرنل کے ایڈیٹر ہونے کی ذمہ اداری بھی ادا کی۔ تبلیغ دین کے لیے کئی دفعہ بیرون ملک بھی جاتے رہتے ہیں۔ملک کے اندر مختلف مدارس جامعات اور دیگر تعلیمی اداروں میں آپ کے دروس و خطبات منعقد ہوتے رہتے ہیں۔ 2015 سے اب تک ہر ہفتے پیغام ٹی وی پر آپ کاتفسیر القرآن کا درس جاری ہے جس سے دنیا بھر میں لوگ مستفید ہو رہے ہیں۔`, 
    enContent: "Dedicated to preaching and education. Frequent speaker on TV and international platforms." 
  },
  { 
    title: "مشہور ٹی وی پروگرامز", 
    icon: "📺", 
    en: "Famous TV Programs", 
    urduContent: `تفسیر القرآن پیغام ٹی وی 
اسلام اور الحاد پیس ٹی وی
دعا مومن کا ہتھیار پیس ٹی وی
حدیث جبرئیل پیس ٹی وی
روشنی لاہور نیوز
پیام صبح دنیا نیوز 
پیام پاکستان پیغام ٹی وی
زکوۃ پیس ٹی وی`, 
    enContent: "Regularly featured on Pegham TV, Peace TV and other major news channels." 
  },
  { 
    title: "ایوارڑذ", 
    icon: "🥇", 
    en: "Awards", 
    urduContent: `آپ نے ایم اے میں پہلی پوزیشن لے کر گولڈ میڈل حاصل کیا۔`, 
    enContent: "Awarded Gold Medal by University of the Punjab." 
  },
  { 
    title: "اساتذہ", 
    icon: "🌟", 
    en: "Teachers & Mentors", 
    urduContent: `مولانا محی الدین لکھوی رحمہ اللّٰہ 
مولانا معین الدین لکھوی رحمہ اللّٰہ
شیخ الحدیث مولانا عبد الحلیم رحمہ اللّٰہ
شبیر احمد منصوری
ڈاکٹر حمید اللّٰہ
حافظ محمود اختر ڈولہ
پروفیسر ڈاکٹر جمیلہ شوکت
ڈاکٹر ممتاز احمد سالک`, 
    enContent: "Learned from renowned scholars like Dr. Muhammad Hamidullah and Maulana Mohyuddin." 
  },
  { 
    title: "کتب", 
    icon: "📚", 
    en: "Books", 
    urduContent: `حریت فرد کا اسلامی تصور (مقالہ پی ایچ ڈی )
رابطہ عالم اسلامی کی دینی خدمات(مقالہ ایم اے)
آبادی اور ترقی(کتابچہ مکتبہ دار السلام)`, 
    enContent: "Author of PhD thesis on individual freedom and several booklets on Islamic research." 
  },
  { 
    title: "شائع شدہ آرٹیکلز", 
    icon: "📝", 
    en: "Published Articles", 
    urduContent: `1۔مطالعہ سیرت کا مادی منہج(القلم ، جامعہ پنجاب لاہور ، V/I:22/2دسمبر2017 صفحہ181-207)
2۔تصور جلال ، اقبال اور رومانوی مفکرین کے افکار کا تقابلی مطالعہ (القلم ، جامعہ پنجاب لاہور ، V/I:12/2دسمبر2016 ، صفحہ 222-231)
3۔پاکستان میں عورتوں کے حق وراثت سے محرومی کا مسئلہ عصری اور شرعی حوالے سے ایک تحقیقی جائزہ (مجلہ تحقیق ،آرئینٹل کالج ،جامعہ پنجاب لاہور ،2011 V:31 Serial :78, )
4۔تحدید ملکیت اور گردش دولت کا اسلامی تصور (پاکستان جرنل آف اسلامک ریسرچ ،بہاؤ الدین زکریا یونیورسٹی ، ملتان،V7جون 2011،صفحہ 29-51)
5۔برطانوی عہد کے مسلم معاشرے پر اثرات (الاضواء ،جامعہ پنجاب لاہور ، V/I:25/33جون 2010،صفحہ 185 -199)
6۔بین المذاہب ہم آہنگی اوررواداری کے بنیادی اصول قرآن و سنت کی روشنی میں (القلم ، جامعہ پنجاب لاہورV/I:25/33جون 2010 صفحہ 122-139)
7۔پاکستانی علاقوں میں رواج پذیر رسم وٹہ سٹا :اسلامی اور عصری تحقیقی جائزہ (القلم ، جامعہ پنجاب لاہور، V/I:14/14دسمبر2009،صفحہ 212-235)
8۔اسلامی تصور حکمرانی اور اس کے حدود و اختیارات (القلم ، جامعہ پنجاب لاہور ، V/I:13/13دسمبر 2009 ،صفحہ176-186)
9۔فلسفہ حدود و قیود اور فلاح انسانیت (القلم ، جامعہ پنجاب لاہور، V/I:10/10،صفحہ217-234،س:2006)
10۔آبادی اور ترقی (محادث لاہور ،اگست 2005)
11۔آذادی اظہار اور تحریک اسلام (القلم ، جامعہ پنجاب لاہور، صفحہ 259-283 ،س:2005)
12۔حقیقت زندگی (القلم ، جامعہ پنجاب لاہور ،V/I:8/8 دسمبر 2004،صفحہ 171-202)
13۔میعار زندگی (القلم ، جامعہ پنجاب لاہور V/I:7/7،صفحہ:135-167،س:2003)
14۔تخلیق انسانیت کا مقصد(افکار معلم ، لاہور نومبر 2003)
15۔حریت فکر کامفہوم اور اہمیت (افکار معلم ،لاہور 2003)
16۔اسلام میں حریت فکر کی حدود(القلم ، جامعہ پنجاب لاہور،V/I:5/5،جون1999،صفحہ:103-116)
17۔مغربی معاشرے میں حریت فکر کا تصور(القلم جامعہ پنجاب لاہور ،مجلہ تحقیق ، جامعہ پنجاب لاہور1999)
18۔حریت فرد کا اسلامی تصور (القلم ، جامعہ پنجاب لاہور، 1998V/I:5/5،صفحہ 129-145)
19۔شاہ ولی اللّٰہ کے اصول تجدید مشیت -عصری تناظر میں(ابحاث ، V7/27ستمبر 2022،صفحہ1-20)
20۔ہجرت حبشہ کے اسباب و علل کی مادی تاویلات کا تنقیدی جائزہ(جہات الاسلام جامعہ پنجاب لاہور ، V12/2تمبر 2022،صفحہ112 تا 126)
21. A Glimpse in the History of Nationalism in Muslim World (Al-Adhwa, P.U. LHR, Volume / Issue XXIV/ XLII, Page Nos. 21-36, Dec. 2014)
22. Faith in Predestination and its Philosophy- An Islamic Perspective (Al-Adhwa, P.U. LHR, Volume / Issue XXIV/ XXXIV, Page Nos. 1-10, Dec. 2010)
23. A Critical Study of "Women Protection Bill 2006"- in the light of the Quran and the Sunnah (Pakistan Journal of Islamic Research” BZU, Multan., Volume 6, Page Nos 63-76, Dec. 2010)
24. Historical Foundations of Western Though (“Al-Qalam” P.U. LHR, Volume / Issue 15/ 2, Page Nos 51-65, Dec. 2010)
25. Western Feminist Movement and “Women Protection Bill of Pakistan”-An analytical study “Pakistan Journal of Social Sciences” B.Z.U, Multan, Volume / Issue : 30/ 2, Page Nos 245-250, Dec. 2010)
26. Islam and Fertility Regulations (e-Journal of “WASET” World Academy of Science, Engineering & Technology, FRANCE, Internati onal/ 66, Page Nos 640-642 , June 2010)
27. Ibn Khaldun and his Politico Economic Thoughts (Al-Qalam” P.U. LHR, Volume / Issue : 14/ 14 Page Nos 63-75, Dec. 2009)
28. Scope of Religious Freewill in Islamic Realm (Al-Qalam” P.U. LHR, Volume / Issue :XXIV/ XXXII , Page Nos 19-29, 2009)
30. Issue of Gender and Feminist Movement: An Historical Appraisal (Pakistan Journal of Islamic Research” BZU, Multan., Volume 4, Page Nos 1-21, 2009)
31. The Concept of Peace and Security in Islam (A chapter in book "The World's Religions after September 1.1" (edited by Arvind Sharma, McGill University Canada), Published in USA. International, Page Nos 83-86, 2008)
32. The Holy Prophet (SAW) as a Messenger of Peace in the World (Al-Adhwa, P.U. LHR, Volume / Issue XXII/ XXX, Page Nos. 1-16, Dec. 2008)
33. Methodology of Tafseer e Muhammadi (Al-Qalam” P.U. LHR, Volume / Issue :12/12 , Page Nos 1-30 June 2008)
34. Methodology of Tafseer e Muhammadi and contemporary Trends of Quranic Interpretations (Faculty of Islamic Revealed Knowledge, International Islamic University Kuala Lumpur, Malaysia, International , Page Nos 233-270 , 2006 )
35. Early Patterns of Change in Muslim Societies – A Review (LHR 2015)
36. The Economic Terminologies of Shah Wali اللّٰہ – A Critical Analysis (International Journal of Special Education , Volume / Issue: 37/3 , Page Nos 3026- 3040 , 2022) 
38. Psychological Aspects of Harassment at Workplace, Social Effects & Islamic Remedies (Pakistan Journal of Islamic Philosophy , Volume / Issue 4/1 , Page Nos 1-20 , June 2022 )
39. Harassment at Work Place, Social Effects & Islamic Remedies, In Context of South Punjab (Webology, Volume / Issue 19/2 , Page Nos 8602- 8617 , 2022)
40. Males and the Islamic Family System: An Analytical Study of Legislation on Domestic Violence in Pakistan (Webology, Volume / Issue 19/4 , Page Nos 222-230 , 2022)
41. Attendance of Women in Mosques in the Perspectives of Basic Sources of Islamic Law and Current Era (International Research Journal on Islamic Studies , V3 , Page Nos 1-18 , Dec 2018 )
42. Introduction, History, Dangers and Challenges of Cyber Crimes (“Al-Qalam” P.U. LHR , Volume / Issue 25/2 , Page Nos 167-183 ,Dec 2020)
43. Methodology of Qur‟anic Interpretation in Faid al-bari by Anwar Shah Kashmiri: A Research Study (Journal of Islamic Civilization and Culture, Islamabad , Volume / Issue 3/1, Page Nos : 290-322 , June 2022)
44. Types of Incentives and Advertisements in Commercial Deals, A Research Study in the Light of Shariah (Iqan, Faisalabad , Volume / Issue 1/1 , Page Nos 81-104 , Dec.2018)
45. Diversity in Muslim - Christian Relationship - Views of Qur‟an and Sunnah (“Al-Qalam” P.U. LHR , Volume / Issue 22/1 , Page Nos 47-63 ,Dec 2017)
46. The Challenge for Muslim Intellectuals: Unraveling the postmodernist enigma (“Al-Qalam” P.U. LHR , Volume / Issue 21/1 , Page Nos 17-32 ,Dec 2016)
47. The Authenticity of women‟s Witness in Islam: A Study in the Light of Al-Qur‟an (“Al-Qalam” P.U. LHR , Volume / Issue 20/2 , Page Nos 1-16,Dec 2015)`, 
    enContent: "Extensive publication record with 47 research articles in HEC journals and international platforms." 
  },
];



export default function BiographyPage() {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionHeader title="Biography" urdu="سوانح حیات" />

        {/* Header card */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "36px 40px", borderRadius: 2, marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid ${COLORS.goldLight}`, boxShadow: "0 0 0 6px rgba(184,151,42,0.2)", overflow: "hidden", flexShrink: 0, background: COLORS.green }}>
              <img src="/profile.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px">👤</div>`; }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <h2 style={{ fontFamily: "'Amiri',serif", fontSize: 26, color: COLORS.goldLight, marginBottom: 4 }}>Dr. Muhammad Hammad Lakhvi</h2>
              <div className="urdu" style={{ fontSize: 17, color: "rgba(250,246,239,0.9)", marginBottom: 6, lineHeight: 2 }}>پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللّٰہ</div>
              <div className="urdu" style={{ fontSize: 13, color: COLORS.goldLight, lineHeight: 1.8, marginBottom: 12 }}>
                • صدر فیتھ فاؤنڈیشن <br />
                • سابق ڈین کلیہ علوم اسلامیہ جامعہ پنجاب لاہور پاکستان <br />
                • ڈائریکٹر ادارہ علوم اسلامیہ جامعہ پنجاب لاہور پاکستان
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["پیدائش: 1965، دیپالپور", "پوسٹ ڈاکٹریٹ — گلاسگو", "پی ایچ ڈی — پنجاب یونیورسٹی"].map(b => (
                  <span key={b} className="urdu" style={{ background: "rgba(184,151,42,0.2)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "3px 10px", fontSize: 12, borderRadius: 2, lineHeight: 2 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        {BIO_SECTIONS.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 20, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.6s ease ${i * 0.04}s both` }}>
            <div style={{ background: `${COLORS.green}11`, padding: "13px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, lineHeight: 2 }}>{s.title}</span>
              <span style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: 4 }}>{s.en}</span>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div className="urdu" style={{ fontSize: 15, lineHeight: 2.4, color: COLORS.text, marginBottom: 12, whiteSpace: "pre-line" }}>{s.urduContent}</div>
              <div style={{ borderTop: `1px dashed ${COLORS.border}`, paddingTop: 10 }}>
                <p style={{ fontSize: 12, lineHeight: 1.8, color: COLORS.textLight, fontStyle: "italic" }}>{s.enContent}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Gold medal closing */}
        <div style={{ background: `${COLORS.gold}11`, border: `2px solid ${COLORS.gold}`, padding: "28px", borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🥇</div>
          <div className="urdu" style={{ fontSize: 22, color: COLORS.darkGreen, marginBottom: 4, lineHeight: 2 }}>گولڈ میڈل — پنجاب یونیورسٹی</div>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 18, color: COLORS.darkGreen, marginBottom: 8 }}>Gold Medal — Punjab University</div>
          <p style={{ color: COLORS.textLight, fontSize: 14, marginBottom: 16 }}>1st Position in MA Islamic Studies · ایم اے اسلامیات میں اول پوزیشن</p>
          <div className="urdu" style={{ fontSize: 16, color: COLORS.green, lineHeight: 2.6 }}>ماشاء اللّٰہ لا قوۃ الا باللّٰہ</div>
        </div>
      </div>
    </div>
  );
}
