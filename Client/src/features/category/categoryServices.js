import axios from "axios";

const CATEGORIES_URL = `${process.env.REACT_APP_API_URL}/categories`;

const getAllCategories = async () => {
  const response = await axios.get(CATEGORIES_URL);
  return response.data.data;
};

const categoryServices = {
  getAllCategories,
};

export default categoryServices;
