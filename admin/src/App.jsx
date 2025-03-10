import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/login";
import { useNavigate } from "react-router-dom";
import DashboardPage from "./pages/dasboard/index";
import LoaderComponent from "./components/loader";
import PrivacyPolicy from "./pages/privacy_policy";
function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setLoading(false);
    if (!token && !user && location.pathname !== "/privacy-policy") {
      navigate("/login");
    }else if(location.pathname === "/privacy-policy"){
      return;
    }else if(location.pathname === "/"){
      navigate("/dashboard");
    }
  }, [navigate, location.pathname]);
  return (
    <div className="w-screen h-screen">
      <Outlet />
      {loading ? (
        <Routes>
          <Route path="/" element={<LoaderComponent />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoaderComponent />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
