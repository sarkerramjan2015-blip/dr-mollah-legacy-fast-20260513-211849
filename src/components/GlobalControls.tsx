import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Languages, Mail, PlayCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const goToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = -88;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

export function GlobalControls() {
  const [showTop, setShowTop] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { lang, toggleLang } = useLanguage();
  const isBangla = lang === 'bn';

  useEffect(() => {
    const toggle = () => setShowTop(window.scrollY > 500);
    toggle();
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const controls = [
    {
      label: isBangla ? 'উপরে যান' : 'Back to top',
      Icon: ArrowUp,
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      disabled: !showTop,
    },
    {
      label: isBangla ? 'অফিসে যোগাযোগ' : 'Contact office',
      Icon: Mail,
      onClick: () => goToSection('contact'),
      disabled: false,
    },
    {
      label: isBangla ? 'লেগাসি দেখুন' : 'Watch legacy',
      Icon: PlayCircle,
      onClick: () => goToSection('legacy'),
      disabled: false,
    },
    {
      label: isBangla ? 'Switch to English' : 'বাংলা করুন',
      Icon: Languages,
      onClick: toggleLang,
      disabled: false,
      badge: isBangla ? 'EN' : 'BN',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, x: 0 }
          : { opacity: 1, x: 0, y: [0, -4, 0] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.2 }
          : {
              opacity: { duration: 0.25 },
              x: { duration: 0.25 },
              y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
            }
      }
      className="fixed bottom-5 right-4 z-40 rounded-2xl border border-white/10 bg-[#080b12]/86 p-1.5 shadow-[0_20px_55px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:bottom-6 md:right-6"
      aria-label={isBangla ? 'দ্রুত কাজ' : 'Quick actions'}
    >
      <div className="flex flex-col gap-1.5">
        {controls.map(({ label, Icon, onClick, disabled, badge }) => (
          <button
            key={label}
            type="button"
            disabled={disabled}
            aria-label={label}
            onClick={onClick}
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all hover:border-[#C9A227]/60 hover:bg-[#C9A227] hover:text-[#04060b] disabled:pointer-events-none disabled:opacity-35"
          >
            <Icon className="h-5 w-5" />
            {badge && (
              <span className="absolute -right-1 -top-1 rounded-full bg-[#C9A227] px-1.5 py-0.5 text-[8px] font-black text-[#04060b]">
                {badge}
              </span>
            )}
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#080b12] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 md:block">
              {label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
