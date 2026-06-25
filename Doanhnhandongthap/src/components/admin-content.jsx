import { getBackgroundStyle, getBtnBgStyle } from './utils';

export const ContainerRadiusFields = ({ value = [], onChange }) => {
  const sides = [
    { label: "Trên Trái", class: "rounded-tl-4xl" },
    { label: "Trên Phải", class: "rounded-tr-4xl" },
    { label: "Dưới Trái", class: "rounded-bl-4xl" },
    { label: "Dưới Phải", class: "rounded-br-4xl" },
  ];

  const toggleSide = (sideClass, isChecked) => {
    if (isChecked) {
      onChange([...value, sideClass]);
    } else {
      onChange(value.filter((s) => s !== sideClass));
    }
  };

  return (
    <div>
      <label className="font-semibold uppercase">Chọn góc để bo tròn</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {sides.map((side) => (
          <label
            key={side.class}
            className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-gray-50 rounded"
          >
            <input
              type="checkbox"
              checked={value.includes(side.class)}
              onChange={(e) => toggleSide(side.class, e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700">{side.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const AdminContent = (props) => {
  const { container = {}, styleOptions = {}, children } = props || {};
  const layout = container?.containerLayout || {};
  const eyebrow = container?.eyebrow || {};
  const headding = container?.headding || {};
  const subtitle = container?.subtitle || {};
  const containerRadius = container?.containerRadius || [];

  const button = container?.button || {};
  const containerSideClasses = containerRadius.join(" ");

  const buttonRadius = container?.button?.buttonRadius || [];
  const buttonSideClasses = buttonRadius.join(" ");

  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;

  const sizeH = {
    1: 'text-5xl',
    2: 'text-4xl',
    3: 'text-3xl',
    4: 'text-2xl',
    5: 'text-xl',
    6: 'text-lg',
  };

  const align = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  };

  return (
    <div
      className={`flex flex-col justify-center p-20 h-137.5 w-full ${align[layout.align]}`}
      style={{
        backgroundImage: `url('https://webdemo.hexagon.xyz/medias/hieuunghero.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: textColor,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
      }}
    >
      <div
        className={`w-full max-w-[400px] bg-[#ffffff1f] backdrop-blur-[30px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex flex-col p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${containerSideClasses}`}
        style={{
          borderTopRightRadius: '3rem',
          borderBottomLeftRadius: '3rem',
        }}
      >
        <p
          className={`my-1 ${sizeH[eyebrow.level]}`}
          style={{ color: eyebrow.color || '#000000', fontWeight: 600 }}
        >
          {eyebrow.content}
        </p>
        <h1
          className={`mb-2 ${sizeH[headding.level]}`}
          style={{ color: headding.color || '#000000', fontWeight: 'bold' }}
        >
          {headding.content}
        </h1>
        <p
          className={`${sizeH[subtitle.level]} w-full break-words leading-relaxed`}
          style={{ color: subtitle.color || '#000000', fontWeight: 600 }}
        >
          {subtitle.content}
        </p>
        <div className="w-full flex justify-center mt-4">
          <button
            className={`px-6 py-2 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95 ${sizeH[button.level]} ${buttonSideClasses}`}
            style={{
              color: button.colorText || '#000000',
              fontWeight: 600,
              ...getBtnBgStyle(button?.buttonBg),
            }}
          >
            <a href={button.url || '#'}>
              {button.content}
            </a>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminContent;
