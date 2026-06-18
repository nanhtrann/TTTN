import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection from './components/admin-section';
import AdminHero from './components/admin-hero';
import AdminContent, {ContainerRadiusFields} from './components/admin-content';
import AdminMultipleContent, {MultiContainerRadiusFields} from './components/admin-multipleContent';
import AdminaboutContent, {AboutContainerRadiusFields} from './components/admin-aboutContent';
import { AdminNavbar } from './components/AdminNavbar';
import { AdminMemberCarousel } from './components/AdminMemberCarousel';
import { AdminStats } from './components/AdminStats';
import { AdminNewsGrid } from './components/AdminNewsGrid';
import { AdminCommunityValues } from './components/AdminCommunityValues';
import { AdminContactSection } from './components/AdminContactSection';
import { AdminFooter } from './components/AdminFooter';

const fontFields = {
  level: { type: 'select', label: 'Cỡ chữ', options: [ { label: 'H1', value: 1 }, { label: 'H2', value: 2 }, { label: 'H3', value: 3 }, { label: 'H4', value: 4 }, { label: 'H5', value: 5 }, { label: 'H6', value: 6 } ] },
};

const styleFields = {
  styleOptions: {
    type: "object",
    label: "Tùy biến giao diện",
    objectFields: {
      gradientFrom: { type: "text", label: "Gradient từ (mã màu)" },
      gradientTo: { type: "text", label: "Gradient đến (mã màu)" },
      textColor: { type: "text", label: "Màu chữ chung" },
      titleColor: { type: "text", label: "Màu tiêu đề" },
      fontSize: { type: "number", label: "Cỡ chữ (px)" },
      fontFamily: { type: "select", options: [{ label: "Sans", value: "sans-serif" }, { label: "Serif", value: "serif" }] },
    },
  },
};

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        color: { type: 'text', label: 'Màu chữ' },
        fontFamily: { type: 'text', label: 'Phông chữ (VD: "Roboto", "Arial")' },
        level: {
          ...fontFields.level, label: 'Cấp độ'
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: { 
        content: 'Tiêu đề', 
        level: 2, 
        align: 'left' 
      },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        color: { type: 'text', label: 'Màu chữ' },
        fontFamily: { type: 'text', label: 'Phông chữ (VD: "Roboto", "Arial")' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Hình ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng cách (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        ...styleFields,
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' }
      },
      defaultProps: {
        container: 'lg',
        styleOptions: {
          gradientFrom: "#1e1b4b",
          gradientTo: "#4c1d95",
          textColor: "#ffffff",
          titleColor: "#ffffff",
          fontSize: 16,
          fontFamily: "sans-serif",
        },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Banner chính (Hero)',
      fields: {
        ...styleFields,
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
          { text: 'Liên hệ', url: '#contact', style: 'outline' }
        ],
        styleOptions: {
          gradientFrom: "#1e1b4b",
          gradientTo: "#4c1d95",
          textColor: "#ffffff",
          titleColor: "#ffffff",
          fontSize: 16,
          fontFamily: "sans-serif",
        },
        layout: { align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    },

    Content: {
      label: 'Banner nội dung',
      fields: {
        ...styleFields,

        container: {
          type: 'object',
          label: 'Container',
          objectFields: {
            
            containerLayout: {
              type: 'object', 
              label: 'Bố cục',
              objectFields: {
                align: {
                  type: 'select', label: 'Căn ô',
                  options: [
                    { label: 'Trái', value: 'left' },
                    { label: 'Giữa', value: 'center' },
                    { label: 'Phải', value: 'right' }
                  ]
                }
              }
            },
            
            containerRadius: {
              type: 'custom',
              label: 'Chọn góc để bo tròn',
              render: ContainerRadiusFields 
            },

            eyebrow: {
              label: 'Nhãn tiêu đề',
              type: 'object',
              objectFields: {
                content: { type: 'text', label: 'Nội dung' },
                color: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                  type: 'select',
                  label: 'Cấp độ',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                },
              },
            },

            headding: {
              type: 'object',
              label: 'Tiêu đề',
              objectFields: {
                content: { type: 'text', label: 'Nội dung' },
                color: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                type: 'select',
                label: 'Cấp độ',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                },
              }
            },

            subtitle: {
              type: 'object',
              label: 'Văn bản',
              objectFields: {
                content: { type: 'text', label: 'Nội dung' },
                color: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                type: 'select',
                label: 'Cấp độ',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                },
              }
            },

            button: {
              type: 'object',
              label: 'Nút',
              objectFields: {
                url: { type: 'text', label: 'URL'},
                content: { type: 'text', label: 'Nội dung' },
                colorText: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                type: 'select',
                label: 'Cấp độ',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                },

                buttonBg: {
                  type: 'object',
                  label: 'Nền của nút bấm',
                  objectFields:{
                    type: {
                      type: 'select',
                      label: 'Loại',
                      options: [
                        { label: 'Màu', value: 'color' },
                        { label: 'Gradient', value: 'gradient' },
                        { label: 'Ảnh', value: 'image' },
                        { label: 'Gif', value: 'gif' }
                      ]
                    },
                      color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
                      gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
                      gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
                      gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
                      imageUrl: { type: 'text', label: 'URL ảnh nền' },
                      gif: { type: 'text', label: 'URL gif' },
                }},  
                buttonRadius: {
                  type: 'custom',
                  label: 'Chọn góc để bo tròn',
                  render: ContainerRadiusFields

                }
              }
            },  
          },
        },
      },

      defaultProps: {
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
            content: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng.',
            color: '#000000',
            level: 6,
          },
          button: {
            content: 'Tham gia',
            color: '#007BFF',
            level: 4,
            buttonBg: {
            type: 'color',
            color: '#fde047' 
          }
          }
        },
      },

      render: (props) => <AdminContent {...props} />
    },

    MultipleContent: {
      label: 'Banner nhiều nội dung',
      fields: {
        ...styleFields,
        
        headding: {
          type: 'object',
          label: 'Tiêu đề',
          objectFields: {
            content: { type: 'text', label: 'Nội dung' },
            color: { type: 'text', label: 'Màu chữ', default: '#000000' },
            level: {
              type: 'select',
              label: 'Cấp độ',
              options: [
                { label: 'H1', value: 1 },
                { label: 'H2', value: 2 },
                { label: 'H3', value: 3 },
                { label: 'H4', value: 4 },
                { label: 'H5', value: 5 },
                { label: 'H6', value: 6 },
              ],
            },
          }
        },

        subtitle: {
          type: 'object',
          label: 'Văn bản',
          objectFields: {
            content: { type: 'text', label: 'Nội dung' },
            color: { type: 'text', label: 'Màu chữ', default: '#000000' },
            level: {
              type: 'select',
              label: 'Cấp độ',
              options: [
                { label: 'H1', value: 1 },
                { label: 'H2', value: 2 },
                { label: 'H3', value: 3 },
                { label: 'H4', value: 4 },
                { label: 'H5', value: 5 },
                { label: 'H6', value: 6 },
              ],
            },
          }
        },

        container: {
          type: 'array',
          label: 'Container',
          arrayFields: {
            containerRadius: {
              type: 'custom',
              label: 'Chọn góc để bo tròn',
              render: MultiContainerRadiusFields 
            },

            title: {
              type: 'object',
              label: 'Tiêu đề',
              objectFields: {
                content: { type: 'text', label: 'Nội dung', default: 'Tiêu đề' },
                color: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                  type: 'select',
                  label: 'Cấp độ',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                  default: 2,
                },
              }
            },
            icon: {
              type: 'object',
              label: 'Icon',
              objectFields: {
                type: {
                  type: 'select',
                  label: 'Kiểu icon',
                  options: [
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Text', value: 'text' },
                  ],
                },
                content: { type: 'text', label: 'Nội dung icon', default: '★' },
                imageUrl: { type: 'text', label: 'URL ảnh icon' },
              },
            },

            button: {
              type: 'object',
              label: 'Nút',
              objectFields: {
                url: { type: 'text', label: 'URL', default: '#' },
                content: { type: 'text', label: 'Nội dung', default: 'Văn bản' },
                colorText: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                  type: 'select',
                  label: 'Cấp độ',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                  default: 4,
                },

                buttonBg: {
                  type: 'object',
                  label: 'Nền của nút bấm',
                  objectFields:{
                    type: {
                      type: 'select',
                      label: 'Loại',
                      options: [
                        { label: 'Màu', value: 'color' },
                        { label: 'Gradient', value: 'gradient' },
                        { label: 'Ảnh', value: 'image' },
                        { label: 'Gif', value: 'gif' }
                      ],
                      default: 'color'
                    },
                      color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
                      gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
                      gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
                      gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
                      imageUrl: { type: 'text', label: 'URL ảnh nền' },
                      gif: { type: 'text', label: 'URL gif' },
                }},  
                buttonRadius: {
                  type: 'custom',
                  label: 'Chọn góc để bo tròn',
                  render: MultiContainerRadiusFields

                }
              }
            },
          },
          getItemSummary: (item) => {
            const title = item.title?.content || item.title || '';
            return title || 'Container';
          },

          defaultProps:{
            icon: {
              type: 'image',
              imageUrl: 'https://cdn-icons-png.flaticon.com/512/10221/10221159.png',
              content: 'URL',
              color: '#000000',
              size: '5xl',
              
            }
          }  


        },
      },

      defaultProps: {
        styleOptions: {
          gradientFrom: "#1e1b4b",
          gradientTo: "#4c1d95",
          textColor: "#ffffff",
          titleColor: "#ffffff",
          fontSize: 16,
          fontFamily: "sans-serif",
        },
        headding: {
          content: 'Tiêu đề',
          color: '#000000',
          level: 2,
        },
        subtitle: {
          content: 'Văn bản',
          color: '#000000',
          level: 6,
        },
        
        container: [
          {
            title: { 
              content: 'Tiêu đề',
              color: '#000000',
              level: 2,
            },
            icon: {
              type: 'image',
              imageUrl: 'https://cdn-icons-png.flaticon.com/512/10221/10221159.png',
              content: 'URL',
              color: '#000000',
              size: '5xl',
            },
            button: {
              content: 'Văn bản',
              url: '#',
              colorText: '#000000',
              level: 4,
              buttonBg: {
                type: 'color',
                color: '#fde047',
              },
              buttonRadius: [],
            },
            containerRadius: [],
          },
        ],
      },

      render: (props) => <AdminMultipleContent {...props} />
    },

    AboutContent: {
      label: 'Nội dung giới thiệu',
      fields: {
        ...styleFields,

        container: {
          type: 'array',
          label: 'Container',
          maxItems: 6,
          arrayFields: {
            title: {
              type: 'object',
              label: 'Title',
              objectFields: {
                content: { type: 'text', label: 'Nội dung', default: 'Title' },
                color: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                  type: 'select',
                  label: 'SizeH',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                  default: 2,
                },
              },
            },

            type: {
              type: 'select',
              label: 'Loại',
              options: [
                { label: 'Paragraph', value: 'paragraph' },
                { label: 'Info', value: 'info' }
              ],
              default: 'paragraph'
            },


            containerRadius: {
              type: 'custom',
              label: 'Chọn góc để bo tròn',
              render: AboutContainerRadiusFields 
            },

            paragraph: {
              type: 'object',
              label: 'Paragraph',
              objectFields: {
                content: { type: 'textarea', label: 'Nội dung', default: '...' },
                color: { type: 'text', label: 'Màu chữ', default: '#000000' },
                level: {
                  type: 'select',
                  label: 'SizeH',
                  options: [
                    { label: 'H1', value: 1 },
                    { label: 'H2', value: 2 },
                    { label: 'H3', value: 3 },
                    { label: 'H4', value: 4 },
                    { label: 'H5', value: 5 },
                    { label: 'H6', value: 6 },
                  ],
                  default: 2,
                },
              }
            },

            infoItems: {
              type: 'array',
              label: 'Info list',
              arrayFields: {
                avatarUrl: { type: 'text', label: 'Avatar URL', default: '' },
                name: { type: 'text', label: 'Họ tên', default: 'Họ tên' },
                clubPosition: { type: 'text', label: 'Chức vụ clb', default: 'Chức vụ clb' },
                companyPosition: { type: 'text', label: 'Chức vụ doanh nghiệp', default: 'Chức vụ doanh nghiệp' },
                company: { type: 'text', label: 'Doanh nghiệp', default: 'Doanh nghiệp' },
              },
              getItemSummary: (item) => item.name || 'Info'
            },
          },
          getItemSummary: (item) => {
            const title = item.title?.content || item.title || '';
            return title || 'Container';
          }
        },
      },

      defaultProps: {
        styleOptions: {
          gradientFrom: "#1e1b4b",
          gradientTo: "#4c1d95",
          textColor: "#ffffff",
          titleColor: "#ffffff",
          fontSize: 16,
          fontFamily: "sans-serif",
        },
        container: [
          {
            title: { content: 'Tiêu đề', color: '#000000', level: 2 },
            type: 'paragraph',
            containerRadius: [],
            paragraph: {
              content: 'Văn bản',
              color: '#000000',
              level: 5,
            },
          },
          {
            title: { content: 'Tiêu đề', color: '#000000', level: 2 },
            type: 'info',
            containerRadius: [],
            infoItems: [
              {
                avatarUrl: 'data:image/png;base64,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',
                name: 'Ngoc Anh',
                clubPosition: 'Phó Chủ tịch',
                companyPosition: 'Nhân viên',
                company: 'Công ty abc',
              },
            ],
          },
        ],
      },  
      render: (props) => <AdminaboutContent {...props} />
    },

    Navbar: {
  label: 'Thanh điều hướng',
  fields: {
    ...styleFields,
    mainTitle: { type: 'text', label: 'Tiêu đề chính' },
    subTitle: { type: 'text', label: 'Tiêu đề phụ' },
    navLinks: {
      type: 'array',
      label: 'Danh sách menu',
      getItemSummary: (item) => item.label,
      arrayFields: {
        label: { type: 'text', label: 'Tên menu' },
        url: { type: 'text', label: 'Đường dẫn' },
      },
    },
  },
  defaultProps: {
    mainTitle: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
    subTitle: 'TẠI TP. HỒ CHÍ MINH',
    navLinks: [
      { label: 'Trang chủ', url: '/' },
      { label: 'Giới thiệu', url: '/gioi-thieu' },
    ],
    styleOptions: {
      gradientFrom: "#1e3a8a",
      gradientTo: "#5b21b6",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      fontSize: 16,
      fontFamily: "sans-serif",
    }
  },
  render: (props) => <AdminNavbar {...props} />,
},
    MemberCarousel: {
      label: 'Danh sách hội viên',
      fields: {
        ...styleFields,
        title: { type: 'text', label: 'Tiêu đề' },
        members: {
          type: 'array',
          label: 'Danh sách hội viên',
          getItemSummary: (item) => item.name,
          arrayFields: {
            name: { type: 'text', label: 'Tên hội viên' },
            logoUrl: { type: 'text', label: 'URL Logo' },
          },
        },
      },
      defaultProps: {
        title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        members: [
          { name: 'HappyFood', logoUrl: '/happyfood-logo.png' },
          { name: 'Thành viên 2', logoUrl: '/logo2.png' },
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
      render: (props) => <AdminMemberCarousel {...props} />,
    },
    Stats: {
      label: 'Khối thống kê',
      fields: {
        ...styleFields,
        title: { type: 'text', label: 'Tiêu đề khối' },
        stats: {
          type: 'array',
          label: 'Dữ liệu thống kê',
          getItemSummary: (item) => `${item.label}: ${item.value}`,
          arrayFields: {
            label: { type: 'text', label: 'Tiêu đề' },
            value: { type: 'number', label: 'Giá trị số' },
          },
        },
      },
      defaultProps: {
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
      render: (props) => <AdminStats {...props} />,
    },
    NewsGrid: {
      label: 'Danh sách tin tức',
      fields: {
        ...styleFields,
        title: { type: 'text', label: 'Tiêu đề khối' },
        newsItems: {
          type: 'array',
          label: 'Danh sách bài viết',
          getItemSummary: (item) => item.title,
          arrayFields: {
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            date: { type: 'text', label: 'Ngày đăng' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            excerpt: { type: 'text', label: 'Tóm tắt' },
            link: { type: 'text', label: 'Đường dẫn (URL)' },
          },
        },
      },
      defaultProps: {
        title: 'TIN TỨC & SỰ KIỆN',
        newsItems: [
          {
            title: 'Hội thảo kết nối doanh nghiệp...',
            date: '20/03/2026',
            excerpt: 'Sự kiện quy tụ nhiều chuyên gia...',
            imageUrl: '/path-to-image.jpg',
            link: '/tin-tuc/1'
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
      render: (props) => <AdminNewsGrid {...props} />,
    },
    CommunityValues: {
      label: 'Giá trị cộng đồng',
      fields: {
        ...styleFields,
        title: { type: 'text', label: 'Tiêu đề khối' },
        items: {
          type: 'array',
          label: 'Các giá trị',
          getItemSummary: (item) => item.title,
          arrayFields: {
            iconUrl: { type: 'text', label: 'URL Icon' },
            title: { type: 'text', label: 'Tiêu đề' },
            description: { type: 'text', label: 'Mô tả' },
          },
        },
      },
      defaultProps: {
        title: 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
        items: [
          { title: 'Kết nối chất lượng', description: 'Tiếp cận mạng lưới...', iconUrl: '/icon1.png' },
          { title: 'Phát triển kiến thức', description: 'Cập nhật xu hướng...', iconUrl: '/icon2.png' },
          { title: 'Cơ hội hợp tác', description: 'Tham gia các dự án...', iconUrl: '/icon3.png' },
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
      render: (props) => <AdminCommunityValues {...props} />,
    },
    ContactSection: {
      label: 'Khối liên hệ',
      fields: {
        ...styleFields,
        title: { type: 'text', label: 'Tiêu đề chính' },
        subTitle: { type: 'text', label: 'Tiêu đề phụ' },
        buttonText: { type: 'text', label: 'Chữ trên nút' },
        contactItems: {
          type: 'array',
          label: 'Thông tin liên hệ',
      getItemSummary: (item) => item.label || 'Mục liên hệ',
          arrayFields: {
            type: { type: 'select', options: [{ label: 'Email', value: 'email' }, { label: 'Số điện thoại', value: 'phone' }] },
            label: { type: 'text', label: 'Nội dung hiển thị' },
            link: { type: 'text', label: 'Đường dẫn (VD: tel:18001568)' },
          },
        },
      },
      defaultProps: {
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
      render: (props) => <AdminContactSection {...props} />,
    },
    Footer: {
      label: 'Chân trang (Footer)',
      fields: {
        ...styleFields,
        contactInfo: {
          type: 'object',
          label: 'Thông tin liên hệ',
          objectFields: {
            address: { type: 'text', label: 'Địa chỉ' },
            email: { type: 'text', label: 'Email' },
            hotline: { type: 'text', label: 'Hotline' },
          },
        },
        linkGroups: {
          type: 'array',
          label: 'Các nhóm liên kết',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề nhóm' },
            links: {
              type: 'array',
              label: 'Danh sách link',
          getItemSummary: (item) => item.label || 'Link', // Sửa lại tên cho đúng
          arrayFields: {
                label: { type: 'text', label: 'Tên hiển thị' },
                url: { type: 'text', label: 'Đường dẫn' },
              },
            },
          },
        },
      },
      defaultProps: {
        contactInfo: {
          address: 'Phòng Đồng Tháp, Trường Đại học Văn Hiến...',
          email: 'info@dte.hunghau.vn',
          hotline: 'Hotline: 1800 1568',
        },
        linkGroups: [
          { title: 'Liên kết trang', links: [{ label: 'Trang chủ', url: '/' }, { label: 'Tin tức', url: '#' }] },
          { title: 'Khác', links: [{ label: 'MYH', url: '#' }, { label: 'MYC', url: '#' }] },
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
      render: (props) => <AdminFooter {...props} />,
    },
  },

  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero', 'Content', 'MultipleContent', 'AboutContent', 'Navbar', 'MemberCarousel', 'Stats', 'NewsGrid', 'CommunityValues', 'ContactSection', 'Footer'] }
  ],

  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
