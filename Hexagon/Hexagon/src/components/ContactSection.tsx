import { MapPin, Mail, Phone } from 'lucide-react';
import { content } from "../i18n";
import { getLocaleFromStorage } from "../utils/pageLocale";

const getLang = () => getLocaleFromStorage();

export const ContactSection = (props: any) => {
  const lang = getLang();
  const t = content[lang as keyof typeof content].contact;

  const title = props.title || t.title;
  const desc = props.desc || t.desc;
  const address = props.address ?? (t as any).address;
  const email = props.email ?? (t as any).email;
  const hotline = props.hotline ?? (t as any).hotline;
  const mapUrl = props.mapUrl ?? (t as any).mapUrl;

  return (
    <section className="py-20 px-8 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <p className="text-gray-400 mb-10 text-lg">{desc}</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full border border-teal-500/30 text-teal-500"><MapPin size={24} /></div>
              <div>
                <p className="font-bold text-gray-300">{props.headquartersLabel || 'Trụ sở chính'}</p>
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