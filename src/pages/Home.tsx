import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { GraduationCap, BookOpen, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AtAGlance } from '../components/AtAGlance';
import { InstitutionsMarquee } from '../components/InstitutionsMarquee';
import { GlobalControls } from '../components/GlobalControls';
import { sectionIds } from '../config/navigation';

const AestheticGallery = lazy(() => import('../components/AestheticGallery').then((module) => ({ default: module.AestheticGallery })));
const Biography = lazy(() => import('../components/Biography').then((module) => ({ default: module.Biography })));
const TransformationStory = lazy(() => import('../components/TransformationStory').then((module) => ({ default: module.TransformationStory })));
const Publications = lazy(() => import('../components/Publications').then((module) => ({ default: module.Publications })));
const StrategicDialogues = lazy(() => import('../components/StrategicDialogues').then((module) => ({ default: module.StrategicDialogues })));
const NationalTributes = lazy(() => import('../components/NationalTributes').then((module) => ({ default: module.NationalTributes })));
const AwardsLeadership = lazy(() => import('../components/AwardsLeadership').then((module) => ({ default: module.AwardsLeadership })));
const TimelineMap = lazy(() => import('../components/TimelineMap').then((module) => ({ default: module.TimelineMap })));
const WatchTheLegacy = lazy(() => import('../components/WatchTheLegacy').then((module) => ({ default: module.WatchTheLegacy })));
const ContactFooter = lazy(() => import('../components/ContactFooter').then((module) => ({ default: module.ContactFooter })));

function SectionFallback() {
  return <div className="min-h-[32vh] bg-[#04060b]" aria-hidden="true" />;
}

export function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!selectedImg) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImg(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImg]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (activeEntry?.target.id) {
          setActiveSection(activeEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.08, 0.2, 0.45, 0.7],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#04060b] text-slate-300 selection:bg-amber-500/20 font-sans overflow-x-hidden scroll-smooth relative">
      
      {/* 🌟 Dynamic Background Theme (Mesh Glow) */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-40 right-10 rotate-12"><GraduationCap size={400} /></div>
          <div className="absolute bottom-20 left-10 -rotate-12"><BookOpen size={300} /></div>
        </div>
      </div>

      {/* 🌟 Scroll Progress Line */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A227] to-[#F5E6C8] origin-left z-[100]" style={{ scaleX }} />

      {/* 🌟 Navigation & Controls */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <GlobalControls />

      {/* ════ ALL SECTIONS WRAPPED WITH IDs FOR NAVIGATION ════ */}
      
      <main className="relative z-10">
        <section id="home">
          <Hero setSelectedImg={setSelectedImg} />
        </section>

        <AtAGlance />
        <InstitutionsMarquee />

        <Suspense fallback={<SectionFallback />}>
          <AestheticGallery />
        </Suspense>

        <section id="biography">
          <Suspense fallback={<SectionFallback />}>
            <Biography />
          </Suspense>
        </section>

        <section id="transformation">
          <Suspense fallback={<SectionFallback />}>
            <TransformationStory />
          </Suspense>
        </section>

        <Suspense fallback={<SectionFallback />}>
          <TimelineMap />
        </Suspense>

        <section id="publications">
          <Suspense fallback={<SectionFallback />}>
            <Publications />
          </Suspense>
        </section>

        <section id="events">
          <Suspense fallback={<SectionFallback />}>
            <StrategicDialogues />
          </Suspense>
        </section>

        <section id="tributes">
          <Suspense fallback={<SectionFallback />}>
            <NationalTributes />
          </Suspense>
        </section>

        <section id="awards">
          <Suspense fallback={<SectionFallback />}>
            <AwardsLeadership />
          </Suspense>
        </section>

        <section id="legacy">
          <Suspense fallback={<SectionFallback />}>
            <WatchTheLegacy />
          </Suspense>
        </section>

        <section id="contact">
          <Suspense fallback={<SectionFallback />}>
            <ContactFooter />
          </Suspense>
        </section>
      </main>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] bg-[#04060b]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImg(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded portrait preview"
          >
            <button
              type="button"
              aria-label="Close portrait preview"
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-red-500 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 backdrop-blur-md"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.img
              src={selectedImg}
              alt="Dr. Mahbubur Rahman Mollah portrait preview"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl md:rounded-[2rem] shadow-[0_0_90px_rgba(201,162,39,0.25)] border border-white/10"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
