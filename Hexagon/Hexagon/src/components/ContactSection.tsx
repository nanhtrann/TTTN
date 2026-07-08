import { MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

export const ContactSection = (props: any) => {
  const { lang } = useLanguage();
  const t = content[lang as keyof typeof content].contact;

  const { address, email, hotline, mapUrl } = props;

  return (
    <section className="py-20 px-8 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-4xl font-bold mb-6">{t.title}</h2>
          <p className="text-gray-400 mb-10 text-lg">{t.desc}</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full border border-teal-500/30 text-teal-500"><MapPin size={24} /></div>
              <div>
                <p className="font-bold text-gray-300">{lang === 'vi' ? 'Trụ sở chính' : 'Headquarters'}</p>
                <p className="text-gray-400">{address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full border border-teal-500/30 text-teal-500"><Mail size={24} /></div>
              <p className="text-gray-400">{email}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full border border-teal-500/30 text-teal-500"><Phone size={24} /></div>
              <p className="text-gray-400">{hotline}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            {['Facebook', 'LinkedIn', 'YouTube', 'Zalo'].map((social) => (
              <button key={social} className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-teal-900 transition-colors">
                {social}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};