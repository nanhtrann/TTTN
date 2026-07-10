import { content } from "../i18n";
import { getLocaleFromStorage } from "../utils/pageLocale";

export const Footer = (props: any) => {
  const lang = getLocaleFromStorage();
  const t = content[lang as keyof typeof content];
  const text = props.copyrightText || t.footer;

  return (
    <footer className="w-full bg-[#064e3b] py-6 px-8 text-center">
      <p className="text-[#94a3b8] text-sm md:text-base">{text}</p>
    </footer>
  );
};