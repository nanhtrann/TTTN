import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

interface NavItem {
  label: string;
}

interface NavbarProps {
  navItems?: NavItem[];
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  logoSrc?: string;
}

export const Navbar = ({ 
  backgroundColor = "#1e5a40", 
  textColor = "#ffffff", 
  fontSize = "16px", 
  logoSrc = "/pictures/logo1.png" 
}: NavbarProps) => {
  const { lang, setLang } = useLanguage();
  const t = content[lang as keyof typeof content];

  return (
    <nav 
      className="sticky top-0 left-0 w-full z-50 flex items-center justify-between px-16 py-4 shadow-md transition-all duration-300"
      style={{ 
        backgroundColor: backgroundColor, 
        color: textColor, 
        fontSize: fontSize 
      }}
    >
      <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
        <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
        <span className="font-bold text-2xl tracking-wider">HEXAGON</span>
      </a>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-8">
          {t.nav.map((label: string, index: number) => (
            <a 
              key={index} 
              href={`#${label.toLowerCase().replace(" ", "-")}`} 
              className="hover:text-orange-500 transition-colors font-medium cursor-pointer"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-white/30">
          <button 
            onClick={() => setLang("vi")} 
            className={`text-2xl hover:scale-110 transition-transform ${lang === 'vi' ? 'opacity-100 scale-110' : 'opacity-50'}`}
          >
            🇻🇳
          </button>
          <button 
            onClick={() => setLang("en")} 
            className={`text-2xl hover:scale-110 transition-transform ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-50'}`}
          >
            🇬🇧
          </button>
        </div>
      </div>
    </nav>
  );
};