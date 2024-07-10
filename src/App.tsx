// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Register from "./components/register/register";
// import Login from "./components/login/login";
// import RedirectAuthenticated from "./redirectauth";
// import Dashboard from "./components/dashboard/dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route
//           path="/"
//           element={
//             <RedirectAuthenticated>
//               <Login />
//             </RedirectAuthenticated>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <RedirectAuthenticated>
//               <Login />
//             </RedirectAuthenticated>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <RedirectAuthenticated>
//               <Register />
//             </RedirectAuthenticated>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <RedirectAuthenticated>
//               <Dashboard />
//             </RedirectAuthenticated>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




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
