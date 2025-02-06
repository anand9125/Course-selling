import Banner from "../../componets/Banner"
import HeroSection from "./HeroSection"
import Topcategories from "./TopCategories"
import BuildTrust from "./BuildTrust"
import OurlatestCourses from "./OurlatestCourses"
import Footer from "../../componets/Footer"
function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <HeroSection></HeroSection>
      <Topcategories></Topcategories>
      <BuildTrust></BuildTrust>
      <OurlatestCourses ></OurlatestCourses>
      <Footer></Footer>
     
    </div>
  )
}

export default Home