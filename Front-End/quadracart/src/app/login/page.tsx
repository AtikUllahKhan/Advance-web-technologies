"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { HiUser, HiTruck, HiShoppingCart, HiShieldCheck } from "react-icons/hi";
export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-200 p-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-1000 w-full p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-white mb-6 text-center">Login as</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Button
              onClick={() => router.push("login/admin")}
              className="w-full h-48 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center"
            >
              <HiShieldCheck className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Admin</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={() => router.push("login/vendor")}
              className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center"
            >
              <HiShoppingCart className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Vendor</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={() => router.push("login/delivery-agent")}
              className="w-full h-48 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center"
            >
              <HiTruck className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Delivery Agent</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={() => router.push("login/customer")}
              className="w-full h-48 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition rounded-lg shadow-lg flex flex-col justify-center items-center"
            >
              <HiUser className="text-5xl mb-2" />
              <span className="text-xl font-semibold">Customer</span>
            </Button>
          </div>
        </div>
      </div>
      <Button
        onClick={() => router.push("/home")}
        className="mt-8 bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700"
      >
        Go Back to Home
      </Button>
    </div>
  );
}
