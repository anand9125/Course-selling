import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./componets/Navbar";
import Banner from "./componets/Banner";
import Footer from "./componets/Footer";
import Mentors from "./page/Mentos/Mentors";
import Courses from "./page/Courses/Courses";
import Cart from "./page/Cart/Cart";
import { RecoilRoot } from "recoil";
import Category from "./page/Category/Category";
import User from "./page/User-Profile/User"
import Wallet from "./page/Wallet/wallet";
import PopupCard from "./componets/PopupCard";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Banner />
        <PopupCard></PopupCard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Mentors />} />
          <Route path="/mentors/:categoryId/:mentorId" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home/categories" element={<Category/>}></Route>
          <Route path="/user-Profile" element={<User/>}></Route>
          <Route path="/user-Wallet" element={<Wallet/>}></Route>
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </RecoilRoot>
  );
}

export default App;
