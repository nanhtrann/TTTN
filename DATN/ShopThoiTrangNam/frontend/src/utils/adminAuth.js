// Utility functions for admin authentication and role-based access control

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!getToken() && !!getCurrentUser();
};

export const isAdmin = () => {
    const user = getCurrentUser();
    if (!user) return false;
    return ['superadmin', 'admin'].includes(user.role);
};

export const isSuperAdmin = () => {
    const user = getCurrentUser();
    if (!user) return false;
    return user.role === 'superadmin';
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
};