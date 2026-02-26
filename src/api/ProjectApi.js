import axios from "axios";

const API_URL = "http://localhost:8000/api/projects"; 
// change base URL if needed

export const API_HOST = new URL(API_URL).origin;

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
  },
});

/* GET all projects */
export const getProjects = () => {
  return axiosInstance.get(API_URL);
};

/* GET single project */
export const getProjectById = (id) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};

/* CREATE project (with image) */
export const createProject = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("status", data.status);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  return axiosInstance.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* UPDATE project (with image) */
export const updateProject = (id, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("status", data.status);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  return axiosInstance.post(`${API_URL}/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* DELETE project */
export const deleteProject = (id) => {
  return axiosInstance.delete(`${API_URL}/${id}`);
};
