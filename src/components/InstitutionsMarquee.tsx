import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Building2, GraduationCap, Images, Mail, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractiveMarquee } from '../hooks/useInteractiveMarquee';

import tpLogo from '../asset/optimized/turning_point_logo.webp';
import shkscLogo from '../asset/optimized/shksc_logo.webp';
import mristLogo from '../asset/optimized/mrist_logo.webp';
import dmrcLogo from '../asset/optimized/dmrc_logo.webp';

type Institution = {
  name: { en: string; bn: string };
  shortName: { en: string; bn: string };
  logo: string | null;
  role: { en: string; bn: string };
  year: { en: string; bn: string };
  metric: { en: string; bn: string };
  description: { en: string; bn: string };
  href: string;
  gradient: string;
};

const institutions: Institution[] = [
  {
    name: { en: 'Turning Point International School', bn: 'টার্নিং পয়েন্ট ইন্টারন্যাশনাল স্কুল' },
    shortName: { en: 'Turning Point', bn: 'টার্নিং পয়েন্ট' },
    logo: tpLogo,
    role: { en: 'Founder', bn: 'প্রতিষ্ঠাতা' },
    year: { en: 'Institutional Vision', bn: 'প্রাতিষ্ঠানিক স্বপ্ন' },
    metric: { en: 'Early leadership footprint', bn: 'প্রারম্ভিক নেতৃত্বের পদচিহ্ন' },
    description: { en: 'A founding initiative shaped around disciplined learning, confidence, and future-ready student development.', bn: 'শৃঙ্খলাপূর্ণ শিক্ষা, আত্মবিশ্বাস ও ভবিষ্যৎমুখী শিক্ষার্থী গঠনের জন্য গড়ে ওঠা এক প্রতিষ্ঠাতা উদ্যোগ।' },
    href: '#institutions',
    gradient: 'from-[#FFD700] to-[#C9A227]',
  },
  {
    name: { en: 'Shamsul Hoque Khan School and College', bn: 'সামসুল হক খান স্কুল অ্যান্ড কলেজ' },
    shortName: { en: 'SHKSC', bn: 'এসএইচকেএসসি' },
    logo: shkscLogo,
    role: { en: 'Principal', bn: 'অধ্যক্ষ' },
    year: { en: 'Transformation Story', bn: 'রূপান্তরের গল্প' },
    metric: { en: '157 to 20,000+ students', bn: '১৫৭ থেকে ২০,০০০+ শিক্ষার্থী' },
    description: { en: 'The flagship transformation story: from a humble beginning to one of Bangladesh’s most recognized educational families.', bn: 'সাদামাটা শুরু থেকে বাংলাদেশের অন্যতম স্বীকৃত শিক্ষাপরিবারে রূপান্তরের অনন্য গল্প।' },
    href: '#transformation',
    gradient: 'from-[#10B981] to-[#34D399]',
  },
  {
    name: { en: 'MRIST', bn: 'MRIST' },
    shortName: { en: 'MRIST', bn: 'MRIST' },
    logo: mristLogo,
    role: { en: 'Founder', bn: 'প্রতিষ্ঠাতা' },
    year: { en: 'Higher Education', bn: 'উচ্চশিক্ষা' },
    metric: { en: 'Science and technology focus', bn: 'বিজ্ঞান ও প্রযুক্তি কেন্দ্রিক' },
    description: { en: 'A higher-education vision connected to modern skills, applied learning, and national progress.', bn: 'আধুনিক দক্ষতা, প্রয়োগভিত্তিক শিক্ষা ও জাতীয় অগ্রগতির সঙ্গে যুক্ত উচ্চশিক্ষার স্বপ্ন।' },
    href: '#biography',
    gradient: 'from-[#6366F1] to-[#8B5CF6]',
  },
  {
    name: { en: 'Dr. Mahbubur Rahman Mollah College', bn: 'ড. মাহবুবুর রহমান মোল্লা কলেজ' },
    shortName: { en: 'DMRC', bn: 'DMRC' },
    logo: dmrcLogo,
    role: { en: 'Founder', bn: 'প্রতিষ্ঠাতা' },
    year: { en: 'College Legacy', bn: 'কলেজ লেগাসি' },
    metric: { en: 'Academic excellence brand', bn: 'শিক্ষাগত উৎকর্ষের পরিচয়' },
    description: { en: 'A signature institution carrying his name, values, and long-term educational philosophy.', bn: 'তার নাম, মূল্যবোধ ও দীর্ঘমেয়াদি শিক্ষা দর্শন বহনকারী একটি স্বাক্ষর প্রতিষ্ঠান।' },
    href: '#awards',
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
  },
  {
    name: { en: 'DMRC Education Village', bn: 'DMRC এডুকেশন ভিলেজ' },
    shortName: { en: 'Education Village', bn: 'এডুকেশন ভিলেজ' },
    logo: null,
    role: { en: 'Chairman', bn: 'চেয়ারম্যান' },
    year: { en: 'Future Campus', bn: 'ভবিষ্যৎ ক্যাম্পাস' },
    metric: { en: 'Integrated learning vision', bn: 'সমন্বিত শিক্ষার স্বপ্ন' },
    description: { en: 'A broader education ecosystem designed to connect institutions, discipline, values, and ambition under one vision.', bn: 'একটি বৃহত্তর শিক্ষা-ইকোসিস্টেম, যেখানে প্রতিষ্ঠান, শৃঙ্খলা, মূল্যবোধ ও উচ্চাকাঙ্ক্ষা একই স্বপ্নে যুক্ত।' },
    href: '#legacy',
    gradient: 'from-[#F5E6C8] to-[#FFD700]',
  },
];

const institutionCopy = {
  eyebrow: { en: 'Institutional Ecosystem', bn: 'প্রাতিষ্ঠানিক ইকোসিস্টেম' },
  titleBefore: { en: 'A living network of', bn: 'শিক্ষা প্রভাবের' },
  titleAccent: { en: 'educational impact', bn: 'জীবন্ত নেটওয়ার্ক' },
  description: {
    en: 'Every institution reflects one continuous mission: disciplined learning, values, ambition, and measurable transformation.',
    bn: 'প্রতিটি প্রতিষ্ঠান এক ধারাবাহিক মিশনের প্রতিফলন: শৃঙ্খলাপূর্ণ শিক্ষা, মূল্যবোধ, উচ্চাকাঙ্ক্ষা ও দৃশ্যমান রূপান্তর।',
  },
  stats: {
    institutions: { en: 'Institutions', bn: 'প্রতিষ্ঠান' },
    students: { en: 'Students Impacted', bn: 'প্রভাবিত শিক্ষার্থী' },
    years: { en: 'Years of Work', bn: 'বছরের কাজ' },
  },
  modal: {
    chapter: { en: 'Chapter', bn: 'অধ্যায়' },
    impact: { en: 'Impact', bn: 'প্রভাব' },
    explore: { en: 'Explore Chapter', bn: 'অধ্যায় দেখুন' },
    gallery: { en: 'View Gallery', bn: 'গ্যালারি দেখুন' },
    contact: { en: 'Contact Office', bn: 'অফিসে যোগাযোগ' },
  },
};

function InstitutionMark({ institution, lang }: { institution: Institution; lang: 'en' | 'bn' }) {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-[#080b12] border border-white/10 overflow-hidden shadow-xl group-hover:border-[#C9A227]/60 group-hover:shadow-[0_0_24px_rgba(201,162,39,0.22)] transition-all duration-500">
      {institution.logo ? (
        <img
          src={institution.logo}
          alt={`${institution.name[lang]} logo`}
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

function InstitutionCard({ institution, lang }: { institution: Institution; lang: 'en' | 'bn' }) {
  return (
    <div className="flex min-w-[360px] md:min-w-[520px] items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.26)] transition-all duration-500 group-hover:border-[#C9A227]/35 group-hover:bg-white/[0.06] md:gap-6 md:px-6 md:py-5">
      <InstitutionMark institution={institution} lang={lang} />

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors duration-500 group-hover:border-[#C9A227]/40 group-hover:text-white">
            {institution.role[lang]}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]/80">
            {institution.year[lang]}
          </span>
        </div>

        <h3 className={`truncate bg-gradient-to-r ${institution.gradient} bg-clip-text font-serif text-2xl font-black italic tracking-normal text-transparent md:text-4xl`}>
          {institution.shortName[lang]}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-400">
          {institution.metric[lang]}
        </p>
      </div>

      <ArrowUpRight className="h-5 w-5 flex-none text-white/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C9A227]" />
    </div>
  );
}

export function InstitutionsMarquee() {
  const { lang } = useLanguage();
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const institutionMarquee = useInteractiveMarquee<HTMLDivElement>({
    autoScroll: true,
    speed: 42,
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
          <span className="text-[10px] font-black uppercase tracking-[0.28em]">{institutionCopy.eyebrow[lang]}</span>
        </div>

        <h2 className="max-w-4xl font-serif text-4xl font-black leading-tight text-white md:text-6xl">
          {institutionCopy.titleBefore[lang]} <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text italic text-transparent">{institutionCopy.titleAccent[lang]}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {institutionCopy.description[lang]}
        </p>
      </div>

      <div
        ref={institutionMarquee.ref}
        {...institutionMarquee.marqueeProps}
        className={`institution-marquee-shell interactive-marquee relative z-10 overflow-x-auto border-y border-[#C9A227]/15 bg-white/[0.025] py-6 backdrop-blur-xl ${
          institutionMarquee.isDragging ? 'is-dragging' : ''
        }`}
        aria-label={lang === 'en' ? "Dr. Mahbubur Rahman Mollah's institutional leadership network" : 'ড. মাহবুবুর রহমান মোল্লার প্রাতিষ্ঠানিক নেতৃত্বের নেটওয়ার্ক'}
      >
        <div className="flex w-max items-center gap-5 px-5 pr-10">
          {[...institutions, ...institutions, ...institutions].map((institution, index) => {
            const isDuplicate = index >= institutions.length;

            return (
              <button
                key={`${institution.name.en}-${index}`}
                type="button"
                onClick={() => {
                  if (institutionMarquee.shouldIgnoreClick()) return;
                  setSelectedInstitution(institution);
                }}
                className="group flex-shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-4 focus-visible:ring-offset-[#04060b]"
                aria-hidden={isDuplicate}
                aria-label={lang === 'en' ? `Open details for ${institution.name.en}` : `${institution.name.bn} বিস্তারিত খুলুন`}
                tabIndex={isDuplicate ? -1 : 0}
              >
                <InstitutionCard institution={institution} lang={lang} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 px-5 text-center sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="text-2xl font-black text-white">5+</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{institutionCopy.stats.institutions[lang]}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="text-2xl font-black text-white">20,000+</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{institutionCopy.stats.students[lang]}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4">
          <p className="text-2xl font-black text-white">35+</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{institutionCopy.stats.years[lang]}</p>
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
            aria-label={lang === 'en' ? `${selectedInstitution.name.en} details` : `${selectedInstitution.name.bn} বিস্তারিত`}
          >
            <button
              type="button"
              aria-label={lang === 'en' ? 'Close institution details' : 'প্রতিষ্ঠানের বিস্তারিত বন্ধ করুন'}
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
                <InstitutionMark institution={selectedInstitution} lang={lang} />
                <div className="min-w-0">
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#FFD700]">
                    <Building2 className="h-3.5 w-3.5" />
                    {selectedInstitution.role[lang]}
                  </p>
                  <h3 className="font-serif text-3xl font-black leading-tight text-white md:text-5xl">
                    {selectedInstitution.name[lang]}
                  </h3>
                </div>
              </div>

              <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{institutionCopy.modal.chapter[lang]}</dt>
                  <dd className="mt-2 font-semibold text-white">{selectedInstitution.year[lang]}</dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{institutionCopy.modal.impact[lang]}</dt>
                  <dd className="mt-2 font-semibold text-white">{selectedInstitution.metric[lang]}</dd>
                </div>
              </dl>

              <p className="mt-6 text-base leading-8 text-slate-300">
                {selectedInstitution.description[lang]}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={selectedInstitution.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#FFD700] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#04060b] transition-transform hover:scale-[1.02]"
                  onClick={() => setSelectedInstitution(null)}
                >
                  {institutionCopy.modal.explore[lang]}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C9A227]/35 bg-white/[0.035] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#C9A227]/10"
                  onClick={() => setSelectedInstitution(null)}
                >
                  {institutionCopy.modal.gallery[lang]}
                  <Images className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-200 transition-colors hover:bg-white/[0.06]"
                  onClick={() => setSelectedInstitution(null)}
                >
                  {institutionCopy.modal.contact[lang]}
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
