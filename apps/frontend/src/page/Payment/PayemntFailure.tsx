import { FaExclamationTriangle } from "react-icons/fa";


export default function PaymentFailure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <div className="text-red-500 text-5xl mb-4">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Payment Failed</h2>
        <p className="text-gray-600 mt-2">
          Oops! Something went wrong with your transaction. Please try again.
        </p>
        
        
      </div>
    </div>
  );
}
