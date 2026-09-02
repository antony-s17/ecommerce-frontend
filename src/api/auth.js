import api from './axios';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
}