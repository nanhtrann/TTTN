import { content } from "../i18n";
import { getLocaleFromStorage } from "../utils/pageLocale";
import { useEffect, useState } from 'react';

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
  navItems,
  backgroundColor = "#1e5a40", 
  textColor = "#ffffff", 
  fontSize = "16px", 
  logoSrc = "/pictures/logo1.png" 
}: NavbarProps) => {
  const [lang, setLang] = useState<string>(getLocaleFromStorage());
  const t = content[lang as keyof typeof content];
  // allow nav items from Puck props if provided
  const navList = navItems && Array.isArray(navItems) ? navItems.map((n: any) => n.label) : t.nav;

  const switchLocale = (target: string) => {
    // Do not update UI language here; App will emit hexagon-switch-page when the page actually changes.

    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem('hexagon-pages');
      const pages = raw ? JSON.parse(raw) : [];
      const currentActive = window.localStorage.getItem('hexagon-active-page') || (pages[0] && pages[0].id) || null;

      if (!currentActive) return;

      const current = pages.find((p: any) => p.id === currentActive);
      if (!current) return;

      if (current.locale === target) return;

      // Instead of searching existing translations, always request the app to create a clone
      // The App will create the translated clone (translationOf=current.id) and switch to it.
      window.dispatchEvent(new CustomEvent('hexagon-create-translation', { detail: { locale: target } }));
    } catch (err) {
      // ignore
    }
  };

  // Listen to switches triggered elsewhere (App)
  useEffect(() => {
    const onSwitch = (e: any) => {
      const id = e?.detail?.pageId;
      if (!id) return;
      try {
        const raw = window.localStorage.getItem('hexagon-pages');
        const pages = raw ? JSON.parse(raw) : [];
        const p = pages.find((x: any) => x.id === id);
        if (p) setLang(p.locale);
      } catch {}
    };
    window.addEventListener('hexagon-switch-page', onSwitch as EventListener);
    return () => window.removeEventListener('hexagon-switch-page', onSwitch as EventListener);
  }, []);

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
          {navList.map((label: string, index: number) => (
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
            onClick={() => switchLocale('vi')} 
            className={`text-2xl hover:scale-110 transition-transform ${lang === 'vi' ? 'opacity-100 scale-110' : 'opacity-50'}`}
          >
            🇻🇳
          </button>
          <button 
            onClick={() => switchLocale('en')} 
            className={`text-2xl hover:scale-110 transition-transform ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-50'}`}
          >
            🇬🇧
          </button>
        </div>
      </div>
    </nav>
  );
};