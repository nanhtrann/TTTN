import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

export const AboutSection = (props: any) => {
  const { lang } = useLanguage();
  const t = content[lang as keyof typeof content].about;

  const {
    bgType, bgColor, bgImage, gradientDirection, gradientColors,
    imageUrl, showButton, buttonText, textColor
  } = props;

  const finalStyle = {
    color: textColor || "#1e293b",
    backgroundColor: (bgType === 'color' || bgType === 'image+color') ? bgColor : undefined,
    backgroundImage: (bgType === 'image' || bgType === 'image+gradient' || bgType === 'image+color') ? `url(${bgImage})` : undefined,
    backgroundSize: bgType?.includes('image') ? 'cover' : undefined,
    background: (bgType === 'gradient' || bgType === 'image+gradient') ? `linear-gradient(${gradientDirection}, ${gradientColors})` : undefined,
    backgroundBlendMode: bgType === 'image+color' ? 'overlay' : undefined
  };

  return (
    <section className="py-20 px-16" style={finalStyle}>
      <div className="flex flex-col md:flex-row gap-16 items-center max-w-7xl mx-auto">
        
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          <div className="absolute w-full h-full bg-teal-200 rounded-3xl -rotate-2"></div>
          
          <div className="relative z-10 w-full p-2">
            <img src={imageUrl || "/pictures/picture.jpg"} className="rounded-2xl w-full h-auto shadow-xl" />
          </div>
          
          <div className="absolute -bottom-10 -right-4 bg-white p-6 rounded-xl shadow-2xl max-w-xs border-l-4 border-yellow-500 z-20">
            <p className="italic text-gray-700 font-medium leading-relaxed">
              "Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"
            </p>
            <p className="text-yellow-600 font-bold mt-2 text-sm">— HEXAGON CULTURE</p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6">{t.title}</h2>
          <p className="mb-10 text-gray-600">{t.desc}</p>
          
          <div className="grid grid-cols-2 gap-6">
            {t.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-green-700 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {showButton === "true" && (
            <button className="mt-10 px-8 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};