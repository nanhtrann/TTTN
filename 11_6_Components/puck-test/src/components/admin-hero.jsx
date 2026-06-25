const AdminHero = ({ title, subtitle, buttons = [], styleOptions = {}, layout = {} }) => {
  const alignClass = layout.align === 'left' ? 'text-left' : layout.align === 'right' ? 'text-right' : 'text-center';
  const alignFlex = layout.align === 'left' ? 'justify-start' : layout.align === 'right' ? 'justify-end' : 'justify-center';
  const alignItems = layout.align === 'left' ? 'items-start' : layout.align === 'right' ? 'items-end' : 'items-center';

  const { gradientFrom, gradientTo, textColor, titleColor, fontSize, fontFamily } = styleOptions;

  const getButtonClass = (style) => {
    const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all';
    switch (style) {
      case 'primary': return `${base} bg-blue-600 text-white hover:bg-blue-700`;
      case 'outline': return `${base} border-2 border-white text-white hover:bg-white hover:text-gray-900`;
      default: return `${base} bg-gray-200 text-gray-800 hover:bg-gray-300`;
    }
  };

  return (
    <section 
      className="relative py-32 px-4 overflow-hidden" 
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
      }}
    >
      <div className={`relative mx-auto max-w-7xl ${alignClass} flex flex-col ${alignItems}`}>
        {title && <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: titleColor }}>{title}</h1>}
        {subtitle && <p className="text-lg md:text-xl mb-6 opacity-90 max-w-3xl">{subtitle}</p>}
        {buttons && buttons.length > 0 && (
          <div className={`flex flex-wrap ${alignFlex} gap-4 mb-8`}>
            {buttons.map((btn, idx) => (
              <a key={idx} href={btn.url || '#'} className={getButtonClass(btn.style || 'primary')}>
                {btn.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminHero;
