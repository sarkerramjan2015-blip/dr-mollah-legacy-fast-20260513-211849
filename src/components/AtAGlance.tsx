import { Award, Building2, CalendarDays, GraduationCap, MapPin, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FadeIn } from './FadeIn';
import { GlowDivider, SectionHeader, StatCard } from './ui/Premium';

const glanceStats = [
  {
    value: 'Oct 2, 1971',
    label: { en: 'Born', bn: 'জন্ম' },
    detail: { en: 'A life rooted in education, discipline, and public service.', bn: 'শিক্ষা, শৃঙ্খলা ও জনসেবায় নিবেদিত এক জীবন।' },
    icon: CalendarDays,
  },
  {
    value: '20,000+',
    label: { en: 'Students', bn: 'শিক্ষার্থী' },
    detail: { en: 'A growing academic family shaped by institutional leadership.', bn: 'প্রাতিষ্ঠানিক নেতৃত্বে গড়ে ওঠা এক বৃহৎ শিক্ষাপরিবার।' },
    icon: Users,
  },
  {
    value: '5+',
    label: { en: 'Institutions', bn: 'প্রতিষ্ঠান' },
    detail: { en: 'Schools, college, higher education, and education village vision.', bn: 'স্কুল, কলেজ, উচ্চশিক্ষা ও শিক্ষা ভিলেজের স্বপ্ন।' },
    icon: Building2,
  },
  {
    value: '35+',
    label: { en: 'Years', bn: 'বছর' },
    detail: { en: 'Long-term contribution to teaching, leadership, and advocacy.', bn: 'শিক্ষাদান, নেতৃত্ব ও অধিকারচর্চায় দীর্ঘ অবদান।' },
    icon: Award,
  },
];

const roles = [
  { en: 'Principal, Shamsul Hoque Khan School and College', bn: 'অধ্যক্ষ, সামসুল হক খান স্কুল অ্যান্ড কলেজ' },
  { en: 'Founder, Dr. Mahbubur Rahman Mollah College', bn: 'প্রতিষ্ঠাতা, ড. মাহবুবুর রহমান মোল্লা কলেজ' },
  { en: 'Chairman, DMRC Education Village', bn: 'চেয়ারম্যান, DMRC এডুকেশন ভিলেজ' },
  { en: 'Founder, Turning Point International School', bn: 'প্রতিষ্ঠাতা, টার্নিং পয়েন্ট ইন্টারন্যাশনাল স্কুল' },
  { en: 'Founder, MRIST', bn: 'প্রতিষ্ঠাতা, MRIST' },
];

const glanceCopy = {
  eyebrow: { en: 'At a Glance', bn: 'এক নজরে' },
  titleBefore: { en: 'The legacy in', bn: 'এক নজরে' },
  titleAccent: { en: 'clear signals', bn: 'লেগাসির পরিচয়' },
  description: {
    en: 'A concise snapshot for students, guardians, media visitors, and institutional audiences.',
    bn: 'শিক্ষার্থী, অভিভাবক, গণমাধ্যম ও প্রাতিষ্ঠানিক দর্শকদের জন্য সংক্ষিপ্ত পরিচিতি।',
  },
  majorRoles: { en: 'Major Roles', bn: 'প্রধান দায়িত্ব' },
  location: { en: 'Location', bn: 'অবস্থান' },
  locationName: { en: 'Demra, Dhaka', bn: 'ডেমরা, ঢাকা' },
  locationText: {
    en: 'The portfolio centers on an education movement connected to local roots and national impact.',
    bn: 'এই পোর্টফোলিও স্থানীয় শিকড় থেকে জাতীয় প্রভাব তৈরি করা এক শিক্ষা আন্দোলনের গল্প।',
  },
  contact: { en: 'Contact Office', bn: 'অফিসে যোগাযোগ' },
};

export function AtAGlance() {
  const { lang } = useLanguage();

  return (
    <section id="at-a-glance" className="relative overflow-hidden bg-[#04060b] px-5 py-20 lg:px-8 lg:py-28">
      <div className="absolute inset-0 soft-grid opacity-[0.08]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0" aria-hidden="true">
        <GlowDivider />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={glanceCopy.eyebrow[lang]}
          title={(
            <>
              {glanceCopy.titleBefore[lang]} <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text italic text-transparent">{glanceCopy.titleAccent[lang]}</span>
            </>
          )}
          description={glanceCopy.description[lang]}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {glanceStats.map((stat, index) => (
            <FadeIn key={stat.label.en} delay={index * 0.08}>
              <StatCard value={stat.value} label={stat.label[lang]} detail={stat.detail[lang]} icon={stat.icon} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <div className="corner-brackets relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3 text-[#C9A227]">
                <GraduationCap className="h-5 w-5" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em]">{glanceCopy.majorRoles[lang]}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((role) => (
                  <div key={role.en} className="rounded-xl border border-white/10 bg-[#04060b]/50 px-4 py-3 text-sm font-semibold leading-6 text-slate-200">
                    {role[lang]}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="corner-brackets relative flex h-full flex-col justify-between rounded-2xl border border-[#C9A227]/20 bg-gradient-to-br from-[#C9A227]/10 via-white/[0.035] to-[#10B981]/10 p-6 md:p-8">
              <div>
                <div className="mb-5 flex items-center gap-3 text-[#C9A227]">
                  <MapPin className="h-5 w-5" />
                  <p className="text-[11px] font-black uppercase tracking-[0.22em]">{glanceCopy.location[lang]}</p>
                </div>
                <p className="font-serif text-3xl font-black text-white">{glanceCopy.locationName[lang]}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {glanceCopy.locationText[lang]}
                </p>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-max items-center rounded-xl border border-[#C9A227]/35 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#FFD700] transition-colors hover:bg-[#C9A227]/10"
              >
                {glanceCopy.contact[lang]}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
