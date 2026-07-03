import { forwardRef, useState, useEffect } from 'react';

const Slider = forwardRef(({ images = [] }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div ref={ref} className="relative w-full aspect-[21/9] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.url}
          className={`absolute w-full h-full object-cover transition-all duration-700 ease-in-out ${index === currentIndex ? 'translate-x-0' : index > currentIndex ? 'translate-x-full' : '-translate-x-full'}`}
          alt="Slide"
        />
      ))}
      <button 
        onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))} 
        className="absolute left-4 top-1/2 z-10 p-2 bg-black/30 text-white rounded-full cursor-pointer hover:bg-black/50 transition-all"
      >
        ←
      </button>
      <button 
        onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))} 
        className="absolute right-4 top-1/2 z-10 p-2 bg-black/30 text-white rounded-full cursor-pointer hover:bg-black/50 transition-all"
      >
        →
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentIndex(index)} 
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'}`} 
          />
        ))}
      </div>
    </div>
  );
});

export default Slider;