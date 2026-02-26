import axios from "axios";

const API_URL = "http://localhost:8000/api/feedbacks";

export const getFeedbacks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return [];
  }
};

export const getFeedbackById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching feedback ${id}:`, error);
    return null;
  }
};

export const createFeedback = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating feedback:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const updateFeedback = async (id, payload) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating feedback ${id}:`, error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting feedback ${id}:`, error.response?.data || error);
    throw error.response?.data || error;
  }
};
