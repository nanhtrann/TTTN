import { motion } from "framer-motion";

export const MemberCarousel = (props: any) => {
  const { 
    title, members = [], bgType, bgColor, bgImage, 
    gradientDirection, gradientColors, isAnimated 
  } = props;

  const getStyle = () => {
    let style: any = { backgroundColor: bgColor };
    if (bgType?.includes("image")) style.backgroundImage = `url(${bgImage})`;
    if (bgType?.includes("gradient")) style.background = `linear-gradient(${gradientDirection}, ${gradientColors})`;
    if (bgType === "image+gradient") style.background = `linear-gradient(${gradientDirection}, ${gradientColors}), url(${bgImage})`;
    return { ...style, backgroundSize: "cover", backgroundPosition: "center" };
  };

  const duplicatedMembers = [...members, ...members, ...members];

  return (
    <section className="py-12 px-8 overflow-hidden" style={getStyle()}>
      <h2 className="text-center text-3xl font-bold mb-10 text-white">
        {title}
      </h2>
      
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-8"
          style={{
            animation: isAnimated === "true" ? "scroll 40s linear infinite" : "none",
            animationPlayState: "running",
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedMembers.map((member: any, index: number) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-64 h-32 rounded-2xl flex items-center justify-center bg-black/40 border border-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img 
                src={member.logoUrl} 
                alt={props.memberAlt || "Đối tác"} 
                className="max-h-20 max-w-[70%] object-contain opacity-80 hover:opacity-100" 
              />
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
};