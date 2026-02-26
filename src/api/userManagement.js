import axios from "axios";
import api from "./apiClient";

const API_URL = "http://localhost:8000/api/user-managements";
const AUTH_URL = "http://localhost:8000/api";

export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`${AUTH_URL}/user`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUsers = async (params = {}) => {
  try {
    const response = await api.get(API_URL, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post(`${AUTH_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};