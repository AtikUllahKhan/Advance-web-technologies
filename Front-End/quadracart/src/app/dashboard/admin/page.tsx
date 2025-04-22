"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Moon, Sun, Bell, MessageCircle } from "lucide-react"; 
import { Bar } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Vendor {
  id: number;
  vendorname: string;
  email: string;
  phonenumber: string;
  location: string;
  isVerified: boolean;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phonenumber: string;
}

interface Admin {
  id: number;
  name: string;
  email: string;
}

interface DeliveryAgent {
  id: number;
  deliveryAgentname: string;
  email: string;
  phonenumber: string;
  address: string;
  vehicleType: string;
  isVerified: boolean;
}

export default function AdminDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [deliveryAgents, setDeliveryagents] = useState<DeliveryAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false); // Night mode state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Notification bar state
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat box state
  const [notifications, setNotifications] = useState<string[]>([]); // Example notifications
  const [messages, setMessages] = useState<string[]>([]); // Example chat messages
  const router = useRouter();
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
        // Fetch vendors
        const vendorResponse = await axios.get("http://localhost:3000/vendor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendors(vendorResponse.data);

        // Fetch customers
        const customerResponse = await axios.get("http://localhost:3000/customer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(customerResponse.data);

        // Fetch admins
        const adminResponse = await axios.get("http://localhost:3000/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(adminResponse.data);

        // Fetch delivery agents
        const deliveryAgentResponse = await axios.get("http://localhost:3000/delivery-agent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeliveryagents(deliveryAgentResponse.data);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUsers = () => {
    setIsUsersOpen(!isUsersOpen);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    document.documentElement.classList.toggle("dark", !isNightMode); // Toggle dark mode class
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const addNotification = () => {
    setNotifications([...notifications, `New notification ${notifications.length + 1}`]);
  };

  const sendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className={`flex min-h-screen bg-gray-100 ${isNightMode ? "dark bg-gray-900 text-white" : ""}`}>
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
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Night Mode Toggle */}
            <Button onClick={toggleNightMode} className="p-2 bg-gray-500 hover:bg-blue-600 rounded">
              {isNightMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {/* Notification Button */}
            <Button onClick={toggleNotifications} className="p-2 bg-gray-500 hover:bg-blue-600 rounded relative">
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {notifications.length}
                </span>
              )}
            </Button>
            {/* Chat Button */}
            <Button onClick={toggleChat} className="p-2 bg-gray-500 hover:bg-blue-600 rounded">
              <MessageCircle size={20} />
            </Button>
          </div>
        </div>

        {/* Notification Bar */}
        {isNotificationOpen && (
          <div className="fixed top-16 right-4 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <h3 className="font-semibold mb-2">Notifications</h3>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="text-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  {notification}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chat Box */}
        {isChatOpen && (
          <div className="fixed bottom-4 right-4 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <h3 className="font-semibold mb-2">Chat</h3>
            <div className="h-40 overflow-y-auto mb-2">
              {messages.map((message, index) => (
                <div key={index} className="text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded mb-1">
                  {message}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  sendMessage(e.currentTarget.value.trim());
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/admin")}>
              Total Admins
            </h3>
            <p className="text-3xl font-bold cursor-pointer text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/admin")}>
              {admins.length}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/customer")}>
              Total Customers
            </h3>
            <p className="text-3xl font-bold cursor-pointer text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/customer")}>
              {customers.length}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/delivery-agent")}>
              Total Delivery-Agent
            </h3>
            <p className="text-3xl font-bold cursor-pointer text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/delivery-agent")}>
              {deliveryAgents.length}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/vendor")}>
              Total Vendors
            </h3>
            <p className="text-3xl font-bold cursor-pointer text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/vendor")}>
              {vendors.length}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white"onClick={() => router.push("/dashboard/admin/reports")}>Website Visits</h3>
            <Bar data={websiteVisitsData} options={{ responsive: true }} />
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/reports")}>Orders</h3>
            <Bar data={ordersData} options={{ responsive: true }} />
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white" onClick={() => router.push("/dashboard/admin/reports")}>Total Revenue</h3>
            <Bar data={revenueData} options={{ responsive: true }}  />
          </div>
        </div>
      </div>
    </div>
  );
}