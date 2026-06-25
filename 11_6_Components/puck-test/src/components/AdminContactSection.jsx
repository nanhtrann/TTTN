import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export const AdminContactSection = ({ title, subTitle, contactItems, buttonText, styleOptions = {} }) => {
  const safeContactItems = Array.isArray(contactItems) ? contactItems : [];
  const { gradientFrom, gradientTo, accentColor = "#3b82f6", fontSize, fontFamily } = styleOptions;

  return (
    <section 
      className="py-20 px-8 text-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}), url('/logo/nen4.png')`,
        backgroundBlendMode: 'overlay',
        fontFamily: fontFamily,
      }}
    >
      <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>{title}</h2>
      <p className="mb-12" style={{ color: accentColor, fontSize: `${fontSize}px` }}>{subTitle}</p>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {safeContactItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.link || '#'}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 rounded-full border border-white/20 transition-colors backdrop-blur-sm"
            style={{ color: accentColor }}
          >
            {item.type === 'email' ? <Mail size={20} /> : <Phone size={20} />}
            <span className="font-medium">{item.label}</span>
          </motion.a>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-full font-bold transition-colors"
      >
        {buttonText}
      </motion.button>
    </section>
  );
};