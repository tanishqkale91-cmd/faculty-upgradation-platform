import axiosInstance from './axiosInstance';

export const getMyCredits = () => axiosInstance.get('/credits/my-credits');
