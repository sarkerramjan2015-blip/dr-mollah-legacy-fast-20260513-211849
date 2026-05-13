import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Static Fallbacks
const FALLBACK_ACTIVITIES = [
  { id: 1, date: "Oct 15, 2023", title: "National Education Seminar", desc: "Keynote speaker discussing the future of secondary education in Bangladesh.", img: "https://picsum.photos/seed/act1/600/400" },
  { id: 2, date: "Sep 28, 2023", title: "Science Lab Inauguration", desc: "Inaugurated the new state-of-the-art science laboratory at SHKSC.", img: "https://picsum.photos/seed/act2/600/400" },
  { id: 3, date: "Aug 12, 2023", title: "Teachers' Training Workshop", desc: "Led a comprehensive workshop on modern pedagogical approaches.", img: "https://picsum.photos/seed/act3/600/400" },
  { id: 4, date: "Jul 05, 2023", title: "HWPL Peace Summit", desc: "Represented Bangladesh as an Ambassador of HWPL in South Korea.", img: "https://picsum.photos/seed/act4/600/400" }
];

const FALLBACK_INSTITUTIONS = [
  { id: 1, name: "SHKSC", grad: "from-[#C9A227] to-[#F5E6C8]" },
  { id: 2, name: "DMRC", grad: "from-[#6366F1] to-[#D946EF]" },
  { id: 3, name: "MRIST", grad: "from-[#10B981] to-[#D1FAE5]" },
  { id: 4, name: "DMRC Village", grad: "from-[#F43F5E] to-[#FFF1F2]" }
];

const FALLBACK_DIALOGUES = [
  { id: 1, img: "https://picsum.photos/seed/sd1/600/400", caption: "শিক্ষানীতি নিয়ে আলোচনা", details: "জাতীয় শিক্ষানীতি বাস্তবায়ন ও আধুনিকায়ন নিয়ে নীতিনির্ধারকদের সাথে বিশেষ মতবিনিময়।" },
  { id: 2, img: "https://picsum.photos/seed/sd2/600/400", caption: "আন্তর্জাতিক সেমিনার", details: "দক্ষিণ কোরিয়ায় অনুষ্ঠিত আন্তর্জাতিক শান্তি ও শিক্ষা সেমিনারে বাংলাদেশের প্রতিনিধিত্ব।" },
  { id: 3, img: "https://picsum.photos/seed/sd3/600/400", caption: "শিক্ষক প্রশিক্ষণ কর্মশালা", details: "আধুনিক শিক্ষাদান পদ্ধতি ও শিক্ষকদের পেশাগত মান উন্নয়নে দিকনির্দেশনামূলক বক্তব্য।" },
  { id: 4, img: "https://picsum.photos/seed/sd4/600/400", caption: "উচ্চশিক্ষা বিষয়ক গোলটেবিল", details: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষার গুণগত মান বৃদ্ধিতে বিশ্ববিদ্যালয়গুলোর সাথে সমন্বয়।" },
  { id: 5, img: "https://picsum.photos/seed/sd5/600/400", caption: "ডিজিটাল ক্লাসরুম উদ্বোধন", details: "একুশ শতকের চ্যালেঞ্জ মোকাবেলায় প্রযুক্তিভিত্তিক শিক্ষার প্রসার ও ডিজিটাল ক্লাসরুম স্থাপন।" },
  { id: 6, img: "https://picsum.photos/seed/sd6/600/400", caption: "অভিভাবক সমাবেশ", details: "শিক্ষার্থীদের সার্বিক বিকাশে শিক্ষক ও অভিভাবকদের সমন্বিত ভূমিকা নিয়ে আলোচনা।" }
];

const FALLBACK_ARTICLES = [
  { id: 1, title: "The Future of Secondary Education", tag: "The Daily Star", excerpt: "Exploring the necessary reforms to prepare our students for the 21st-century global landscape." },
  { id: 2, title: "Empowering Educators", tag: "Prothom Alo", excerpt: "Why investing in teachers' rights and dignity is the fundamental building block of a successful nation." },
  { id: 3, title: "Digital Classrooms in Bangladesh", tag: "Education Blog", excerpt: "Transitioning from traditional methods to interactive, technology-driven learning environments." }
];

const FALLBACK_AWARDS = [
  { id: 1, title: "Best Principal", year: "2005 & 2006", body: "Bangladesh Teacher’s Association (World Teachers' Day)", icon: "Trophy" },
  { id: 2, title: "Best Institution & Principal", year: "2007", body: "BSB Foundation", icon: "Award" },
  { id: 3, title: "Ekushe Medal", year: "Honorary", body: "Geipsam Association, Dhaka", icon: "Medal" },
  { id: 4, title: "Man of the Year Award '90", year: "1990", body: "Journalist Association for Child Welfare", icon: "Star" },
  { id: 5, title: "Special Recognition", year: "2009", body: "Dhaka-5 Parliamentary recognition by Alhaz Habibur Rahman Mollah", icon: "Award" }
];

type SupabaseFallbackRecord = Record<string, unknown>;

const hasSupabaseConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !String(import.meta.env.VITE_SUPABASE_URL).includes('placeholder')
);

const shouldReadPublicSupabaseData = import.meta.env.VITE_PUBLIC_SUPABASE_READS === 'true';

export function useSupabaseData<T extends SupabaseFallbackRecord>(tableName: string, fallbackData: T[]) {
  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: fetchedData, error } = await supabase.from(tableName).select('*');
        if (error || !fetchedData || fetchedData.length === 0) {
          setData(fallbackData);
        } else {
          setData(fetchedData as T[]);
        }
      } catch {
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    if (hasSupabaseConfig && shouldReadPublicSupabaseData) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [tableName, fallbackData]);

  return { data, loading };
}

export function usePortfolioData() {
  const { data: activities } = useSupabaseData('activities', FALLBACK_ACTIVITIES);
  const { data: institutions } = useSupabaseData('institutions', FALLBACK_INSTITUTIONS);
  const { data: dialogues } = useSupabaseData('strategic_dialogues', FALLBACK_DIALOGUES);
  const { data: articles } = useSupabaseData('articles', FALLBACK_ARTICLES);
  const { data: awards } = useSupabaseData('awards', FALLBACK_AWARDS);

  return { activities, institutions, dialogues, articles, awards };
}
