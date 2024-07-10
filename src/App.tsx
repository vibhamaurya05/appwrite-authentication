
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectrouter'
import RedirectAuthenticated from './redirectauth';
import Login from './components/login/login';
import Register from './components/register/register';
import Dashboard from './components/dashboard/dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <RedirectAuthenticated>
                            <Login />
                        </RedirectAuthenticated>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RedirectAuthenticated>
                            <Register />
                        </RedirectAuthenticated>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
