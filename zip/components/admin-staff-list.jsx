import React from 'react';

const AdminStaffList = ({ title, staff = [] }) => {
  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="flex flex-col gap-4">
        {staff.map((person, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-white shadow-sm flex items-center gap-4">
            <img 
              src={person.avatar || 'https://via.placeholder.com/64'} 
              className="w-16 h-16 rounded-full object-cover" 
              alt={person.name} 
            />
            <div>
              <h4 className="font-bold text-lg">{person.name}</h4>
              <p className="text-sm text-gray-700">{person.position}</p>
              <p className="text-sm text-gray-500">{person.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStaffList;