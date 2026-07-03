import { forwardRef } from 'react';

const ProductGrid = forwardRef(({ 
  title = "SẢN PHẨM MỚI", 
  items = [], 
  titleColor = "#4ade80", 
  titleSize = "24px",
  itemNameColor = "#f97316",
  itemNameSize = "16px",
  fontFamily = "sans-serif",
  itemBgColor = "#1a1a1a"
}, ref) => {
  return (
    <div ref={ref} className="w-full bg-black py-10 px-10" style={{ fontFamily }}>
      <div className="mb-8">
        <div className="relative inline-block">
          <h2 
            className="relative z-10 font-bold" 
            style={{ color: titleColor, fontSize: titleSize }}
          >
            {title}
          </h2>
          <span 
            className="absolute -bottom-1 -right-16 h-6 bg-orange-500" 
            style={{ width: '12.5rem' }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="group cursor-pointer flex flex-col">
            <div className="overflow-hidden aspect-square w-full bg-gray-800">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div 
              className="py-4 text-center transition-colors duration-300"
              style={{ backgroundColor: itemBgColor }}
            >
              <p 
                className="font-semibold group-hover:brightness-125 group-hover:font-bold transition-all"
                style={{ color: itemNameColor, fontSize: itemNameSize }}
              >
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductGrid;