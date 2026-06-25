import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AdminCommunityValues = ({ title, items = [], styleOptions = {} }) => {
  const safeItems = Array.isArray(items) ? items : [];
  const { gradientFrom, gradientTo, textColor, titleColor, accentColor = "#3b82f6", fontSize, fontFamily } = styleOptions;

  return (
    <section 
      className="py-20 px-12 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}), url('/logo/nen3.png')`,
        backgroundBlendMode: 'overlay',
        fontFamily: fontFamily,
        color: textColor,
      }}
    >
      <div className="flex justify-between items-center mb-16">
        <h2 className="text-4xl font-bold" style={{ color: accentColor }}>{title}</h2>
        <a href="#" className="flex items-center gap-2 font-medium transition-opacity hover:opacity-75" style={{ color: accentColor }}>
          Xem thêm <ArrowRight size={18} />
        </a>
      </div>

      <div className="flex flex-wrap justify-center items-start">
        {safeItems.map((item, index) => (
          <motion.div
            key={index}
            className={`p-10 border border-white/20 bg-white/10 backdrop-blur-md w-full max-w-sm rounded-tl-[80px] rounded-br-[80px] ${
              index !== 0 ? '-ml-8' : '' 
            } ${index % 2 !== 0 ? 'mt-20' : 'mt-0'}`}
            style={{ zIndex: index }}
            whileHover={{ scale: 1.05, zIndex: 10, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-8">
              <img src={item.iconUrl} alt={item.title} className="w-10 h-10 object-contain" />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>{item.title}</h3>
            <p className="leading-relaxed" style={{ fontSize: `${fontSize}px` }}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};