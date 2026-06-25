import { getBackgroundStyle, getBtnBgStyle } from './utils';

export const MultiContainerRadiusFields = ({ value = [], onChange }) => {
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

const AdminMultipleContent = (props) => {
    const {
        headding,
        subtitle,
        container = [],
        styleOptions = {},
        button = {},
        children,

    } = props || {};
    
    const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;

    const sizeH = {
        1: 'text-5xl',
        2: 'text-4xl',
        3: 'text-3xl',
        4: 'text-2xl',
        5: 'text-xl',
        6: 'text-lg',
    };

    return (
            <div
            className={`flex flex-col px-20 py-5 h-160 w-full bg-[#7dd3fc]`}
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              color: textColor,
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
            }}
        >
            <div className="flex flex-col items-center p-4">
                <h1
                    className={`px-4 mb-3 ${sizeH[headding?.level] || sizeH[2]}`}
                    style={{ color: titleColor, fontWeight: 'bold' }}
                >
                    {headding?.content}
                </h1>

                        {subtitle?.content ? (

                    <p
                        className={`px-4 ${sizeH[subtitle?.level] || sizeH[2]}`}
                        style={{ fontWeight: 600, color: subtitle?.color || '#9bd8ff' }}
                    >
                        {subtitle?.content}
                    </p>
                ) : null}
            </div>

            <div className="flex flex-wrap justify-center gap-5">
                {Array.isArray(container) && container.map((item, idx) => {
                        
                        const containerRadius = item?.containerRadius || [];
                        const containerSideClasses = containerRadius.join(' ');
                        const defaultSideClasses = "rounded-tl-4xl rounded-tr-none rounded-br-4xl rounded-bl-none";

                        const finalSideClasses = containerSideClasses ? containerSideClasses : defaultSideClasses;


                        
                        const title = item?.title;

                        const rawIcon = item?.icon;
                        const icon = {
                            type: rawIcon?.type || 'image',
                            imageUrl: rawIcon?.imageUrl || 'https://cdn-icons-png.flaticon.com/512/10221/10221159.png',
                            content: rawIcon?.content || 'URL'
                        }
                        const button = item?.button;


                        return (
                            <div
                                key={idx}
                                className={`w-max md:w-85 h-50 bg-[#38bdf8]/20 backdrop-blur-[30px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex flex-col items-center justify-center p-4 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#38bdf8]/30 ${finalSideClasses}`}


                            >
                                {icon ? (
                                    (icon.type === 'image' || !icon.type) ? (
                                        <div className="mb-3" style={{ backgroundColor: 'inherit' }}>
                                            <img
                                                src={icon.imageUrl}
                                                alt={(icon.content) || 'icon'}
                                                className="h-16 w-16 object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3" style={{ backgroundColor: 'inherit', color: title?.color || '#000000' }}>
                                            {(icon.content)}
                                        </div>
                                    )
                                ) : null}
                                <div
                                    className={`mb-3 ${sizeH[title?.level] || sizeH[2]}`}
                                    style={{ color: title?.color || '#ffffff', fontWeight: 'bold', textAlign: 'center' }}
                                >
                                    {title?.content || 'Tiêu đề'}
                                </div>


                                <button
                                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:brightness-125 hover:scale-105 active:scale-95 ${sizeH[button?.level] || sizeH[4]} ${button?.buttonRadius?.join?.(' ') || ''}`}

                                    style={{
                                        color: button?.color || '#ffffff',
                                        fontWeight: 600,
                                        ...getBtnBgStyle(button?.buttonBg),
                                    }}
                                    type="button"
                                >
                                    <a href={button?.url || '#'}>{(button?.content) || 'Văn bản'}</a>
                                </button>


                            </div>
                        );
                    })}
            </div>
            {children}
        </div>
    );
};

export default AdminMultipleContent;