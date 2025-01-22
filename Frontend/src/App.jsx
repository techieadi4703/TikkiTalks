import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import {useThemeStore} from "./store/useTheme"
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const {theme}=useThemeStore();
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
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={authUser?<HomePage/>:<Navigate to={"/login"}/>} /> */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signup" element={authUser?<SignupPage />:<Navigate to={"/"}/>} /> */}
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/login" element={authUser?<LoginPage />:<Navigate to={"/"}/>} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/settings" element={authUser?<SettingsPage />:<Navigate to={"/login"}/>} /> */}
        <Route path="/settings" element={<SettingsPage />} />
        {/* <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to={"/login"}/>} /> */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
      {/* <h1 className="text-2xl font-extrabold text-red-600">Hello Babby</h1>
      <div className="text-3xl">hello</div> */}
    </div>
  );
};

export default App;
