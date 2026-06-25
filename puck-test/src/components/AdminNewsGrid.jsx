import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AdminNewsGrid = ({ title, newsItems = [], styleOptions = {} }) => {
  const { gradientFrom, gradientTo, textColor, titleColor, accentColor = "#3b82f6", fontSize, fontFamily } = styleOptions;

  return (
    <section className="py-16 px-8" style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`, color: textColor, fontFamily: fontFamily }}>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold" style={{ color: accentColor }}>{title}</h2>
        <a href="#" className="flex items-center gap-2 hover:opacity-75" style={{ color: accentColor }}>Xem thêm <ArrowRight size={16} /></a>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.slice(0, 2).map((item, index) => (
            <motion.div key={index} whileHover={{ y: -10 }} className="rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm">
              <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <span className="text-sm opacity-70">{item.date}</span>
                <h3 className="text-xl font-bold my-3" style={{ color: accentColor }}>{item.title}</h3>
                <p className="text-sm mb-6 line-clamp-2" style={{ fontSize: `${fontSize}px` }}>{item.excerpt}</p>
                <a href={item.link} className="inline-flex items-center gap-2 font-bold" style={{ color: accentColor }}>Xem thêm <ArrowRight size={20} /></a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(2).map((item, index) => (
            <motion.div key={index + 2} whileHover={{ y: -10 }} className="rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-sm opacity-70">{item.date}</span>
                <h3 className="text-lg font-bold my-3" style={{ color: accentColor }}>{item.title}</h3>
                <p className="text-sm mb-6 line-clamp-2" style={{ fontSize: `${fontSize}px` }}>{item.excerpt}</p>
                <a href={item.link} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 transition-colors" style={{ color: accentColor }}>
                  <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};