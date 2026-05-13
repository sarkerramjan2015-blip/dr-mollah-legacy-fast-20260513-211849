import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navGroups, type SectionId } from '../config/navigation';
import { useLanguage } from '../contexts/LanguageContext';

type NavbarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const { lang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState(navGroups[0]?.key ?? 'story');

  const handleNavClick = (id: SectionId, event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    setOpenGroup(null);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -88;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-1/2 top-4 z-[100] flex w-full max-w-7xl -translate-x-1/2 flex-col items-center px-4 md:top-6">
      <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-[#0a0c10]/82 px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:px-6">
        <button
          type="button"
          aria-label="Go to home section"
          className="appearance-none border-0 bg-transparent p-0 text-left font-serif text-sm font-black tracking-widest text-[#C9A227] md:border-r md:border-white/10 md:pr-5 md:text-lg"
          onClick={(event) => handleNavClick('home', event)}
        >
          DR. M. R. MOLLAH
        </button>

        <div className="hidden items-center gap-2 lg:flex" onMouseLeave={() => setOpenGroup(null)}>
          {navGroups.map((group) => {
            const isActiveGroup = group.items.some((item) => item.id === activeSection);
            const isOpen = openGroup === group.key;

            return (
              <div key={group.key} className="relative" onMouseEnter={() => setOpenGroup(group.key)}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : group.key)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition-all ${
                    isActiveGroup || isOpen ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {group[lang]}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180 text-[#C9A227]' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 14, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      role="menu"
                      className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#080b12]/96 p-3 shadow-[0_28px_70px_rgba(0,0,0,0.7)] backdrop-blur-3xl"
                    >
                      <div className="mb-2 px-3 py-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C9A227]">{group[lang]}</p>
                      </div>
                      {group.items.map((item) => {
                        const isActive = activeSection === item.id;

                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            role="menuitem"
                            onClick={(event) => handleNavClick(item.id, event)}
                            className={`block rounded-2xl px-4 py-3 transition-all ${
                              isActive ? 'bg-[#C9A227] text-[#04060b]' : 'text-slate-300 hover:bg-white/[0.055] hover:text-white'
                            }`}
                          >
                            <span className="block text-xs font-black uppercase tracking-[0.16em]">{item[lang]}</span>
                            <span className={`mt-1 block text-xs leading-5 ${isActive ? 'text-[#04060b]/70' : 'text-slate-500'}`}>
                              {item.hint[lang]}
                            </span>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:text-[#C9A227] lg:hidden"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            id="mobile-navigation"
            className="absolute top-full mt-2 max-h-[78vh] w-[92%] max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-[#080b12]/96 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-3xl lg:hidden"
          >
            {navGroups.map((group) => {
              const isOpen = openMobileGroup === group.key;

              return (
                <div key={group.key} className="mb-2 last:mb-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMobileGroup(isOpen ? '' : group.key)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-xs font-black uppercase tracking-[0.18em] text-white"
                  >
                    {group[lang]}
                    <ChevronDown className={`h-4 w-4 text-[#C9A227] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-2 px-1 py-2">
                          {group.items.map((item) => {
                            const isActive = activeSection === item.id;

                            return (
                              <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(event) => handleNavClick(item.id, event)}
                                className={`rounded-2xl px-5 py-3 text-sm font-bold transition-all ${
                                  isActive ? 'bg-[#C9A227] text-[#04060b]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <span className="block">{item[lang]}</span>
                                <span className={`mt-1 block text-xs font-medium ${isActive ? 'text-[#04060b]/65' : 'text-slate-500'}`}>
                                  {item.hint[lang]}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
