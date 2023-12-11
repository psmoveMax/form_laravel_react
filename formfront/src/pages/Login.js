import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';



const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleRegister = () => {
        navigate('/register');
    };


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/user');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/login', data);
            localStorage.setItem('token', response.data.token);
            navigate('/user');

        } catch (error) {
            setError(error.response.data.error || 'Произошла ошибка');
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Пароль"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Войти</button>
            <button type="button" onClick={handleRegister}>Страница регистрации</button>
        </form>
    );
};

export default Login;
