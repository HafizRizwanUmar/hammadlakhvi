import { COLORS } from "../constants";
import { SectionHeader } from "../components/UI";

const BIO_SECTIONS = [
  { title: "نام و نسب", icon: "🌳", en: "Lineage & Family", urduContent: `محمد حماد بن محی الدین بن محمد علی بن محی الدین عبد الرحمن بن محمد بن بارک اللہ بن محمد امین۔\n\nسلسلہ نسب کے اعتبار سے علوی ہیں — حضرت علی ؓ کی غیر فاطمی اولاد حضرت امام محمد بن حنفیہ کے توسط سے آپ کا شجرہ نسب حضرت علیؓ سے جا ملتا ہے۔`, enContent: "Lineage of Dr. Lakhvi traces to Hazrat Ali (RA) through Imam Muhammad ibn Hanafiyyah — he is of the Alawi family from the non-Fatimi branch." },
  { title: "پیدائش و جائے پیدائش", icon: "📍", en: "Birth", urduContent: `ڈاکٹر محمد حماد لکھوی 9 دسمبر 1965 دیپالپور کے نواح میں واقع ایک گاؤں قلعہ تارا سنگھ میں پیدا ہوئے۔`, enContent: "Born 9 December 1965 in Qila Tara Singh, near Dipalpur, Punjab, Pakistan." },
  { title: "خاندانی پس منظر", icon: "🏡", en: "Family Background", urduContent: `برصغیر پاک و ہند کا معروف خاندان لکھوی — دین کی اشاعت و تبلیغ میں ان کا ایک طویل سفر ہے جو 300 سال سے زیادہ کے عرصے پر محیط ہے۔\n\nآپ کے آباؤ اجداد میں سے حافظ محمد بن بارک اللہ لکھوی میاں نذیر حسین دہلوی کے شاگرد تھے جنہوں نے پنجابی نظم کی صورت میں 30 سے زیادہ کتابیں لکھیں جن میں سے نہایت مشہور "احوال الآخرۃ" اور قرآن کی تفسیر "تفسیر محمدی" ہے۔\n\nمرزا قادیانی کو فاسق و کاذب قرار دینے کی اولیت میں لکھوی بزرگ بھی شامل ہیں۔ آپ کے پڑدادا محی الدین بن عبد الرحمن جنت بقیع میں مدفون ہیں۔ آپ کے دادا مسجد نبوی میں حدیث کے استاد تھے۔`, enContent: "The Lakhvi family has served Islam for over 300 years. Ancestors include students of Mian Nazeer Hussain Dehlawi, early refuters of Mirza Qadiani, and a grandfather who taught Hadith in Masjid Nabawi. Father elected to Pakistan's first assembly." },
  { title: "تعلیمی مراحل", icon: "🎓", en: "Education", urduContent: `• میٹرک — دیپالپور ہائی سکول — 1982\n• ایف ایس سی — گورنمنٹ کالج دیپالپور — 1984\n• بی اے — پنجاب یونیورسٹی — 1986\n• ایم اے اسلامیات — پنجاب یونیورسٹی — 1988 (پہلی پوزیشن اور گولڈ میڈل)\n• ایم اے عربی — پنجاب یونیورسٹی — 1990 (فرسٹ ڈویژن)\n• پی ایچ ڈی — 2001 (موضوع: حریت فرد کا اسلامی تصور)\n• ایل ایل بی — پنجاب یونیورسٹی لاء کالج — 2008\n• پوسٹ ڈاکٹریٹ — یونیورسٹی آف گلاسگو، اسکاٹ لینڈ، برطانیہ — 2007`, enContent: "Matric 1982, FSc 1984, BA 1986, MA Islamiyat 1st Position & Gold Medal 1988, MA Arabic 1990, Ph.D. 2001, LLB 2008, Post-Doctorate University of Glasgow UK 2007." },
  { title: "الاجازہ فی الحدیث", icon: "📜", en: "Ijazah in Hadith", urduContent: `شیخ الحدیث مولانا عبد الحلیم سے جزوی طور پر حدیث کی کتابیں پڑھیں۔ اختتام بخاری کے موقع پر شیخ الجامعہ نے آپ کو سند اور (الاجازہ فی الحدیث) مرحمت فرمائی۔`, enContent: "Received formal Ijazah in Hadith from Sheikh al-Hadith Maulana Abdul Haleem upon the completion of Sahih al-Bukhari." },
  { title: "تدریسی مراحل", icon: "🏛️", en: "Academic Career", urduContent: `• 1996–2005 — پنجاب یونیورسٹی ادارہ علوم اسلامیہ — بطور لیکچرار\n• 2005–2010 — اسسٹنٹ پروفیسر\n• 2010–2014 — اسوسیٹ پروفیسر\n• 2014–2019 — پروفیسر\n• 2019 تا حال — ڈین، فیکلٹی ادارہ علوم اسلامیہ، جامعہ پنجاب`, enContent: "35+ years of academic service. Lecturer 1990, joined Punjab University IIS 1996, rose to Dean (2019–present)." },
  { title: "تعلیمی عہدے", icon: "🎖️", en: "Academic & Institutional Positions", urduContent: `• ڈین، فیکلٹی ادارہ علوم اسلامیہ، پنجاب یونیورسٹی لاہور\n• ممبر متحدہ علماء بورڈ پنجاب\n• وائس چیئرمین پیغام ٹی وی\n• ایڈیٹر "القلم" (ایچ ای سی تسلیم شدہ ریسرچ جرنل) — 2008–2019\n• ممبر پنجاب قرآن بورڈ، حکومت پنجاب (2011 تا حال)\n• اسلامیات سبجیکٹ ایکسپرٹ — فیڈرل پبلک سروس کمیشن\n• مذہبی ماہر — پی ٹی وی، اے ٹی وی، لاہور نیوز، پیغام ٹی وی، جیو نیوز، دنیا نیوز`, enContent: "Dean IIS Punjab University, Vice Chairman Pegham TV, Editor Al-Qalam Journal 2008–2019, Member Punjab Quran Board, Expert at FPSC and PPSC." },
  { title: "بین الاقوامی کانفرنسز", icon: "🌍", en: "International Conferences", urduContent: `آپ نے 17 سے زائد ملکی و غیر ملکی بین الاقوامی کانفرنسوں میں شرکت کی اور کئی ایک میں اپنے فکر انگیز مقالے پیش کیے۔`, enContent: "Participated in 17+ national and international conferences, presenting research papers worldwide." },
  { title: "دینی و تبلیغی خدمات", icon: "🕌", en: "Religious & Dawah Services", urduContent: `2015 سے اب تک ہر ہفتے پیغام ٹی وی پر آپ کا تفسیر القرآن کا درس جاری ہے۔ 2009 سے تاحال مسجد المبارک لاہور میں آپ خطبہ و امامت نماز جمعہ کے فرائض سر انجام دے رہے ہیں۔`, enContent: "Friday Khutbah at Masjid Al-Mubarak since 2009, weekly Tafseer on Pegham TV since 2015." },
  { title: "مشہور ٹی وی پروگرامز", icon: "📺", en: "Famous TV Programs", urduContent: `• تفسیر القرآن — پیغام ٹی وی\n• اسلام اور الحاد — پیس ٹی وی\n• دعا مومن کا ہتھیار — پیس ٹی وی\n• حدیث جبرئیل — پیس ٹی وی\n• روشنی — لاہور نیوز\n• پیام صبح — دنیا نیوز`, enContent: "Tafseer Al-Quran (Pegham TV), Islam & Atheism (Peace TV), Dua Momin Ka Hathiyar, Hadith Jibril, Roshni, Payam Subah (Dunya News)." },
  { title: "ایوارڈز", icon: "🥇", en: "Awards & Distinctions", urduContent: `آپ نے ایم اے میں پہلی پوزیشن لے کر گولڈ میڈل حاصل کیا — پنجاب یونیورسٹی لاہور۔`, enContent: "Gold Medal — 1st Position in MA Islamiyat, University of the Punjab, Lahore." },
  { title: "اساتذہ", icon: "🌟", en: "Notable Teachers", urduContent: `• مولانا محی الدین لکھوی رحمہ اللہ\n• مولانا معین الدین لکھوی رحمہ اللہ\n• شیخ الحدیث مولانا عبد الحلیم رحمہ اللّٰہ\n• ڈاکٹر حمید اللہ\n• پروفیسر ڈاکٹر جمیلہ شوکت\n• ڈاکٹر ممتاز احمد سالک`, enContent: "Studied under Sheikh al-Hadith Maulana Abdul Haleem (Ijazah), Dr. Hameedullah, Prof. Dr. Jameela Shaukat, and others." },
  { title: "کتب", icon: "📚", en: "Books Published", urduContent: `• حریت فرد کا اسلامی تصور (مقالہ پی ایچ ڈی)\n• رابطہ عالم اسلامی کی دینی خدمات (مقالہ ایم اے)\n• آبادی اور ترقی (کتابچہ — مکتبہ دار السلام)`, enContent: "3 major books: PhD thesis on individual freedom in Islam, MA thesis on Rabita al-Alam al-Islami, and a booklet on population and development." },
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
              <div className="urdu" style={{ fontSize: 17, color: "rgba(250,246,239,0.9)", marginBottom: 6, lineHeight: 2 }}>پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللہ</div>
              <div className="urdu" style={{ fontSize: 14, color: COLORS.goldLight, lineHeight: 2, marginBottom: 12 }}>(ڈین فیکلٹی ادارہ علوم اسلامیہ جامعہ پنجاب لاہور)</div>
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
          <div className="urdu" style={{ fontSize: 16, color: COLORS.green, lineHeight: 2.6 }}>ماشاء اللہ لا قوۃ الا باللہ</div>
        </div>
      </div>
    </div>
  );
}
