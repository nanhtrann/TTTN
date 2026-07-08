import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

export const ServiceSection = (props: any) => {
  const { lang } = useLanguage();
  const { showButton, services = [], isAnimated } = props;

  return (
    <section className="py-20 px-16 bg-black">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          {lang === 'vi' ? 'Lĩnh vực hoạt động' : 'Our Services'}
        </h2>
        <p className="text-gray-400">
          {lang === 'vi' 
            ? 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:' 
            : 'At Hexagon, we focus on developing a comprehensive technology ecosystem, including:'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((s: any, idx: number) => (
          <motion.div
            key={idx}
            className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer group"
            whileHover={isAnimated === "true" ? { y: -10 } : {}}
          >
            <img src={s.image} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <img src={s.hoverImage} className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            
            <div className="absolute top-6 left-6 z-20 w-[85%]">
              <h3 className="text-2xl font-bold text-yellow-500">{s.title}</h3>
            </div>

            <div className="absolute top-20 left-6 z-20 w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm mb-4 leading-relaxed">{s.desc}</p>
              {showButton === "true" && (
                <a href="#" className="inline-block text-blue-300 font-bold hover:underline">
                  {lang === 'vi' ? 'Xem chi tiết →' : 'Read more →'}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};