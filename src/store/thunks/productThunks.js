import { fetchCatagoriesFailure, fetchCatagoriesStart, fetchCatagoriesSuccess } from "../../features/products/productCatagorySlice";
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from "../../features/products/productSlice";
import apiClient from "../../lib/apiService"


export const fetchProducts = (query = "") => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());

    const response = await apiClient.get(`/api/v1/products${query}`,);
    const data = response.data?.contents || [];
    
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || 'Something went wrong'));
  }
};


export const fetchCategories = (query = "") => async (dispatch) => {
  try {
    dispatch(fetchCatagoriesStart());

    const limit = 20;
    let page = 1;
    let totalPages = 1;
    let allData = [];

    while (page <= totalPages) {
      const response = await apiClient.get(`/api/v1/categories?page=${page}&limit=${limit}${query}`);
      const { contents = [], totalCount = 0 } = response.data;

      allData = [...allData, ...contents];

      if (page === 1) {
        totalPages = Math.ceil(totalCount / limit);
      }

      page++;
    }

    dispatch(fetchCatagoriesSuccess(allData));
  } catch (error) {
    dispatch(fetchCatagoriesFailure(error.message || 'Something went wrong'));
  }
};

