import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { BookOpen, Building2, GraduationCap, Landmark, Trophy } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { MotionFrame, SectionHeader } from './ui/Premium';

const timelineItems = [
  {
    year: '1986',
    title: 'SSC with Credit',
    detail: 'Matuail High School becomes an early academic milestone.',
    icon: GraduationCap,
    tone: 'gold',
  },
  {
    year: '1988',
    title: 'Notre Dame College',
    detail: 'Higher secondary education shapes a disciplined academic foundation.',
    icon: BookOpen,
    tone: 'blue',
  },
  {
    year: '1990',
    title: 'Bachelor of Science',
    detail: 'Science education strengthens the analytical backbone of his journey.',
    icon: GraduationCap,
    tone: 'green',
  },
  {
    year: '1993-2003',
    title: 'SHKSC Turning Point',
    detail: 'Recognition, MPO inclusion, and college branch launch create institutional momentum.',
    icon: Landmark,
    tone: 'red',
  },
  {
    year: '2012-2015',
    title: 'Board-Level Success',
    detail: 'SHKSC earns major SSC recognition and becomes a flagship transformation story.',
    icon: Trophy,
    tone: 'gold',
  },
  {
    year: 'Present',
    title: 'Education Ecosystem',
    detail: 'A network of institutions now carries the mission across thousands of learners.',
    icon: Building2,
    tone: 'green',
  },
];

const toneClasses = {
  gold: 'border-[#C9A227]/40 text-[#C9A227] bg-[#C9A227]/10',
  blue: 'border-[#3B82F6]/40 text-[#93C5FD] bg-[#3B82F6]/10',
  green: 'border-[#10B981]/40 text-[#6EE7B7] bg-[#10B981]/10',
  red: 'border-red-500/40 text-red-300 bg-red-500/10',
};

export function TimelineMap() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: '-25% 0px -30% 0px' });

  return (
    <section id="timeline-map" ref={ref} style={{ position: 'relative' }} className="relative overflow-hidden bg-[#04060b] px-5 py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,0.08),transparent_42%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Timeline Map"
          title={(
            <>
              From academic roots to <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text italic text-transparent">institutional scale</span>
            </>
          )}
          description="A single path connecting education, SHKSC transformation, recognition, and the wider institution-building mission."
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-white/10 md:left-1/2" aria-hidden="true" />
          <motion.div
            className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-[#C9A227] via-red-500 to-[#10B981] md:left-1/2"
            initial={{ scaleY: 0.08 }}
            animate={{ scaleY: isInView ? 1 : 0.08 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isRight = index % 2 === 1;

              return (
                <FadeIn key={`${item.year}-${item.title}`} delay={index * 0.08}>
                  <div className={`relative grid gap-5 pl-14 md:grid-cols-2 md:pl-0 ${isRight ? '' : 'md:text-right'}`}>
                    <div className={`${isRight ? 'md:col-start-2 md:pl-12' : 'md:pr-12'}`}>
                      <MotionFrame radiusClass="rounded-2xl">
                        <div className="rounded-2xl border border-white/10 p-5 md:p-6">
                          <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${toneClasses[item.tone as keyof typeof toneClasses]}`}>
                            <Icon className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.18em]">{item.year}</span>
                          </div>
                          <h3 className="font-serif text-2xl font-black text-white">{item.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-slate-400">{item.detail}</p>
                        </div>
                      </MotionFrame>
                    </div>

                    <div className="absolute left-[14px] top-6 flex h-4 w-4 items-center justify-center rounded-full border border-[#C9A227] bg-[#04060b] shadow-[0_0_22px_rgba(201,162,39,0.35)] md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
