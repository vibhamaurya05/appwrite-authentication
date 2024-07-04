import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "./appwrite/appwrite";

interface RedirectAuthenticatedProps {
     children: ReactNode;
}

const RedirectAuthenticated: React.FC<RedirectAuthenticatedProps> = ({ children }) => {
     const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

     useEffect(() => {
          const checkAuth = async () => {
               try {
                    await account.get();
                    setIsAuthenticated(true);
               } catch (error) {
                    setIsAuthenticated(false);
               }
          };

          checkAuth();
     }, []);

     if (isAuthenticated === null) {
          return <div>Loading...</div>; 
     }

     return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
};

export default RedirectAuthenticated;