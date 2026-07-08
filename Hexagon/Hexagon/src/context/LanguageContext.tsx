import { createContext, useContext, useState, type ReactNode } from 'react';

// 1. Định nghĩa kiểu dữ liệu cho Context
interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
}

// 2. Khởi tạo Context với giá trị mặc định là undefined hoặc object rỗng
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider để bao quanh ứng dụng
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('vi');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Hook để sử dụng (thêm kiểm tra an toàn)
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage phải được dùng bên trong LanguageProvider");
  }
  return context;
};