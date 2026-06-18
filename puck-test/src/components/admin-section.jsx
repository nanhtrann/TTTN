const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

const AdminSection = ({ container = 'lg', styleOptions = {}, padding_x = 4, padding_y = 4, children }) => {
  const { gradientFrom, gradientTo, textColor, fontSize, fontFamily } = styleOptions;

  return (
    <section 
      style={{ 
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        color: textColor,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
        padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` 
      }}
    >
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
};

export default AdminSection;
