import React from 'react';

const AdminCardGroup = ({ title, text, cards = [], columns = 2 }) => {
  return (
    <div className="grid w-full gap-8" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {/* Cột nội dung */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
      
      {/* Cột danh sách thẻ */}
      <div className="flex flex-col gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-white shadow-sm flex items-center gap-4">
            {card.image && <img src={card.image} className="w-12 h-12 rounded-full object-cover" alt="" />}
            <div>
              <h4 className="font-bold">{card.name}</h4>
              <p className="text-sm text-gray-600">{card.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCardGroup;