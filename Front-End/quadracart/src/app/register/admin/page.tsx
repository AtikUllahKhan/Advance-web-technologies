"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function AdminRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" }); // Clear error message when typing
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);

    // Reset error messages
    const newError = {
      name: "",
      email: "",
      password: "",
      retypePassword: "",
    };

    // Manual validation
    if (!formData.name.trim()) newError.name = "Please enter your name.";
    if (!formData.email.trim()) newError.email = "Please enter a valid email address.";
    if (!formData.password.trim()) newError.password = "Please enter a strong password.";
    if (formData.password !== formData.retypePassword) newError.retypePassword = "Passwords do not match.";

    // If errors exist, update state and return
    if (Object.values(newError).some((msg) => msg)) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/admin/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(response.data.message || "Admin registered successfully!");

      router.push(`/otp/admin?email=${encodeURIComponent(formData.email)}`);
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
      <div className="relative w-full max-w-lg p-8 bg-[#fcc3c3] rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => router.push("/register")}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-5xl font-bold"
        >
          &times;
        </button>

        <CardContent>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Admin Registration</h1>
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter admin name"
                className={`w-full p-4 border ${
                  error.name ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white focus:ring-2 focus:outline-none ${
                  error.name ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
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
                className={`w-full p-4 border ${
                  error.email ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white focus:ring-2 focus:outline-none ${
                  error.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
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
                className={`w-full p-4 border ${
                  error.password ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white focus:ring-2 focus:outline-none ${
                  error.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
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
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
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
                className={`w-full p-4 border ${
                  error.retypePassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white focus:ring-2 focus:outline-none ${
                  error.retypePassword ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              {error.retypePassword && <p className="text-red-500 text-sm mt-1">{error.retypePassword}</p>}
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
                onClick={() => router.push("/login/admin")}
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
