import axiosClient from './axiosClient';

const dashboardService = {
    getStats: async () => {
        const response = await axiosClient.get('/dashboard/stats');
        return response.data;
    },
    getChartData: async () => {
        const response = await axiosClient.get('/dashboard/chart-data');
        return response.data;
    },
};

export default dashboardService;