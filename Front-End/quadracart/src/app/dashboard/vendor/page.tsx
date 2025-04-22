"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoIosCart, IoIosEye, IoIosPeople, IoMdAdd, IoMdNotifications } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart, ArcElement } from "chart.js";
import axios from 'axios';

const DashboardContent =({ setActiveSection }: { setActiveSection: React.Dispatch<React.SetStateAction<string>> }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  Chart.register(ArcElement, Tooltip, Legend);
  const productSoldData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // Days of the week
    datasets: [
      {
        label: "Product Sold",
        data: [50, 100, 75, 80, 120, 90, 140], // Example data of products sold each day
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const todaySalesData = [
    { image: "/watch.jpg", 
      name: "Watch", 
      totalItems: 5, 
      totalPrice: 2500 
    },
    { image: "/headphone.jpg", 
      name: "Head-Phone", 
      totalItems: 3, 
      totalPrice: 1800 
    },
    { image: "/shirt.jpg", 
      name: "Shirt", 
      totalItems: 3, 
      totalPrice: 1800 
    },
    { image: "/t-shirt.jpg", 
      name: "T-Shirt", 
      totalItems: 3, 
      totalPrice: 1800 
    },
    { image: "/bag.jpg", 
      name: "Bag", 
      totalItems: 3, 
      totalPrice: 1800 
    },
      { image: "/sunglass.jpg", 
        name: "Sunglass", 
        totalItems: 3, 
        totalPrice: 1800 }
  ];

  const ratingsData = [
    { profilePic: "/rp1.jpg", 
      name: "Alice", 
      countryFlag: "/flag_usa.png", 
      comment: "best site for shopping",
      rating: 5 
    },
    { profilePic: "/rp2.jpg", 
      name: "Bob", 
      countryFlag: "/flag_uk.png", 
      comment: "for shopping, QuadCart is best option",
      rating: 4 
    },
      { profilePic: "/rp3.jpg", 
        name: "Bob", 
        countryFlag: "/flag_uk.png", 
        comment: "poor product quality",
        rating: 2 
      }
  ];
  
  // Highlight today's product sold (highlight today's bar with different color)
  const todayIndex = new Date().getDay(); // Get today's day index (0-6)
  const updatedBackgroundColor = [...productSoldData.datasets[0].backgroundColor];
updatedBackgroundColor[todayIndex] = "rgba(18, 72, 20, 0.8)"; // 
  productSoldData.datasets[0].backgroundColor = "rgba(200, 230, 205, 0.8)"; // Highlight today's bar with a different color
  
  const income = 12000; // Today's total income in BDT
  const sales = 75; // Sales percentage
  const orderRatio = 60; // Order ratio percentage

  const getChartData = (value: number, color: string) => ({
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  });
  
  // Chart Options
  const chartOptions = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  
  // Sample Data (for demo purposes)
  const viewsData = { count: 1500, trend: "up" }; // Example data for views
  const visitsData = { count: 1200, trend: "down" }; // Example data for visits
  const ordersData = { count: 50, trend: "up" }; // Example data for orders
  const lastOrderData = [{
    customerName: "Prince",
    profilePic: "/op.jpg",
    amount: 2500,
    itemsPurchased: 5,
    orderStatus: "Completed", // This could be "Processed", "Pending", etc.
  },
  {
    customerName: "king",
    profilePic: "/op2.jpg",
    amount: 2900,
    itemsPurchased: 3,
    orderStatus: "Completed", // This could be "Processed", "Pending", etc.
  },
  {
    customerName: "nabab",
    profilePic: "/op3.jpg",
    amount: 9000,
    itemsPurchased: 7,
    orderStatus: "Pending", // This could be "Processed", "Pending", etc.
  },
  {
    customerName: "Sultan",
    profilePic: "/op4.jpg",
    amount: 15000,
    itemsPurchased: 6,
    orderStatus: "Processeing", // This could be "Processed", "Pending", etc.
  },
  
];

  // Utility function to return the curve icon
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <span className="text-green-500">▲</span> // Green upward arrow
    ) : (
      <span className="text-red-500">▼</span> // Red downward arrow
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Views Box */}
      <div onClick={() => setActiveSection("reports")} className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between cursor-pointer">
        <div>
          <h3 className="text-xl font-bold">Views</h3>
          <p className="text-2xl font-semibold">{viewsData.count}</p>
          <div className="flex items-center">
            {getTrendIcon(viewsData.trend)} <span className="ml-1">12%</span>
          </div>
        </div>
        <div className="text-4xl text-gray-500">
          <IoIosEye />
        </div>
      </div>

      {/* Visits Box */}
      <div onClick={() => setActiveSection("reports")} className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between cursor-pointer">
        <div>
          <h3 className="text-xl font-bold">Visits</h3>
          <p className="text-2xl font-semibold">{visitsData.count}</p>
          <div className="flex items-center">
            {getTrendIcon(visitsData.trend)} <span className="ml-1">5%</span>
          </div>
        </div>
        <div className="text-4xl text-gray-500">
          <IoIosPeople />
        </div>
      </div>

      {/* Orders Box */}
      <div
        onClick={() => setActiveSection("order")}
        className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between cursor-pointer"
      >
        <div>
          <h3 className="text-xl font-bold">Orders</h3>
          <p className="text-2xl font-semibold">{ordersData.count}</p>
          <div className="flex items-center">
            {getTrendIcon(ordersData.trend)} <span className="ml-1">8%</span>
          </div>
        </div>
        <div className="text-4xl text-gray-500">
          <IoIosCart />
        </div>
      </div>

       {/* Second Row: Last Orders Box (Single Box with Multiple Profiles) */}
      <div 
      onClick={() => setActiveSection("order")} className="bg-white shadow-lg rounded-lg p-6 col-span-4 sm:col-span-1 h-auto cursor-pointer">
        <h3 className="text-xl font-bold mb-4">Last Orders</h3>
        
        {/* Map through the orders data and display each customer profile */}
        {lastOrderData.map((order, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            {/* Customer Profile */}
            <div className="flex items-center">
              <img
                src={order.profilePic}
                alt="Customer Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <div className="font-bold text-lg">{order.customerName}</div>
                <div className="text-md text-gray-600">{order.amount} BDT</div>
              </div>
            </div>

            {/* Order Details */}
            <div className="flex flex-col justify-between text-sm text-gray-500">
              <div>Items: {order.itemsPurchased}</div>
              <div>Status: {order.orderStatus}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Product Sold Bar Chart Box */}
      <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 sm:col-span-2 h-auto">
        <h3 className="text-xl font-bold mb-4">Product Sold</h3>
        <p className="text-lg font-semibold mb-4">Total Sold Amount</p>

        {/* Bar Chart */}
        <Bar
          data={productSoldData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Product Sold Over the Last 7 Days",
                font: { size: 16 },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw;
                    return `Sold: ${value}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Days of the Week",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Products Sold",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 col-span-3">
      <h3 className="text-xl font-bold mb-4">Income, Sales & Order Ratio</h3>

      <div className="grid grid-cols-3 gap-6 text-center">
        {/* Income Chart */}
        <div className="flex items-center space-x-4">
        <div className="text-right">
        <p className="text-lg font-bold">Today Total Income</p>
        <p className="text-gray-600">{income} BDT</p>
        </div>
          <div className="relative w-32 h-32 mx-auto">
            <Doughnut data={getChartData(80, "#4CAF50")} options={chartOptions} />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {income} BDT
            </span>
          </div>
          <p className="mt-2 font-medium">Income</p>
        </div>

        {/* Sales Chart */}
        <div className="flex items-center space-x-4">
        <div className="text-right">
        <p className="text-lg font-bold">Today Sales</p>
        <p className="text-gray-600">{sales}%</p>
      </div>
          <div className="relative w-32 h-32 mx-auto">
            <Doughnut data={getChartData(sales, "#FF9800")} options={chartOptions} />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {sales}%
            </span>
          </div>
          <p className="mt-2 font-medium">Sales</p>
        </div>

        {/* Order Ratio Chart */}
        <div className="flex items-center space-x-4">
        <div className="text-right">
        <p className="text-lg font-bold">Today's Total Orders</p>
        <p className="text-gray-600">{orderRatio}%</p>
      </div>
          <div className="relative w-32 h-32 mx-auto">
            <Doughnut data={getChartData(orderRatio, "#2196F3")} options={chartOptions} />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {orderRatio}%
            </span>
          </div>
          <p className="mt-2 font-medium">Order Ratio</p>
        </div>
      </div>
    </div>
    {/* Today Sale & Rating & Review */}
    <div className="bg-white shadow-lg rounded-lg p-6 col-span-2">
        <h3 className="text-xl font-bold mb-4">Today Sale</h3>
        <div className="grid grid-cols-2 gap-4">
          {todaySalesData.map((product, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img src={product.image} className="w-16 h-16 rounded-md object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-600 text-sm">
                  {product.totalItems} items
                </p>
              </div>
              <p className="font-bold text-gray-800">{product.totalPrice} BDT</p>
            </div>
          ))}
        </div>
      </div>

      <div  onClick={() => setActiveSection("reviews")} className="bg-white shadow-lg rounded-lg p-6 cursor-pointer">
        <h3 className="text-xl font-bold mb-4">Rating & Review</h3>
        <div className="space-y-4">
          {ratingsData.map((review, index) => (
            <div key={index} className="flex items-center space-x-4 border-b pb-2">
              <img src={review.profilePic} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="font-bold">{review.name}</span>
                <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                <div className="text-yellow-500">{'⭐'.repeat(review.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorContent = () => {
  const [vendors, setVendors] = useState<{ 
    id: number;
    vendorname: string;
    email: string;
    phonenumber: string;
    location: string;
  }[]>([]);

  const [selectedVendor, setSelectedVendor] = useState<{ 
    id: number;
    vendorname: string;
    email: string;
    phonenumber: string;
    location: string;
  } | null>(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [formData, setFormData] = useState({
    vendorname: "",
    email: "",
    phonenumber: "",
    location: "",
    password: "",
  });

  // Fetch vendor data from backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vendor/all");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/vendor/add", formData);
      if (response.status === 201) {
        setVendors([...vendors, response.data]); // Add new vendor to the table
        setShowAddForm(false);
        setFormData({ vendorname: "", email: "", phonenumber: "", location: "", password: "" });
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

   // Select a vendor when clicking a row
   const handleRowClick = (vendor:any) => {
    setSelectedVendor(vendor);
  };

  // Open update form with selected vendor’s details
  const openUpdateForm = () => {
    if (selectedVendor) {
      setFormData({
        vendorname: selectedVendor.vendorname,
        email: selectedVendor.email,
        phonenumber: selectedVendor.phonenumber,
        location: selectedVendor.location,
        password: "",
        
      });
      setShowUpdateForm(true);
    }
  };

   // Submit updated vendor details
   const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendor) return;

    // Create a copy of formData and exclude password if it's empty
  const updateData: { [key: string]: any } = { ...formData };
  if (!updateData.password) {
    delete updateData.password; // Remove password field if empty
  }

    try {
      const response = await axios.put(`http://localhost:3000/vendor/${selectedVendor.id}`, updateData);
      if (response.status === 200) {
        // Update the vendors list instantly
        setVendors(
          vendors.map((vendor) =>
            vendor.id === selectedVendor.id ? { ...vendor, ...formData } : vendor
          )
        );
        setShowUpdateForm(false);
        setSelectedVendor(null);
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vendor Details</h2>
      {/* Table for displaying vendors */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="sticky top-0 bg-white p-4 shadow-md flex justify-between z-10">
          <h3 className="text-xl font-semibold">Vendor List</h3>
          <button onClick={() => setShowAddForm(true)} className="p-2 bg-blue-500 text-white rounded-full">
            <IoMdAdd size={24} />
          </button>
          {selectedVendor && (
            <div className="mt-4">
          <button
            onClick={openUpdateForm}
            className="p-2 bg-green-500 text-white px-4 py-2 rounded">
            Update Details
          </button>
          </div>
        )}
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Vendor ID</th>
              <th className="p-2">Vendor Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index} 
              className={`border-b cursor-pointer transition-all duration-300 ${
              selectedVendor?.id === vendor.id ? "bg-gray-200" : ""}`} onClick={()=>handleRowClick(vendor)}>
                <td className="p-2">{vendor.id}</td>
                <td className="p-2">{vendor.vendorname}</td>
                <td className="p-2">{vendor.email}</td>
                <td className="p-2">{vendor.phonenumber}</td>
                <td className="p-2">{vendor.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Vendor Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Vendor</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="vendorname"
                placeholder="Vendor Name"
                value={formData.vendorname}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Add Vendor
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 p-2 rounded mt-2"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Vendor Form */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Vendor Details</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="vendorname"
                placeholder="Vendor Name"
                value={formData.vendorname}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Update
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 p-2 rounded mt-2"
                onClick={() => setShowUpdateForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )};
    </div>
  )
};

const ProductContent = () => {
  const [products, setProducts] = useState<{
    id: number;
    productname: string;
    vendorId: number;
    price: number;
    stock: number;
    category: string;
    averageRating: number;
    discount: number;
    discountStart: string;
    discountEnd: string;
  }[]>([]);

  const [showAddForm, setShowAddForm] = useState(false); // For showing add product form
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false); // For showing filter options
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null); // Track selected product
  const [formData, setFormData] = useState({
    productname: "",
    vendorId: 0,
    price: 0,
    stock: 0,
    category: "",
    discount: 0,
    discountStart: "",
    discountEnd: "",
  });

  const [filters, setFilters] = useState({
    productname: "",
    category: "",
    priceMin: 0,
    priceMax: 0,
    ratingMin: 0,
    ratingMax: 0,
    discountMin: 0, 
    discountMax: 0,
  });

  // Fetch product data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

   // Handle form input changes
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle filter input changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Submit form data to add new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/product/create", formData);
      if (response.status === 201) {
        setProducts([...products, response.data]); // Add new product to the table
        setShowAddForm(false);
        setFormData({
          productname: "",
          vendorId: 0,
          price: 0,
          stock: 0,
          category: "",
          discount: 0,
          discountStart: "",
          discountEnd: "",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Select product for update
  const handleSelectProduct = (productId: number) => {
    setSelectedProduct(productId);
  };

  // Open update form and prefill with selected product data
  const handleUpdateClick = () => {
    if (selectedProduct !== null) {
      const productToUpdate = products.find((p) => p.id === selectedProduct);
      if (productToUpdate) {
        setFormData(productToUpdate);
        setShowUpdateForm(true);
      }
    }
  };

  // Submit updated product data
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/product/${selectedProduct}`,
        formData
      );
      if (response.status === 200) {
        setProducts(products.map((p) => (p.id === selectedProduct ? response.data : p)));
        setShowUpdateForm(false);
        setSelectedProduct(null);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

   // Delete product from UI & DB
   const handleDeleteClick = async () => {
    if (selectedProduct !== null) {
      try {
        await axios.delete(`http://localhost:3000/product/${selectedProduct}`);
        setProducts(products.filter((p) => p.id !== selectedProduct));
        setSelectedProduct(null);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

   // Reset form fields
   const resetForm = () => {
    setFormData({
      productname: "",
      vendorId: 0,
      price: 0,
      stock: 0,
      category: "",
      discount: 0,
      discountStart: "",
      discountEnd: "",
    });
  };

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const matchesProductName = filters.productname
      ? product.productname.toLowerCase().includes(filters.productname.toLowerCase())
      : true;

    const matchesCategory = filters.category
      ? product.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;

    const matchesPrice =
      (filters.priceMin ? product.price >= Number(filters.priceMin) : true) &&
      (filters.priceMax ? product.price <= Number(filters.priceMax) : true);
    
    const matchesRating =
      (filters.ratingMin ? product.averageRating >= Number(filters.ratingMin) : true) &&
      (filters.ratingMax ? product.averageRating <= Number(filters.ratingMax) : true);
    
    const matchesDiscount =
      (filters.discountMin ? product.discount >= Number(filters.discountMin) : true) &&
      (filters.discountMax ? product.discount <= Number(filters.discountMax) : true);


    return matchesProductName && matchesCategory && matchesPrice && matchesRating && matchesDiscount;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        
      
      {/* Add Product Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 bg-blue-500 text-white rounded-sm"
        >
          + Add Product
        </button>
        
        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 bg-gray-500 text-white rounded-full"
        >
          Filter
        </button>
      </div>
      {/* Show Update & Delete Options When Product is Selected */}
      {selectedProduct !== null && (
        <div className="flex space-x-2 mt-4">
          <button onClick={handleUpdateClick} className="p-2 bg-green-500 text-white rounded-sm">
            Update Product
          </button>
          <button onClick={handleDeleteClick} className="p-2 bg-red-500 text-white rounded-sm">
            Delete Product
          </button>
        </div>
      )}

      

      
      {/* Filter Options */}
      {showFilter && (
        <div className="mt-4">
          <input
            type="text"
            name="productname"
            placeholder="Filter by Product Name"
            value={filters.productname}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Filter by Category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              name="priceMin"
              placeholder="Min Price"
              value={filters.priceMin}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="priceMax"
              placeholder="Max Price"
              value={filters.priceMax}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              name="ratingMin"
              placeholder="Min Rating"
              value={filters.ratingMin}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="ratingMax"
              placeholder="Max Rating"
              value={filters.ratingMax}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div className="flex space-x-2">
  <input
    type="number"
    name="discountMin"
    placeholder="Min Discount"
    value={filters.discountMin}
    onChange={handleFilterChange}
    className="w-full p-2 border rounded mb-2"
  />
  <input
    type="number"
    name="discountMax"
    placeholder="Max Discount"
    value={filters.discountMax}
    onChange={handleFilterChange}
    className="w-full p-2 border rounded mb-2"
  />
</div>
        </div>
      )}

      {/* Add Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-1 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-0">Add Product</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="productname"
                placeholder="Product Name"
                value={formData.productname}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="number"
                name="vendorId"
                placeholder="Vendor ID"
                value={formData.vendorId}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="date"
                name="discountStart"
                placeholder="Discount Start"
                value={formData.discountStart}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <input
                type="date"
                name="discountEnd"
                placeholder="Discount End"
                value={formData.discountEnd}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-0"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Add Product
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 p-2 rounded mt-0"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      
      {/* Update Product Form */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Update Product</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input type="text" name="productname" placeholder="Product Name" value={formData.productname} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
              <button type="button" className="w-full bg-gray-300 p-2 rounded mt-2" onClick={() => setShowUpdateForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {/* Table displaying filtered products */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product ID</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Vendor ID</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Category</th>
              <th className="p-2">Average Rating</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Discount Start</th>
              <th className="p-2">Discount End</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index} className={`border-b cursor-pointer ${selectedProduct === product.id ? "bg-gray-200" : ""}`}
              onClick={()=> handleSelectProduct(product.id)}>
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.productname}</td>
                <td className="p-2">{product.vendorId}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.averageRating}</td>
                <td className="p-2">{product.discount}%</td>
                <td className="p-2">{product.discountStart}</td>
                <td className="p-2">{product.discountEnd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<number>(0);
  const [vendorName, setVendorName] = useState("Md. Iftear");
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const router = useRouter();
  
  const SESSION_TIMEOUT = 600000; // 5 minutes in milliseconds
  let activityTimeout: any = null;

  // Function to reset session time
  const resetSession = () => {
    localStorage.setItem("lastActiveTime", Date.now().toString());
    setIsSessionExpired(false);
    clearTimeout(activityTimeout);
    startActivityTimeout(); // Restart the timeout on user activity
  };

  const startActivityTimeout = () => {
    activityTimeout = setTimeout(() => {
      setIsSessionExpired(true); // Set the session as expired if inactive for 5 minutes
    }, SESSION_TIMEOUT);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(Math.floor(Math.random() * 10)); // Randomize number of notifications (for demo)
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle user interaction after session expires
  useEffect(() => {
    startActivityTimeout();
 
    const handleUserInteraction = () => {
      if (isSessionExpired) {
        alert("Session timeout, login required");
        router.push("/home"); // Redirect to home page
      }
    };

    if (!isSessionExpired) {
      window.addEventListener("click", resetSession); // Reset session time on any click event
    }

    window.addEventListener("click", handleUserInteraction);
    
    return () => {
      clearTimeout(activityTimeout); // Clean up timeout
      window.removeEventListener("click", resetSession); // Clean up reset session listener
      window.removeEventListener("click", handleUserInteraction); // Clean up session timeout listener
    };
  }, [isSessionExpired,]);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return  <DashboardContent setActiveSection={setActiveSection} />;
      case 'vendor':
        return <VendorContent/>;
      case 'product':
        return <ProductContent/>;
      case 'order':
        return <div>Order Content</div>;
      case 'reviews':
        return <div>Reviews Content</div>;
      case 'discounts':
        return <div>Discounts Content</div>;
        case 'reports':
        return <div>Reports Content</div>;
      case 'others':
        return <div>Others Content</div>;
      default:
        return <DashboardContent setActiveSection={setActiveSection}/>;
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    else if (currentHour < 18) return "Good Afternoon";
    else return "Good Evening";
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>

      {/* Header */}
      <header className="flex justify-between items-center p-2 fixed top-0 left-0 right-0 bg-white shadow-lg z-10">
        <div className="flex justify-between items-center">
            <div className=" ml-5 text-4xl text-yellow-400 font-bold">QuadCart</div>

            {/* Greeting Message */}
          <div className="ml-32 font-bold text-black text-xl">
            <span>{getGreeting()}, {vendorName}</span>
          </div>
        </div>
        
        {/* Profile and Theme Toggle */}
        <div className="flex items-center space-x-4">

            {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="bg-gray-600 p-2 rounded-full">
            {isDarkMode ? '🌙' : '☀️'}
          </button>   

           {/* Notification Button */}
           <div className="relative">
            <button className="p-2 bg-gray-600 rounded-full">
              {/* Notification Icon */}
              <span className="material-icons text-white"><IoMdNotifications /></span>
            </button>

            {/* Display notification count if there are any */}
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
            </div>

            {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={toggleProfileDropdown} className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/vendor.jpg" alt="Vendor Profile" width={40} height={40} className="object-cover" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
                <ul>
                  <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">Your Profile</li>
                  <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">Settings</li>
                  <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-purple-50 text-black p-4 pt-16 space-y-4">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'dashboard' ? 'bg-lime-200' : ''}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('vendor')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'vendor' ? 'bg-lime-200' : ''}`}
            >
              Vendor
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('product')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'product' ? 'bg-lime-200' : ''}`}
            >
              Product
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('order')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'order' ? 'bg-lime-200' : ''}`}
            >
              Order
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('reviews')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'reviews' ? 'bg-lime-200' : ''}`}
            >
              Reviews and Ratings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('discounts')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'discounts' ? 'bg-lime-200' : ''}`}
            >
              Discounts
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('reports')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'reports' ? 'bg-lime-200' : ''}`}
            >
              Reports
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('others')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'others' ? 'bg-lime-200' : ''}`}
            >
              Others
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 mt-16 p-6">
        {renderSectionContent()}
        
      </main>
    </div>
  );
}
