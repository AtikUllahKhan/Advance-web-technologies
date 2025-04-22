
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';

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
