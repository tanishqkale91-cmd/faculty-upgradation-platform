import axiosInstance from './axiosInstance';

export const getCourses   = (params) => axiosInstance.get('/courses', { params });
export const getCourseById = (id)    => axiosInstance.get(`/courses/${id}`);
