import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { FadeIn } from './FadeIn';

const getErrorMessage = (error: unknown, fallback: string) => (
  error instanceof Error ? error.message : fallback
);

const contactMethods = [
  {
    icon: MapPin,
    label: "Location",
    val: "Demra, Dhaka, Bangladesh",
    href: "https://www.google.com/maps/search/?api=1&query=Demra%2C%20Dhaka%2C%20Bangladesh",
  },
  {
    icon: Phone,
    label: "Phone",
    val: "+880 1234 567890",
    href: "tel:+8801234567890",
  },
  {
    icon: Mail,
    label: "Email",
    val: "principal@shksc.edu.bd",
    href: "mailto:principal@shksc.edu.bd",
  },
];

export function ContactFooter() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('messages').insert([formData]);
      if (error) throw error;
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to send message. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-20 lg:py-32 px-5 lg:px-8 bg-[#04060b] text-white border-t border-white/5">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeIn>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Get in Touch</h3>
            <p className="text-slate-300 text-lg mb-10">For official inquiries, appointments, or institutional matters, please reach out to the principal's office.</p>
            <div className="space-y-8">
              {contactMethods.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.label === 'Location' ? '_blank' : undefined}
                  rel={c.label === 'Location' ? 'noreferrer' : undefined}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C9A227] group-hover:text-[#04060b] transition-colors"><c.icon className="w-6 h-6" /></div>
                  <div><p className="text-sm text-slate-400 mb-1">{c.label}</p><p className="font-medium text-lg">{c.val}</p></div>
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h4 className="text-2xl font-serif font-bold text-white mb-8">Send a Message</h4>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                aria-label="Full name"
                autoComplete="name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none transition-colors" 
                required
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                aria-label="Email address"
                autoComplete="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none transition-colors" 
                required
              />
              <textarea 
                placeholder="Your Message" 
                aria-label="Your message"
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
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      <footer className="py-24 text-center border-t border-white/5 bg-[#04060b]">
        <div className="mb-8 flex justify-center gap-6">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target={method.label === 'Location' ? '_blank' : undefined}
              rel={method.label === 'Location' ? 'noreferrer' : undefined}
              aria-label={`${method.label}: ${method.val}`}
              className="p-4 bg-white/5 rounded-full hover:bg-[#C9A227] hover:text-[#04060b] transition-all text-white"
            >
              <method.icon size={20}/>
            </a>
          ))}
        </div>
        <p className="text-[10px] font-bold text-slate-600 tracking-[0.5em] uppercase italic">
          Copyright {new Date().getFullYear()} DR. MAHBUBUR RAHMAN MOLLAH | NATIONAL LEGACY PORTFOLIO
        </p>
      </footer>
    </>
  );
}
