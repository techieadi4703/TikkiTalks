import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  
  console.log(checkAuth);

  if(isCheckingAuth&&!authUser){
    return <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to={"/login"}/>} />
        <Route path="/signup" element={authUser?<SignupPage />:<Navigate to={"/"}/>} />
        <Route path="/login" element={authUser?<LoginPage />:<Navigate to={"/"}/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to={"/login"}/>} />
      </Routes>
      {/* <h1 className="text-2xl font-extrabold text-red-600">Hello Babby</h1>
      <div className="text-3xl">hello</div> */}
    </>
  );
};

export default App;
