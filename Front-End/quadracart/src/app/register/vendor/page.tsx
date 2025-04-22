"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent } from "@/app/components/ui/card"; // Ensure this path is correct
import { Button } from "@/app/components/ui/button"; // Ensure this path is correct

export default function VendorRegistration() {
  const [formData, setFormData] = useState({
    vendorname: "",
    email: "",
    phonenumber: "",
    location: "",
    password: "",
    retypePassword: "",
  });

  const [error, setError] = useState({
    vendorname: "",
    email: "",
    phonenumber: "",
    location: "",
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
      vendorname: "",
      email: "",
      phonenumber: "",
      location: "",
      password: "",
      retypePassword: "",
    };

    // Validate inputs
    if (!formData.vendorname) newError.vendorname = "Please enter your name.";
    if (!formData.email) newError.email = "Please enter a valid email address.";
    if (!formData.phonenumber) newError.phonenumber = "Please enter your phone number.";
    if (!formData.location) newError.location = "Please enter vendor location.";
    if (!formData.password) newError.password = "Please enter a strong password.";
    if (formData.password !== formData.retypePassword) newError.retypePassword = "Passwords do not match.";

    // If there are errors, set the error state and return
    if (Object.values(newError).some((msg) => msg)) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/vendor/register", {
        vendorname: formData.vendorname,
        email: formData.email,
        phonenumber: formData.phonenumber,
        location: formData.location,
        password: formData.password,
      });
      setSuccess(response.data.message || "Vendor registered successfully!");

      router.push(`/otp/vendor?email=${encodeURIComponent(formData.email)}`);
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
      <div className="relative w-full max-w-lg p-8 bg-[#b0cdff] rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => router.push("/register")}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-5xl font-bold"
        >
          &times;
        </button>

        <CardContent>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Vendor Registration</h1>
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="vendorname" className="block text-sm font-medium mb-1">Vendor Name</label>
              <input
                type="text"
                id="vendorname"
                name="vendorname"
                value={formData.vendorname}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.vendorname && <div className="text-red-500 text-sm mt-1">{error.vendorname}</div>}
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
              <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter vendor location"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              {error.location && <div className="text-red-500 text-sm mt-1">{error.location}</div>}
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
                onClick={() => router.push("/login/vendor")}
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
