import { motion } from "framer-motion";

export const AdminMemberCarousel = ({ title, members = [], styleOptions = {} }) => {
  const duplicatedMembers = Array.isArray(members) && members.length > 0 ? [...members, ...members] : [];
  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;
  return (
    <section 
      className="py-12 px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor,
        fontFamily: fontFamily,
      }}
    >
      <h2 className="text-center text-2xl font-bold mb-8" style={{ color: titleColor, fontSize: `${fontSize * 1.5}px` }}>{title}</h2>
      
      <div className="flex overflow-hidden group">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
          whileHover={{ paused: true }}
        >
          {duplicatedMembers.map((member, index) => (
            <motion.div 
              key={index} 
              className="flex-shrink-0 w-48 h-32 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
              whileHover={{
                scale: 1.1,
              }}
            >
              <img src={member.logoUrl} alt={member.name} className="max-h-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};