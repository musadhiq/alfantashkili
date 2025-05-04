import apiClient from "../../lib/apiService";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";


export const adminLogin = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const { data } = await apiClient.post('/api/v1/admin/login', { email, password });
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        localStorage.setItem('auth_token', data.token);
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
};
