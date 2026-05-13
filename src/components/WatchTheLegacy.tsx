import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Video } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FadeIn } from './FadeIn';

// ─────────────────────────────────────────────
// 🌟 লোকাল অ্যাসেট ইমপোর্ট (ভিডিও এবং নতুন থাম্বনেইল)
// ─────────────────────────────────────────────
import sirVideo from '../asset/vedio/sir_vedio.mp4';
import sirThumbnail from '../asset/optimized/bio/biography_pic.webp'; // 👈 স্যারের ছবিটা কভার হিসেবে ইমপোর্ট করা হলো

const legacyHighlights = [
  'সামসুল হক খান স্কুল অ্যান্ড কলেজের রূপান্তরের পথচলা',
  'শিক্ষা নেতৃত্ব, প্রতিষ্ঠান নির্মাণ ও শিক্ষার্থীদের সাফল্যের স্মৃতি',
  'ড. মাহবুবুর রহমান মোল্লার দীর্ঘ শিক্ষাসেবার অনুপ্রেরণামূলক অধ্যায়',
];

const legacyHighlightsEn = [
  'The transformation journey of Shamsul Hoque Khan School and College',
  'Memories of educational leadership, institution building, and student success',
  'An inspiring chapter from Dr. Mahbubur Rahman Mollah\'s long service to education',
];

const legacyCopy = {
  eyebrow: { en: 'Watch The Legacy', bn: 'লেগাসি দেখুন' },
  titleBefore: { en: 'Journey of', bn: 'উৎকর্ষের' },
  titleAccent: { en: 'Excellence', bn: 'যাত্রা' },
  description: {
    en: 'A few unforgettable moments from the proud history and achievements of Shamsul Hoque Khan School and College.',
    bn: 'সামসুল হক খান স্কুল অ্যান্ড কলেজের গৌরবময় ইতিহাস এবং সাফল্যের কিছু অবিস্মরণীয় মুহূর্ত।',
  },
  documentary: { en: 'Documentary', bn: 'ডকুমেন্টারি' },
  open: { en: 'Open legacy documentary video', bn: 'লেগাসি ডকুমেন্টারি ভিডিও খুলুন' },
  modal: { en: 'Legacy documentary video', bn: 'লেগাসি ডকুমেন্টারি ভিডিও' },
  close: { en: 'Close legacy documentary video', bn: 'লেগাসি ডকুমেন্টারি ভিডিও বন্ধ করুন' },
  thumbnail: {
    en: 'Dr. Mahbubur Rahman Mollah documentary thumbnail',
    bn: 'ড. মাহবুবুর রহমান মোল্লার ডকুমেন্টারি থাম্বনেইল',
  },
  unsupported: { en: 'Your browser does not support this video.', bn: 'আপনার ব্রাউজার ভিডিওটি সাপোর্ট করছে না।' },
};

export function WatchTheLegacy() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const highlights = lang === 'en' ? legacyHighlightsEn : legacyHighlights;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section className="py-24 lg:py-36 px-5 lg:px-8 bg-[#04060b] border-t border-white/[0.02] relative overflow-hidden">
      
      {/* 🌟 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <FadeIn>
          
          {/* ════ HEADER ════ */}
          <div className="flex flex-col items-center mb-16">
            <div className="relative mb-6 inline-block group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C9A227]/30 to-[#FFD700]/10 rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-1000"></div>
              <div className="relative px-6 py-2 bg-[#0a0c10]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-xl flex items-center gap-2">
                <Video className="w-3.5 h-3.5 text-[#C9A227]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#C9A227]">
                  {legacyCopy.eyebrow[lang]}
                </span>
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight">
              {legacyCopy.titleBefore[lang]} <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text text-transparent italic">{legacyCopy.titleAccent[lang]}</span>
            </h3>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto font-bengali text-lg">
              {legacyCopy.description[lang]}
            </p>
          </div>
          
          {/* ════ VIDEO THUMBNAIL ════ */}
          <button
            type="button"
            aria-label={legacyCopy.open[lang]}
            aria-describedby="legacy-video-description"
            className="relative block w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 text-left"
            onClick={() => setIsOpen(true)}
          >
            {/* 🖼️ প্রিন্সিপাল স্যারের নতুন থাম্বনেইল ছবি 🖼️ */}
            <img 
              src={sirThumbnail} // 👈 আনস্প্ল্যাশ ইমেজের জায়গায় স্যারের লোকাল ছবি বসিয়ে দেওয়া হলো
              alt={legacyCopy.thumbnail[lang]}
              width={1696}
              height={2528}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 960px, calc(100vw - 40px)"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              referrerPolicy="no-referrer"
            />
            
            {/* Dark Overlay for better button visibility */}
            <div className="absolute inset-0 bg-[#04060b]/50 group-hover:bg-[#04060b]/30 transition-colors duration-700" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Sonar Pulse Effect */}
                <div className="absolute w-24 h-24 bg-[#C9A227] rounded-full animate-ping opacity-30" />
                <div className="absolute w-32 h-32 bg-red-500 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
                
                {/* Main Button */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#C9A227] to-[#FFD700] rounded-full flex items-center justify-center text-[#04060b] pl-1.5 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(201,162,39,0.6)] relative z-10">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>
            
            {/* Bottom Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-bold text-[#FFD700] tracking-wider uppercase font-bengali">
                {legacyCopy.documentary[lang]}
              </span>
            </div>
          </button>

          <div
            id="legacy-video-description"
            className="mx-auto mt-8 grid max-w-5xl gap-3 text-left md:grid-cols-3"
          >
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
                <p className="font-bengali text-sm leading-7 text-slate-300">{highlight}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ════ VIDEO MODAL ════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#04060b]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={legacyCopy.modal[lang]}
            aria-describedby="legacy-video-description"
          >
            {/* Close Button */}
            <button 
              type="button"
              aria-label={legacyCopy.close[lang]}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-red-500 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Player Container */}
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(201,162,39,0.15)] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              {/* লোকাল HTML5 Video Player using sirVideo */}
              <video 
                width="100%" 
                height="100%" 
                controls 
                autoPlay 
                playsInline
                preload="metadata"
                poster={sirThumbnail}
                className="w-full h-full outline-none object-contain bg-black"
              >
                <source src={sirVideo} type="video/mp4" />
                {legacyCopy.unsupported[lang]}
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
