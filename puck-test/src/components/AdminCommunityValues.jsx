import React from 'react';
import { motion } from 'framer-motion';

export const AdminCommunityValues = ({ title, items = [], styleOptions = {} }) => {
  const safeItems = Array.isArray(items) ? items : [];
  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;
  return (
    <section 
      className="py-20 px-12 text-white"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        fontFamily: fontFamily,
      }}
    >
      <div className="flex justify-between items-center mb-16">
        <h2 className="text-4xl font-bold" style={{ color: titleColor }}>{title}</h2>
        <a href="#" className="hover:text-blue-400 transition-colors">Xem thêm →</a>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-8">
        {safeItems.map((item, index) => (
          <motion.div
            key={index}
            className={`bg-slate-900/60 p-8 rounded-3xl border border-slate-700 transition-all duration-300 w-full max-w-lg ${
              index % 2 !== 0 ? 'mt-16' : ''
            }`}
            whileHover={{ scale: 1.03, backgroundColor: "rgba(30, 41, 59, 0.9)" }}
          >
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
              <img src={item.iconUrl || 'https://via.placeholder.com/32'} alt={item.title || 'icon'} className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>{item.title}</h3>
            <p className="leading-relaxed" style={{ color: textColor, fontSize: `${fontSize}px` }}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};