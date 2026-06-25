export const componentDefaultProps = {
  Heading: {
    content: 'Tiêu đề',
    level: 2,
    align: 'left',
  },

  Text: {
    content: 'Nhập văn bản ở đây...',
    align: 'left',
  },

  Image: {
    src: 'https://via.placeholder.com/800x400',
    alt: 'Ảnh minh họa',
    width: '100%',
    height: 'auto',
    borderRadius: '0',
    align: 'center',
  },

  Section: {
    container: 'lg',
    styleOptions: {
      gradientFrom: "#1e1b4b",
      gradientTo: "#4c1d95",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
    padding_x: 4,
    padding_y: 4,
    content: [],
  },

  Hero: {
    title: 'Chào mừng đến với website',
    subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
    buttons: [
      { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
      { text: 'Liên hệ', url: '#contact', style: 'outline' },
    ],
    styleOptions: {
      gradientFrom: "#1e1b4b",
      gradientTo: "#4c1d95",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
    layout: { align: 'center' },
  },

  Content: {
    styleOptions: {
      gradientFrom: "#1e1b4b",
      gradientTo: "#4c1d95",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
    container: {
      eyebrow: {
        content: 'Lan tỏa giá trị đất',
        color: '#000000',
        level: 6,
      },
      headding: {
        content: 'Sen Hồng',
        color: '#ecf32a',
        level: 2,
      },
      subtitle: {
        content:
          'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng.',
        color: '#000000',
        level: 6,
      },
      button: {
        content: 'Tham gia',
        color: '#007BFF',
        level: 4,
        buttonBg: {
          type: 'color',
          color: '#fde047',
        },
      },
    },
  },

  MultipleContent: {
    styleOptions: {
      gradientFrom: "#0f172a",
      gradientTo: "#174fea",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
    headding: {
      content: 'CÁC BAN CHUYÊN MÔN',
      color: '#9bd8ff',
      level: 2,
    },
    subtitle: {
      content: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
      color: '#9bd8ff',
      level: 6,
    },
    container: [
      {
        title: { content: 'Ban Kinh tế – Đầu tư', color: '#ffffff', level: 5 },
        icon: {
          type: 'image',
          imageUrl: '/logo/logo1.png',
          content: 'URL',
          color: '#ffffff',
          size: '5xl',
        },
        button: {
          content: 'Xem hoạt động →',
          url: '#',
          colorText: '#ffffff',
          level: 4,
          buttonBg: { type: 'color', color: '#1e40af' },
          buttonRadius: [],
        },
        containerRadius: [],
      },
      {
        title: { content: 'Ban Văn hóa – Thể thao', color: '#ffffff', level: 5 },
        icon: {
          type: 'image',
          imageUrl: '/logo/logo2.png',
          content: 'URL',
          color: '#ffffff',
          size: '5xl',
        },
        button: {
          content: 'Xem hoạt động →',
          url: '#',
          colorText: '#ffffff',
          level: 4,
          buttonBg: { type: 'color', color: '#1e40af' },
          buttonRadius: [],
        },
        containerRadius: [],
      },
      {
        title: { content: 'Ban Xã hội – Cộng đồng', color: '#ffffff', level: 5 },
        icon: {
          type: 'image',
          imageUrl: '/logo/logo3.png',
          content: 'URL',
          color: '#ffffff',
          size: '5xl',
        },
        button: {
          content: 'Xem hoạt động →',
          url: '#',
          colorText: '#ffffff',
          level: 4,
          buttonBg: { type: 'color', color: '#1e40af' },
          buttonRadius: [],
        },
        containerRadius: [],
      },
      {
        title: { content: 'Ban Khởi nghiệp', color: '#ffffff', level: 5 },
        icon: {
          type: 'image',
          imageUrl: '/logo/logo4.png',
          content: 'URL',
          color: '#ffffff',
          size: '5xl',
        },
        button: {
          content: 'Xem hoạt động →',
          url: '#',
          colorText: '#ffffff',
          level: 4,
          buttonBg: { type: 'color', color: '#1e40af' },
          buttonRadius: [],
        },
        containerRadius: [],
      },
      {
        title: { content: 'Ban Giao thương quốc tế', color: '#ffffff', level: 5 },
        icon: {
          type: 'image',
          imageUrl: '/logo/logo5.png',
          content: 'URL',
          color: '#ffffff',
          size: '5xl',
        },
        button: {
          content: 'Xem hoạt động →',
          url: '#',
          colorText: '#ffffff',
          level: 4,
          buttonBg: { type: 'color', color: '#1e40af' },
          buttonRadius: [],
        },
        containerRadius: [],
      },
    ],
  },


  AboutContent: {
  styleOptions: {
    gradientFrom: "#1253eb", // Màu nền xanh đậm cho đồng bộ
    gradientTo: "#0f172f",
    textColor: "#ffffff",
    titleColor: "#ffffff",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  container: [
    {
      type: 'paragraph',
      title: { content: 'VỀ CÂU LẠC BỘ', color: '#38bdf8', level: 2 }, // Màu xanh sáng cho tiêu đề
      paragraph: {
        content: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
        color: '#ffffff',
        level: 5,
        images: [
          '/logo/pic2.png',
          '/logo/pic1.png',
        ],
      },

    },
    {
      type: 'info',
      title: { content: 'CƠ CẤU TỔ CHỨC', color: '#38bdf8', level: 2 },
      infoItems: [
        {
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
          name: 'Trần Văn Khang',
          clubPosition: 'Ủy viên BCH',
          companyPosition: 'Tổng Giám đốc',
          company: 'Công ty CP Logistics Đồng Tháp',
        },
        {
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
          name: 'Đỗ Thu Trang',
          clubPosition: 'Thủ quỹ CLB',
          companyPosition: 'Giám đốc Tài chính',
          company: 'Công ty TNHH Sen Việt',
        },
        {
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          name: 'Vũ Hoàng Long',
          clubPosition: 'Ủy viên BCH',
          companyPosition: 'Giám đốc Điều hành',
          company: 'Công ty Công nghệ số Mekong',
        },
      ],
    },
  ],
},

  Navbar: {
    mainTitle: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
    subTitle: 'TẠI TP. HỒ CHÍ MINH',
    navLinks: [
      { label: 'Trang chủ', url: '/' },
      { label: 'Giới thiệu', url: '/gioi-thieu' },
      { label: 'Hội viên', url: '/hoi-vien' },
      { label: 'Hoạt động ban', url: '/hoat-dong-ban' },
      { label: 'Tin tức và sự kiện', url: '/tin-tuc' },
      { label: 'Liên hệ', url: '/lien-he' },
    ],
    styleOptions: {
      gradientFrom: "#1e3a8a",
      gradientTo: "#5b21b6",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
  },

  MemberCarousel: {
    title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
    members: [
      { name: 'Icon 1', logoUrl: '/logo/icon1.png' },
      { name: 'Icon 2', logoUrl: '/logo/icon2.png' },
      { name: 'Icon 3', logoUrl: '/logo/icon3.png' },
      { name: 'Icon 4', logoUrl: '/logo/icon4.png' },
      { name: 'Icon 5', logoUrl: '/logo/icon5.png' },
      { name: 'Icon 6', logoUrl: '/logo/icon6.png' },
    ],
    styleOptions: {
      gradientFrom: "#1e1b4b",
      gradientTo: "#4c1d95",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
  },

  Stats: {
    title: 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ',
    stats: [
      { label: 'Hội viên tiêu biểu', value: 500 },
      { label: 'Năm hình thành', value: 20 },
      { label: 'Cơ hội kết nối', value: 1000 },
      { label: 'Chương trình thiện nguyện', value: 100 },
    ],
    styleOptions: {
      gradientFrom: "#1e1b4b",
      gradientTo: "#4c1d95",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
  },

 NewsGrid: {
  title: 'TIN TỨC & SỰ KIỆN',
  newsItems: [
    {
      title: 'Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển',
      date: '20/03/2026',
      excerpt: 'Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.',
      imageUrl: '/logo/anh1.png',
      link: '/tin-tuc/1',
    },
    {
      title: 'Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...',
      date: '20/03/2026',
      excerpt: 'Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.',
      imageUrl: '/logo/anh2.png',
      link: '/tin-tuc/2',
    },
    {
      title: 'Lan tỏa yêu thương thiện nguyện',
      date: '10/03/2026',
      excerpt: 'Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...',
      imageUrl: '/logo/anh3.png',
      link: '/tin-tuc/3',
    },
    {
      title: 'Hợp tác giữa các doanh nghiệp',
      date: '23/02/2026',
      excerpt: 'Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các...',
      imageUrl: '/logo/anh4.png',
      link: '/tin-tuc/4',
    },
    {
      title: 'Đẩy mạnh chuyển đổi số...',
      date: '23/02/2026',
      excerpt: 'Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...',
      imageUrl: '/logo/anh5.png',
      link: '/tin-tuc/5',
    },
  ],
  styleOptions: {
    gradientFrom: "#1e1b4b",
    gradientTo: "#4c1d95",
    textColor: "#ffffff",
    titleColor: "#ffffff",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
},

CommunityValues: {
  title: 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
  items: [
    { 
      title: 'Kết nối chất lượng', 
      description: 'Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.', 
      iconUrl: '/logo/i1.png' 
    },
    { 
      title: 'Phát triển kiến thức', 
      description: 'Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.', 
      iconUrl: '/logo/i2.png' 
    },
    { 
      title: 'Cơ hội hợp tác', 
      description: 'Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.', 
      iconUrl: '/logo/i3.png' 
    },
  ],
  styleOptions: {
    gradientFrom: "#1e1b4b",
    gradientTo: "#4c1d95",
    textColor: "#ffffff",
    titleColor: "#ffffff",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
},

ContactSection: {
    title: 'QUAN TÂM VÀ HỢP TÁC VỚI CÁC CHƯƠNG TRÌNH',
    subTitle: 'CỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM',
    buttonText: 'Đăng ký hội viên',
    contactItems: [
      { type: 'email', label: 'info@dte.hunghau.vn', link: 'mailto:info@dte.hunghau.vn' },
      { type: 'phone', label: '1800 1568', link: 'tel:18001568' },
    ],
    styleOptions: {
      gradientFrom: "#1e1b4b",
      gradientTo: "#4c1d95",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    },
  },

Footer: {
  logo: '/logo/nav.png',
  companyName: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  contactInfo: {
    address: 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh',
    email: 'Email: info@dte.hunghau.vn',
    hotline: 'Hotline: 1800 1568',
  },
  linkGroups: [
    { 
      title: 'Liên kết trang', 
      links: [
        { label: 'Trang chủ', url: '/' },
        { label: 'Tin tức và sự kiện', url: '#' },
        { label: 'Về chúng tôi', url: '#' },
        { label: 'Các lĩnh vực hoạt động', url: '#' },
        { label: 'Doanh nghiệp hội viên', url: '#' },
        { label: 'Đăng ký', url: '#' },
        { label: 'Hoạt động Ban', url: '#' },
      ] 
    },
    { 
      title: 'Khác', 
      links: [
        { label: 'MYH', url: '#' },
        { label: 'MYC', url: '#' },
        { label: 'HHF', url: '#' },
        { label: 'HHE', url: '#' },
        { label: 'HHA', url: '#' },
        { label: 'COWE', url: '#' },
        { label: 'HHN', url: '#' },
        { label: 'HYV', url: '#' },
      ] 
    },
  ],
  copyright: 'Copyright © CLB Doanh nhân Đồng Tháp. All rights reserved',
  styleOptions: {
    gradientFrom: "#1e1b4b",
    gradientTo: "#4c1d95",
    textColor: "#ffffff",
    titleColor: "#ffffff",
    fontSize: 14,
    fontFamily: "sans-serif",
  },
},

IntroDynamicCard: {
    eyebrow: "GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP",
    title: "Kết nối – Đồng hành – Phát triển",
    description: "Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.\n\nVới tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.",
    imageUrl: "/logo/picture1",
    vision: "Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.",
    mission: "Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.",
    styleOptions: {
      backgroundColor: "#171717", // Màu nền đen xám giống mẫu
      textColor: "#ffffff",
      highlightColor: "#f59e0b", // Màu cam cho tiêu đề phụ/border
    }
  },

AdminDynamicCard: {
    title: "Kết nối – Đồng hành – Phát triển",
    subtitle: "Cộng đồng Doanh nhân Đồng Tháp",
    content: "Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.",
    imageUrl: "/logo/picture1.png", // Hãy chắc chắn ảnh nằm trong thư mục public/logo/
    themeColor: "#000000",
    borderRadius: "8px",
    listType: "box",
    items: [
      { label: "Tầm nhìn", text: "Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập." },
      { label: "Sứ mệnh", text: "Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững." }
    ]
  }
};

