
import { MdCurrencyRupee } from 'react-icons/md';
import { BsBag } from 'react-icons/bs';

const Banner = () => {
  return (
    <div>
      {/* Desktop Navigation */}
      <div className="bg-black w-full ">
        <div className="max-w-7xl  mx-auto h-14 mt-4 text-white flex items-center justify-between px-4  hidden md:flex">
          {/* Left Part */}
          <div className="flex gap-2 md:gap-6">
            {["Home", "Course", "Contact us", "About"].map((item, index) => (
              <div
                key={index}
                className="relative px-2 md:px-4 py-2 text-base md:text-lg font-medium transition-all duration-300 hover:scale-110 hover:underline underline-offset-8 decoration-2 cursor-pointer flex items-center justify-center whitespace-nowrap"
                onClick={() => console.log(`${item} clicked`)}
              >
                {item}
                <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-300 hover:w-full"></div>
              </div>
            ))}
          </div>

          {/* Right Part */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
                {/* @ts-ignore */}
              <MdCurrencyRupee className="text-lg" />
              <span>0.00</span>
            </div>
            <div
              className="relative px-4 py-2 text-lg font-medium transition-all duration-300 hover:scale-110 hover:underline underline-offset-8 decoration-2 cursor-pointer flex items-center justify-center"
              onClick={() => console.log("Bag clicked")}
            >
                  {/* @ts-ignore */}
              <BsBag className="text-xl" />
              <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-300 hover:w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="w-full bg-[#DC9814] ">
        <div className="h-10 flex justify-center items-center text-white font-semibold gap-2 px-4">
          All Courses List:{' '}
          <a
            href="https://gdls.me/list"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-all duration-300 hover:underline"
          >
            https://gdls.me/list
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;