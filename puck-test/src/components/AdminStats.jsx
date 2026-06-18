import React from 'react';
import { motion } from 'framer-motion';

export const AdminStats = ({ title, stats = [], styleOptions = {} }) => {
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
      <h2 className="text-center text-3xl font-bold mb-12" style={{ color: titleColor }}>{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.isArray(stats) && stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
            className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 text-center transition-all duration-300"
          >
            <div className="text-5xl font-bold text-blue-400 mb-4">
              {item.value || 0}
              <span>+</span>
            </div>
            <p className="font-medium" style={{ fontSize: `${fontSize}px` }}>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};