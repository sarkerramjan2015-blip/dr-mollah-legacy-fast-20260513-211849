import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { useInteractiveMarquee } from '../hooks/useInteractiveMarquee';
import { FilterTabs } from './ui/Premium';

// 👇 তোমার লোকাল ফোল্ডার থেকে ইভেন্টের ছবিগুলো ইমপোর্ট করা হলো
// (ফোল্ডারের নাম 'New folder' থাকলে এভাবেই কাজ করবে, তবে স্পেস ছাড়া নাম দিলে ভালো)
import img1 from '../asset/optimized/New folder/16_april.webp';
import img2 from '../asset/optimized/New folder/class_8.webp';
import img3 from '../asset/optimized/New folder/class_8_part_02.webp';
import img4 from '../asset/optimized/New folder/best_students.webp';
import img5 from '../asset/optimized/New folder/morning_shift.webp';
import img6 from '../asset/optimized/New folder/2026_language.webp';
import img7 from '../asset/optimized/New folder/gurdian.webp';
import img8 from '../asset/optimized/New folder/gurdian_part02.webp';
import img9 from '../asset/optimized/New folder/alo.webp';
import img10 from '../asset/optimized/New folder/captain.webp';

// ─────────────────────────────────────────────
// 🌟 ১০টি ইভেন্টের সম্পূর্ণ ডেটাবেস
// ─────────────────────────────────────────────
const dialoguesData = [
  {
    id: 1,
    title: "২০২৬ খ্রিস্টাব্দের এসএসসি পরীক্ষার্থীদের বিদায় সংবর্ধনা",
    caption: "এসএসসি পরীক্ষার্থীদের বিদায় সংবর্ধনা ও দোয়া মাহফিল সম্পন্ন হয়েছে।",
    img: img1,
    details: `বিদায় মানেই শেষ নয়, বিদায় মানে নতুন এক শুরুর অপেক্ষা।\n\nআজ সামসুল হক খান স্কুল অ্যান্ড কলেজের ২০২৬ খ্রিস্টাব্দের এসএসসি পরীক্ষার্থীদের বিদায় সংবর্ধনা অনুষ্ঠান ও দোয়া মাহফিল সম্পন্ন হয়েছে।\n\nএসএসসি পরীক্ষায় সকল পরীক্ষার্থী মনোযোগী থাকবে, আত্মবিশ্বাস ধরে রাখবে, এবং সর্বোচ্চটা দিয়ে চেষ্টা করবে—এটাই আমাদের প্রত্যাশা।\nসকল পরীক্ষার্থীদের আগামীর পথচলা হোক সাফল্যমন্ডিত।🎓\n\nসামসুল হক খান স্কুল অ্যান্ড কলেজ পরিবার`
  },
  {
    id: 2,
    title: "অষ্টম শ্রেণির বৃত্তি পরীক্ষায় ডেমরায় সর্বোচ্চ সাফল্য",
    caption: "শিক্ষার মানউন্নয়ন, শিক্ষক মূল্যায়ন ও অভিনন্দিত সভা অনুষ্ঠিত।",
    img: img2,
    details: `অষ্টম শ্রেণির বৃত্তি পরীক্ষায় ডেমরা অঞ্চলে সর্বোচ্চ সাফল্য অর্জন করেছে সামসুল হক খান স্কুল অ্যান্ড কলেজ। এ বছর ডেমরা থানায় মোট ২৭০ জন শিক্ষার্থী বৃত্তি লাভ করেছে, যার মধ্যে ২৫৩ জন সাধারণ বৃত্তি অর্জন করেছে। পাশাপাশি ডেমরায় মোট ৮৬ জন শিক্ষার্থী মেধাবৃত্তি লাভের গৌরব অর্জন করে, যার মধ্যে ৮৫ জনই সামসুল হক খান স্কুল অ্যান্ড কলেজের শিক্ষার্থী—যা প্রতিষ্ঠানের জন্য এক অসাধারণ অর্জন হিসেবে বিবেচিত হচ্ছে।\n\nএই চমৎকার ফলাফল অর্জনের জন্য অষ্টম শ্রেণির সংশ্লিষ্ট সকল বিষয়ের শিক্ষকদের প্রতি কৃতজ্ঞতা প্রকাশের লক্ষ্যে বিদ্যালয়ে এক সুন্দর ও প্রাণবন্ত সভার আয়োজন করা হয়।\nপবিত্র কোরআন তেলাওয়াতের মাধ্যমে অনুষ্ঠানের শুভ সূচনা করা হয়। এরপর প্রতিষ্ঠানের অধ্যক্ষ ড. মাহবুবুর রহমান মোল্লা মহোদয় বক্তব্য প্রদান করেন। তিনি শিক্ষকদের অক্লান্ত পরিশ্রম, নিষ্ঠা, সততা ও আন্তরিকতার ভূয়সী প্রশংসা করেন এবং শিক্ষার্থীদের এই সাফল্যের পেছনে শিক্ষকদের অবদানকে প্রধান শক্তি হিসেবে উল্লেখ করেন।\n\nসভায় উপস্থিত শিক্ষকবৃন্দ আগামিতে প্রতিষ্ঠানের সাফল্যকে আরো একধাপ এগিয়ে নেয়ার প্রত্যয় ব্যক্ত করেন। এমন অর্জন ভবিষ্যতেও শিক্ষার মান উন্নয়নে সবাইকে আরও অনুপ্রাণিত করবে বলে আশা প্রকাশ করা হয়।\nএই অসামান্য সাফল্য সামসুল হক খান স্কুল অ্যান্ড কলেজের শিক্ষা কার্যক্রমের মান, শিক্ষক-শিক্ষার্থীর সম্মিলিত প্রচেষ্টা এবং শিক্ষাবান্ধব পরিবেশের একটি উজ্জ্বল দৃষ্টান্ত হিসেবে বিবেচিত হচ্ছে।`
  },
  {
    id: 3,
    title: "গৌরবময় সাফল্যের নতুন ইতিহাস",
    caption: "জুনিয়র বৃত্তি –২০২৫ এ ডেমরা থানায় ঘোষিত ২৭০টি বৃত্তির মধ্যে ২৫৩টি অর্জন।",
    img: img3,
    details: `গৌরবময় সাফল্যের নতুন ইতিহাস গড়েছে সামসুল হক খান স্কুল অ্যান্ড কলেজ।\n\nজুনিয়র বৃত্তি –২০২৫ এ ডেমরা থানায় ঘোষিত মোট ২৭০টি বৃত্তির মধ্যে ২৫৩টি বৃত্তি অর্জন করে অনন্য কৃতিত্ব অর্জন করেছে প্রতিষ্ঠানটি। যা ডেমরা থানার শিক্ষা ইতিহাসে এক ব্যতিক্রমী সাফল্য হিসেবে বিবেচিত হচ্ছে।\nএই সাফল্য কেবল সংখ্যাগত অর্জন নয়; বরং এটি শিক্ষার্থীদের মেধা, অধ্যবসায়, শৃঙ্খলাবোধ এবং মানসম্মত শিক্ষার উজ্জ্বল দৃষ্টান্ত।\n\nএ বিষয়ে প্রতিষ্ঠানটির প্রিন্সিপাল বলেন—\n“প্রতিটি বৃত্তির পেছনে রয়েছে আমাদের শিক্ষকদের নিরলস পরিশ্রম, অভিভাবকদের অটুট আস্থা এবং শিক্ষার্থীদের স্বপ্ন জয়ের দৃঢ় প্রত্যয়।”\nতিনি আরও বলেন, এই সাফল্য ভবিষ্যতে শিক্ষার্থীদের আরও বড় অর্জনে অনুপ্রাণিত করবে।\n\nশিক্ষক, শিক্ষার্থী ও অভিভাবকদের সম্মিলিত প্রচেষ্টার ফলেই এই গৌরবময় অর্জন সম্ভব হয়েছে বলে জানান সংশ্লিষ্টরা। এ সাফল্যে আনন্দ ও উৎসবমুখর পরিবেশ বিরাজ করছে পুরো শিক্ষা প্রতিষ্ঠানে।`
  },
  {
    id: 4,
    title: "শ্রেষ্ঠ শিক্ষার্থী ২০২৫: লাল গালিচার ওপর স্বপ্ন",
    caption: "দ্বাদশ শ্রেষ্ঠ শিক্ষার্থীদের বিজয়ীদের নাম ঘোষণা করলেন প্রিন্সিপাল স্যার।",
    img: img4,
    details: `লাল গালিচার ওপর দাঁড়িয়ে ছিল কতগুলো স্বপ্ন। চারপাশে হাজারো চোখ—আর করতালির ঢেউ যেন সত্যিই আকাশ ছুঁয়ে যাচ্ছিল।\n\nসেই আবেগঘন মুহূর্তে সামসুল হক খান স্কুল অ্যান্ড কলেজের মাঝমাঠ রূপ নিল গৌরবের মঞ্চে। অনুষ্ঠিত হলো “শ্রেষ্ঠ শিক্ষার্থী ২০২৫"–এর চূড়ান্ত নাম ঘোষণা। সপ্তম থেকে দশম শ্রেণির দিবা, প্রভাতি ও ইংলিশ ভার্সনের ১২জন শ্রেষ্ঠ শিক্ষার্থীদের বিজয়ীদের নাম ঘোষণা করলেন প্রতিষ্ঠান প্রধান প্রিন্সিপাল ড. মাহবুবুর রহমান মোল্লা স্যার।\n\nস্যারের মুখ থেকে প্রতিটি নাম উচ্চারিত হওয়ার সঙ্গে সঙ্গে যেন আলো জ্বল জ্বল করে উঠল—একেকটি নাম একেকটি আলোক শিখা, যা আগামী দিনের সুন্দর পথরেখা তৈরি করে প্রতিষ্ঠানকে আরও গৌরবাঙ্গনে পরিণত করবে৷\n\nশিক্ষার্থীদের এই সাফল্যের সম্মান কেবল মঞ্চে ওঠার ক্ষণিক আনন্দ নয়; এ দীর্ঘ রাত জেগে অধ্যয়ন, সহশিক্ষা কার্যক্রমে আত্মনিবেদন, নিয়মিত উপস্থিতি, শৃঙ্খলা, আত্মবিশ্বাস এবং নীরব অথচ দৃঢ় পরিশ্রমের দীপ্ত স্বীকৃতি।\n\nপ্রিন্সিপাল স্যার শিক্ষার্থীদের এ অর্জনকে আরও সৌন্দর্যমণ্ডিত করতে ঘোষণা দেন, তাদের কৃতিত্বের জন্য উপহারস্বরূপ ক্রেস্ট, সনদ, ট্যাসেল ক্যাপ, উত্তরীয়, এককালীন প্রাইজ মানি এবং এক বছরের ফ্রি টিউশন—এসব তো অর্জনের দৃশ্যমান প্রতীক মাত্র; প্রকৃত পুরস্কার হলো নিজের সক্ষমতাকে সবার সামনে প্রতিষ্ঠিত করার সাহস ও সম্মান।\n\nআজ যারা মুগ্ধ হয়ে করতালি দিয়েছে, আগামীকাল তারাই এই লাল গালিচায় দাঁড়াবে। কারণ এই প্রাঙ্গণে স্বপ্ন থেমে থাকে না—এখানে স্বপ্ন ডানা মেলে, লক্ষ্য আকাশ ছোঁয়ার সাহস দেখায়।\nছবি — SHKSCPC`
  },
  {
    id: 5,
    title: "প্রভাতি শাখার শিক্ষক মিলনায়তন উদ্বোধন",
    caption: "উন্নত কর্মপরিবেশ নিশ্চিত করে নতুন রূপে সুসজ্জিত শিক্ষক মিলনায়তন।",
    img: img5,
    details: `প্রভাতি শাখার শিক্ষক মিলনায়তন SHKSC লোগো সম্বলিত নতুন রূপে সুসজ্জিত এবং একটি উন্নত কর্মপরিবেশ নিশ্চিত করে উদ্বোধন করা হয়েছে।\n\nএই মিলনায়তনে আরামদায়ক বসার ব্যবস্থা, অত্যাধুনিক প্রযুক্তিগত সুবিধা এবং নান্দনিক সজ্জা যুক্ত করা হয়েছে, যা শিক্ষকদের পেশাদারিত্ব ও পারস্পরিক মতবিনিময়ে নতুন মাত্রা যোগ করবে।`
  },
  {
    id: 6,
    title: "লিঙ্গুইস্টিক অলিম্পিয়াড ২০২৬এ চ্যাম্পিয়ন",
    caption: "জাতীয় লিঙ্গুইস্টিক অলিম্পিয়াডে সামসুল হক খান স্কুল অ্যান্ড কলেজ দেশসেরা।",
    img: img6,
    details: `লিঙ্গুইস্টিক অলিম্পিয়াড ২০২৬এ সামসুল হক খান স্কুল অ্যান্ড কলেজ চ্যাম্পিয়ন। নতুন প্রধানমন্ত্রী দেবেন পুরস্কার।\n\nআন্তর্জাতিক মাতৃভাষা ইনস্টিটিউট আয়োজিত জাতীয় লিঙ্গুইস্টিক অলিম্পিয়াড ২০২৬ মাতৃভাষা চর্চা ও ভাষাভিত্তিক প্রতিযোগিতায় সারা দেশ থেকে অংশগ্রহণকারী শিক্ষার্থীর মধ্য থেকে দেশসেরা শিক্ষাঙ্গন সামসুল হক খান স্কুল অ্যান্ড কলেজের নবম শ্রেণির শিক্ষার্থী কে এম খালিদ সাইফুল্লাহ প্রথম স্থান এবং তৃতীয় স্থান অধিকার করে নবম শ্রেণির শিক্ষার্থী সাফওয়ান ইসলাম ইয়াফি।\n\nআগামী ২১এ ফেব্রুয়ারি বাংলাদেশের নতুন প্রধানমন্ত্রী তাদের এই অসাধারণ অর্জনের জন্য জমকালো আনুষ্ঠানিকতার মধ্যদিয়ে পুরস্কৃত করবেন। চূড়ান্ত পর্যায়ে প্রতিদ্বন্দ্বিতায় জয়লাভের ফলে সামসুল হক খান স্কুল অ্যান্ড কলেজের ২ জন শিক্ষার্থী এ বছর ইউরোপের রোমানিয়ায় অনুষ্ঠিতব্য আন্তর্জাতিক লিঙ্গুইস্টিক অলিম্পিয়াডে বাংলাদেশের হয়ে প্রতিনিধিত্ব করার সুযোগ পাবেন। এই পুরস্কার মেধাবীদের পীঠস্থান সামসুল হক খান স্কুল অ্যান্ড কলেজের জন্য এক বিজয়সূচক পতাকা।\n\nযেকোন জাতীয় ও আন্তর্জাতিক অলিম্পিয়াডের প্রতিদ্বন্দ্বিতায় সামসুল হক স্কুল অ্যান্ড কলেজের অবস্থান থাকে চোখ ধাঁধানো। প্রতিষ্ঠানের অন্যতম মেধাবী শিক্ষার্থী নাহিয়ান এই প্রসঙ্গে স্মরণযোগ্য।\n\nপ্রতিষ্ঠানের সম্মানিত সভাপতি এবং ঢাকা জেলার অতিরিক্ত জেলা প্রশাসক (শিক্ষা ও আইসিটি) জনাব শামীমা সুলতানা এবং প্রিন্সিপাল মোঃ মাহবুবুর রহমান মোল্লা সামসুল হক খান স্কুল অ্যান্ড কলেজ পরিবারের পক্ষ থেকে খালিদ সাইফুল্লাহ ও সাফওয়ান ইসলামের কৃতিত্বে গভীর আনন্দ ও উচ্ছ্বাস প্রকাশ করেন এবং তাদের অভিনন্দনসহ ফুলেল শুভেচ্ছা জ্ঞাপন করে বলেন, “তাদের এই অর্জন আমাদের প্রতিষ্ঠানের জন্য এক অনন্য সম্মান। এমন শিক্ষার্থীরাই প্রমাণ করে, সামসুল হক খান স্কুল অ্যান্ড কলেজ কেবল শিক্ষার ক্ষেত্রে নয়, সহশিক্ষা কার্যক্রমে প্রতিভা বিকাশে সমানভাবে অগ্রণী ভূমিকা রাখছে।”\n\nউল্লেখ্য কে এম খালিদ সাইফুল্লাহ জাতীয় লিঙ্গুইস্টিক অলিম্পিয়াড ২০২৫ এ 'খ' বিভাগে জাতীয় পর্যায়ে প্রথম স্থান অর্জন করে মাননীয় প্রধান উপদেষ্টার নিকট থেকে অ্যাওয়ার্ড গ্রহণ করে।`
  },
  {
    id: 7,
    title: "অষ্টম শ্রেণির অভিভাবক সমাবেশ",
    caption: "সময়ানুবর্তিতা, শৃঙ্খলা ও মেধা বিকাশে গুরুত্বারোপ করে সমাবেশ অনুষ্ঠিত।",
    img: img7,
    details: `সময়ানুবর্তিতা, শৃঙ্খলা ও মেধা বিকাশে গুরুত্বারোপ: অষ্টম শ্রেণির অভিভাবক সমাবেশ\n\nসামসুল হক খান স্কুল অ্যান্ড কলেজে অষ্টম শ্রেণির দিবা ও প্রভাতি শাখার শিক্ষার্থীদের অভিভাবকরা অংশ নেন প্রেরণাদায়ী অভিভাবক সমাবেশে।\nপ্রিন্সিপাল ড. মাহবুবুর রহমান মোল্লা স্যার শিক্ষার্থীদের সময়মত ক্লাসে উপস্থিতি, অধ্যবসায়, নিয়মিত কুইজ ও বইপাঠ, শৃঙ্খলা ও ভদ্রতা চর্চার ওপর গুরুত্বারোপ করেন। তিনি জুনিয়র স্কলারশিপ পরীক্ষায় অংশগ্রহণ ও সহশিক্ষা ও ক্লাব কার্যক্রমে সক্রিয় হওয়ার জন্য অভিভাবকদের সচেতন ভূমিকার আহ্বান জানান।\n\nসমাবেশে লিঙ্গুইস্টিক অলিম্পিয়াডে স্কুলের সাফল্যের কথা তুলে ধরে জানান, আজ অনুষ্ঠিত জাতীয় পর্যায়ের লিঙ্গুইস্টিক অলিম্পিয়াড প্রতিযোগিতায় ক বিভাগে নবম শ্রেণির কে এম খালিদ সাইফুল্লাহ চ্যাম্পিয়ন এবং সাফওয়ান ইসলাম ইয়াফি তৃতীয় স্থান অর্জন করেছে।\n\nশেষে তিনি অভিভাবক, শিক্ষক ও শিক্ষার্থীর সমন্বয়কে সফল শিক্ষার মূল ভিত্তি হিসেবে উল্লেখ করে বলেন, পরিবার ও বিদ্যালয় এক লক্ষ্য ও মূল্যবোধে ঐক্যবদ্ধ থাকলে শিক্ষার্থীর ভবিষ্যৎ হবে আরও সুদৃঢ় ও আলোকোজ্জ্বল।\nসমাবেশটি কেবল আনুষ্ঠানিক আয়োজন নয়, বরং দিকনির্দেশনা ও দায়িত্ববোধের অনুকরণীয় দৃষ্টান্ত হিসেবে শিক্ষার্থীদের সঠিক পথে এগিয়ে নেবে।`
  },
  {
    id: 8,
    title: "নবম শ্রেণির অভিভাবক সভা",
    caption: "ভবিষ্যৎ নির্মাণে অভিভাবক-শিক্ষক-শিক্ষার্থীর সম্মিলিত অঙ্গীকার।",
    img: img8,
    details: `সামসুল হক খান স্কুল অ্যান্ড কলেজে নবম শ্রেণির অভিভাবক সভা: ভবিষ্যৎ নির্মাণে অভিভাবক-শিক্ষক-শিক্ষার্থীর সম্মিলিত অঙ্গীকার\n\nশিক্ষার্থীদের একাডেমিক উৎকর্ষ, নৈতিক দৃঢ়তা ও ভবিষ্যৎ জীবনের প্রস্তুতি আরও সুসংহত করতে সামসুল হক খান স্কুল অ্যান্ড কলেজে সুশৃঙ্খল পরিবেশে নবম শ্রেণির অভিভাবক সভা অনুষ্ঠিত হয়। বিপুলসংখ্যক অভিভাবকের উপস্থিতি সন্তানদের শিক্ষার প্রতি তাঁদের আন্তরিকতা ও দায়িত্ববোধেরই প্রতিফলন।\n\nসভায় প্রধান অতিথি হিসেবে দিকনির্দেশনামূলক বক্তব্য প্রদান করেন প্রিন্সিপাল ড. মাহবুবুর রহমান মোল্লা স্যার।\nতিনি বলেন,\n“একটি জাতির ভবিষ্যৎ নির্ভর করে আজকের শিক্ষার্থীদের ওপর। তাই ভালো ফলাফলের পাশাপাশি চরিত্র গঠন, শৃঙ্খলা, নিয়মানুবর্তিতা ও নৈতিক মূল্যবোধে সমৃদ্ধ মানুষ হিসেবে শিক্ষার্থীদের গড়ে তোলাই আমাদের প্রধান লক্ষ্য।”\n\nতিনি শিক্ষার্থীদের নিয়মিত উপস্থিতি, অধ্যবসায়, কুইজ/মডেল পরীক্ষায় নিয়মিত অংশগ্রহণ, ব্যক্তিগত সার্বিক মূল্যায়নে শিক্ষার্থীদের নিয়মিত উপস্থিতি, ডায়েরি মূল্যায়নসহ প্রযুক্তির সঠিক ব্যবহারের ওপর গুরুত্বারোপ করেন এবং অভিভাবকদের সঙ্গে বিদ্যালয়ের সমন্বিত ভূমিকার প্রয়োজনীয়তার কথা তুলে ধরেন।\nসভায় প্রতিষ্ঠানের গৌরবময় ইতিহাস, এসএসসি পরীক্ষায় ঢাকা বোর্ডে প্রথম স্থান অর্জনসহ বিভিন্ন ক্লাবের সাফল্য তুলে ধরা হয়, যা প্রতিষ্ঠানের বহুমাত্রিক শিক্ষার অগ্রযাত্রাকে স্পষ্ট করে।\n\nএছাড়া শ্রেষ্ঠ শিক্ষার্থী নির্বাচনের বিষয়টি গুরুত্বের সঙ্গে তুলে ধরে জানানো হয়—মেধা, শৃঙ্খলা ও নৈতিকতার সমন্বয়েই একজন শিক্ষার্থী শ্রেষ্ঠত্বের স্বীকৃতি পায়।\nসার্বিকভাবে, এ অভিভাবক সভা নবম শ্রেণির শিক্ষার্থীদের ভবিষ্যৎ পথচলায় নতুন উদ্দীপনা ও দৃঢ় প্রত্যয় যোগাবে বলে সংশ্লিষ্ট সবাই আশাবাদ ব্যক্ত করেন।`
  },
  {
    id: 9,
    title: "বই হাতে স্বপ্নের আলো",
    caption: "সামসুল হক খান স্কুল অ্যান্ড কলেজে ‘কিশোর আলো’ উপহার উৎসব।",
    img: img9,
    details: `বই হাতে স্বপ্নের আলো: সামসুল হক খান স্কুল অ্যান্ড কলেজে ‘কিশোর আলো’ উপহার উৎসব\n\nশিক্ষার্থীদের মাঝে বইপ্রীতি ও সৃজনশীল মনন গড়ে তুলতে সামসুল হক খান স্কুল অ্যান্ড কলেজে আজ অনুষ্ঠিত হলো এক ব্যতিক্রমধর্মী ও আনন্দঘন আয়োজন। এ উপলক্ষে দেশের জনপ্রিয় দৈনিক প্রথম আলো প্রকাশিত কিশোর-কিশোরীদের প্রিয় ম্যাগাজিন 'কিশোর আলো' শিক্ষার্থীদের হাতে তুলে দেন প্রতিষ্ঠানের সম্মানিত প্রিন্সিপাল ড. মাহবুবুর রহমান মোল্লা স্যার।\n\nম্যাগাজিন পেয়ে শিক্ষার্থীদের মধ্যে দেখা যায় প্রাণোচ্ছ্বলতা ও উচ্ছ্বাস। বই হাতে নিয়ে তাদের হাসিমুখ ও উৎসাহী ভঙ্গি পুরো ক্যাম্পাসকে করে তোলে উৎসবমুখর। এ সময় দিবা ও প্রভাতি শাখার সম্মানিত সহকারী প্রধান শিক্ষকবৃন্দসহ অন্যান্য শিক্ষকগণ উপস্থিত থেকে শিক্ষার্থীদের উৎসাহিত করেন।\n\nপ্রিন্সিপাল স্যার তাঁর বক্তব্যে বলেন, পাঠ্যবইয়ের পাশাপাশি সহায়ক সাহিত্য পাঠ শিক্ষার্থীদের চিন্তাশক্তি, কল্পনাশক্তি ও বুদ্ধিবৃত্তিক বিকাশে গুরুত্বপূর্ণ ভূমিকা রাখবে। নিয়মিত বই পড়ার অভ্যাস গড়ে তুললে শিক্ষার্থীরা আলোকিত মানুষ হিসেবে গড়ে উঠবে—এমন আশাবাদ ব্যক্ত করেন তিনি।\n\nএই উদ্যোগ শিক্ষার্থীদের মনে জ্ঞানের প্রতি ভালোবাসা জাগিয়ে তুলবে, বইয়ের সঙ্গে তাদের বন্ধন আরও দৃঢ় করবে এবং আলোকিত মানুষ হয়ে ওঠার পথে এগিয়ে নিতে অনুপ্রেরণা জোগাবে—এমনটাই প্রত্যাশা।`
  },
  {
    id: 10,
    title: "ক্যাপ্টেন মিটিং–২০২৬",
    caption: "নেতৃত্বের দীপশিখা প্রজ্বলনের আয়োজন।",
    img: img10,
    details: `ক্যাপ্টেন মিটিং–২০২৬: নেতৃত্বের দীপশিখা প্রজ্বলনের আয়োজন\n\nসামসুল হক খান স্কুল অ্যান্ড কলেজে শিক্ষার্থীদের নেতৃত্বগুণ বিকাশ, শৃঙ্খলা ও দায়িত্ববোধ জাগ্রত করতে অনুষ্ঠিত হয় “Captain Meeting–2026”।\n“Today's Captain Leads Tomorrow's World”—এই আয়োজনকে স্পষ্টভাবে তুলে ধরেন।\n\nঅনুষ্ঠানে প্রধান অতিথি ছিলেন জনাব শামীমা সুলতানা, অতিরিক্ত জেলা প্রশাসক (শিক্ষা ও আইসিটি) ও চেয়ারম্যান, গভর্নিং বডি, সামসুল হক খান স্কুল অ্যান্ড কলেজ। তিনি বলেন, আজকের ক্যাপ্টেনরাই আগামীর সমাজ ও রাষ্ট্রের কাণ্ডারি; তাই তাদের চরিত্রে সততা, শৃঙ্খলা ও দায়িত্বশীলতার চর্চা অপরিহার্য।\n\nবিশেষ অতিথি জনাব ডালিয়া নওশিন লুবনা, সহকারী কমিশনার ও বিজ্ঞ এক্সিকিউটিভ ম্যাজিস্ট্রেট (শিক্ষা শাখা), নেতৃত্বকে আলোকবর্তিকার সঙ্গে তুলনা করে বলেন—সহমর্মিতা ও নৈতিকতাই প্রকৃত নেতৃত্বের মূল শক্তি।\n\nঅনুষ্ঠান এর সভা প্রধানের দায়িত্ব পালন করেন প্রিন্সিপাল ড. মাহবুবুর রহমান মোল্লা স্যার। তিনি ক্লাস ক্যাপ্টেনদের শৃঙ্খলার প্রহরী ও শিক্ষার্থীদের জন্য অনুকরণীয় আদর্শ হওয়ার আহ্বান জানান।\nসম্মানিত অতিথিবৃন্দের উপস্থিতি ও দিকনির্দেশনায় ক্যাপ্টেন মিটিং–২০২৬ এক অনুপ্রেরণাময় ও তাৎপর্যপূর্ণ আয়োজনে পরিণত হয়।`
  }
];

type DialogueItem = (typeof dialoguesData)[number];

type EventFilter = 'all' | 'leadership' | 'academic' | 'national' | 'media';

const eventFilters: { id: EventFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'academic', label: 'Academic' },
  { id: 'national', label: 'National' },
  { id: 'media', label: 'Media' },
];

const eventFilterMap: Record<number, Exclude<EventFilter, 'all'>> = {
  1: 'academic',
  2: 'academic',
  3: 'academic',
  4: 'leadership',
  5: 'academic',
  6: 'national',
  7: 'leadership',
  8: 'national',
  9: 'media',
  10: 'leadership',
};

type DialogueRowProps = {
  autoScroll: boolean;
  direction: "left" | "right";
  items: DialogueItem[];
  onSelect: (item: DialogueItem) => void;
};

function DialogueRow({ autoScroll, direction, items, onSelect }: DialogueRowProps) {
  const loopItems = items.length
    ? Array.from({ length: Math.max(3, Math.ceil(9 / items.length)) }, () => items).flat()
    : [];
  const eventMarquee = useInteractiveMarquee<HTMLDivElement>({
    autoScroll,
    direction,
    speed: 38,
    resetKey: `${direction}-${items.map((item) => item.id).join('-')}`,
  });

  if (loopItems.length === 0) return null;

  return (
    <div
      ref={eventMarquee.ref}
      {...eventMarquee.marqueeProps}
      className={`interactive-marquee overflow-x-auto px-5 md:px-8 ${
        eventMarquee.isDragging ? 'is-dragging' : ''
      }`}
      aria-label={`Campus events carousel moving ${direction}`}
    >
      <div className="flex w-max gap-6 pb-6 pr-6">
        {loopItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shrink-0 group hover:border-[#C9A227]/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,162,39,0.15)] transition-all duration-300 flex flex-col"
          >
            <div className="h-48 overflow-hidden relative shrink-0 border-b border-white/5">
              <img
                src={item.img}
                alt={item.title}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060b]/80 via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between bg-[#0a0c10]/80">
              <div>
                <h4 className="font-bengali text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#C9A227] transition-colors leading-snug">{item.title}</h4>
                <p className="font-bengali text-sm text-slate-400 mb-5 line-clamp-2">{item.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (eventMarquee.shouldIgnoreClick()) return;
                  onSelect(item);
                }}
                aria-label={`Read details for ${item.title}`}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#04060b] bg-gradient-to-r from-[#C9A227] to-[#FFD700] hover:from-[#FFD700] hover:to-[#C9A227] px-5 py-2.5 rounded-lg transition-all self-start shadow-lg"
              >
                বিস্তারিত পড়ুন <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StrategicDialogues() {
  const [selectedDialogue, setSelectedDialogue] = useState<DialogueItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all');
  const filteredDialogues = useMemo(() => (
    activeFilter === 'all'
      ? dialoguesData
      : dialoguesData.filter((dialogue) => eventFilterMap[dialogue.id] === activeFilter)
  ), [activeFilter]);

  useEffect(() => {
    if (!selectedDialogue) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedDialogue(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDialogue]);

  const splitIndex = Math.ceil(filteredDialogues.length / 2);
  const row1 = filteredDialogues.slice(0, splitIndex);
  const row2 = filteredDialogues.slice(splitIndex);

  return (
    <section className="py-20 lg:py-32 bg-[#04060b] text-white overflow-hidden relative border-t border-white/5">
      
      <div className="container mx-auto px-5 lg:px-8 mb-16 text-center">
        <h2 className="text-sm font-bold tracking-widest text-[#C9A227] uppercase mb-3">Campus Events & Dialogues</h2>
        <h3 className="text-4xl lg:text-5xl font-bengali font-black text-white">ক্যাম্পাস ইভেন্ট ও <span className="bg-gradient-to-r from-[#C9A227] to-[#FFD700] bg-clip-text text-transparent italic">সংলাপ</span></h3>
      </div>

      <FilterTabs
        options={eventFilters}
        active={activeFilter}
        onChange={setActiveFilter}
        ariaLabel="Filter campus events"
      />
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#04060b] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#04060b] to-transparent z-10 pointer-events-none" />
        
        {/* দুই সারিতে স্ক্রলিং ইভেন্ট */}
        <DialogueRow autoScroll items={row1} direction="left" onSelect={setSelectedDialogue} />
        <DialogueRow autoScroll items={row2} direction="right" onSelect={setSelectedDialogue} />
      </div>

      {/* 📰 ইভেন্ট ডিটেইলস পপ-আপ (Modal) 📰 */}
      <AnimatePresence>
        {selectedDialogue && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedDialogue(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Campus event details"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0a0c10] border border-white/10 rounded-2xl md:rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(201,162,39,0.15)] flex flex-col md:flex-row relative"
              onClick={e => e.stopPropagation()}
            >
              
              {/* ক্লোজ বাটন */}
              <button 
                type="button"
                aria-label="Close campus event details"
                onClick={() => setSelectedDialogue(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-slate-300 hover:text-white bg-black/40 hover:bg-red-500/80 p-2 rounded-full transition-all backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              {/* বাম দিকের ইমেজ (ডেস্কটপে অর্ধেক, মোবাইলে উপরে) */}
              <div className="h-56 md:h-auto md:w-[45%] relative shrink-0">
                <img src={selectedDialogue.img} alt={selectedDialogue.title} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0c10] opacity-90" />
              </div>
              
              {/* ডান দিকের স্ক্রলেবল কন্টেন্ট */}
              <div className="p-6 md:p-12 flex flex-col relative md:w-[55%] bg-[#0a0c10] overflow-y-auto">
                <div className="w-12 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#FFD700] mb-6 rounded-full shrink-0" />
                
                <h3 className="font-bengali text-2xl md:text-4xl font-black text-white mb-6 leading-tight shrink-0">
                  {selectedDialogue.title}
                </h3>
                
                {/* ডিটেইলস টেক্সট (Line break সহ রেন্ডার করা হয়েছে) */}
                <div className="font-bengali text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap text-justify">
                  {selectedDialogue.details}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
