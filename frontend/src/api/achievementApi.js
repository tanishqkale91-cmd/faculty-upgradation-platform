import axiosInstance from './axiosInstance';

export const getMyAchievements = () => axiosInstance.get('/achievements/my-achievements');
