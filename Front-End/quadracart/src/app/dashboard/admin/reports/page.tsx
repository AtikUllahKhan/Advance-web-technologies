"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter ,usePathname} from "next/navigation";
import { Bar } from "react-chartjs-2"; 
import Link from "next/link";
import { Button } from "@/app/components/ui/button";


import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const pathname = usePathname();

  
  // Sample data for charts
  const websiteVisitsData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Daily Website Visits',
        data: [120, 150, 200, 170, 220, 300, 250],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Weekly Website Visits',
        data: [800, 900, 1000, 1100, 1200, 1300, 1400],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Monthly Website Visits',
        data: [3000, 3200, 3500],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };
  

  const ordersData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Daily Orders',
        data: [30, 20, 50, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Weekly Orders',
        data: [150, 200, 250, 300],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Monthly Orders',
        data: [600, 700, 800],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Yearly Orders',
        data: [5000, 6000, 7000],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const revenueData = {
    labels: ['2022', '2023', '2024'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [120000, 150000, 180000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Yearly Revenue',
        data: [300000, 400000, 500000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Fetch any additional data needed for reports here
        // For example, you might want to fetch actual data from your API
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

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
        </h1> : <h1 className="text-3xl md:text-3xl font-extrabold cursor-pointer">
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
    <div className="flex flex-col p-8">
      <h1 className="text-3xl font-semibold mb-6">Reports</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Website Visits</h3>
          <Bar data={websiteVisitsData} options={{ responsive: true }} />
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Orders</h3>
          <Bar data={ordersData} options={{ responsive: true }} />
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Total Revenue</h3>
          <Bar data={revenueData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
    </div>
  );
}