// components/Modal.tsx
import { useEffect } from "react";
import { HiUser, HiBriefcase, HiTruck } from "react-icons/hi"; // Corrected icon import
import { Button } from "flowbite-react"; // Import Flowbite Button component

const Modal = ({ showModal, onClose }) => {
  useEffect(() => {
    // Close modal on Escape key press
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] sm:w-[60%]">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Select Your Account Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Button onClick={() => { window.location.href = '/register/admin'; }} className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center">
              <HiUser className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Admin</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button onClick={() => { window.location.href = '/register/vendor'; }} className="w-full h-48 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center">
              <HiBriefcase className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Vendor</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button onClick={() => { window.location.href = '/register/delivery-agent'; }} className="w-full h-48 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center">
              <HiTruck className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Delivery Agent</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button onClick={() => { window.location.href = '/register/customer'; }} className="w-full h-48 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center">
              <HiUser className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Customer</span>
            </Button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-500">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
