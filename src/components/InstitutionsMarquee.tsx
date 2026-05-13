import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Building2, GraduationCap, Images, Mail, Sparkles, X } from 'lucide-react';
import { useInteractiveMarquee } from '../hooks/useInteractiveMarquee';

import tpLogo from '../asset/optimized/turning_point_logo.webp';
import shkscLogo from '../asset/optimized/shksc_logo.webp';
import mristLogo from '../asset/optimized/mrist_logo.webp';
import dmrcLogo from '../asset/optimized/dmrc_logo.webp';

type Institution = {
  name: string;
  shortName: string;
  logo: string | null;
  role: string;
  year: string;
  metric: string;
  description: string;
  href: string;
  gradient: string;
};

const institutions: Institution[] = [
  {
    name: 'Turning Point International School',
    shortName: 'Turning Point',
    logo: tpLogo,
    role: 'Founder',
    year: 'Institutional Vision',
    metric: 'Early leadership footprint',
    description: 'A founding initiative shaped around disciplined learning, confidence, and future-ready student development.',
    href: '#institutions',
    gradient: 'from-[#FFD700] to-[#C9A227]',
  },
  {
    name: 'Shamsul Hoque Khan School and College',
    shortName: 'SHKSC',
    logo: shkscLogo,
    role: 'Principal',
    year: 'Transformation Story',
    metric: '157 to 20,000+ students',
    description: 'The flagship transformation story: from a humble beginning to one of Bangladesh’s most recognized educational families.',
    href: '#transformation',
    gradient: 'from-[#10B981] to-[#34D399]',
  },
  {
    name: 'MRIST',
    shortName: 'MRIST',
    logo: mristLogo,
    role: 'Founder',
    year: 'Higher Education',
    metric: 'Science and technology focus',
    description: 'A higher-education vision connected to modern skills, applied learning, and national progress.',
    href: '#biography',
    gradient: 'from-[#6366F1] to-[#8B5CF6]',
  },
  {
    name: 'Dr. Mahbubur Rahman Mollah College',
    shortName: 'DMRC',
    logo: dmrcLogo,
    role: 'Founder',
    year: 'College Legacy',
    metric: 'Academic excellence brand',
    description: 'A signature institution carrying his name, values, and long-term educational philosophy.',
    href: '#awards',
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
  },
  {
    name: 'DMRC Education Village',
    shortName: 'Education Village',
    logo: null,
    role: 'Chairman',
    year: 'Future Campus',
    metric: 'Integrated learning vision',
    description: 'A broader education ecosystem designed to connect institutions, discipline, values, and ambition under one vision.',
    href: '#legacy',
    gradient: 'from-[#F5E6C8] to-[#FFD700]',
  },
];

function InstitutionMark({ institution }: { institution: Institution }) {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-[#080b12] border border-white/10 overflow-hidden shadow-xl group-hover:border-[#C9A227]/60 group-hover:shadow-[0_0_24px_rgba(201,162,39,0.22)] transition-all duration-500">
      {institution.logo ? (
        <img
          src={institution.logo}
          alt={`${institution.name} logo`}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <GraduationCap className="w-10 h-10 text-[#C9A227] transition-colors duration-500 group-hover:text-white" />
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

function InstitutionCard({ institution }: { institution: Institution }) {
  return (
    <div className="flex min-w-[360px] md:min-w-[520px] items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.26)] transition-all duration-500 group-hover:border-[#C9A227]/35 group-hover:bg-white/[0.06] md:gap-6 md:px-6 md:py-5">
      <InstitutionMark institution={institution} />

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors duration-500 group-hover:border-[#C9A227]/40 group-hover:text-white">
            {institution.role}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]/80">
            {institution.year}
          </span>
        </div>

        <h3 className={`truncate bg-gradient-to-r ${institution.gradient} bg-clip-text font-serif text-2xl font-black italic tracking-normal text-transparent md:text-4xl`}>
          {institution.shortName}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-400">
          {institution.metric}
        </p>
      </div>

      <ArrowUpRight className="h-5 w-5 flex-none text-white/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C9A227]" />
    </div>
  );
}

export function InstitutionsMarquee() {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const institutionMarquee = useInteractiveMarquee<HTMLDivElement>({
    autoScroll: true,
    speed: 26,
  });

  useEffect(() => {
    if (!selectedInstitution) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedInstitution(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedInstitution]);

  return (
    <section id="institutions" className="relative overflow-hidden bg-[#04060b] py-24">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_38%,rgba(201,162,39,0.035))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

      <div className="relative z-10 mx-auto mb-12 flex max-w-7xl flex-col items-center px-5 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/25 bg-white/[0.035] px-5 py-2 text-[#C9A227] shadow-[0_0_24px_rgba(201,162,39,0.12)]">
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.28em]">Institutional Ecosystem</span>
        </div>

        <h2 className="max-w-4xl font-serif text-4xl font-black leading-tight text-white md:text-6xl">
          A living network of <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text italic text-transparent">educational impact</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          Every institution reflects one continuous mission: disciplined learning, values, ambition, and measurable transformation.
        </p>
      </div>

      <div
        ref={institutionMarquee.ref}
        {...institutionMarquee.marqueeProps}
        className={`institution-marquee-shell interactive-marquee relative z-10 overflow-x-auto border-y border-[#C9A227]/15 bg-white/[0.025] py-6 backdrop-blur-xl ${
          institutionMarquee.isDragging ? 'is-dragging' : ''
        }`}
        aria-label="Dr. Mahbubur Rahman Mollah's institutional leadership network"
      >
        <div className="flex w-max items-center gap-5 px-5 pr-10">
          {[...institutions, ...institutions, ...institutions].map((institution, index) => {
            const isDuplicate = index >= institutions.length;

            return (
              <button
                key={`${institution.name}-${index}`}
                type="button"
                onClick={() => {
                  if (institutionMarquee.shouldIgnoreClick()) return;
                  setSelectedInstitution(institution);
                }}
                className="group flex-shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-4 focus-visible:ring-offset-[#04060b]"
                aria-hidden={isDuplicate}
                aria-label={`Open details for ${institution.name}`}
                tabIndex={isDuplicate ? -1 : 0}
              >
                <InstitutionCard institution={institution} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 px-5 text-center sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="text-2xl font-black text-white">5+</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Institutions</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="text-2xl font-black text-white">20,000+</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Students Impacted</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="text-2xl font-black text-white">35+</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Years of Work</p>
        </div>
      </div>

      <AnimatePresence>
        {selectedInstitution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[210] flex items-center justify-center bg-[#04060b]/95 p-4 backdrop-blur-2xl md:p-8"
            onClick={() => setSelectedInstitution(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedInstitution.name} details`}
          >
            <button
              type="button"
              aria-label="Close institution details"
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 hover:text-red-400 md:right-10 md:top-10"
              onClick={() => setSelectedInstitution(null)}
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.94, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 24, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#080b12] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <InstitutionMark institution={selectedInstitution} />
                <div className="min-w-0">
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#FFD700]">
                    <Building2 className="h-3.5 w-3.5" />
                    {selectedInstitution.role}
                  </p>
                  <h3 className="font-serif text-3xl font-black leading-tight text-white md:text-5xl">
                    {selectedInstitution.name}
                  </h3>
                </div>
              </div>

              <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Chapter</dt>
                  <dd className="mt-2 font-semibold text-white">{selectedInstitution.year}</dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Impact</dt>
                  <dd className="mt-2 font-semibold text-white">{selectedInstitution.metric}</dd>
                </div>
              </dl>

              <p className="mt-6 text-base leading-8 text-slate-300">
                {selectedInstitution.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={selectedInstitution.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#FFD700] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#04060b] transition-transform hover:scale-[1.02]"
                  onClick={() => setSelectedInstitution(null)}
                >
                  Explore Chapter
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C9A227]/35 bg-white/[0.035] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#C9A227]/10"
                  onClick={() => setSelectedInstitution(null)}
                >
                  View Gallery
                  <Images className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-200 transition-colors hover:bg-white/[0.06]"
                  onClick={() => setSelectedInstitution(null)}
                >
                  Contact Office
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
