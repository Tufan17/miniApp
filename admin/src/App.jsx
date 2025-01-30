import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';  
import LoginPage from './pages/login';
import { useNavigate } from 'react-router-dom';
import DashboardPage from './pages/dasboard/index';
import LoaderComponent from './components/loader';
function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if(!token&&!user){
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);
return (<div className='w-screen h-screen'>
    <Outlet />
     {loading ?
     <Routes> 
      <Route path="/*" element={<LoaderComponent />} />
     </Routes>
     :<Routes>
     <Route path="/dashboard/*" element={<DashboardPage />} />
     <Route path='/login' element={<LoginPage />} />
</Routes>}
  </div>
   
  ); 
}

export default App
