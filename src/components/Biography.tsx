import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FadeIn } from './FadeIn';

// 👇 PNG Format-e image import
import bioImg from '../asset/optimized/bio/biography_pic.webp';

export function Biography() {
  const { lang } = useLanguage();
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);

  const ACADEMICS = [
    { year: "1986", degree: "SSC (1st Div with Credit)", inst: "Matuail High School" },
    { year: "1988", degree: "HSC", inst: "Notre Dame College" },
    { year: "1990", degree: "BSC", inst: "Shahid Suhrawardy College" },
    { year: "1996, 1998", degree: "B.Ed & M.Ed (with Credit)", inst: "Dhaka University" },
    { year: "Ph.D.", degree: "Doctor of Philosophy", inst: "State University of New York" }
  ];

  return (
    <section id="vision" className="relative py-24 lg:py-32 px-5 lg:px-8 bg-[#04060b] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Portrait with Moving Dotted Border */}
          <motion.button
            type="button"
            aria-label="Open Dr. M. R. Mollah biography portrait preview"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group cursor-pointer appearance-none bg-transparent border-0 p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-4 focus-visible:ring-offset-[#04060b] rounded-[3rem]"
            onClick={() => setIsZoomed(true)}
          >
            {/* ✨ Moving Dotted Border Animation */}
            <div className="absolute -inset-4 pointer-events-none">
              <svg className="w-full h-full">
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  rx="40"
                  stroke="rgba(201, 162, 39, 0.3)"
                  strokeWidth="3"
                  strokeDasharray="10 15"
                  className="animate-[dash_20s_linear_infinite]"
                />
              </svg>
            </div>

            <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(201,162,39,0.2)]">
              <img
                src={bioImg}
                alt="Dr. M. R. Mollah"
                width={1696}
                height={2528}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-10 z-20 text-center">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Dr. M. R. Mollah</h3>
                <p className="text-[#C9A227] font-bold tracking-[0.2em] uppercase text-xs">Founder & Chairman</p>
                {/* Digital Signature removed as requested */}
              </div>
            </div>
          </motion.button>

          {/* Right Column: Content */}
          <div className="lg:col-span-7">
            
            {/* 🌟 "The Life Journey" Box with Moving Red Gradient Border */}
            <div className="relative inline-block mb-8 p-[2px] rounded-xl overflow-hidden group">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(transparent_60%,#ff0000_100%)]"
               />
               <div className="relative px-6 py-2 bg-[#04060b] rounded-xl">
                 <span className="text-xs font-black tracking-[0.4em] text-white uppercase">
                   {lang === 'en' ? "The Life Journey" : "জীবন সংগ্রাম ও সাফল্য"}
                 </span>
               </div>
            </div>

            {/* ✨ Typing Animation for Title with Background Effect */}
            <div className="relative mb-8">
              <div className="absolute -left-4 top-0 w-1 h-full bg-red-600 rounded-full" />
              <motion.h3 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-4xl lg:text-6xl font-serif font-bold text-white leading-tight"
              >
                A Legacy of <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-500">Educational</span>
                  <div className="absolute bottom-1 left-0 w-full h-4 bg-red-500/10 -rotate-1" />
                </span> Excellence
              </motion.h3>
            </div>

            <FadeIn>
              <div className="text-lg text-slate-300 mb-12 space-y-6 leading-relaxed">
                <p>
                  Born on October 2, 1971, Dr. Mahbubur Rahman Mollah has transformed the educational landscape. 
                  His vision was further shaped by the guidance of esteemed mentors like 
                  <span className="text-[#C9A227] font-bold px-2 py-0.5 bg-[#C9A227]/10 rounded-md">Prof. Dr. Kazi Din Muhammad</span> 
                  and <span className="text-[#C9A227] font-bold px-2 py-0.5 bg-[#C9A227]/10 rounded-md">Prof. Wilson</span>.
                </p>
              </div>
            </FadeIn>

            {/* Timeline & Message Card remains as per structure */}
            <div className="relative pl-8 border-l-2 border-red-900/30 mb-14 space-y-10">
              {ACADEMICS.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} className="relative group">
                  <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                    <span className="text-red-500 font-black text-lg min-w-[100px]">{item.year}</span>
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.degree}</h4>
                      <p className="text-slate-400">{item.inst}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Message Card */}
            <FadeIn delay={0.4}>
              <div className="relative bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-10 rounded-[2.5rem] overflow-hidden">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-red-500/10" />
                <p className="font-hind text-xl text-slate-200 italic leading-relaxed relative z-10">
                  "প্রাতিষ্ঠানিক পড়াশোনার লক্ষ্য আগের মতো নেই। পড়াশোনার উদ্দেশ্য হচ্ছে শিক্ষার্থীকে কালসচেতন করে তাকে জীবনমুখী করে তোলা..."
                </p>
                <div className="mt-6 text-right relative z-10">
                  <span className="font-hind text-xl font-bold text-red-500">- মো. মাহবুবুর রহমান মোল্লা</span>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>

      {/* 🌟 Zoom Out (Lightbox) Overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#04060b]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setIsZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Biography portrait preview"
          >
            <button
              type="button"
              aria-label="Close biography portrait preview"
              className="absolute top-10 right-10 p-4 bg-white/5 rounded-full text-white hover:bg-red-600 transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={bioImg}
              alt="Dr. M. R. Mollah biography portrait preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(255,0,0,0.1)] border border-white/10"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}</style>
    </section>
  );
}
