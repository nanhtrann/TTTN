import { forwardRef } from 'react';

const TestimonialSection = forwardRef(({ 
  title, reviews = [], titleColor = "#4ade80", titleSize = "24px", 
  fontFamily = "sans-serif", textColor = "#ffffff"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-start gap-4">
            <img src={review.avatar} className="w-20 h-20 rounded-full border-2 border-yellow-500 object-cover" />
            <div style={{ color: textColor }}>
              <div className="text-yellow-500 mb-1">
                {'★'.repeat(review.rating || 5)}{'☆'.repeat(5 - (review.rating || 5))}
              </div>
              <p className="italic mb-2">"{review.comment}"</p>
              <p className="font-bold">{review.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TestimonialSection;