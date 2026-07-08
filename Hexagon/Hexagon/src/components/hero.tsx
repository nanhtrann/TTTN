import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

const services = ["Cung cấp thiết bị CNTT", "Dịch vụ CNTT", "Giải pháp công nghệ", "Thi công & Lắp đặt"];

interface HeroProps {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  buttonRadius?: string;
}

export const Hero = ({
  backgroundColor = "#1e5a40",
  textColor = "#ffffff",
  fontSize = "16px",
  fontFamily = "Arial, sans-serif",
  buttonRadius = "8px",
}: HeroProps) => {
  const { lang } = useLanguage();
  const t = content[lang as keyof typeof content].hero;

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % services.length;
      const fullText = services[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section 
      className="relative w-full min-h-[550px] flex items-center px-16 py-16 overflow-hidden"
      style={{ backgroundColor, color: textColor, fontFamily, fontSize }}
    >
      <div className="max-w-xl z-10">
        <span className="inline-flex px-5 py-1.5 border border-yellow-500 text-yellow-500 font-bold tracking-widest text-xs mb-5 rounded-full">
          {lang === 'vi' ? 'CÔNG NGHỆ TƯƠNG LAI' : 'FUTURE TECHNOLOGY'}
        </span>
        
        <h1 className="text-5xl font-bold leading-tight mb-4 h-[120px]">
          {text}
          <span className="animate-pulse">|</span>
        </h1>
        
        <h2 className="text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(90deg, #9ca3af 0%, #4b5563 30%, #a16207 70%, #eab308 100%)" }}>
            HEXAGON Solutions
          </span>
        </h2>
        
        <p className="text-base opacity-90 mb-8 leading-relaxed">{t.desc}</p>
        
        <div className="flex gap-3">
          <button style={{ borderRadius: buttonRadius }} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-lg text-sm transition-all">
            {t.btn1}
          </button>
          <button style={{ borderRadius: buttonRadius }} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-sm text-sm transition-all">
            {t.btn2}
          </button>
        </div>
      </div>

      <img src="/pictures/global.webp" alt="Globe" className="absolute right-0 top-0 h-full w-[50%] object-contain object-right opacity-90 pointer-events-none" />

      <a href="#content" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm flex flex-col items-center gap-1 hover:text-white transition-colors">
        <span>{lang === 'vi' ? 'Cuộn xuống để khám phá' : 'Scroll down to explore'}</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </a>
    </section>
  );
};