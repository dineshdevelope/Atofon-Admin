import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-gray-600">
          Thank you for your payment. Your transaction was successful.
        </p>
        {reference && (
          <p className="mt-2 text-gray-600">
            Reference ID: <strong>{reference}</strong>
          </p>
        )}
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/")} // Replace with your navigation
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
