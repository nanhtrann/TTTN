import React from 'react';

const AdminFeatureGrid = ({ items = [], columns = 3, gap = 4 }) => {
  return (
    <div 
      className="grid w-full" 
      style={{ 
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, 
        gap: `${gap * 0.25}rem` 
      }}
    >
      {items.map((item, idx) => (
        <div key={idx} className="p-6 bg-white rounded-lg border flex flex-col items-center">
          <img src={item.icon} alt={item.title} className="w-12 h-12 mb-4" />
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600 text-center mb-4">{item.description}</p>
          <a 
            href={item.url || '#'} 
            className="px-6 py-2 font-medium transition-all"
            style={{ 
                backgroundColor: item.btnColor || '#3b82f6', 
                color: '#fff', 
                borderRadius: `${item.btnRadius || 0}px` 
            }}
          >
            {item.btnText}
          </a>
        </div>
      ))}
    </div>
  );
};

export default AdminFeatureGrid;