import { useMemo, useState } from 'react';

// 1. Component bo tròn góc
export const AboutContainerRadiusFields = ({ value = [], onChange }) => {
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
          <label key={side.class} className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
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

// 2. Component hiển thị danh sách nhân sự
const Info = ({ infoItems = [] }) => {
  const allInfo = useMemo(() => (Array.isArray(infoItems) ? infoItems : []), [infoItems]);
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(allInfo.length / pageSize));
  const [page, setPage] = useState(0);

  const infoData = useMemo(() => {
    const start = page * pageSize;
    return allInfo.slice(start, start + pageSize);
  }, [allInfo, page]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex flex-col gap-4">
        {infoData.map((info, idx) => (
          <div key={idx} className="w-full bg-[#ffffff1f] backdrop-blur-[30px] shadow-lg flex items-center gap-4 p-4 rounded-l-3xl rounded-r-lg overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] cursor-pointer border border-white/10">
            <div className="shrink-0">
              <img src={info?.avatarUrl || ''} alt={info?.name || 'avatar'} className="w-24 h-24 rounded-full object-cover bg-white/20 border-4 border-white/20" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2 flex-wrap"><span className="text-sm font-semibold" style={{ color: '#0047AB' }}>Họ tên:</span><span className="text-sm" style={{ color: '#000000' }}>{info?.name}</span></div>
              <div className="flex items-baseline gap-2 flex-wrap"><span className="text-sm font-semibold" style={{ color: '#0047AB' }}>Chức vụ CLB:</span><span className="text-sm" style={{ color: '#000000' }}>{info?.clubPosition}</span></div>
              <div className="flex items-baseline gap-2 flex-wrap"><span className="text-sm font-semibold" style={{ color: '#0047AB' }}>Doanh nghiệp:</span><span className="text-sm" style={{ color: '#000000' }}>{info?.company}</span></div>
            </div>
          </div>
        ))}
      </div>
      {/* Nút phân trang */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page <= 0} className="px-4 py-2 rounded bg-white/20" style={{ color: '#000000' }}>&larr;</button>
        <div className="text-sm" style={{ color: '#000000' }}>{page + 1} / {pageCount}</div>
        <button onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={page >= pageCount - 1} className="px-4 py-2 rounded bg-white/20" style={{ color: '#000000' }}>&rarr;</button>
      </div>
    </div>
  );
};

// 3. Component chính
const AdminaboutContent = (props) => {
  const { styleOptions = {}, container = [] } = props || {};
  const { gradientFrom, gradientTo, fontSize, fontFamily } = styleOptions;

  const sizeH = { 1: 'text-5xl', 2: 'text-4xl', 3: 'text-3xl', 4: 'text-2xl', 5: 'text-xl', 6: 'text-lg' };

  return (
    <div 
      className="flex flex-col px-20 py-5 w-full bg-cover bg-center bg-no-repeat" 
      style={{
        // Kết hợp ảnh nền từ thư mục public/logo/nen1.png và gradient
        backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}), url('/logo/nen1.png')`,
        backgroundBlendMode: 'overlay',
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(container) && container.map((item, idx) => {
          const containerRadius = item?.containerRadius || [];
          const containerSideClasses = containerRadius.join(' ');
          const title = item?.title || {};

          // Render đoạn văn
          if (item?.type === 'paragraph') {
            const p = item?.paragraph || {};
            const images = (Array.isArray(p?.images) ? p.images : []).map(i => (typeof i === 'string' ? i : i?.url)).filter(Boolean);

            return (
              <div key={idx} className={`w-full bg-[#ffffff1f] backdrop-blur-[30px] shadow-lg p-6 ${containerSideClasses}`}>
                <div className={`${sizeH[title?.level]} font-bold mb-3`} style={{ color: title?.color || '#ffffff' }}>{title?.content}</div>
                <p className="font-bold w-full" style={{ color: p?.color || '#ffffff' }}>{p?.content}</p>
                {images.length > 0 && (
                  <div className="flex gap-4 mt-6">
                    {images.slice(0, 2).map((img, i) => <img key={i} src={img} alt="gallery" className="w-1/2 h-48 object-cover rounded-xl" />)}
                  </div>
                )}
              </div>
            );
          }

          // Render info
          return (
            <div key={idx} className={`w-full bg-[#ffffff1f] backdrop-blur-[30px] shadow-lg p-6 ${containerSideClasses}`}>
              <div className={`${sizeH[title?.level]} font-bold mb-3`} style={{ color: title?.color || '#ffffff' }}>{title?.content}</div>
              <Info infoItems={item?.infoItems || []} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminaboutContent;