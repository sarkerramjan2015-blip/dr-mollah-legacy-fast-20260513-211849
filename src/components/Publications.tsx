import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, ArrowRight, X, BookOpen } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { FadeIn } from './FadeIn';
import { FilterTabs } from './ui/Premium';

// ─────────────────────────────────────────────
// 🌟 ইমেজের ইমপোর্টগুলো
// ─────────────────────────────────────────────
import img1 from '../asset/optimized/news_paper/bangladesh_protidin.webp';
import img2 from '../asset/optimized/news_paper/bangladesh_protidin_02.webp';
import img3 from '../asset/optimized/news_paper/bangladesh_protidin_03.webp';
import img4 from '../asset/optimized/news_paper/ittefak.webp';
import img5 from '../asset/optimized/news_paper/kaler_kanto.webp';
import img6 from '../asset/optimized/news_paper/new_edu.webp';
import img7 from '../asset/optimized/news_paper/poramorsho_02.webp';
import img8 from '../asset/optimized/news_paper/porashona_01.webp';
import img9 from '../asset/optimized/news_paper/prothom_alo.webp';

// ─────────────────────────────────────────────
// 🌟 ৯টি নিউজপেপারের সম্পূর্ণ ডেটাবেস
// ─────────────────────────────────────────────
type Publication = {
  id: number;
  title: string;
  paper: string;
  category: string;
  img: string;
};

type PublicationFilter = 'all' | 'leadership' | 'academic' | 'national' | 'media';

const publicationFilters: { id: PublicationFilter; label: Record<Language, string> }[] = [
  { id: 'all', label: { en: 'All', bn: 'সব' } },
  { id: 'leadership', label: { en: 'Leadership', bn: 'নেতৃত্ব' } },
  { id: 'academic', label: { en: 'Academic', bn: 'শিক্ষা' } },
  { id: 'national', label: { en: 'National', bn: 'জাতীয়' } },
  { id: 'media', label: { en: 'Media', bn: 'মিডিয়া' } },
];

const publicationFilterMap: Record<number, Exclude<PublicationFilter, 'all'>> = {
  1: 'academic',
  2: 'academic',
  3: 'national',
  4: 'leadership',
  5: 'academic',
  6: 'academic',
  7: 'leadership',
  8: 'academic',
  9: 'media',
};

const publicationsData: Publication[] = [
  { id: 1, title: 'এইচএসসিতে কেন এত ফেল', paper: 'বাংলাদেশ প্রতিদিন', category: 'শিক্ষা বিশ্লেষণ', img: img1 },
  { id: 2, title: 'এবার যুদ্ধ বিশ্ববিদ্যালয়ে ভর্তিতে', paper: 'বাংলাদেশ প্রতিদিন', category: 'উচ্চশিক্ষা', img: img2 },
  { id: 3, title: 'ঝরে পড়ছে শিক্ষার্থীরা', paper: 'বাংলাদেশ প্রতিদিন', category: 'সামাজিক দৃষ্টিভঙ্গি', img: img3 },
  { id: 4, title: 'সচেতনভাবে পরীক্ষা দাও সাফল্য অনিবার্য', paper: 'দৈনিক ইত্তেফাক', category: 'অধ্যক্ষের পরামর্শ', img: img4 },
  { id: 5, title: 'প্রত্যাশিত ফল অর্জন করো', paper: 'কালের কণ্ঠ', category: 'পড়ালেখা ও প্রস্তুতি', img: img5 },
  { id: 6, title: 'নতুন শিক্ষাক্রম গড়বে আদর্শ ও উন্নত শিক্ষার্থী', paper: 'আজকের পত্রিকা', category: 'শিক্ষাক্রম ও কারিকুলাম', img: img6 },
  { id: 7, title: 'পরীক্ষা হোক নির্দ্বিধায়, আনন্দে', paper: 'জাতীয় দৈনিক', category: 'পরামর্শ কলাম', img: img7 },
  { id: 8, title: 'এইচএসসি পরীক্ষা বিশেষ প্রস্তুতি', paper: 'শিক্ষা পাতা', category: 'পরীক্ষা প্রস্তুতি', img: img8 },
  { id: 9, title: 'নিয়মিত পড়লেই প্রস্তুতি ভালো হবে', paper: 'প্রথম আলো', category: 'অনুপ্রেরণা ও পরামর্শ', img: img9 },
];

const publicationEnglishCopy: Record<number, Pick<Publication, 'title' | 'paper' | 'category'>> = {
  1: { title: 'Why Are So Many Students Failing HSC?', paper: 'Bangladesh Pratidin', category: 'Education Analysis' },
  2: { title: 'This Time the Battle Is University Admission', paper: 'Bangladesh Pratidin', category: 'Higher Education' },
  3: { title: 'Students Are Dropping Out', paper: 'Bangladesh Pratidin', category: 'Social Perspective' },
  4: { title: 'Take Exams Consciously, Success Will Follow', paper: 'Daily Ittefaq', category: "Principal's Advice" },
  5: { title: 'Achieve the Expected Result', paper: 'Kaler Kantho', category: 'Study and Preparation' },
  6: { title: 'The New Curriculum Will Shape Ideal Learners', paper: 'Ajker Patrika', category: 'Curriculum and Learning' },
  7: { title: 'Let Exams Be Fearless and Joyful', paper: 'National Daily', category: 'Advice Column' },
  8: { title: 'HSC Exam Special Preparation', paper: 'Shikkha Pata', category: 'Exam Preparation' },
  9: { title: 'Regular Study Builds Better Preparation', paper: 'Prothom Alo', category: 'Inspiration and Advice' },
};

const publicationCopy = {
  eyebrow: { en: 'Publications & Insights', bn: 'প্রকাশনা ও অন্তর্দৃষ্টি' },
  titleBefore: { en: 'Publications &', bn: 'প্রকাশনা ও' },
  titleAccent: { en: 'Insights', bn: 'প্রবন্ধ' },
  read: { en: 'Read Column', bn: 'কলামটি পড়ুন' },
  ariaFilter: { en: 'Filter publications', bn: 'প্রকাশনা ফিল্টার করুন' },
  modal: { en: 'Publication image preview', bn: 'প্রকাশনার ছবি প্রিভিউ' },
  close: { en: 'Close publication preview', bn: 'প্রকাশনা প্রিভিউ বন্ধ করুন' },
};

function getPublicationText(publication: Publication, lang: Language, field: 'title' | 'paper' | 'category') {
  return lang === 'en' ? publicationEnglishCopy[publication.id][field] : publication[field];
}

export function Publications() {
  const { lang } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<Publication | null>(null);
  const [activeFilter, setActiveFilter] = useState<PublicationFilter>('all');
  const filteredPublications = useMemo(() => (
    activeFilter === 'all'
      ? publicationsData
      : publicationsData.filter((publication) => publicationFilterMap[publication.id] === activeFilter)
  ), [activeFilter]);

  useEffect(() => {
    if (!selectedArticle) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedArticle(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-8 bg-[#04060b] overflow-hidden">
      
      {/* 🌟 Background Visuals */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ef4444]/50 to-transparent opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ════ HEADER SECTION ════ */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="relative inline-block mb-8 p-[2px] rounded-xl overflow-hidden group">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(transparent_60%,#ef4444_100%)]"
            />
            <div className="relative px-8 py-2 bg-[#04060b] rounded-xl">
              <span className="text-xs font-black tracking-[0.4em] text-white uppercase">
                {publicationCopy.eyebrow[lang]}
              </span>
            </div>
          </div>

          <h3 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
            {publicationCopy.titleBefore[lang]} <span className="text-red-500 italic">{publicationCopy.titleAccent[lang]}</span>
          </h3>
        </div>

        <FilterTabs
          options={publicationFilters.map((filter) => ({ id: filter.id, label: filter.label[lang] }))}
          active={activeFilter}
          onChange={setActiveFilter}
          ariaLabel={publicationCopy.ariaFilter[lang]}
        />

        {/* ════ GRID SECTION ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPublications.map((pub, index) => (
            <FadeIn key={pub.id} delay={index * 0.1}>
              <button
                type="button"
                onClick={() => setSelectedArticle(pub)}
                aria-label={lang === 'en' ? `Open publication: ${getPublicationText(pub, lang, 'title')}` : `${getPublicationText(pub, lang, 'title')} খুলুন`}
                className="group relative bg-[#0a0c10]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-500/30 transition-all duration-500 cursor-pointer shadow-2xl h-full flex flex-col text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#04060b]"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pub.img} 
                    alt={getPublicationText(pub, lang, 'title')}
                    className="w-full h-full object-cover transform-gpu group-hover:scale-110 transition-transform duration-1000 filter grayscale-[20%] group-hover:grayscale-0 object-top" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-[#04060b]/20 to-transparent opacity-90" />
                  
                  {/* Newspaper Name Highlight */}
                  <div className="absolute bottom-4 left-6">
                    <span className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                      {getPublicationText(pub, lang, 'paper')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-[#C9A227] font-bold text-xs uppercase tracking-normal">
                      <BookOpen size={14} /> {getPublicationText(pub, lang, 'category')}
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors font-bengali leading-snug">
                      {getPublicationText(pub, lang, 'title')}
                    </h4>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-black text-white/40 group-hover:text-white transition-colors flex items-center gap-2 font-bengali">
                      {publicationCopy.read[lang]} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                    <Newspaper size={20} className="text-white/10 group-hover:text-red-500/50 transition-colors" />
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* 📰 NEWSPAPER IMAGE VIEWER MODAL 📰 */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)} // Click outside to close
            role="dialog"
            aria-modal="true"
            aria-label={publicationCopy.modal[lang]}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#f9f7f2] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.2)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-zinc-200 border-b border-zinc-300 flex-shrink-0">
                <div className="flex flex-col">
                  <span className="font-black text-xs md:text-sm uppercase tracking-widest text-zinc-800">{getPublicationText(selectedArticle, lang, 'paper')}</span>
                  <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase">{getPublicationText(selectedArticle, lang, 'category')}</span>
                </div>
                <button type="button" aria-label={publicationCopy.close[lang]} onClick={() => setSelectedArticle(null)} className="p-2 bg-zinc-300/50 hover:bg-zinc-300 rounded-full transition-colors text-zinc-800">
                  <X size={24} />
                </button>
              </div>

              {/* Original Newspaper Image Scroll View */}
              <div className="overflow-y-auto p-4 md:p-8 h-full bg-[#e5e5e5]">
                <div className="max-w-3xl mx-auto bg-white p-2 md:p-4 shadow-xl border border-zinc-300">
                   <img 
                      src={selectedArticle.img} 
                      alt={getPublicationText(selectedArticle, lang, 'title')}
                      className="w-full h-auto object-contain"
                   />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
