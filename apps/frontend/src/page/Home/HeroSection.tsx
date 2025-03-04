import aditi from "../../assets/adi.png"
function HeroSection() {
  return (
          <div className="bg-[#E1E6EF] pb-6 ">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row  px-6 md:px-12 space-y-8 lg:space-y-0 lg:space-x-12">
                  {/* Left Content */}
                    <div className="text-center lg:text-left pt-6">
                      <h1 className="font-bold text-5xl leading-tight text-gray-900 mb-4">
                        Unlock Premium Learning
                      </h1>
                      <p className="text-xl text-gray-700 mb-6">
                        Get The Best Courses At Unbeatable Prices.
                      </p>
                      {/* <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-xl transition-all duration-300 ease-in-out">
                        Browse Courses
                      </button> */}
                    </div>

                  {/* Right Image */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center lg:justify-end ">
                      <img 
                        src={aditi}
                        loading="lazy" 
                        alt="Premium Learning" 
                        className="max-w-64 h-auto rounded-xl "
                      />
                  </div>
            </div>
          </div>

  )
}

export default HeroSection