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
import { AdminDynamicCard } from "./components/AdminDynamicCard";
import { componentDefaultProps } from './admin-default-data';




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
      defaultProps: componentDefaultProps.Heading,
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
      defaultProps: componentDefaultProps.Text,
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
      defaultProps: componentDefaultProps.Image,
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
      defaultProps: componentDefaultProps.Section,
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
      defaultProps: componentDefaultProps.Hero,
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

      defaultProps: componentDefaultProps.Content,

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

      defaultProps: componentDefaultProps.MultipleContent,

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
                images: {
                  type: 'array',
                  label: 'Ảnh (hiển thị 2 ảnh đầu)',
                  maxItems: 2,
                  arrayFields: {
                    url: { type: 'text', label: 'URL ảnh' },
                  },
                  getItemSummary: (item) => item?.url || 'Image',
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

      defaultProps: componentDefaultProps.AboutContent,
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
  defaultProps: componentDefaultProps.Navbar,
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
      defaultProps: componentDefaultProps.MemberCarousel,
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
      defaultProps: componentDefaultProps.Stats,
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
      defaultProps: componentDefaultProps.NewsGrid,
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
      defaultProps: componentDefaultProps.CommunityValues,
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
      defaultProps: componentDefaultProps.ContactSection,
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
      defaultProps: componentDefaultProps.Footer,
      render: (props) => <AdminFooter {...props} />,
    },

    AdminDynamicCard: {
      render: (props) => <AdminDynamicCard {...props} />,
      defaultProps: componentDefaultProps.AdminDynamicCard,
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        content: { type: "textarea" },
        imageUrl: { type: "text" },
        themeColor: { type: "text" },
        borderRadius: { type: "text" },
        listType: { type: "select", options: [{ label: "Hộp", value: "box" }, { label: "Dấu gạch", value: "bullet" }] },
        items: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            text: { type: "text" },
          },
        },
      },
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