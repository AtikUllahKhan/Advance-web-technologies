"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

interface Vendor {
  id: number;
  vendorname: string;
  email: string;
  phonenumber: string;
  location: string;
  isVerified: boolean;
}

export default function VendorPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/vendor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendors(response.data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [router]);

  const handleError = (err: any) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Failed to fetch vendors");
    } else {
      setError("An unexpected error occurred");
    }
    router.push("/login");
  };

  const handleDeleteVendor = async (id: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this vendor?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/vendor/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendors(vendors.filter((vendor) => vendor.id !== id));
      } catch (err) {
        handleError(err);
      }
    }
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

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle users section visibility
  const toggleUsers = () => {
    setIsUsersOpen(!isUsersOpen);
  };

  const filteredVendors = vendors.filter(vendor => {
    return (
      vendor.id.toString().includes(searchTerm) || // Convert ID to string for comparison
      vendor.vendorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vendor.phonenumber && vendor.phonenumber.includes(searchTerm)) // Check if phonenumber exists
    );
  });
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

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
        </h1> : <h1 className="text-2xl md:text-3xl font-extrabold cursor-pointer">
          <span className="text-red-500">Quadra</span>
          <span className="text-blue-500">Cart</span>
        </h1>}
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-gray-800 text-white flex flex-col justify-between min-h-screen p-4 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
        <h1 className="text-2xl font-bold mb-6">  </h1>

          <br></br>
          <br></br>
          <nav className="space-y-2">
            <Link href="/dashboard/admin" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
            <div>
              <button onClick={toggleUsers} className="block w-full text-left p-2 hover:bg-gray-700 rounded">
                Users
              </button>
              {isUsersOpen && (
                <div className="pl-4 space-y-2">
                  <Link
                    href="/dashboard/admin/admin"
                    className={`block p-2 rounded ${pathname === "/dashboard/admin/admin" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                  >
                    Admins
                  </Link>
                  <Link
                    href="/dashboard/admin/customer"
                    className={`block p-2 rounded ${pathname === "/dashboard/admin/customer" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                  >
                    Customers
                  </Link>
                  <Link
                    href="/dashboard/admin/delivery-agent"
                    className={`block p-2 rounded ${pathname === "/dashboard/admin/delivery-agent" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                  >
                    Delivery-Agent
                  </Link>
                  <Link
                    href="/dashboard/admin/vendor"
                    className={`block p-2 rounded ${pathname === "/dashboard/admin/vendor" ? "bg-gray-700" : "hover:bg-gray-700"}`}
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
        </div>

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
      <div className="flex-1 p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Vendors</h2>
          <input
            type="text"
            placeholder="Search by ID, Name, Email, Phone Number"
            className="mb-4 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="p-4 border rounded-lg bg-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="font-semibold">ID:</span> {vendor.id}
                </div>
                <div>
                  <span className="font-semibold">Name:</span> {vendor.vendorname}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {vendor.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {vendor.phonenumber}
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {vendor.location}
                </div>
                <div>
                  <span className="font-semibold">Verified:</span> {vendor.isVerified ? "Yes" : "No"}
                </div>
              </div>
              <Button onClick={() => handleDeleteVendor(vendor.id)} className="mt-2 bg-red-600 text-white">
                Delete Vendor
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
