import React from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { IoIosWallet } from "react-icons/io";

function Wallet() {
 const userDetails= JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg ">
      {/* Wallet Header */}
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
        Your Wallet
      </h2>

      {/* Wallet Balance Section */}
      <div className="flex flex-col items-center">
        <img
          src="https://cdn-icons-png.freepik.com/256/16783/16783114.png"
          alt="Wallet Icon"
          className="w-32 h-32 mb-4"
        />
        <h2 className="flex items-center text-2xl font-semibold text-gray-700">
          Your current balance is{userDetails["walletBalance"]}
          <MdCurrencyRupee className="text-3xl text-primary ml-2" /> 0.00
        </h2>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-300 my-6"></div>

      {/* Wallet Actions */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <IoIosWallet className="w-12 h-12 text-gray-500" />
          <div className="flex items-center text-gray-800 text-lg font-semibold">
            <MdCurrencyRupee className="text-2xl text-primary" />
            <span className="ml-1 text-xl">{userDetails["walletBalance"]}.00</span>
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out">
          Redeem Now
        </button>
      </div>

      {/* Transaction History Section */}
     
    </div>
  );
}

export default Wallet;
