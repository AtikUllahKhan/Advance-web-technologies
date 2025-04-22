"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function OTPVerify() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:3000/admin/verify-otp", {
        email,
        otp,
      });

      setSuccess(response.data.message || `Registration successfully completed!`);
      router.push("/login/admin");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid OTP or email. Please try again.");
      } else if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="relative w-full max-w-lg p-8 bg-[#fcc3c3] rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => router.push("/register")}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-5xl font-bold"
        >
          &times;
        </button>

        <CardContent>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Verify OTP</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-1">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your OTP"
                required
              />
            </div>
            <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
              Verify
            </Button>
          </div>
          <div className="text-center mt-6 text-sm">
            <p>
              Didn't receive an OTP?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Resend OTP
              </span>
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
