const AboutUs = () => {
    return (
      <div className=" flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Courehubb</h2>
          <p className="text-gray-600 text-lg mb-6">
            Welcome to <span className="text-primary font-semibold">Courehubb</span>, your go-to platform for high-quality online courses.  
            Our mission is to connect learners with expert mentors and provide a seamless learning experience.
          </p>
  
          <div className="text-left space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>📚 A wide range of courses in various domains.</li>
              <li>👨‍🏫 Learn from experienced mentors.</li>
              <li>💻 Accessible anytime, anywhere.</li>
              <li>🔄 Lifetime access to purchased courses.</li>
            </ul>
          </div>
  
          <div className="mt-6">
            <button
              onClick={() => window.location.href = "/contact"}
              className="bg-primary text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  