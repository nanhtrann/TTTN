import React from 'react';

export const AdminFooter = ({ contactInfo = {}, linkGroups = [], socialLinks = {}, copyright, logo, styleOptions = {} }) => {
  const safeLinkGroups = Array.isArray(linkGroups) ? linkGroups : [];
  const { accentColor = "#3b82f6", titleColor, fontFamily } = styleOptions;

  return (
    <footer 
      className="relative py-16 px-12 text-white overflow-hidden"
      style={{ fontFamily: fontFamily }}
    >
      <div className="absolute inset-0 z-0">
        <img src="/logo/nen5.png" className="absolute inset-0 w-full h-full object-cover opacity-100" alt="bg1" />
        <img src="/logo/nen6.png" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="bg2" />
        <img src="/logo/nen7.webp" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="bg3" />
        <div 
          className="absolute inset-0" 
          style={{ background: `linear-gradient(135deg, #3b82f6, #ec4899)`, opacity: 0.75 }}
        ></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12" style={{ color: accentColor }}>
        <div>
          <div className="flex items-center gap-4 mb-6">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <h3 className="font-bold" style={{ color: titleColor }}>CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP</h3>
          </div>
          <div className="space-y-4 text-sm">
            <p>{contactInfo.address}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.hotline}</p>
          </div>
        </div>

        {safeLinkGroups.map((group, index) => (
          <div key={index}>
            <h4 className="font-bold mb-6" style={{ color: titleColor }}>{group.title}</h4>
            <ul className="space-y-3 text-sm">
              {(Array.isArray(group.links) ? group.links : []).map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-white transition-all duration-300 hover:pl-2 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="relative z-10 border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6" style={{ color: accentColor }}>
        <div className="text-sm">{copyright}</div>
        <div className="flex gap-4">
          <a href={socialLinks.facebook} className="hover:scale-110 transition-transform">
            <img src="/logo/facebook.svg" className="w-8 h-8" alt="FB" />
          </a>
          <a href={socialLinks.tiktok} className="hover:scale-110 transition-transform">
            <img src="/logo/tiktok.png" className="w-8 h-8" alt="TT" />
          </a>
          <a href={socialLinks.youtube} className="hover:scale-110 transition-transform">
            <img src="/logo/youtube.png" className="w-8 h-8" alt="YT" />
          </a>
          <a href={socialLinks.linkedin} className="hover:scale-110 transition-transform">
            <img src="/logo/linkedin.svg" className="w-8 h-8" alt="IN" />
          </a>
        </div>
      </div>
    </footer>
  );
};