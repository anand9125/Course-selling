import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Gift, Info, HelpCircle } from "lucide-react";
import Confetti from "react-confetti";

export default function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5s
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      {showConfetti && <Confetti />}
      
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center">
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto" />
        <h2 className="text-3xl font-bold mt-4 text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600 mt-2 text-lg">Your transaction was completed successfully.</p>

        {/* Course Access Info */}
        <div className="bg-green-100 p-4 mt-6 rounded-lg text-green-800 text-left">
          <Info className="inline-block w-5 h-5 mr-2" />
          Your course link has been sent to your registered email. Check your inbox (or spam folder) for access details.
        </div>

        {/* Referral System */}
        <div className="bg-blue-100 p-4 mt-4 rounded-lg text-blue-800 text-left">
          <Gift className="inline-block w-5 h-5 mr-2" />
          <strong>Refer & Earn:</strong> Invite a friend and get <strong>20%</strong> in your wallet for every successful referral! Use it for future purchases or you can redeem instatly in your bank account
        </div>

        {/* Go to Dashboard Button */}
        <div className="mt-6">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out w-full"
            onClick={() => window.location.href = "/"} // Redirect to Dashboard
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* FAQs Section */}
        <div className="mt-8 text-left text-gray-700">
          <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          <p className="mt-2"><HelpCircle className="inline-block w-4 h-4 mr-2" /> Haven’t received the email? Please check your spam folder or contact support.</p>
          <p className="mt-2"><HelpCircle className="inline-block w-4 h-4 mr-2" /> How do I refer a friend? Share your referral link from your dashboard.</p>
        </div>

        {/* Contact Support */}
        <p className="mt-6 text-sm text-gray-500">Need help? Contact <a href="/support" className="text-blue-600 font-medium">customer support</a>.</p>
      </div>
    </div>
  );
}