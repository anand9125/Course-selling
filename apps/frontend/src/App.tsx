import { Routes, Route,BrowserRouter as Router, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SettingPagge from "./pages/SettingPagge";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./AuthRoutes/Auth";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./context/AuthContext";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
function App() {
  const{theme} =useThemeStore()
  return (
    <RecoilRoot>
     <Router>
     <div data-theme={theme} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    {/* Navbar that stays on top */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000, // Ensure the navbar is on top of other content
      backgroundColor: 'white', // Adjust background if needed
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional, adds shadow below navbar
    }}>
      <Navbar />
    </div>

    {/* Main content that takes the remaining space */}
    <div style={{ marginTop: '60px', flexGrow: 1, paddingBottom: '20px' }}> {/* Adjust marginTop based on navbar height */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/settings" element={<SettingPagge />} />
        </Routes>
      </AuthProvider>
    </div>
  </div>
</Router>
  <Toaster></Toaster>

    </RecoilRoot>
  );
}

export default App
