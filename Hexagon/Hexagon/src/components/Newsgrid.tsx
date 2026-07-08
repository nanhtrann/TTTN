import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";
import { content } from "../i18n";

interface NewsItem {
  imageUrl: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

interface NewsGridProps {
  newsItems?: NewsItem[];
}

export const NewsGrid: React.FC<NewsGridProps> = ({ 
  newsItems = [] 
}) => {
  const { lang } = useLanguage();
  const t = content[lang as keyof typeof content].news;

  return (
    <section className="py-16 px-8 bg-[#111111] text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
        <p className="text-gray-400">{t.subtitle}</p>
        <div className="w-16 h-1 bg-yellow-500 mx-auto mt-4"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.slice(0, 2).map((item, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#222]">
              <img src={item.imageUrl} alt={item.title} className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{item.excerpt}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500 flex items-center gap-2">📅 {item.date}</span>
                  <a href={item.link} className="text-yellow-500 font-bold flex items-center gap-1 hover:underline">
                    {lang === 'vi' ? 'Xem chi tiết →' : 'Read more →'}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.slice(2, 5).map((item, index) => (
            <motion.div key={index + 2} whileHover={{ y: -5 }} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#222]">
              <img src={item.imageUrl} alt={item.title} className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{item.excerpt}</p>
                <div className="border-t border-[#333] pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">📅 {item.date}</span>
                  <a href={item.link} className="text-yellow-500 font-bold text-sm hover:underline">
                    {lang === 'vi' ? 'Xem chi tiết →' : 'Read more →'}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-teal-600 to-green-500 hover:from-teal-700 hover:to-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto">
            {lang === 'vi' ? 'Xem tất cả bài viết ❯' : 'View all articles ❯'}
          </button>
        </div>
      </div>
    </section>
  );
};