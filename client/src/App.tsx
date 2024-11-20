import { useEffect } from "react";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from "./store.js";
import './App.css'
import './index.css'
function App() {
  const { isAuth, setAuth } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [setAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
