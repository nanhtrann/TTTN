import axiosClient from './axiosClient';

const orderService = {
    createOrder: async (payload) => {
        const response = await axiosClient.post('/orders', payload);
        return response.data;
    },
    getMyOrders: async () => {
        const response = await axiosClient.get('/orders/my');
        return response.data;
    },
    // Admin methods
    getAllOrders: async () => {
        const response = await axiosClient.get('/orders');
        return response.data;
    },
    getOrderById: async (id) => {
        const response = await axiosClient.get(`/orders/${id}`);
        return response.data;
    },
    updateOrderStatus: async (id, status) => {
        const response = await axiosClient.put(`/orders/${id}/status`, { status });
        return response.data;
    },
    deleteOrder: async (id) => {
        const response = await axiosClient.delete(`/orders/${id}`);
        return response.data;
    },
};

export default orderService;