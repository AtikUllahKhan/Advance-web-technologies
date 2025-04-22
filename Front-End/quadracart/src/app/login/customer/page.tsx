"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface LoginPageProps {
  userType: "customer" | "admin" | "vendor" | "delivery-agent";
}

export default function LoginPage({ userType }: LoginPageProps) {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState({ id: "", password: "" });
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);

    const newError = { id: "", password: "" };

    if (!formData.id) newError.id = "Please enter your ID.";
    if (!formData.password) newError.password = "Please enter your password.";

    if (Object.values(newError).some((msg) => msg)) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/customer/login`, formData);
      setSuccess(response.data.message || "Login successful!");
      localStorage.setItem("authToken", response.data.token);
      router.push(`/${userType}/dashboard`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError({
          ...error,
          id: err.response?.data?.message || "Invalid ID or Password. Please try again.",
        });
      } else {
        setError({ ...error, id: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="relative w-full max-w-lg p-8 bg-[#e4d2f5] rounded-xl shadow-lg">
        <button
          onClick={() => router.push("/login")}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-5xl font-bold"
        >
          &times;
        </button>

        <CardContent>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 capitalize">{userType} Customer Login</h1>
          {success && <div className="text-green-500 mb-4">{success}</div>}
          {error.id && <div className="text-red-500 text-sm mb-1">{error.id}</div>}
          {error.password && <div className="text-red-500 text-sm mb-1">{error.password}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-medium mb-1">ID</label>
              <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter your ID"
                className="w-full p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Login
            </Button>
          </form>
          <div className="text-center mt-6 text-sm">
            <p>
              Don't have an account? {" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => router.push(`/register/customer`)}
              >
                Register here
              </span>
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}