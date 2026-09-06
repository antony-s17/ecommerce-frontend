import api from './axios';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
}

export const register = async (user) => {
    const response = await api.post('/auth/register', user);
    return response.data;
}

export const logout = async (user) => {
    const response = await api.post('/auth/logout', user);
    return response.data;
}

export const getProfile = async() => {
    const response = await api.get("user/profile");
    return response.data;
}