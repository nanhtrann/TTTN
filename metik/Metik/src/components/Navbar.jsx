// src/components/Navbar.jsx
import { forwardRef, useState, useEffect } from 'react';
import logo from '../assets/logo/logo1.webp';
import fbIcon from '../assets/logo/facebook.svg';
import ttIcon from '../assets/logo/tiktok.png';
import inIcon from '../assets/logo/linkedin.svg';

const Navbar = forwardRef(({ navLinks = [] }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={ref} className={`sticky top-0 w-full z-50 bg-black text-white transition-all duration-300 flex items-center justify-between px-10 ${isScrolled ? 'py-2' : 'py-5'}`}>
      <img src={logo} alt="Logo" className={`${isScrolled ? 'h-10' : 'h-14'} transition-all`} />

      <div className="flex gap-8 font-bold text-sm">
        {/* SỬA CHỖ NÀY: Dùng link.title thay vì link */}
        {navLinks.map((link, idx) => (
          <a key={idx} href={link.url} className="group relative hover:text-orange-500">
            {link.title} 
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </a>
        ))}
      </div>

      <div className="flex gap-4">
        {[ { img: fbIcon, name: 'Facebook' }, { img: ttIcon, name: 'TikTok' }, { img: inIcon, name: 'LinkedIn' } ].map((icon) => (
          <div key={icon.name} className="relative group cursor-pointer">
            <img src={icon.img} className="h-8 hover:brightness-150 transition-all" alt={icon.name} />
          </div>
        ))}
      </div>
    </nav>
  );
});

export default Navbar;