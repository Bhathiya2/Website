import axios from "axios";

const API_URL = "http://localhost:8000/api/logo";

export const getLogos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching logos:", error);
    return [];
  }
};

export const getLogoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching logo ${id}:`, error);
    return null;
  }
};

export const createLogo = async (payload) => {
  try {
    let formData;
    if (payload instanceof FormData) {
      formData = payload;
    } else {
      formData = new FormData();
      if (payload?.logo instanceof File) {
        formData.append("logo", payload.logo);
      } else if (typeof payload?.logo === "string") {
        formData.append("logo", payload.logo);
      }
      // include name if present (backend migration added `name` column)
      if (payload?.name) formData.append("name", payload.name);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating logo:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const updateLogo = async (id, payload) => {
  try {
    let formData;
    if (payload instanceof FormData) {
      formData = payload;
    } else {
      formData = new FormData();
      if (payload?.logo instanceof File) {
        formData.append("logo", payload.logo);
      } else if (typeof payload?.logo === "string") {
        formData.append("logo", payload.logo);
      }
      if (payload?.name) formData.append("name", payload.name);
    }

    const response = await axios.post(
      `${API_URL}/${id}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error updating logo ${id}:`, error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const deleteLogo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting logo ${id}:`, error.response?.data || error);
    throw error.response?.data || error;
  }
};
