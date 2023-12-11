import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Убедитесь, что путь корректный



const Register = () => {
    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
        navigate('/user');
    }

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });

    };
    const handleLogin = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/register', data);
            localStorage.setItem('token', response.data.token);
            navigate('/user');

        } catch (error) {
            setErrorName('');
            setErrorEmail('');
            setErrorPass('');
            const errors = error.response.data || {};

            if(errors['name']){
                setErrorName(errors['name'][0] || '');
            }
            if(errors['email']){
                setErrorEmail(errors['email'][0] || '');
            }

            if(errors['password']){
                setErrorPass(errors['password'][0] || '');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Имя"
            />
            {errorName && <p className="error">{errorName}</p>}
            <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
            />
            {errorEmail && <p className="error">{errorEmail}</p>}
            <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Пароль"
            />
            <input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={handleChange}
                placeholder="Повторите пароль"
            />
            {errorPass && <p className="error">{errorPass}</p>}
            <button type="submit">Регистрация</button>
            <button type="button" onClick={handleLogin}>Страница входа</button>
        </form>
    );
};

export default Register;
