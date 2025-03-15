import HeroSection from "./HeroSection"
import Topcategories from "./TopCategories"
import BuildTrust from "./BuildTrust"
import OurlatestCourses from "./OurlatestCourses"
import { useUserStore } from "../../store/useUserStore"
import { useEffect } from "react"
function Home() {
   const{userWalletBalance}=useUserStore()
   const userDetails= JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(()=>{
    userWalletBalance(userDetails?.id);
   },[])

  return (
    <div >   
      <HeroSection></HeroSection>
      <Topcategories></Topcategories>
      <BuildTrust></BuildTrust>
      <OurlatestCourses ></OurlatestCourses>
    </div>
  )
}

export default Home