import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Navbar from "./componets/Navbar";
import Banner from "./componets/Banner";
import Footer from "./componets/Footer";
import PopupCard from "./componets/PopupCard";
import FancyLoader from "./componets/Skeleton/loderSkelton";

const TermsAndConditions = React.lazy(() => import('./page/Legal/TermCondition'));
const PrivacyPolicy = React.lazy(() => import('./page/Legal/Privacy-Poliicy'));
const ShippingPolicy = React.lazy(() => import('./page/Legal/ShipingPolicy'));
const RefundCancellationPolicy = React.lazy(() => import("./page/Legal/Refund"));


// Lazy Load Pages
const Home = React.lazy(() => import("./page/Home/Home"));
const Mentors = React.lazy(() => import("./page/Mentos/Mentors"));
const Courses = React.lazy(() => import("./page/Courses/Courses"));
const Cart = React.lazy(() => import("./page/Cart/Cart"));
const Category = React.lazy(() => import("./page/Category/Category"));
const User = React.lazy(() => import("./page/User-Profile/User"));
const Wallet = React.lazy(() => import("./page/Wallet/wallet"));
const Login = React.lazy(() => import("./page/User-Profile/login"));
const CourseMainPage = React.lazy(() => import("./page/Courses/CourseMainPage"));

// Lazy Load Admin Pages
const Dashboard = React.lazy(() => import("./page/ADMIN/Dashboard/Dashboard"));
const AdminCategory = React.lazy(() => import("./page/ADMIN/Category/Category"));
const ManageCategory = React.lazy(() => import("./page/ADMIN/Category/ManageCategory"));
const EditCategory = React.lazy(() => import("./page/ADMIN/Category/Editcategory"));
const AdminMentor = React.lazy(() => import("./page/ADMIN/Mentors/Mentor"));
const ManageMentor = React.lazy(() => import("./page/ADMIN/Mentors/ManageMentor"));
const EditMentor = React.lazy(() => import("./page/ADMIN/Mentors/EditMentor"));
const AdminCourses = React.lazy(() => import("./page/ADMIN/Courses/Courses"));
const ManageCourse = React.lazy(() => import("./page/ADMIN/Courses/ManageCourse"));
const EditCourse = React.lazy(() => import("./page/ADMIN/Courses/EditCourse"));
const HandleLatestCourse = React.lazy(() => import("./page/ADMIN/Courses/HandleLatestCourse"));

function App() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = userData["role"] === "ADMIN";

  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Banner />
        <PopupCard />
        <Suspense fallback={<FancyLoader />}>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Mentors />} />
            <Route path="/mentors/:categoryId/:mentorId" element={<Courses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home/categories" element={<Category />} />
            <Route path="/user-Profile" element={<User />} />
            <Route path="/user-Wallet" element={<Wallet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses/:courseId" element={<CourseMainPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<RefundCancellationPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
         

          
            {isAdmin && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/add-category" element={<AdminCategory />} />
                <Route path="/dashboard/manage-category" element={<ManageCategory />} />
                <Route path="/dashboard/edit-category/:categoryId" element={<EditCategory />} />
                <Route path="/dashboard/add-mentor" element={<AdminMentor />} />
                <Route path="/dashboard/manage-mentor" element={<ManageMentor />} />
                <Route path="/dashboard/edit-mentor/:mentorId" element={<EditMentor />} />
                <Route path="/dashboard/add-courses" element={<AdminCourses />} />
                <Route path="/dashboard/manage-courses" element={<ManageCourse />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
                <Route path="/dashboard/handleLatestCourse" element={<HandleLatestCourse />} />
              </>
            )}
          </Routes>
        </Suspense>
        <Footer />
        <Toaster />
      </Router>
    </RecoilRoot>
  );
}

export default App;
