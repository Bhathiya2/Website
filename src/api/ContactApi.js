import axios from "axios";

const API_URL = "http://localhost:8000/api/contacts";

export const getContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contact ${id}:`, error);
    return null;
  }
};

export const createContact = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const updateContact = async (id, payload) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating contact ${id}:`, error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact ${id}:`, error.response?.data || error);
    throw error.response?.data || error;
  }
};
