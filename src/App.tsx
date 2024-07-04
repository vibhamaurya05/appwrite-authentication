import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import RedirectAuthenticated from "./redirectauth";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            <RedirectAuthenticated>
              <Login />
            </RedirectAuthenticated>
          }
        />
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
          path="/dashboard"
          element={
            <RedirectAuthenticated>
              <Dashboard />
            </RedirectAuthenticated>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
