
import { XCircle, ArrowRight, RefreshCw, Gift, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center">
        <XCircle className="text-red-500 w-20 h-20 mx-auto" />
        <h2 className="text-3xl font-bold mt-4 text-gray-800">Payment Failed</h2>
        <p className="text-gray-600 mt-2 text-lg">Oops! Something went wrong with your transaction.</p>

        {/* Retry Payment */}
        <div className="bg-red-100 p-4 mt-6 rounded-lg text-red-800 text-left">
          <RefreshCw className="inline-block w-5 h-5 mr-2" />
          You can try again or check with your bank to resolve any issues.
        </div>

        {/* Referral System */}
        <div className="bg-blue-100 p-4 mt-4 rounded-lg text-blue-800 text-left">
          <Gift className="inline-block w-5 h-5 mr-2" />
          <strong>Refer & Earn:</strong> Invite a friend and get <strong>20%</strong> in your wallet for every successful referral! Use it for future purchases or you can redeem instatly in your bank account
        </div>

        {/* Retry and Go Back Buttons */}
        <div className="mt-6 flex flex-col gap-4">
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out w-full"
            onClick={() => navigate("/cart")} // Redirect to retry payment
          >
            Retry Payment <RefreshCw className="w-5 h-5" />
          </button>

          <button
            className="bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out w-full"
            onClick={() => navigate("/dashboard")} // Redirect to Dashboard
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* FAQs Section */}
        <div className="mt-8 text-left text-gray-700">
          <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          <p className="mt-2"><HelpCircle className="inline-block w-4 h-4 mr-2" /> Why did my payment fail? Check your bank account, payment method, or retry.</p>
          <p className="mt-2"><HelpCircle className="inline-block w-4 h-4 mr-2" /> Will I be charged? If money was deducted, it will be refunded within 3-5 days.</p>
        </div>

        {/* Contact Support */}
        <p className="mt-6 text-sm text-gray-500">Need help? Contact <a href="/" className="text-blue-600 font-medium">customer support</a>.</p>
      </div>
    </div>
  );
}
