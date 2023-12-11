import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8000/api/user');
                if(!response.data.user.email){
                    localStorage.removeItem('token');
                    navigate('/login');
                }else{
                    setUser(response.data)
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('http://localhost:8000/api/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <p>Имя: {user.user.name}</p>
            <p>Email: {user.user.email}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default UserProfile;
