import { forwardRef } from 'react';

const VideoSection = forwardRef(({ 
  title, content, videoUrl, 
  titleColor = "#4ade80", 
  titleSize = "24px", 
  contentColor = "#ffffff",
  contentSize = "18px",
  fontFamily = "sans-serif"
}, ref) => {
  return (
    <div ref={ref} className="w-full bg-[#1a1a1a] py-10 px-10" style={{ fontFamily }}>
      {title && (
        <div className="mb-12 relative inline-block">
          <h2 className="relative z-10 font-bold" style={{ color: titleColor, fontSize: titleSize }}>
            {title}
          </h2>
          <span className="absolute -bottom-1 -right-16 h-6 bg-orange-500 w-[12.5rem]" />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div 
          className="w-full md:w-1/2 leading-relaxed" 
          style={{ color: contentColor, fontSize: contentSize }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="w-full md:w-1/2">
          <video src={videoUrl} controls className="w-full rounded-[0px_50px_0px_50px] shadow-lg">
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
      </div>
    </div>
  );
});

export default VideoSection;