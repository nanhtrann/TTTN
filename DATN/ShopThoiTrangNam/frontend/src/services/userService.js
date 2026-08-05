import axiosClient from './axiosClient';

const userService = {
    getAllUsers: async () => {
        const response = await axiosClient.get('/users');
        return response.data;
    },

    getUserById: async (id) => {
        const response = await axiosClient.get(`/users/${id}`);
        return response.data;
    },

    createUser: async (data) => {
        const response = await axiosClient.post('/users', data);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await axiosClient.put(`/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await axiosClient.delete(`/users/${id}`);
        return response.data;
    },
};

export default userService;