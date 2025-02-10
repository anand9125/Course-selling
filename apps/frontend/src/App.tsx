import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./componets/Navbar";
import Banner from "./componets/Banner";
import Footer from "./componets/Footer";
import Mentors from "./page/Mentos/Mentors";
import Courses from "./page/Courses/Courses";
function App() {
  return (
    <Router>
      <Navbar />
      <Banner></Banner>
      {/* @ts-ignore */}
      <Routes>
           {/* @ts-ignore */}
        <Route path="/" element={<Home />} />
        {/* @ts-ignore */}
        <Route path="/category/:categoryId" element={<Mentors />} />
        {/* @ts-ignore */}
        <Route  path="/mentors/:categoryId/:mentorId" element={<Courses/>}></Route>
      </Routes>
         {/* @ts-ignore */}
        <Footer/>
        {/* @ts-ignore */}
      <Toaster />
    </Router>
  );
}

export default App;
