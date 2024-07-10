// import React, { useEffect, useState } from 'react';
// import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";
// import { account } from "../../appwrite/appwrite";

// interface User {
//     email: string;
//     name: string;
// }

// const Dashboard: React.FC = () => {
//     const [userinfo, setUserinfo] = useState<User | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserinfo = async () => {
//             try {
//                 const response = await account.get();
//                 setUserinfo({
//                     email: response.email,
//                     name: response.name,
//                 });
//             } catch (error) {
//                 console.error("Failed to access user info", error);
//                 navigate("/login"); 
//             }
//         };

//         fetchUserinfo(); 
//     }, [navigate]); 

//     const Logout = async () => {
//         try {
//             await account.deleteSession("current");
//             navigate("/login");
//             console.log("Log Out")
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };

//     if (!userinfo) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="flex flex-col items-center gap-4 mt-10">
//             <h1 className="text-3xl font-bold">Welcome, {userinfo.name}</h1>
//             <h3 className="text-xl font-medium">{userinfo.email}</h3>
//             <Button type="button" variant="destructive" onClick={Logout}>
//                 Logout
//             </Button>
//         </div>
//     );
// };

// export default Dashboard;





// components/Dashboard.tsx
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
        <div>
            <h1>Welcome, {userinfo.name}</h1>
            <p>{userinfo.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default Dashboard;
