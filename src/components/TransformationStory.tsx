import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { Tent, Globe } from 'lucide-react';
import { FadeIn } from './FadeIn';

import pastImage from '../asset/optimized/tinshed_school.webp';
import presentImage from '../asset/optimized/modern_campus.webp';

// ─────────────────────────────────────────────
// 🌟 1. Animated Counter — ultra smooth spring
// ─────────────────────────────────────────────
type SmoothCounterProps = {
  from?: number;
  to: number;
  duration?: number;
  trigger: boolean;
};

const SmoothCounter = ({ from = 0, to, duration = 6, trigger }: SmoothCounterProps) => {
  const [display, setDisplay] = useState(from);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [trigger, from, to, duration]);

  return <>{display.toLocaleString()}</>;
};

// ─────────────────────────────────────────────
// 🌟 2. Static Image (No Jitter)
// ─────────────────────────────────────────────
type StableImageProps = {
  src: string;
  alt: string;
  grayscale?: boolean;
  className?: string;
  containerClassName?: string;
};

const StableImage = ({ src, alt, grayscale = false, className = '', containerClassName = '' }: StableImageProps) => (
  <div className={`overflow-hidden rounded-2xl relative ${containerClassName}`}>
    <div className="w-full h-full overflow-hidden rounded-2xl" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : 'opacity-90 hover:opacity-100'
        } hover:scale-105 ${className}`}
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────
// 🌟 3. Premium Orbit Light Border (For Right Card)
// ─────────────────────────────────────────────
type OrbitBorderProps = {
  children: ReactNode;
  radius?: string;
  duration?: number;
  blur?: number;
  opacity?: number;
  className?: string;
};

const OrbitBorder = ({ children, radius = '2rem', duration = 10, blur = 20, opacity = 0.4, className = '' }: OrbitBorderProps) => (
  <div className={`relative ${className}`} style={{ borderRadius: radius }}>
    <div className="absolute inset-[-2px] overflow-hidden pointer-events-none" style={{ borderRadius: `calc(${radius} + 2px)` }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '-50%',
          background: 'conic-gradient(from 0deg, transparent 0deg 280deg, rgba(201,162,39,0.8) 320deg, rgba(255,255,255,0.6) 360deg)',
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </div>
    <div className="absolute inset-[0px] pointer-events-none" style={{ borderRadius: radius, border: '1px solid rgba(255,255,255,0.05)' }} />
    {children}
  </div>
);

// ─────────────────────────────────────────────
// 🌟 4. Main Section
// ─────────────────────────────────────────────
export function TransformationStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: '-100px' });

  const timelineData = [
    { year: '১৮৮৯', label: 'The Humble Beginning', desc: 'টিনের ঘর আর মাত্র ১৫৭ জন শিক্ষার্থী নিয়ে শুরু হওয়া সেই স্বপ্ন — একটি আলোকিত ভবিষ্যতের বীজ বপন।' },
    { year: '১৯৯৩–২০০৩', label: 'The Turning Point', desc: '১৯৯৩ সালে সরকারি স্বীকৃতি, ১৯৯৫ সালে এমপিওভুক্তি এবং ২০০৩ সালে কলেজ শাখার ঐতিহাসিক উদ্বোধন।' },
    { year: '২০১২–২০১৫', label: 'The Pinnacle of Success', desc: '২০১২ ও ২০১৫ সালে ঢাকা বোর্ড এসএসসিতে যথাক্রমে ২য় ও ১ম স্থান — দেশসেরা বিদ্যাপীঠের স্বীকৃতি।' },
    { year: 'বর্তমান', label: 'The Present Glory', desc: '২০,০০০+ শিক্ষার্থীর এক গর্বিত পরিবার এবং আধুনিক স্থাপত্যের এক অনন্য জ্ঞানের তীর্থ।' },
  ];

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36 px-5 lg:px-8 bg-[#04060b] border-t border-white/[0.02] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* ════ HEADER ════ */}
        <div className="flex flex-col items-center text-center mb-24">

            {/* 🌟 Top Badge with Moving Red Gradient Border (Same as user requested) */}
            <div className="relative inline-block mb-8 p-[2px] rounded-xl overflow-hidden group">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(transparent_60%,#ff0000_100%)]"
               />
               <div className="relative px-6 py-2 bg-[#04060b] rounded-xl">
                 <span className="text-xs md:text-sm font-black tracking-[0.3em] text-white uppercase text-center block">
                   A Visionary Leadership that redefined Education in Bangladesh
                 </span>
               </div>
            </div>

            {/* ✨ Reveal Animation for Title with Background Effect (Same as user requested) */}
            <div className="relative mb-8 inline-block text-center max-w-4xl mx-auto pl-6">
              {/* Left Red Vertical Line */}
              <div className="absolute left-0 top-0 w-1.5 h-full bg-red-600 rounded-full" />
              
              <motion.h3 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-white leading-[1.2]"
              >
                The SHKSC <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-red-500 italic px-2">Transformation</span>
                  <div className="absolute bottom-2 left-0 w-full h-5 md:h-6 bg-red-500/20 -rotate-2" />
                </span> Story
              </motion.h3>
            </div>

        </div>

        {/* ════ BODY: Timeline + Card ════ */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Timeline ── */}
          <div className="relative pl-8 border-l-[2px] border-white/5">
            {timelineData.map((item, i) => (
              <FadeIn key={i} delay={i * 0.15} className="mb-12 relative group">
                {/* Clean Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#04060b] border-2 border-red-500 group-hover:bg-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.3)]" />
                
                <div className="inline-block mb-3 text-red-500 text-sm font-black tracking-widest uppercase">
                  {item.year}
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </h4>
                <p className="text-slate-400 text-base leading-relaxed font-bengali group-hover:text-slate-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </FadeIn>
            ))}
          </div>

          {/* ── RIGHT: Premium Glass Card ── */}
          <div ref={counterRef} className="sticky top-28">
            <OrbitBorder radius="2rem" duration={12} blur={25} opacity={0.6}>
              <div className="relative rounded-[2rem] bg-[#0a0c10]/80 backdrop-blur-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/[0.05]">
                
                {/* ─── 1889 Block ─── */}
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8 group">
                  <div className="flex-1 space-y-2">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">1889 — The Beginning</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-bold text-white/80 tracking-normal">157</span>
                      <span className="text-sm text-slate-500 font-medium">Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <Tent className="w-4 h-4" /> Tinshed Campus
                    </div>
                  </div>
                  <StableImage src={pastImage} alt="1889 Campus" grayscale containerClassName="w-full xl:w-40 h-28 border border-white/5" />
                </div>

                {/* Elegant Divider */}
                <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* ─── 2026 Block ─── */}
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8 group">
                  <div className="flex-1 space-y-2">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-500">2026 — The Present</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl lg:text-7xl font-black tracking-normal bg-gradient-to-r from-red-500 to-[#FFD700] bg-clip-text text-transparent">
                        <SmoothCounter from={157} to={20000} duration={5} trigger={isInView} />+
                      </span>
                      <span className="text-base text-slate-400 font-medium">Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-red-500 pt-1">
                      <Globe className="w-4 h-4" /> Modern Mega Campus
                    </div>
                  </div>
                  <StableImage src={presentImage} alt="2026 Campus" containerClassName="w-full xl:w-48 h-32 border border-red-500/20" />
                </div>

              </div>
            </OrbitBorder>
          </div>

        </div>
      </div>
    </section>
  );
}
