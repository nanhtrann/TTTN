import { Puck, Render } from '@measured/puck';
import '@measured/puck/puck.css';
import { useEffect, useMemo, useState } from 'react';
import puckConfig from './puck-config';
import './App.css';
import AdminPage from './components/AdminPage';

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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const createEmptyPage = (locale: string, title: string, translationOf?: string): PageVersion => ({
  id: `${locale}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title,
  locale,
  data: { content: [], root: {} },
  translationOf,
  slug: slugify(title),
  status: 'draft',
  updatedAt: new Date().toISOString(),
});

const clonePageData = (data: any) => {
  if (!data) {
    return { content: [], root: {} };
  }

  return JSON.parse(JSON.stringify(data));
};

const getInitialPages = () => {
  if (typeof window === 'undefined') {
    return [createEmptyPage('vi', 'Trang chính (Tiếng Việt)')];
  }

  const saved = window.localStorage.getItem('hexagon-pages');
  if (!saved) {
    return [createEmptyPage('vi', 'Trang chính (Tiếng Việt)')];
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Ignore invalid saved data and fall back to the default page.
  }

  return [createEmptyPage('vi', 'Trang chính (Tiếng Việt)')];
};

function App() {
  const [pages, setPages] = useState<PageVersion[]>(getInitialPages);
  const [activePageId, setActivePageId] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.localStorage.getItem('hexagon-active-page') || '';
  });
  const [preview, setPreview] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const activePage = useMemo(
    () => pages.find((page) => page.id === activePageId) || pages[0],
    [activePageId, pages],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hexagon-pages', JSON.stringify(pages));
    }
  }, [pages]);

  useEffect(() => {
    if (typeof window !== 'undefined' && activePage?.id) {
      window.localStorage.setItem('hexagon-active-page', activePage.id);
    }
  }, [activePage?.id]);

  useEffect(() => {
    if (!activePageId && pages[0]) {
      setActivePageId(pages[0].id);
    }
  }, [activePageId, pages]);

  // Listen for external requests to switch or create translations (from navbar)
  useEffect(() => {
    const onSwitch = (e: any) => {
      const id = e?.detail?.pageId;
      if (id) setActivePageId(id);
    };

    const onCreate = (e: any) => {
      const locale = e?.detail?.locale;
      if (locale) handleCreateTranslation(locale);
    };

    window.addEventListener('hexagon-switch-page', onSwitch as EventListener);
    window.addEventListener('hexagon-create-translation', onCreate as EventListener);

    return () => {
      window.removeEventListener('hexagon-switch-page', onSwitch as EventListener);
      window.removeEventListener('hexagon-create-translation', onCreate as EventListener);
    };
  }, [pages, activePageId]);

  const handlePublish = (data: any) => {
    if (!activePage) {
      return;
    }
    const now = new Date().toISOString();
    setPages((prev) =>
      prev.map((page) => (page.id === activePage.id ? { ...page, data, updatedAt: now } : page)),
    );
    setPreview(true);
  };

  const handleUpdatePages = (updated: PageVersion[]) => {
    setPages(updated);
    // ensure active page still exists
    if (!updated.find((p) => p.id === activePageId) && updated[0]) {
      setActivePageId(updated[0].id);
    }
  };

  const handleCreateTranslation = (forceLocale?: string) => {
    if (!activePage) {
      return;
    }

    const locale = forceLocale || (activePage.locale === 'vi' ? 'en' : 'vi');
    const newPage: PageVersion = {
      ...createEmptyPage(
        locale,
        `${activePage.title} (${locale === 'vi' ? 'Tiếng Việt' : 'English'})`,
        activePage.id,
      ),
      data: clonePageData(activePage.data),
    };

    setPages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
    setPreview(false);
    // notify others that we switched to the new page (so navbar can update its locale state)
    try {
      window.localStorage.setItem('hexagon-active-page', newPage.id);
      window.dispatchEvent(new CustomEvent('hexagon-switch-page', { detail: { pageId: newPage.id } }));
    } catch (err) {}
  };

  const handleCreateNewPage = () => {
    const title = window.prompt('Tên page mới', 'Page mới');
    if (!title) {
      return;
    }

    const newPage = createEmptyPage(activePage?.locale ?? 'vi', title);
    setPages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
    setPreview(false);
  };

  const handleSelectPage = (pageId: string) => {
    setActivePageId(pageId);
    setPreview(false);
  };

  if (!activePage) {
    return null;
  }

  if (preview) {
    return (
      <div className="page-preview-shell">
        <button className="page-preview-toggle" onClick={() => setPreview(false)}>
          Quay lại chỉnh sửa
        </button>
        <div className="page-preview-meta">
          <span className="page-chip">{activePage.locale === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          <strong>{activePage.title}</strong>
        </div>
        <Render config={puckConfig} data={activePage.data} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="page-manager-card">
        <div className="page-manager-card__header">
          <div>
            <p className="page-manager-card__eyebrow">Quản lý page</p>
            <h2>{activePage.title}</h2>
          </div>
          <div className="page-manager-card__actions">
            <select
              className="page-manager-select"
              value={activePage.id}
              onChange={(event) => handleSelectPage(event.target.value)}
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.title} ({page.locale.toUpperCase()})
                </option>
              ))}
            </select>
            <button className="page-manager-button" onClick={() => handleCreateTranslation()}>
              Nhân bản sang {activePage.locale === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
            <button className="page-manager-button page-manager-button--secondary" onClick={handleCreateNewPage}>
              Tạo page mới
            </button>
            <button className="page-manager-button page-manager-button--secondary" onClick={() => setShowAdmin((s) => !s)}>
              {showAdmin ? 'Đóng quản trị' : 'Mở quản trị'}
            </button>
          </div>
        </div>

        <div className="page-manager-list">
          {pages.map((page) => (
            <button
              key={page.id}
              className={`page-manager-item${page.id === activePage.id ? ' is-active' : ''}`}
              onClick={() => handleSelectPage(page.id)}
            >
              <strong>{page.title}</strong>
              <span>{page.locale === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            </button>
          ))}
        </div>

        <p className="page-manager-hint">
          Mỗi page có thể được nhân bản để dịch thủ công sang ngôn ngữ khác, sau đó chỉnh sửa trực tiếp bằng trình chỉnh sửa hiện tại.
        </p>
      </div>
      {showAdmin && (
        <AdminPage
          pages={pages}
          onUpdatePages={handleUpdatePages}
          onSelectPage={(id) => { setActivePageId(id); setShowAdmin(false); }}
          onCreateNewPage={handleCreateNewPage}
        />
      )}

      <Puck
        config={puckConfig}
        data={activePage.data}
        onPublish={handlePublish}
      />
    </div>
  );
}

export default App;