import './App.css';
// import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import YogaForm from './pages/YogaForm';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';

function App() {
  // const [username, setUsername] = useState(null);

  // // useEffect(()=>{
  // //   const foundUsername = localStorage.getItem("username");
  // //   if(foundUsername){
  // //     setUsername(foundUsername);
  // //   }
  // // }, []);
  
  return (
    <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/yoga-form" element={<YogaForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
