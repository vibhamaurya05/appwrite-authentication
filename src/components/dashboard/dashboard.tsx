
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button'; // Assuming Button component location
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/appwrite';

interface User {
    email: string;
    name: string;
}

const Dashboard: React.FC = () => {
    const [userinfo, setUserinfo] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserinfo = async () => {
            try {
                const response = await account.get();
                setUserinfo({
                    email: response.email,
                    name: response.name,
                });
            } catch (error) {
                console.error('Failed to access user info', error);
                navigate('/login');
            }
        };

        fetchUserinfo();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (!userinfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className='  text-center py-4'>
            <h1 className='font-bold text-rose-400 text-4xl'>Welcome, {userinfo.name}</h1>
            <p className='mt-4 text-2xl'>{userinfo.email}</p>
            <Button onClick={handleLogout} className='bg-[#f57e7e] text-2xl h-14 mt-4' >Logout</Button>
        </div>

        /************github user board***********/





        
    );
};

export default Dashboard;
