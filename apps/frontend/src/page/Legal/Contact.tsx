function Contact() {
  return   (
    <div className=" flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">We'd love to hear from you! Reach out to us anytime.</p>

        <div className="flex flex-col gap-4">
          {/* Phone Number */}
          <div className="flex items-center justify-center gap-2 text-lg text-gray-800">
            📞 <span>+91 7347713620</span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 text-lg text-gray-800">
            ✉️ <span>coursehubb.store@gmail.com</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => window.location.href = "mailto:coursehubb.store@gmail.com"}
            className="bg-primary text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact