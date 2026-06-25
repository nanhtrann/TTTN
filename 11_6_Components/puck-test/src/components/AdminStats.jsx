import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Counter = ({ value }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={nodeRef}>{display}</motion.span>;
};

export const AdminStats = ({ title, stats = [], styleOptions = {} }) => {
  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;

  return (
    <section 
      className="py-16 px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}), url('/logo/nen2.webp')`,
        backgroundBlendMode: 'overlay',
        color: textColor,
        fontFamily: fontFamily,
      }}
    >
      <h2 className="text-center text-3xl font-bold mb-12" style={{ color: titleColor }}>
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.isArray(stats) && stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            className="p-8 rounded-2xl bg-white/10 border border-white/20 text-center transition-all duration-300 backdrop-blur-sm"
          >
            <div className="text-5xl font-bold mb-4" style={{ color: titleColor }}>
              <Counter value={item.value || 0} />
              <span>+</span>
            </div>
            <p className="font-medium" style={{ fontSize: `${fontSize}px` }}>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};