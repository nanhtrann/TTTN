export const getLocaleFromStorage = (): string => {
  try {
    if (typeof window === 'undefined') return 'vi';
    const raw = window.localStorage.getItem('hexagon-pages');
    const pages = raw ? JSON.parse(raw) : [];
    const currentActive = window.localStorage.getItem('hexagon-active-page') || (pages[0] && pages[0].id) || null;
    if (!currentActive) return 'vi';
    const current = pages.find((p: any) => p.id === currentActive);
    return (current && current.locale) || 'vi';
  } catch (err) {
    return 'vi';
  }
};

export default getLocaleFromStorage;
