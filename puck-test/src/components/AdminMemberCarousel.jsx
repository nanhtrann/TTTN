import { motion } from "framer-motion";

export const AdminMemberCarousel = ({ title, members = [], styleOptions = {} }) => {
  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;
  
  const displayMembers = members.length > 0 
    ? members 
    : [1, 2, 3, 4, 5, 6].map(i => ({ logoUrl: `/logo/icon${i}.png`, name: `Logo ${i}` }));
  
  const duplicatedMembers = [...displayMembers, ...displayMembers];

  return (
    <section 
      className="py-12 px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor || '#ffffff',
        fontFamily: fontFamily,
      }}
    >
      <h2 className="text-center font-bold mb-8" style={{ color: titleColor, fontSize: `${fontSize * 1.5}px` }}>
        {title}
      </h2>
      
      <div className="flex overflow-hidden">
        {/* Chúng ta dùng style 'animationPlayState' để dừng/chạy */}
        <motion.div
          className="flex gap-6"
          style={{
            animation: "scroll 40s linear infinite",
            animationPlayState: "running", // Giá trị mặc định
          }}
          // Đây là mẹo: khi hover vào div này, đổi trạng thái sang paused
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedMembers.map((member, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-48 h-32 rounded-lg flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm cursor-pointer hover:scale-110 hover:border-white/80 hover:bg-white/20 transition-all duration-300"
            >
              <img src={member.logoUrl} alt={member.name} className="max-h-20 max-w-[80%] object-contain" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Thêm style CSS này vào file của bạn hoặc file CSS chính */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};