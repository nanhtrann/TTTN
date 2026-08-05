import axiosClient from './axiosClient';

const siteConfigService = {
    getSiteConfig: async () => {
        const response = await axiosClient.get('/site-config');
        return response.data;
    },

    updateSiteConfig: async (formData) => {
        const response = await axiosClient.put('/site-config', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};

export default siteConfigService;