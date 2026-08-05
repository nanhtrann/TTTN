import axiosClient from './axiosClient';

const bannerService = {
    getAllBanners: async () => {
        const response = await axiosClient.get('/banners');
        return response.data;
    },

    getBannerById: async (id) => {
        const response = await axiosClient.get(`/banners/${id}`);
        return response.data;
    },

    createBanner: async (formData) => {
        const response = await axiosClient.post('/banners', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    updateBanner: async (id, formData) => {
        const response = await axiosClient.put(`/banners/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    deleteBanner: async (id) => {
        const response = await axiosClient.delete(`/banners/${id}`);
        return response.data;
    },
};

export default bannerService;