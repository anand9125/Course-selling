import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";

export default function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5s
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      {showConfetti && <Confetti />}

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Your transaction has been completed successfully.</p>

        <div className="mt-6">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 
            hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => window.location.href = "/"} // Redirect to Dashboard
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
