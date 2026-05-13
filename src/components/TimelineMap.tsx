import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { BookOpen, Building2, GraduationCap, Landmark, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FadeIn } from './FadeIn';
import { MotionFrame, SectionHeader } from './ui/Premium';

const timelineItems = [
  {
    year: '1986',
    title: { en: 'SSC with Credit', bn: 'ক্রেডিটসহ এসএসসি' },
    detail: { en: 'Matuail High School becomes an early academic milestone.', bn: 'মাতুয়াইল উচ্চ বিদ্যালয় তার শিক্ষাজীবনের একটি গুরুত্বপূর্ণ মাইলফলক।' },
    icon: GraduationCap,
    tone: 'gold',
  },
  {
    year: '1988',
    title: { en: 'Notre Dame College', bn: 'নটর ডেম কলেজ' },
    detail: { en: 'Higher secondary education shapes a disciplined academic foundation.', bn: 'উচ্চমাধ্যমিক শিক্ষা গড়ে তোলে শৃঙ্খলাপূর্ণ একাডেমিক ভিত্তি।' },
    icon: BookOpen,
    tone: 'blue',
  },
  {
    year: '1990',
    title: { en: 'Bachelor of Science', bn: 'বিজ্ঞান স্নাতক' },
    detail: { en: 'Science education strengthens the analytical backbone of his journey.', bn: 'বিজ্ঞানভিত্তিক শিক্ষা তার যাত্রার বিশ্লেষণী শক্তিকে সমৃদ্ধ করে।' },
    icon: GraduationCap,
    tone: 'green',
  },
  {
    year: '1993-2003',
    title: { en: 'SHKSC Turning Point', bn: 'এসএইচকেএসসি টার্নিং পয়েন্ট' },
    detail: { en: 'Recognition, MPO inclusion, and college branch launch create institutional momentum.', bn: 'স্বীকৃতি, এমপিওভুক্তি ও কলেজ শাখা চালু প্রতিষ্ঠানকে নতুন গতিতে এগিয়ে নেয়।' },
    icon: Landmark,
    tone: 'red',
  },
  {
    year: '2012-2015',
    title: { en: 'Board-Level Success', bn: 'বোর্ড পর্যায়ের সাফল্য' },
    detail: { en: 'SHKSC earns major SSC recognition and becomes a flagship transformation story.', bn: 'এসএসসি ফলাফলে বড় স্বীকৃতি পেয়ে এসএইচকেএসসি রূপান্তরের অনন্য গল্প হয়ে ওঠে।' },
    icon: Trophy,
    tone: 'gold',
  },
  {
    year: 'Present',
    title: { en: 'Education Ecosystem', bn: 'শিক্ষা ইকোসিস্টেম' },
    detail: { en: 'A network of institutions now carries the mission across thousands of learners.', bn: 'প্রতিষ্ঠানের বিস্তৃত নেটওয়ার্ক আজ হাজারো শিক্ষার্থীর কাছে মিশনটি পৌঁছে দিচ্ছে।' },
    icon: Building2,
    tone: 'green',
  },
];

const timelineCopy = {
  eyebrow: { en: 'Timeline Map', bn: 'টাইমলাইন' },
  titleBefore: { en: 'From academic roots to', bn: 'শিক্ষার শিকড় থেকে' },
  titleAccent: { en: 'institutional scale', bn: 'প্রতিষ্ঠানের বিস্তার' },
  description: {
    en: 'A single path connecting education, SHKSC transformation, recognition, and the wider institution-building mission.',
    bn: 'শিক্ষা, এসএইচকেএসসি রূপান্তর, স্বীকৃতি এবং বৃহত্তর প্রতিষ্ঠান গড়ার মিশনকে যুক্ত করা এক ধারাবাহিক পথ।',
  },
};

const toneClasses = {
  gold: 'border-[#C9A227]/40 text-[#C9A227] bg-[#C9A227]/10',
  blue: 'border-[#3B82F6]/40 text-[#93C5FD] bg-[#3B82F6]/10',
  green: 'border-[#10B981]/40 text-[#6EE7B7] bg-[#10B981]/10',
  red: 'border-red-500/40 text-red-300 bg-red-500/10',
};

export function TimelineMap() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: '-25% 0px -30% 0px' });

  return (
    <section id="timeline-map" ref={ref} style={{ position: 'relative' }} className="relative overflow-hidden bg-[#04060b] px-5 py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,0.08),transparent_42%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={timelineCopy.eyebrow[lang]}
          title={(
            <>
              {timelineCopy.titleBefore[lang]} <span className="bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#F5E6C8] bg-clip-text italic text-transparent">{timelineCopy.titleAccent[lang]}</span>
            </>
          )}
          description={timelineCopy.description[lang]}
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
                <FadeIn key={`${item.year}-${item.title.en}`} delay={index * 0.08}>
                  <div className={`relative grid gap-5 pl-14 md:grid-cols-2 md:pl-0 ${isRight ? '' : 'md:text-right'}`}>
                    <div className={`${isRight ? 'md:col-start-2 md:pl-12' : 'md:pr-12'}`}>
                      <MotionFrame radiusClass="rounded-2xl">
                        <div className="rounded-2xl border border-white/10 p-5 md:p-6">
                          <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${toneClasses[item.tone as keyof typeof toneClasses]}`}>
                            <Icon className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.18em]">{item.year}</span>
                          </div>
                          <h3 className="font-serif text-2xl font-black text-white">{item.title[lang]}</h3>
                          <p className="mt-3 text-sm leading-7 text-slate-400">{item.detail[lang]}</p>
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
