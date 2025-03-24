import React, { useState } from 'react';
import { BookOpen, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { userEndPoint } from '../../config';
import axios from 'axios';
import Spinner from '../../componets/Skeleton/ButtonSkeleton';

interface FormData {
  courseName: string;
  mentorName: string;
  email: string;
  phoneNumber: string;
}

function SpecificCourse() {
  const [formData, setFormData] = useState<FormData>({
    courseName: '',
    mentorName: '',
    email: '',
    phoneNumber: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading,setIsLoading] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        await axios.post(`${userEndPoint}/course/requestCourse`, formData);
        setShowModal(true);
        setSubmitted(true);
        setIsLoading(false);
        // Hide the modal after 3 seconds
        setTimeout(() => setShowModal(false), 3000);
  
        console.log("Form submitted:", formData);
      } catch (error) {
        console.error("Submission error:", error);
      }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-indigo-600">
            <h2 className="text-2xl font-bold text-white text-center">
            Request a Course
            </h2>
            <p className="mt-2 text-indigo-200 text-center">
              Please fill  course details below
            </p>
          </div>
               {/* Success Modal Notification */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-center animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold">Request Submitted!</h3>
                <p className="text-gray-600 mt-2">
                Thank you for your request. Our team will reach out soon.
                </p>
                <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                Close
                </button>
            </div>
            </div>
        )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {/* Course Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter course name"
                required
              />
            </div>

            {/* Mentor Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-indigo-500" />
                Mentor Name
              </label>
              <input
                type="text"
                name="mentorName"
                value={formData.mentorName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter mentor name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-indigo-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                >
                {loading ? (
                    <Spinner size={20} className="mx-auto" />
                ) : submitted ? (
                    <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submitted Successfully
                    </>
                ) : (
                    "Submit Request"
                )}
                </button>

          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificCourse;