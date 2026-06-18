import React from 'react';

export const AdminFooter = ({ contactInfo = {}, linkGroups = [], styleOptions = {} }) => {
  const safeLinkGroups = Array.isArray(linkGroups) ? linkGroups : [];
  const { gradientFrom, gradientTo, textColor, titleColor, fontFamily } = styleOptions;

  return (
    <footer 
      className="text-white py-16 px-12"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        fontFamily: fontFamily,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-full"></div>
            <h3 className="font-bold" style={{ color: titleColor }}>CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP</h3>
          </div>
          <div className="space-y-4 text-sm text-purple-200">
            <p>{contactInfo.address}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.hotline}</p>
          </div>
        </div>

        {safeLinkGroups.map((group, index) => (
          <div key={index}>
            <h4 className="font-bold mb-6" style={{ color: titleColor }}>{group.title}</h4>
            <ul className="space-y-3 text-sm" style={{ color: textColor }}>
              {(Array.isArray(group.links) ? group.links : []).map((link, i) => (
                <li key={i}><a href={link.url} className="hover:text-white transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="border-t border-purple-700 mt-12 pt-8 text-sm text-center text-purple-300">
        Copyright © CLB Doanh nhân Đồng Tháp. All rights reserved
      </div>
    </footer>
  );
};