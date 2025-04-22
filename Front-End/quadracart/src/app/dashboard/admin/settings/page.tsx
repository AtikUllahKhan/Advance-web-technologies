"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

interface Admin {
  name: string;
  email: string;
}

export default function AdminSettings() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [updatedAdmin, setUpdatedAdmin] = useState<Admin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
        setUpdatedAdmin(response.data);
      } catch (err) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAdmin((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token || !updatedAdmin) return;

    try {
      const response = await axios.patch("http://localhost:3000/admin/update", updatedAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const handleError = (err: any) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } else {
      setError("An unexpected error occurred");
    }
    router.push("/login");
  };

  const handleLogout = () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      router.push("/login");
    }
  };

  const handleSettings = () => {
    router.push("/dashboard/admin/settings");
  };

  const handledashboard = () => {
    router.push("/dashboard/admin");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUsers = () => {
    setIsUsersOpen(!isUsersOpen);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className={`flex min-h-screen bg-gray-100 ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white-800 text-black rounded"
      >
        {isSidebarOpen ? <h1 className="text-3xl md:text-3xl font-extrabold cursor-pointer">
          <span className="text-red-500">Quadra</span>
          <span className="text-blue-500">Cart</span>
        </h1> : <h1 className="text-3xl md:text-3xl font-extrabold cursor-pointer">
          <span className="text-red-500">Quadra</span>
          <span className="text-blue-500">Cart</span>
        </h1>}
      </button>

      {/* Navigation Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white p-4 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
                <h1 className="text-2xl font-bold mb-6">  </h1>

        <br></br>
        <br></br>
        <nav className="space-y-2">
          {/* Dashboard Link */}
          <Link
            href="/dashboard/admin"
            className={`block p-2 rounded ${
              pathname === "/dashboard/admin" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Dashboard
          </Link>
          <div>
            <button onClick={toggleUsers} className="block w-full text-left p-2 hover:bg-gray-700 rounded">
              Users
            </button>
            {isUsersOpen && (
              <div className="pl-4 space-y-2">
                {/* Admins Link */}
                <Link
                  href="/dashboard/admin/admin"
                  className={`block p-2 rounded ${
                    pathname === "/dashboard/admin/admin" ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  Admins
                </Link>
                {/* Customers Link */}
                <Link
                  href="/dashboard/admin/customer"
                  className={`block p-2 rounded ${
                    pathname === "/dashboard/admin/customer" ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  Customers
                </Link>
                {/* Delivery-Agent Link */}
                <Link
                  href="/dashboard/admin/delivery-agent"
                  className={`block p-2 rounded ${
                    pathname === "/dashboard/admin/delivery-agent" ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  Delivery-Agent
                </Link>
                {/* Vendors Link */}
                <Link
                  href="/dashboard/admin/vendor"
                  className={`block p-2 rounded ${
                    pathname === "/dashboard/admin/vendor" ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  Vendors
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/dashboard/admin/reports"
            className={`block p-2 rounded ${
              pathname === "/dashboard/admin/reports" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Reports
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 bg-gray-800">
          <Button onClick={handleSettings} className="block w-full p-2 bg-gray-500 hover:bg-blue-600 rounded mt-2">
            Settings
          </Button>
          <Button onClick={handleLogout} className="block w-full p-2 bg-red-400 hover:bg-red-600 rounded mt-2">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedAdmin?.name || ""}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={updatedAdmin?.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}