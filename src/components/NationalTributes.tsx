import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { FadeIn } from './FadeIn';

// 👇 তোমার লোকাল ফোল্ডার থেকে ছবিগুলো ইমপোর্ট করা হলো
// (ফোল্ডারের নাম 'national day' স্পেসসহ থাকলে এভাবেই কাজ করবে)
import img14April from '../asset/optimized/national day/14_april.webp';
import img21Feb from '../asset/optimized/national day/21_feb.webp';
import img26March from '../asset/optimized/national day/26_march_2026.webp'; // Note: .jpeg extension
import imgEid from '../asset/optimized/national day/eid_2026.webp';

// ─────────────────────────────────────────────
// 🌟 ডেটাবেস
// ─────────────────────────────────────────────
const TRIBUTES = [
  { 
    id: 1,
    date: "২১শে ফেব্রুয়ারি", 
    title: "আন্তর্জাতিক মাতৃভাষা দিবস", 
    msg: "সকল ভাষা শহিদদের প্রতি জানাই বিনম্র শ্রদ্ধা।", 
    img: img21Feb,
    glowColor: "group-hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]" // Red glow
  },
  { 
    id: 2,
    date: "২৬শে মার্চ", 
    title: "মহান স্বাধীনতা দিবস", 
    msg: "স্বাধীনতার মহান অর্জন শহিদদের রক্তে রঞ্জিত—তাদের স্মৃতির প্রতি গভীর শ্রদ্ধা।", 
    img: img26March,
    glowColor: "group-hover:shadow-[0_0_40px_rgba(22,163,74,0.3)]" // Green glow
  },
  { 
    id: 3,
    date: "১৪ই এপ্রিল", 
    title: "শুভ নববর্ষ ১৪৩৩", 
    msg: "নতুন বছরের নতুন প্রভাতে মুছে যাক সকল গ্লানি, জীবন ভরে উঠুক আনন্দে।", 
    img: img14April,
    glowColor: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]" // Yellow/Gold glow
  },
  { 
    id: 4,
    date: "পবিত্র ঈদুল ফিতর", 
    title: "ঈদ মোবারক", 
    msg: "শিক্ষার আলো মানুষকে জ্ঞানের পথে পরিচালিত করে এবং সমাজকে করে উন্নত ও সমৃদ্ধ।", 
    img: imgEid,
    glowColor: "group-hover:shadow-[0_0_40px_rgba(13,148,136,0.3)]" // Teal glow
  }
];

const tributeEnglishCopy: Record<number, { date: string; title: string; msg: string }> = {
  1: {
    date: '21 February',
    title: 'International Mother Language Day',
    msg: 'With humble respect to all language martyrs who gave us the right to speak in our mother tongue.',
  },
  2: {
    date: '26 March',
    title: 'Independence Day',
    msg: 'Deep respect to the martyrs whose sacrifice made our independence possible.',
  },
  3: {
    date: '14 April',
    title: 'Happy Bengali New Year 1433',
    msg: 'May the new morning of the year remove all sorrow and fill life with joy.',
  },
  4: {
    date: 'Holy Eid-ul-Fitr',
    title: 'Eid Mubarak',
    msg: 'The light of education guides people toward knowledge and helps society grow with dignity.',
  },
};

const tributeCopy = {
  eyebrow: { en: 'National Tributes & Greetings', bn: 'জাতীয় দিবস ও শুভেচ্ছা' },
  titleBefore: { en: 'National Days &', bn: 'জাতীয় দিবস ও' },
  titleAccent: { en: 'Greetings', bn: 'শুভেচ্ছা' },
};

function getTributeText(item: (typeof TRIBUTES)[number], lang: Language, field: 'date' | 'title' | 'msg') {
  return lang === 'en' ? tributeEnglishCopy[item.id][field] : item[field];
}

export function NationalTributes() {
  const { lang } = useLanguage();
  return (
    <section className="relative py-24 lg:py-36 px-5 lg:px-8 bg-[#04060b] border-t border-white/[0.02] overflow-hidden">
      
      {/* 🌟 Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C9A227]/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ════ HEADER ════ */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="relative mb-6 inline-block group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C9A227]/30 to-[#FFD700]/10 rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-1000"></div>
            <div className="relative px-6 py-2 bg-[#0a0c10]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#C9A227]">
                {tributeCopy.eyebrow[lang]}
              </span>
            </div>
          </div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight"
          >
            {tributeCopy.titleBefore[lang]} <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text text-transparent italic">{tributeCopy.titleAccent[lang]}</span>
          </motion.h3>
        </div>

        {/* ════ GRID (4 Columns on Desktop) ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {TRIBUTES.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.15}>
              <div 
                className={`relative rounded-[2rem] overflow-hidden bg-[#0a0c10] border border-white/10 group transition-all duration-500 hover:-translate-y-3 hover:border-white/20 ${item.glowColor}`}
              >
                {/* 🖼️ Poster Image container */}
                <div className="aspect-[4/5] w-full relative overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={getTributeText(item, lang, 'title')}
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                  />
                  
                  {/* Dark gradient from bottom - only visible on hover to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060b]/90 via-[#04060b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Date Badge (Always visible, but gets sleek on hover) */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 shadow-lg group-hover:bg-[#C9A227]/20 group-hover:border-[#C9A227]/50 transition-colors duration-300">
                      <Calendar className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span className="text-[11px] font-bold text-white tracking-wider font-bengali">
                        {getTributeText(item, lang, 'date')}
                      </span>
                    </div>
                  </div>

                  {/* Hover Reveal Content (Bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col">
                    <div className="w-8 h-1 bg-gradient-to-r from-[#C9A227] to-[#FFD700] mb-4 rounded-full" />
                    <h4 className="text-2xl font-bold text-white mb-2 font-bengali leading-snug drop-shadow-md">
                      {getTributeText(item, lang, 'title')}
                    </h4>
                    <p className="text-sm text-slate-300 font-bengali leading-relaxed drop-shadow-md">
                      {getTributeText(item, lang, 'msg')}
                    </p>
                  </div>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
