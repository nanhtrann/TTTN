export const AdminNavbar = ({ mainTitle, subTitle, navLinks, styleOptions = {} }) => {
  const { gradientFrom, gradientTo, textColor, fontFamily } = styleOptions;

  return (
    <nav 
      className="py-4 px-8 flex items-center justify-between sticky top-0 z-50"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor || '#ffffff',
        fontFamily: fontFamily,
      }}
    >
      {/* Phần Logo và Tiêu đề */}
      <div className="flex items-center gap-4">
        {/* Hiển thị ảnh logo từ đường dẫn /logo/nav.png */}
        <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
          <img 
            src="/logo/nav.png" 
            alt="Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
        
        <div className="flex flex-col">
          <span className="font-bold text-lg">{mainTitle}</span>
          <span className="text-sm">{subTitle}</span>
        </div>
      </div>

      {/* Phần danh sách liên kết */}
      <div className="flex items-center gap-8 font-medium">
        {navLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            className="hover:opacity-75 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>
      
      {/* Nút ngôn ngữ */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full px-4 py-1 font-bold cursor-pointer text-white">
        VN EN
      </div>
    </nav>
  );
};