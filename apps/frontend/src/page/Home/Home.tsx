import Banner from "../../componets/Banner"
import HeroSection from "./HeroSection"
import Topcategories from "./TopCategories"
import BuildTrust from "./BuildTrust"
import OurlatestCourses from "./OurlatestCourses"
import Footer from "../../componets/Footer"
import { useRecoilValue } from "recoil"
import { allCoursesWithMetadata } from "../../store/CourseMetaData/atom"
function Home() {
    const allCourses= useRecoilValue(allCoursesWithMetadata)
      console.log(allCourses,"hi i am courss")
    

  return (
    <div className="">
    
      <HeroSection></HeroSection>
      <Topcategories></Topcategories>
      <BuildTrust></BuildTrust>
      <OurlatestCourses ></OurlatestCourses>
      
     
    </div>
  )
}

export default Home