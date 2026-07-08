import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

export const Footer = () => {
  const { lang } = useLanguage();
  const t = content[lang as keyof typeof content];

  return (
    <footer className="w-full bg-[#064e3b] py-6 px-8 text-center">
      <p className="text-[#94a3b8] text-sm md:text-base">
        {t.footer}
      </p>
    </footer>
  );
};