import axios from "axios";

import { API_URL } from "./constants";

export const getCategories = async () => {
  const response = await axios.get(API_URL + "Categories");
  return response.data;
};
export const createCategory = async (label)=>{
  const response = await axios.post(API_URL + "Categories", {
  label,
  });

  return response.data;
};

export const updateCategory = async (id, label) => {
  const response = await axios.put(API_URL + "Categories/" + id, {
    label,
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(API_URL + "Categories/" + id);
  return response.data;
};
