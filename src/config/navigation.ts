export type SectionId =
  | 'home'
  | 'at-a-glance'
  | 'institutions'
  | 'gallery'
  | 'biography'
  | 'transformation'
  | 'timeline-map'
  | 'publications'
  | 'events'
  | 'tributes'
  | 'awards'
  | 'legacy'
  | 'contact';

export type LocalizedText = {
  en: string;
  bn: string;
};

export type NavItem = LocalizedText & {
  id: SectionId;
  hint: LocalizedText;
};

export type NavGroup = LocalizedText & {
  key: string;
  items: NavItem[];
};

export const sectionIds: SectionId[] = [
  'home',
  'at-a-glance',
  'institutions',
  'gallery',
  'biography',
  'transformation',
  'timeline-map',
  'publications',
  'events',
  'tributes',
  'awards',
  'legacy',
  'contact',
];

export const navGroups: NavGroup[] = [
  {
    key: 'story',
    en: 'Story',
    bn: 'গল্প',
    items: [
      { id: 'home', en: 'Home', bn: 'হোম', hint: { en: 'Start from the hero portrait', bn: 'প্রথম দৃশ্য থেকে শুরু' } },
      { id: 'at-a-glance', en: 'At a Glance', bn: 'এক নজরে', hint: { en: 'Fast facts and impact metrics', bn: 'দ্রুত তথ্য ও প্রভাব' } },
      { id: 'biography', en: 'Biography', bn: 'জীবনী', hint: { en: 'Life, education, and philosophy', bn: 'জীবন, শিক্ষা ও দর্শন' } },
      { id: 'transformation', en: 'History', bn: 'ইতিহাস', hint: { en: 'The SHKSC transformation story', bn: 'এসএইচকেএসসি রূপান্তর' } },
      { id: 'timeline-map', en: 'Timeline Map', bn: 'টাইমলাইন', hint: { en: 'Education and institution milestones', bn: 'শিক্ষা ও প্রতিষ্ঠানের মাইলফলক' } },
    ],
  },
  {
    key: 'work',
    en: 'Work',
    bn: 'কর্মযজ্ঞ',
    items: [
      { id: 'institutions', en: 'Institutions', bn: 'প্রতিষ্ঠান', hint: { en: 'Schools, college, and education village', bn: 'স্কুল, কলেজ ও শিক্ষা ভিলেজ' } },
      { id: 'awards', en: 'Awards', bn: 'পুরস্কার', hint: { en: 'Recognition and leadership roles', bn: 'স্বীকৃতি ও নেতৃত্ব' } },
    ],
  },
  {
    key: 'media',
    en: 'Media',
    bn: 'মিডিয়া',
    items: [
      { id: 'gallery', en: 'Gallery', bn: 'গ্যালারি', hint: { en: 'Leadership moments and memories', bn: 'নেতৃত্বের মুহূর্ত' } },
      { id: 'publications', en: 'Publications', bn: 'প্রকাশনা', hint: { en: 'Newspaper columns and insights', bn: 'পত্রিকা ও মতামত' } },
      { id: 'events', en: 'Events', bn: 'ইভেন্ট', hint: { en: 'Campus events and dialogues', bn: 'ক্যাম্পাস ইভেন্ট' } },
      { id: 'tributes', en: 'Tributes', bn: 'শুভেচ্ছা', hint: { en: 'National days and greetings', bn: 'জাতীয় দিবস ও শুভেচ্ছা' } },
      { id: 'legacy', en: 'Legacy Video', bn: 'লেগাসি ভিডিও', hint: { en: 'Watch the documentary chapter', bn: 'ডকুমেন্টারি দেখুন' } },
    ],
  },
  {
    key: 'contact',
    en: 'Contact',
    bn: 'যোগাযোগ',
    items: [
      { id: 'contact', en: 'Office Contact', bn: 'অফিস যোগাযোগ', hint: { en: 'Message, phone, email, and map', bn: 'বার্তা, ফোন, ইমেইল ও ম্যাপ' } },
    ],
  },
];

export const flatNavItems = navGroups.flatMap((group) => group.items);

export function getSectionLabel(id: SectionId, lang: 'en' | 'bn') {
  return flatNavItems.find((item) => item.id === id)?.[lang] ?? id;
}
