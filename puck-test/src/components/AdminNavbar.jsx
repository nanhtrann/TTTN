export const AdminNavbar = ({ mainTitle, subTitle, navLinks, styleOptions = {} }) => {
  const { gradientFrom, gradientTo, textColor, fontFamily } = styleOptions;
  return (
    <nav 
      className="text-white py-4 px-8 flex items-center justify-between sticky top-0 z-50"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor,
        fontFamily: fontFamily,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-600">Logo</div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">{mainTitle}</span>
          <span className="text-sm">{subTitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-8 font-medium">
        {navLinks.map((link, index) => (
          <a key={index} href={link.url} className="hover:text-blue-200">{link.label}</a>
        ))}
      </div>
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full px-4 py-1 font-bold cursor-pointer">
        VN EN
      </div>
    </nav>
  );
};