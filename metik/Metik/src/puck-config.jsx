import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import ProductGrid from "./components/ProductGrid";
import AboutSection from "./components/AboutSection";
import VideoSection from "./components/VideoSection";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import MapSection from "./components/MapSection";

export const config = {
  components: {
    Navbar: {
      label: 'Thanh điều hướng',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        navLinks: {
          type: 'array', label: 'Danh sách menu',
          arrayFields: {
            title: { type: 'text', label: 'Tên menu' },
            url: { type: 'text', label: 'Đường dẫn' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        logoUrl: '/logo/logo1.png',
        navLinks: [
          { title: 'TRANG CHỦ', url: '/' },
          { title: 'GIỚI THIỆU', url: '/gioi-thieu' },
          { title: 'SẢN PHẨM', url: '/san-pham' },
          { title: 'TIN TỨC', url: '/tin-tuc' },
          { title: 'LIÊN HỆ', url: '/lien-he' }
        ]
      },
      render: (props) => <Navbar {...props} />
    },

    Slider: {
      label: 'Slider Banner',
      fields: {
        images: {
          type: 'array',
          label: 'Danh sách ảnh',
          arrayFields: {
            url: { type: 'text', label: 'Đường dẫn ảnh' }
          }
        }
      },
      defaultProps: {
        images: [{ url: '/logo/pic1.webp' }, { url: '/logo/pic2.webp' }]
      },
      render: (props) => <Slider {...props} />
    },

    ProductGrid: {
      label: 'Danh sách sản phẩm',
      fields: {
        title: { type: 'text', label: 'Tiêu đề mục' },
        fontFamily: { type: 'text', label: 'Phông chữ' },
        titleColor: { type: 'text', label: 'Màu tiêu đề' }, // Đã đổi từ color sang text
        titleSize: { type: 'text', label: 'Cỡ chữ tiêu đề' },
        itemNameColor: { type: 'text', label: 'Màu tên sản phẩm' }, // Đã đổi từ color sang text
        itemNameSize: { type: 'text', label: 'Cỡ chữ tên SP' },
        itemBgColor: { type: 'text', label: 'Màu nền chân ảnh' }, // Đã đổi từ color sang text
        items: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            name: { type: 'text', label: 'Tên món' },
            image: { type: 'text', label: 'URL Ảnh (.webp)' }
          }
        }
      },
      defaultProps: {
        title: "SẢN PHẨM MỚI",
        titleColor: "#4ade80",
        itemNameColor: "#f97316",
        itemBgColor: "#1a1a1a",
        items: [
          { name: "Snack vị Tảo biển", image: "/logo/anh1.webp" },
          { name: "Snack vị BBQ", image: "/logo/anh2.webp" },
          { name: "Snack vị Bắp", image: "/logo/anh3.webp" },
          { name: "Snack vị Phô mai", image: "/logo/anh4.webp" }
        ]
      },
      render: (props) => <ProductGrid {...props} />
    },
    
    AboutTemplate: {
  label: "Bộ Giới Thiệu",
  render: () => (
    <div className="flex flex-col gap-0">
      <AboutSection 
        title="GIỚI THIỆU VỀ METIK" 
        content="<p>metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.</p>" 
        image=""
      />
      
      <AboutSection 
        title="" 
        isImageLeft={true} 
        image="/logo/picture1.webp" 
        content="<p>Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng.</p>" 
      />
      
      <AboutSection 
        title="" 
        isImageLeft={false} 
        image="/logo/picture3.webp" 
        content="<ul><li>- Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.</li><li>- Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.</li><li>- Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.</li></ul>" 
      />

      <AboutSection 
        title="" 
        isImageLeft={true} 
        image="/logo/picture2.webp" 
        content="<p>Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.</p>" 
      />
    </div>
  )
    },
    
    VideoSection: {
    label: 'Khối Video',
    fields: {
      title: { type: 'text', label: 'Tiêu đề' },
      content: { type: 'textarea', label: 'Nội dung (HTML)' },
      videoUrl: { type: 'text', label: 'URL Video' },
      titleColor: { type: 'text', label: 'Màu tiêu đề' },
      titleSize: { type: 'text', label: 'Cỡ chữ tiêu đề' },
      contentColor: { type: 'text', label: 'Màu nội dung' },
      contentSize: { type: 'text', label: 'Cỡ chữ nội dung' },
      fontFamily: { type: 'select', label: 'Phông chữ', options: [
        { label: 'Sans-Serif', value: 'sans-serif' },
        { label: 'Serif', value: 'serif' },
        { label: 'Monospace', value: 'monospace' }
      ]},
    },
    defaultProps: {
      title: "VỀ CHÚNG TÔI",
      content: "<p>Với tinh thần “Chạm mê tít – Snap into Joy”, <b>metik</b> mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, <b>metik</b> mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.</p><p><b>metik</b> không chỉ là một sản phẩm snack. <b>metik</b> là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.</p>",
      videoUrl: "/vid/vid1.mp4",
      titleColor: "#4ade80",
      titleSize: "24px",
      contentColor: "#ffffff",
      contentSize: "18px",
      fontFamily: "sans-serif"
    },
    render: (props) => <VideoSection {...props} />
    },

    TestimonialSection: {
  label: 'Khối Khách hàng nói gì',
  fields: {
    title: { type: 'text', label: 'Tiêu đề' },
    titleColor: { type: 'text', label: 'Màu tiêu đề' },
    titleSize: { type: 'text', label: 'Cỡ chữ tiêu đề' },
    textColor: { type: 'text', label: 'Màu chữ nội dung' },
    fontFamily: { type: 'select', label: 'Phông chữ', options: [
      { label: 'Sans-Serif', value: 'sans-serif' },
      { label: 'Serif', value: 'serif' }
    ]},
    reviews: {
      type: 'array',
      label: 'Danh sách đánh giá',
      arrayFields: {
        avatar: { type: 'text', label: 'URL Ảnh avatar' },
        comment: { type: 'textarea', label: 'Nội dung phản hồi' },
        name: { type: 'text', label: 'Tên khách hàng' },
        rating: { type: 'number', label: 'Số sao (1-5)', min: 1, max: 5 }
      }
    }
  },
  defaultProps: {
    title: "KHÁCH HÀNG NÓI GÌ?",
    titleColor: "#4ade80",
    titleSize: "24px",
    textColor: "#ffffff",
    fontFamily: "sans-serif",
    reviews: [
      { 
        avatar: "/logo/nguoi1.webp", 
        comment: "Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường", 
        name: "Sinh viên Huỳnh Vĩnh, TP.HCM",
        rating: 5
      },
      { 
        avatar: "/logo/nguoi2.webp", 
        comment: "metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa.", 
        name: "Bạn Mỹ Duyên, Đồng Tháp",
        rating: 5
      }
    ]
  },
  render: (props) => <TestimonialSection {...props} />
    },

    Footer: {
  label: 'Khối Footer',
  fields: {
    logo: { type: 'text', label: 'URL Logo' },
    description: { type: 'textarea', label: 'Mô tả' },
    phone: { type: 'text', label: 'Số điện thoại' },
    email: { type: 'text', label: 'Email' },
    address: { type: 'text', label: 'Địa chỉ' }
  },
  defaultProps: {
    logo: "/logo/logo1.webp",
    description: "METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.",
    phone: "(+84) 79 721 3333",
    email: "sale@ochao.vn",
    address: "Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM.."
  },
  render: (props) => <Footer {...props} />
    },

    MapSection: {
  label: 'Khối Bản đồ (Miễn phí)',
  fields: {
    mapHeight: { type: 'text', label: 'Chiều cao (ví dụ: 500px)' },
    markerLabel: { type: 'text', label: 'Tên địa điểm' }
  },
  defaultProps: {
    mapHeight: "500px",
    markerLabel: "Công ty Cổ phần OCHAO"
  },
  render: (props) => <MapSection {...props} />
}
  },

  root: {
    render: ({ children }) => <div className="min-h-screen">{children}</div>,
  },

};
export default config;