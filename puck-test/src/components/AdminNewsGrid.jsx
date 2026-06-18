import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AdminNewsGrid = ({ title, newsItems = [], styleOptions = {} }) => {
  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;
  return (
    <section 
      className="py-16 px-8 text-white"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor,
        fontFamily: fontFamily,
      }}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold" style={{ color: titleColor }}>{title}</h2>
        <a href="#" className="flex items-center gap-2 hover:text-blue-400">Xem thêm <ArrowRight size={16} /></a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(newsItems) && newsItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-colors"
          >
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-sm text-slate-400">{item.date}</span>
              <h3 className="text-xl font-bold my-3 leading-tight" style={{ color: titleColor }}>{item.title}</h3>
              <p className="text-sm mb-6 line-clamp-2" style={{ fontSize: `${fontSize}px` }}>{item.excerpt}</p>
              <a 
                href={item.link} 
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors"
              >
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};