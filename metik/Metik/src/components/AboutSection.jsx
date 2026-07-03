import { forwardRef } from 'react';

const AboutSection = forwardRef(({ 
  title, content, image, isImageLeft = true, 
  titleColor = "#4ade80", 
  titleSize = "24px", 
  borderRadius = "0px 50px 0px 50px" 
}, ref) => {
  return (
    <div ref={ref} className="w-full bg-[#1a1a1a] py-10 px-10">
      {title && (
        <div className="mb-12 relative inline-block">
          <h2 className="relative z-10 font-bold" style={{ color: titleColor, fontSize: titleSize }}>
            {title}
          </h2>
          <span className="absolute -bottom-1 -right-16 h-6 bg-orange-500 w-[12.5rem]" />
        </div>
      )}

      <div className={`flex flex-col md:flex-row gap-10 items-center ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {image && (
          <div className="w-full md:w-1/2">
            <img src={image} className="w-full h-auto object-cover" style={{ borderRadius }} />
          </div>
        )}
        <div className={`w-full ${image ? 'md:w-1/2' : 'md:w-full'} text-white text-lg leading-relaxed`}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
});

export default AboutSection;