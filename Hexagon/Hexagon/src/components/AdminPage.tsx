import React from 'react';

type PageVersion = {
  id: string;
  title: string;
  locale: string;
  data: any;
  translationOf?: string;
  slug?: string;
  status?: 'published' | 'draft';
  updatedAt?: string;
};

interface AdminPageProps {
  pages: PageVersion[];
  onUpdatePages: (pages: PageVersion[]) => void;
  onSelectPage: (id: string) => void;
  onCreateNewPage?: () => void;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const AdminPage: React.FC<AdminPageProps> = ({ pages, onUpdatePages, onSelectPage, onCreateNewPage }) => {
  const [langFilter, setLangFilter] = React.useState<'all' | 'vi' | 'en'>('all');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'published' | 'draft'>('all');
  const [dateFilter, setDateFilter] = React.useState<string>('');

  const filtered = React.useMemo(() => {
    return pages.filter((p) => {
      if (langFilter !== 'all' && p.locale !== langFilter) return false;
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (dateFilter) {
        const d = new Date(p.updatedAt || '').toISOString().split('T')[0];
        if (d !== dateFilter) return false;
      }
      return true;
    });
  }, [pages, langFilter, statusFilter, dateFilter]);

  const handleDelete = (id: string) => {
    if (!confirm('Xác nhận xóa page này?')) return;
    onUpdatePages(pages.filter((p) => p.id !== id));
  };

  const handleDuplicate = (id: string) => {
    const src = pages.find((p) => p.id === id);
    if (!src) return;
    const copy: PageVersion = {
      ...JSON.parse(JSON.stringify(src)),
      id: `${src.locale}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: `${src.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    onUpdatePages([...pages, copy]);
  };

  const handleEdit = (id: string) => {
    const src = pages.find((p) => p.id === id);
    if (!src) return;
    const newTitle = prompt('Tiêu đề', src.title) || src.title;
    const newSlug = prompt('Slug', src.slug || slugify(newTitle)) || src.slug || slugify(newTitle);
    const newStatus = (prompt('Trạng thái (published/draft)', src.status || 'draft') as 'published' | 'draft') || src.status || 'draft';
    const updated = { ...src, title: newTitle, slug: newSlug, status: newStatus, updatedAt: new Date().toISOString() };
    onUpdatePages(pages.map((p) => (p.id === id ? updated : p)));
  };

  return (
    <div className="admin-shell">
      <div className="admin-header admin-header--top">
        <div>
          <h3>Quản lý Pages</h3>
          <p className="muted">Tạo và quản lý các trang với PUCK Visual Builder</p>
        </div>
        <div>
          <button className="page-manager-button" onClick={() => onCreateNewPage ? onCreateNewPage() : null}>+ Tạo Page Mới</button>
        </div>
      </div>

      <div className="admin-filters">
        <div className="filter-row">
          <label>Ngôn ngữ</label>
          <select value={langFilter} onChange={(e) => setLangFilter(e.target.value as any)}>
            <option value="all">Tất cả</option>
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
        </div>

        <div className="filter-row">
          <label>Trạng thái</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
            <option value="all">Tất cả</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Nháp</option>
          </select>
        </div>

        <div className="filter-row">
          <label>Ngày cập nhật</label>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Slug</th>
              <th>Ngôn ngữ</th>
              <th>Trạng thái</th>
              <th>Cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="admin-row">
                <td>
                  <div className="admin-title" onClick={() => onSelectPage(p.id)}>
                    <strong>{p.title}</strong>
                    <div className="muted">SEO: {p.title}</div>
                  </div>
                </td>
                <td>/ {p.slug || ''}</td>
                <td>
                  <span className="lang-pill">{p.locale.toUpperCase()}</span>
                </td>
                <td>
                  <span className={`status-pill ${p.status === 'published' ? 'published' : 'draft'}`}>
                    {p.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                  </span>
                </td>
                <td>{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : ''}</td>
                <td className="admin-actions">
                  <button className="page-action-btn" onClick={() => handleDuplicate(p.id)}>Nhân bản</button>
                  <button className="page-action-btn" onClick={() => handleEdit(p.id)}>Sửa</button>
                  <button className="page-action-btn danger" onClick={() => handleDelete(p.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
