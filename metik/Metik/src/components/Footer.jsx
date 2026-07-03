import { forwardRef } from 'react';

const Footer = forwardRef(({ logo, description, phone, email, address }, ref) => {
  return (
    <footer ref={ref} className="w-full bg-[#f5b31f] text-[#3d2b1f]">
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img src={logo} alt="Logo" className="h-20 mb-6" />
            <p className="text-lg font-medium leading-relaxed max-w-md">{description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#4ade80]">THÔNG TIN LIÊN HỆ</h3>
            <div className="h-[2px] bg-[#3d2b1f]/20 w-full mb-6" />
            
            <div className="space-y-4 font-medium">
              <p className="flex items-center gap-3"><span>📞</span> {phone}</p>
              <p className="flex items-center gap-3"><span>✉️</span> {email}</p>
              <p className="flex items-start gap-3"><span>📍</span> {address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f97316] py-4 text-center text-white text-sm">
        Copyright 2026 © METIK. All rights reserved
      </div>
    </footer>
  );
});

export default Footer;