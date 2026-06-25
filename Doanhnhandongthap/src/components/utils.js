export const getBackgroundStyle = (background) => {
  const bg = background || {};

  if (bg.type === 'gradient') {
    return {
      background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})`,
    };
  }

  if (bg.type === 'image' && bg.imageUrl) {
    return {
      backgroundImage: `url('${bg.imageUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  if (bg.type === 'gif' && bg.gif) {
    return {
      backgroundImage: `url('${bg.gif}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return { backgroundColor: bg.color || '#ffffff' };
};

export const getBtnBgStyle = (buttonBg) => {
  const btnbg = buttonBg || {};

  if (btnbg.type === 'gradient') {
    return {
      background: `linear-gradient(${btnbg.gradientDirection || 'to bottom right'}, ${btnbg.gradientFrom || '#667eea'}, ${btnbg.gradientTo || '#764ba2'})`,
    };
  }

  return { 
      backgroundColor: btnbg.color || '#fde047',
      content: 'Văn bản',
      url: '#',
      colorText: '#000000',
   };
};