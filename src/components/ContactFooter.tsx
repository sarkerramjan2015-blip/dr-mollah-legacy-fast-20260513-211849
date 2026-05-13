import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { FadeIn } from './FadeIn';

const getErrorMessage = (error: unknown, fallback: string) => (
  error instanceof Error ? error.message : fallback
);

const contactMethods = [
  {
    icon: MapPin,
    label: { en: 'Location', bn: 'ঠিকানা' },
    val: "Demra, Dhaka, Bangladesh",
    href: "https://www.google.com/maps/search/?api=1&query=Demra%2C%20Dhaka%2C%20Bangladesh",
  },
  {
    icon: Phone,
    label: { en: 'Phone', bn: 'ফোন' },
    val: "+880 1234 567890",
    href: "tel:+8801234567890",
  },
  {
    icon: Mail,
    label: { en: 'Email', bn: 'ইমেইল' },
    val: "principal@shksc.edu.bd",
    href: "mailto:principal@shksc.edu.bd",
  },
];

const contactCopy: Record<string, Record<Language, string>> = {
  title: { en: 'Get in Touch', bn: 'যোগাযোগ করুন' },
  description: {
    en: "For official inquiries, appointments, or institutional matters, please reach out to the principal's office.",
    bn: 'অফিসিয়াল অনুসন্ধান, সাক্ষাৎকার বা প্রাতিষ্ঠানিক বিষয়ে প্রিন্সিপাল অফিসে যোগাযোগ করুন।',
  },
  formTitle: { en: 'Send a Message', bn: 'বার্তা পাঠান' },
  fullName: { en: 'Full Name', bn: 'পূর্ণ নাম' },
  email: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
  message: { en: 'Your Message', bn: 'আপনার বার্তা' },
  sending: { en: 'Sending...', bn: 'পাঠানো হচ্ছে...' },
  send: { en: 'Send Message', bn: 'বার্তা পাঠান' },
  required: { en: 'Please fill all fields', bn: 'সব ঘর পূরণ করুন' },
  success: { en: 'Message sent successfully!', bn: 'বার্তা সফলভাবে পাঠানো হয়েছে!' },
  failure: { en: 'Failed to send message. Please try again.', bn: 'বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।' },
  copyright: {
    en: 'NATIONAL LEGACY PORTFOLIO',
    bn: 'ন্যাশনাল লেগাসি পোর্টফোলিও',
  },
};

export function ContactFooter() {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(contactCopy.required[lang]);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('messages').insert([formData]);
      if (error) throw error;
      toast.success(contactCopy.success[lang]);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(getErrorMessage(error, contactCopy.failure[lang]));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-20 lg:py-32 px-5 lg:px-8 bg-[#04060b] text-white border-t border-white/5">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeIn>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold mb-6">{contactCopy.title[lang]}</h3>
            <p className="text-slate-300 text-lg mb-10">{contactCopy.description[lang]}</p>
            <div className="space-y-8">
              {contactMethods.map((c) => (
                <a
                  key={c.label.en}
                  href={c.href}
                  target={c.label.en === 'Location' ? '_blank' : undefined}
                  rel={c.label.en === 'Location' ? 'noreferrer' : undefined}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C9A227] group-hover:text-[#04060b] transition-colors"><c.icon className="w-6 h-6" /></div>
                  <div><p className="text-sm text-slate-400 mb-1">{c.label[lang]}</p><p className="font-medium text-lg">{c.val}</p></div>
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h4 className="text-2xl font-serif font-bold text-white mb-8">{contactCopy.formTitle[lang]}</h4>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder={contactCopy.fullName[lang]}
                aria-label={contactCopy.fullName[lang]}
                autoComplete="name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none transition-colors" 
                required
              />
              <input 
                type="email" 
                placeholder={contactCopy.email[lang]}
                aria-label={contactCopy.email[lang]}
                autoComplete="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none transition-colors" 
                required
              />
              <textarea 
                placeholder={contactCopy.message[lang]}
                aria-label={contactCopy.message[lang]}
                rows={4} 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full p-4 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none resize-none transition-colors" 
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#C9A227] text-[#04060b] rounded-xl font-bold hover:bg-[#FFD700] transition-colors text-lg disabled:opacity-70"
              >
                {loading ? contactCopy.sending[lang] : contactCopy.send[lang]}
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      <footer className="py-24 text-center border-t border-white/5 bg-[#04060b]">
        <div className="mb-8 flex justify-center gap-6">
          {contactMethods.map((method) => (
            <a
              key={method.label.en}
              href={method.href}
              target={method.label.en === 'Location' ? '_blank' : undefined}
              rel={method.label.en === 'Location' ? 'noreferrer' : undefined}
              aria-label={`${method.label[lang]}: ${method.val}`}
              className="p-4 bg-white/5 rounded-full hover:bg-[#C9A227] hover:text-[#04060b] transition-all text-white"
            >
              <method.icon size={20}/>
            </a>
          ))}
        </div>
        <p className="text-[10px] font-bold text-slate-600 tracking-[0.5em] uppercase italic">
          Copyright {new Date().getFullYear()} DR. MAHBUBUR RAHMAN MOLLAH | {contactCopy.copyright[lang]}
        </p>
      </footer>
    </>
  );
}
