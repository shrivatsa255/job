import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import { CreateJob } from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";
import SalaryPage from "./pages/SalaryPage";
import UpdateJob from "./pages/UpdateJob";
import JobDetails from "./pages/JobDetails";
import Signup from './components/Signup/signup.jsx';
import Login from './components/Login/login.jsx';
import useAuth from './components/useAuth.js';
import NotAuthorized from './components/notAuthorized.jsx';
import About from './pages/About.jsx';

function App() {
 const [token, setToken] = useState(null);
 const { user, loading } = useAuth(); // Assuming useAuth now returns a loading state
 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
 }, []);

 // If useAuth is still loading, render a loading indicator or return null
 if (loading) {
    return <div>Loading...</div>; // Or return null;
 }

 return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/home" element={token ? <Home/> : <NotAuthorized/>} />
        <Route path="/post-job" element={user?.role === 'Recruiter' ? <CreateJob /> : <NotAuthorized />} />
        <Route path="/my-job" element={user?.role === 'Recruiter' ? <MyJobs /> : <NotAuthorized />} />
        <Route path="/salary" element={<SalaryPage /> } />
        <Route path='/about-us' element={<About/>} />
        <Route path="/edit-job/:id" element={<UpdateJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
 );
}

export default App;
