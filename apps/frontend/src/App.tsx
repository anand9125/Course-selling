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
import Login from "./page/User-Profile/login";
import AdminCategory from "./page/ADMIN/Category/Category"
import Dashboard from "./page/ADMIN/Dashboard/Dashboard";
import ManageCategory from "./page/ADMIN/Category/ManageCategory";
import EditCategory from "./page/ADMIN/Category/Editcategory";
import ManageMentor from "./page/ADMIN/Mentors/ManageMentor";
import AdminMentor from "./page/ADMIN/Mentors/Mentor";
import EditMentor from "./page/ADMIN/Mentors/EditMentor";
import AdminCourses from "./page/ADMIN/Courses/Courses";
import ManageCourse from "./page/ADMIN/Courses/ManageCourse";
import EditCourse from "./page/ADMIN/Courses/EditCourse";

function App() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  let amiAdmin = "STUDENT"
  if(userData["role"] === "ADMIN"){
    amiAdmin = "ADMIN";
  }
 
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
          <Route path="/login" element={<Login/>}></Route>
         
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/add-category" element={<AdminCategory/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/manage-category" element={<ManageCategory/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/edit-category/:categoryId" element={< EditCategory/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/add-mentor" element={< AdminMentor/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/manage-mentor" element={<ManageMentor/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/edit-mentor/:mentorId" element={<EditMentor/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/add-courses" element={<AdminCourses/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/manage-courses" element={<ManageCourse/>}></Route>
          }
          {amiAdmin=="ADMIN" &&
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}></Route>
          }
         </Routes>
         <Footer />
         <Toaster />
      </Router>
    </RecoilRoot>
  );
}

export default App;
