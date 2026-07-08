import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { AboutSection } from "./components/AboutSection";
import { ServiceSection } from "./components/ServiceSection";
import { NewsGrid } from "./components/Newsgrid";
import { MemberCarousel } from "./components/MemberCarousel";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export const BACKGROUND_TYPES = [
    { value: 'color', label: 'Màu sắc' },
    { value: 'gradient', label: 'Gradient' },
    { value: 'image', label: 'Hình ảnh' },
    { value: 'image+gradient', label: 'Hình ảnh & Gradient' },
    { value: 'image+color', label: 'Hình ảnh & Màu sắc' }
];

export const GRADIENT_DIRECTIONS = [
    { value: 'to right', label: 'Trái → Phải' },
    { value: 'to left', label: 'Phải → Trái' },
    { value: 'to bottom', label: 'Trên → Dưới' },
    { value: 'to bottom right', label: 'Góc trên-trái → dưới-phải' },
    { value: 'to bottom left', label: 'Góc trên-phải → dưới-trái' }
];

const sharedFields = {
    bgType: { type: "select", options: BACKGROUND_TYPES, label: "Kiểu nền" },
    bgColor: { type: "text", label: "Màu nền" },
    bgImage: { type: "text", label: "Ảnh nền" },
    gradientDirection: { type: "select", options: GRADIENT_DIRECTIONS, label: "Hướng Gradient" },
    gradientColors: { type: "text", label: "Dải màu Gradient" },
};

export const config = {
  components: {
    Navbar: {
      fields: {
        navItems: { 
          type: "array", 
          arrayFields: { label: { type: "text" } },
          label: "Danh sách Menu" 
        },
        backgroundColor: { type: "text", label: "Màu nền Navbar" },
        textColor: { type: "text", label: "Màu chữ" },
        fontSize: { type: "text", label: "Cỡ chữ" },
        logoSrc: { type: "text", label: "Đường dẫn Logo" },
      },
      defaultProps: {
        navItems: [
          { label: "Trang chủ" },
          { label: "Giới thiệu" },
          { label: "Dịch vụ" },
          { label: "Hỗ trợ" },
          { label: "Liên hệ" }
        ],
        backgroundColor: "#1e5a40",
        textColor: "#ffffff",
        fontSize: "16px",
        logoSrc: "/pictures/logo1.png",
      },
      render: (props: any) => <Navbar {...props} />,
    },
    
    Hero: {
      fields: {
        description: { type: "textarea", label: "Đoạn văn mô tả" },
        backgroundColor: { type: "text", label: "Màu nền Hero" },
        textColor: { type: "text", label: "Màu chữ" },
        fontSize: { type: "text", label: "Cỡ chữ tiêu đề (px)" },
        fontFamily: { type: "text", label: "Phông chữ" },
        buttonRadius: { type: "text", label: "Bo góc nút (ví dụ: 8px)" },
        primaryButtonText: { type: "text", label: "Nút chính" },
        secondaryButtonText: { type: "text", label: "Nút phụ" },
      },
      defaultProps: {
        description: "HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.",
        backgroundColor: "#1e5a40",
        textColor: "#ffffff",
        fontSize: "16px",
        fontFamily: "Inter, sans-serif",
        buttonRadius: "8px",
        primaryButtonText: "Khám phá Dịch vụ",
        secondaryButtonText: "Liên hệ Tư vấn",
      },
      render: (props: any) => <Hero {...props} />,
    },

    AboutSection: {
      fields: { 
        ...sharedFields,
        title: { type: "text", label: "Tiêu đề" },
        description: { type: "textarea", label: "Mô tả" },
        items: { type: "array", arrayFields: { title: { type: "text" }, desc: { type: "text" } }, label: "Danh sách thông tin" },
        imageUrl: { type: "text", label: "Ảnh chính" },
        showButton: { type: "radio", options: [{label: "Hiện", value: "true"}, {label: "Ẩn", value: "false"}], label: "Hiện nút" },
        buttonText: { type: "text", label: "Chữ trên nút" },
        textColor: { type: "text", label: "Màu chữ" }
      },
      defaultProps: {
        title: "Về Hexagon",
        description: "Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.",
        items: [
            { title: "Sứ mệnh", desc: "Kiến tạo tương lai số bằng các giải pháp tiên tiến." },
            { title: "Tầm nhìn", desc: "Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới." },
            { title: "Giá trị cốt lõi", desc: "Đổi mới - Đồng hành - Tiên phong - Minh bạch." },
            { title: "Nền tảng", desc: "Hệ sinh thái đa ngành, vững chắc và linh hoạt." }
        ],
        imageUrl: "/pictures/picture.jpg",
        showButton: "false"
      },
      render: (props: any) => <AboutSection {...props} />,
    },

    ServiceSection: {
      fields: {
        bgType: { type: "select", options: BACKGROUND_TYPES },
        bgColor: { type: "text" },
        bgImage: { type: "text" },
        gradientDirection: { type: "select", options: GRADIENT_DIRECTIONS },
        gradientColors: { type: "text" },
        isAnimated: { type: "radio", options: [{label: "Bật", value: "true"}, {label: "Tắt", value: "false"}] },
        showButton: { type: "radio", options: [{label: "Hiện", value: "true"}, {label: "Ẩn", value: "false"}] },
        services: {
          type: "array",
          arrayFields: { 
            title: { type: "text" }, 
            desc: { type: "textarea" }, 
            image: { type: "text" }, 
            hoverImage: { type: "text" } 
          }
        }
      },
      defaultProps: {
        bgType: "color",
        bgColor: "#000000",
        isAnimated: "true",
        showButton: "true",
        services: [
          { title: "Giải pháp công nghệ", desc: "Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt.", image: "/pictures/pic1.jpg", hoverImage: "/pictures/pic5.png" },
          { title: "Giải pháp thi công", desc: "Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững.", image: "/pictures/pic2.jpg", hoverImage: "/pictures/pic5.png" },
          { title: "Cung cấp thiết bị", desc: "Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa tài nguyên.", image: "/pictures/pic3.jpg", hoverImage: "/pictures/pic5.png" },
          { title: "Dịch vụ CNTT", desc: "Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi không gian.", image: "/pictures/pic4.jpg", hoverImage: "/pictures/pic5.png" }
        ]
      },
      render: (props: any) => <ServiceSection {...props} />
    },

    NewsGrid: {
      fields: {
        title: { type: "text", label: "Tiêu đề chính" },
        subtitle: { type: "text", label: "Tiêu đề phụ" },
        newsItems: {
          type: "array",
          label: "Danh sách tin tức",
          arrayFields: {
            imageUrl: { type: "text", label: "Đường dẫn ảnh" },
            title: { type: "text", label: "Tiêu đề tin" },
            date: { type: "text", label: "Ngày đăng" },
            excerpt: { type: "textarea", label: "Nội dung tóm tắt" },
            link: { type: "text", label: "Link bài viết" },
          },
        },
      },
      defaultProps: {
        title: "Tin tức",
        subtitle: "Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.",
        newsItems: [
          { 
            imageUrl: "/pictures/news1.jpg", 
            title: "Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngòi nhà Hùng Hậu", 
            date: "26 thg 6, 2026", 
            excerpt: "Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...", 
            link: "#" 
          },
          { 
            imageUrl: "/pictures/news2.jpg", 
            title: "Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên", 
            date: "26 thg 6, 2026", 
            excerpt: "Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến tron...", 
            link: "#" 
          },
          { 
            imageUrl: "/pictures/news3.jpg", 
            title: "Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá", 
            date: "26 thg 6, 2026", 
            excerpt: "Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghế 'Lục Giác' để chọn cho m...", 
            link: "#" 
          },
          { 
            imageUrl: "/pictures/news4.png", 
            title: "Bài viết 4", 
            date: "25 thg 6, 2026", 
            excerpt: "Bài viết 4", 
            link: "#" 
          },
          { 
            imageUrl: "/pictures/news5.jpg", 
            title: "Bài viết 5", 
            date: "25 thg 6, 2026", 
            excerpt: "Bài viết 5", 
            link: "#" 
          },
        ],
      },
      render: (props: any) => <NewsGrid {...props} />,
    },

    MemberCarousel: {
      fields: {
        title: { type: "text" },
        bgType: { type: "select", options: BACKGROUND_TYPES },
        bgColor: { type: "text" },
        bgImage: { type: "text" },
        gradientDirection: { type: "select", options: GRADIENT_DIRECTIONS },
        gradientColors: { type: "text" },
        isAnimated: { type: "radio", options: [{label: "Bật", value: "true"}, {label: "Tắt", value: "false"}] },
        members: {
          type: "array",
          arrayFields: { logoUrl: { type: "text" } }
        }
      },
      defaultProps: {
        title: "Các đối tác liên kết",
        bgType: "gradient",
        gradientDirection: "to bottom",
        gradientColors: "#065f46, #10b981",
        isAnimated: "true",
        members: [
          { logoUrl: "/pictures/p1.png" },
          { logoUrl: "/pictures/p2.png" },
          { logoUrl: "/pictures/p3.png" },
          { logoUrl: "/pictures/p4.png" },
          { logoUrl: "/pictures/p5.png" },
          { logoUrl: "/pictures/p6.png" }
        ]
      },
      render: (props: any) => <MemberCarousel {...props} />
    },

    ContactSection: {
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        desc: { type: "textarea", label: "Mô tả" },
        address: { type: "text", label: "Địa chỉ" },
        email: { type: "text", label: "Email" },
        hotline: { type: "text", label: "Hotline" },
        mapUrl: { type: "text", label: "Link nhúng Google Maps" }
      },
      defaultProps: {
        title: "Liên hệ với chúng tôi",
        desc: "Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.",
        address: "615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh",
        email: "info@hexagon.xyz",
        hotline: "096 446 0333",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.335639186876!2d106.64154975!3d10.78558485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eb1e788c803%3A0x3d042f508943f99!2zNjE1IMOCdSBDxqEsIFTDom4gUGjDuiwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1783464611948!5m2!1sen!2s"
      },
      render: (props: any) => <ContactSection {...props} />
    },

    Footer: {
      fields: {
        copyrightText: { 
          type: "text", 
          label: "Nội dung Copyright" 
        },
      },
      defaultProps: {
        copyrightText: "Copyright 2026 © Hexagon Corporation. All rights reserved.",
      },
      render: (props: any) => <Footer {...props} />,
    },
  },
};

export default config;