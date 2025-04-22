"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    password: "",
    retypePassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    password: "",
    retypePassword: "",
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" }); // Clear error message on change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);

    // Reset error messages
    const newError = {
      name: "",
      email: "",
      phonenumber: "",
      address: "",
      password: "",
      retypePassword: "",
    };

    // Validate inputs
    if (!formData.name) newError.name = "Please enter your name.";
    if (!formData.email) newError.email = "Please enter a valid email address.";
    if (!formData.phonenumber) newError.phonenumber = "Please enter a valid phone number.";
    if (!formData.address) newError.address = "Please enter your address.";
    if (!formData.password) newError.password = "Please enter a strong password.";
    if (formData.password !== formData.retypePassword) newError.retypePassword = "Passwords do not match.";

    // If there are errors, set the error state and return
    if (Object.values(newError).some((msg) => msg)) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/customer/register", formData);
      setSuccess(response.data.message || "Customer registered successfully!");

      router.push(`/otp/customer?email=${encodeURIComponent(formData.email)}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError({ ...error, email: err.response?.data?.message || "An error occurred." });
      } else if (err instanceof Error) {
        setError({ ...error, email: err.message || "An unexpected error occurred" });
      } else {
        setError({ ...error, email: "An unknown error occurred." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="relative w-full max-w-lg p-8 bg-[#e4d2f5] rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => router.push("/register")}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-5xl font-bold"
        >
          &times;
        </button>

        <CardContent>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Customer Registration</h1>
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.name && <div className="text-red-500 text-sm mt-1">{error.name}</div>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter a valid email address"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.email && <div className="text-red-500 text-sm mt-1">{error.email}</div>}
            </div>
            <div>
              <label htmlFor="phonenumber" className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                id="phonenumber"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.phonenumber && <div className="text-red-500 text-sm mt-1">{error.phonenumber}</div>}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.address && <div className="text-red-500 text-sm mt-1">{error.address}</div>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm">Show Password</label>
              </div>
              {error.password && <div className="text-red-500 text-sm mt-1">{error.password}</div>}
            </div>
            <div>
              <label htmlFor="retypePassword" className="block text-sm font-medium mb-1">Retype Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="retypePassword"
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleChange}
                placeholder="Reenter your password"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.retypePassword && <div className="text-red-500 text-sm mt-1">{error.retypePassword}</div>}
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
              Submit
            </Button>
          </form>
          <div className="text-center mt-6 text-sm">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => router.push("/login/customer")}
              >
                Go to Login page
              </span>
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
