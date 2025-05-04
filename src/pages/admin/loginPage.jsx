import React, { useEffect, useState } from 'react'
import WelcomeImage from "../../assets/emoji-glass-welcome.png";
import "../../styles/pages/loginPage.scss"
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../features/auth/authSlice';
import apiClient from "../../lib/apiService"
import { useNavigate } from 'react-router-dom';

function loginPage() {
    const navigate = useNavigate();
    const { token, error, loading } = useSelector((state) => state.auth);


    useEffect(() => {
        if (token) {
            navigate("/admin/dashboard");
        }
    }, [token, navigate]);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const login = async (e) => {
        e.preventDefault()
        try {
            dispatch(loginStart());
            const response = await apiClient.post('/api/v1/admin/login', { email, password });
            if (response.status == 200) {
                const data = response.data;
                dispatch(loginSuccess({ user: data.user, token: data.token }));
                return navigate("/admin/dashboard");
            } else {
                dispatch(loginFailure(response?.data?.message || 'Login failed'));
            }
        } catch (error) {
            dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
            console.error(error)
        }
    }

    const handleInputUpdate = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <div className='login-container'>
            <div className="login-card">
                <div className="login-top-section">
                    <div className="logo">Logo.</div>
                    <h3 className="welcome-text"><span>Welcome back </span>
                        <img src={WelcomeImage} alt="emoji" />
                    </h3>
                    <p className="info-text">
                        It's time to catch-up
                    </p>
                </div>
                <div className="login-form-section">
                    <form>
                        <div className="form-input">
                            <label htmlFor="email">Email</label>
                            <input type="email" required name="email" id="email" value={email} onChange={handleInputUpdate} />
                        </div>
                        <div className="form-input">
                            <label htmlFor="password">Password</label>
                            <input type="password" required name="password" id="password" value={password} onChange={handleInputUpdate} />
                        </div>
                        {error && <p className="text-xs text-red-600 text-center">{error}</p>}

                        <div className="form-input">
                            <button onClick={login} disabled={loading}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default loginPage