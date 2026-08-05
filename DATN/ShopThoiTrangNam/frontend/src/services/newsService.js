import axiosClient from './axiosClient';

const newsService = {
    getAllNews: async () => {
        const response = await axiosClient.get('/news');
        return response.data;
    },

    getNewsById: async (id) => {
        const response = await axiosClient.get(`/news/${id}`);
        return response.data;
    },

    createNews: async (formData) => {
        const response = await axiosClient.post('/news', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    updateNews: async (id, formData) => {
        const response = await axiosClient.put(`/news/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    deleteNews: async (id) => {
        const response = await axiosClient.delete(`/news/${id}`);
        return response.data;
    },
};

export default newsService;