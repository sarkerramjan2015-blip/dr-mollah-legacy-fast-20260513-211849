import { Trophy, Award, Medal, Star, Users, BookOpen, Flag, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePortfolioData } from '../hooks/useSupabaseData';
import { FadeIn } from './FadeIn';

const iconMap: Record<string, any> = {
  Trophy, Award, Medal, Star, Users, BookOpen, Flag, Shield
};

export function AwardsLeadership() {
  const { lang } = useLanguage();
  const { awards } = usePortfolioData();

  const LEADERSHIP_DATA = [
    { role: "General Secretary", org: "Bangladesh Principal’s Association", icon: Users },
    { role: "Secretary", org: "Higher Secondary Teacher’s Association", icon: BookOpen },
    { role: "Member", org: "Bangladesh Scout (Dhaka Area)", icon: Flag },
    { role: "Advocacy", org: "A fearless soldier for Non-Government teachers' rights, gratuity, and professional dignity.", icon: Shield, special: true }
  ];

  if (!awards || awards.length === 0) return null;

  return (
    <section id="awards" className="py-20 lg:py-32 px-5 lg:px-8 bg-[#04060b] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C9A227]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#C9A227] uppercase mb-3">
            {lang === 'en' ? "Recognition & Accolades" : "স্বীকৃতি ও সম্মাননা"}
          </h2>
          <h3 className="text-4xl lg:text-5xl font-serif font-bold">
            {lang === 'en' ? "Awards Showcase" : "পুরস্কারসমূহ"}
          </h3>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {awards.map((award, i) => {
            const Icon = iconMap[award.icon] || Trophy;
            return (
              <FadeIn key={i} delay={i * 0.1} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:border-[#C9A227]/50 hover:bg-[#04060b]/80 hover:shadow-[0_0_30px_rgba(201,162,39,0.2)] transition-all duration-500 group flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#04060b] to-white/5 rounded-full flex items-center justify-center text-[#C9A227] mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-500 border border-white/5 group-hover:border-[#C9A227]/30">
                  <Icon className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-serif font-bold mb-3 text-white group-hover:text-[#C9A227] transition-colors">{award.title}</h4>
                <div className="inline-block px-4 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] font-bold text-sm mb-4">
                  {award.year}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{award.body}</p>
              </FadeIn>
            );
          })}
        </div>

        {/* Leadership Roles */}
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white">
            {lang === 'en' ? "Leadership & Advocacy" : "নেতৃত্ব ও সম্পৃক্ততা"}
          </h3>
          <div className="w-24 h-1 bg-[#C9A227] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP_DATA.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center ${item.special ? 'bg-gradient-to-br from-[#C9A227]/20 to-[#04060b] border-[#C9A227]/50 shadow-[0_0_20px_rgba(201,162,39,0.15)]' : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#C9A227]/30 hover:bg-white/10'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${item.special ? 'bg-[#C9A227] text-[#04060b]' : 'bg-[#04060b] text-[#C9A227] border border-white/10'}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className={`font-bold mb-2 ${item.special ? 'text-[#C9A227] text-lg' : 'text-white text-base'}`}>{item.role}</h4>
              <p className={`text-sm ${item.special ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>{item.org}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
