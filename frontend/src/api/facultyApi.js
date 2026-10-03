import axiosInstance from './axiosInstance';

export const getProfile    = ()       => axiosInstance.get('/faculty/profile');
export const updateProfile = (data)   => axiosInstance.put('/faculty/profile', data);
