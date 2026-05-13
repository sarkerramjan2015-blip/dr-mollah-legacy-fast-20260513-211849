import { Award, Building2, CalendarDays, GraduationCap, MapPin, Users } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { GlowDivider, SectionHeader, StatCard } from './ui/Premium';

const glanceStats = [
  {
    value: 'Oct 2, 1971',
    label: 'Born',
    detail: 'A life rooted in education, discipline, and public service.',
    icon: CalendarDays,
  },
  {
    value: '20,000+',
    label: 'Students',
    detail: 'A growing academic family shaped by institutional leadership.',
    icon: Users,
  },
  {
    value: '5+',
    label: 'Institutions',
    detail: 'Schools, college, higher education, and education village vision.',
    icon: Building2,
  },
  {
    value: '35+',
    label: 'Years',
    detail: 'Long-term contribution to teaching, leadership, and advocacy.',
    icon: Award,
  },
];

const roles = [
  'Principal, Shamsul Hoque Khan School and College',
  'Founder, Dr. Mahbubur Rahman Mollah College',
  'Chairman, DMRC Education Village',
  'Founder, Turning Point International School',
  'Founder, MRIST',
];

export function AtAGlance() {
  return (
    <section id="at-a-glance" className="relative overflow-hidden bg-[#04060b] px-5 py-20 lg:px-8 lg:py-28">
      <div className="absolute inset-0 soft-grid opacity-[0.08]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0" aria-hidden="true">
        <GlowDivider />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="At a Glance"
          title={(
            <>
              The legacy in <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text italic text-transparent">clear signals</span>
            </>
          )}
          description="A concise snapshot for students, guardians, media visitors, and institutional audiences."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {glanceStats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.08}>
              <StatCard {...stat} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <div className="corner-brackets relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3 text-[#C9A227]">
                <GraduationCap className="h-5 w-5" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em]">Major Roles</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((role) => (
                  <div key={role} className="rounded-xl border border-white/10 bg-[#04060b]/50 px-4 py-3 text-sm font-semibold leading-6 text-slate-200">
                    {role}
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
                  <p className="text-[11px] font-black uppercase tracking-[0.22em]">Location</p>
                </div>
                <p className="font-serif text-3xl font-black text-white">Demra, Dhaka</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The portfolio centers on an education movement connected to local roots and national impact.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-max items-center rounded-xl border border-[#C9A227]/35 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#FFD700] transition-colors hover:bg-[#C9A227]/10"
              >
                Contact Office
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
