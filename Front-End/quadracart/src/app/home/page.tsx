"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import RegisterPage from "../register/page";
import { Button } from "@/app/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./page.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  return (
    
    <div className="bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/home">
        <h1 className="text-1xl md:text-2xl font-extrabold cursor-pointer">
          <span className="text-red-500">Quadra</span>
          <span className="text-blue-500">Cart</span>
        </h1>
        </Link>

          {/* Navbar Links */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">Shop</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </li>
          </ul>

          {/* Login and Register Buttons */}
          <div className="flex space-x-4">
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Login</a>
            <button
              onClick={()=>router.push("/register")} 
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[1100px]">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 hero-caption">
                  <motion.h1 className="text-4xl font-bold mb-4">{slide.title}</motion.h1>
                  <motion.p className="text-lg mb-6">{slide.text}</motion.p>
                  <a href={slide.link} className="btn_1 hero-btn bg-yellow-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition">
                    Shop Now
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      {/* Collections */}
      <CategorySection title="Men's Collection" initialProducts={menProducts} rtl={false} />
      <CategorySection title="Women's Collection" initialProducts={womenProducts} rtl={true} />
      <CategorySection title="Kids' Collection" initialProducts={kidsProducts} rtl={false} />

       {/* Testimonial Section */}
      <section className="testimonial-area testimonial-padding py-20 bg-gradient-to-r from-indigo-500 to-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-yellow-300 mb-8">What Our Customers Say</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-12 rounded-md shadow-lg mx-auto max-w-md">
                  <p className="text-gray-800 italic mb-6 text-lg">"{testimonial.quote}"</p>
                  <div className="flex justify-center items-center">
                    <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="rounded-full border-4 border-indigo-600" />
                    <div className="ml-6">
                      <span className="block text-2xl font-semibold text-green-700">{testimonial.name}</span>
                      <p className="text-sm text-green-500">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* Services Section */}
      <section className="categories-area py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {services.map((service, index) => (
              <div key={index} className="single-cat p-6 bg-white shadow-md rounded-md">
                <div className="cat-icon mb-4">
                  <Image src={service.icon} alt={service.title} width={60} height={60} />
                </div>
                <div className="cat-cap">
                  <h5 className="text-xl font-semibold">{service.title}</h5>
                  <p className="text-gray-600">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-wrapper bg-gray-800 text-white mt-12">
        <div className="footer-area footer-padding container mx-auto py-8">
          {/* Subscribe Section */}
          <section className="subscribe-area mb-8">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold">Subscribe Newsletter</h3>
                <p>Subscribe newsletter to get 5% off on all products.</p>
              </div>
              <div className="w-full md:w-1/3">
                <form action="#" className="flex">
                  <input type="text" placeholder="Enter your email" className="p-2 rounded-l-md text-gray-700"/>
                  <button className="subscribe-btn bg-yellow-500 px-4 py-2 rounded-r-md text-white">Subscribe</button>
                </form>
              </div>
              <div className="w-full md:w-1/3 flex justify-end">
                <div className="footer-social space-x-4">
                  <a href="https://bit.ly/sai4ull" className="text-white"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
            <div>
              <h4 className="text-lg font-semibold">Shop Men</h4>
              <ul>
                <li><a href="#">Clothing Fashion</a></li>
                <li><a href="#">Winter</a></li>
                <li><a href="#">Summer</a></li>
                <li><a href="#">Formal</a></li>
                <li><a href="#">Casual</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Shop Women</h4>
              <ul>
                <li><a href="#">Clothing Fashion</a></li>
                <li><a href="#">Summer</a></li>
                <li><a href="#">Winter</a></li>
                <li><a href="#">Formal</a></li>
                <li><a href="#">Casual</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Baby Collection</h4>
              <ul>
                <li><a href="#">Clothing Fashion</a></li>
                <li><a href="#">Winter</a></li>
                <li><a href="#">Summer</a></li>
                <li><a href="#">Toy</a></li>
                <li><a href="#">Bags</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul>
                <li><a href="#">Track Your Order</a></li>
                <li><a href="#">Support</a></li>

                <li><a href="#">FAQ</a></li>
                <li><a href="#">Carrier</a></li>

                <li><a href="#">About</a></li>
                <li><a href="#">Contact Us</a></li>



              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-area text-center py-4 bg-gray-900">
          <p>&copy; {new Date().getFullYear()} QuadraCart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Hero Section Data
const heroSlides = [
  {
    image: "/top_3.jpg",
    title: "Embrace elegance and style",
    text: "The perfect blend of style and comfort, it's designed for the confident woman. Don’t miss out on this trend!",
    link: "#shop",
  },
  {
    image: "/top_1.jpg",
    title: "Newest trends in fashion now",
    text: "Discover the vibrant collection of cloth that will elevate your wardrobe",
    link: "#fashion",
  },
  {
    image: "/top_2.jpg",
    title: "2025 Men's Fashion Trend",
    text: "Step into the spotlight with confidence.",
    link: "#electronics",
  },
  {
    image: "/top_4.jpg",
    title: "Kid's World",
    text: "Unleash the magic of childhood with our enchanting apparel!",
    link: "#electronics",
  },
];
const services = [
  { icon: "/services_1.svg", title: "Fast & Free Delivery", text: "Free delivery on all orders" },
  { icon: "/services_2.svg", title: "Secure Payment", text: "Your security is our priority" },
  { icon: "/services_3.svg", title: "Money Back Guarantee", text: "30-day refund policy" },
  { icon: "/services_4.svg", title: "Online Support", text: "24/7 customer service" },
];

const testimonials = [
  { quote: "Best shopping experience ever!", image: "/customer_3.jpg", name: "Petey Cruiser", position: "Actor" },
  { quote: "Amazing customer service and great products!", image: "/customer_2.jpg", name: "Jane Doe", position: "Fashion Blogger" },
];

// Category Section
function CategorySection({
  title,
  initialProducts,
  rtl,
}: {
  title: string;
  initialProducts: ProductCardProps[];
  rtl: boolean;
}) {
  const [shuffledProducts, setShuffledProducts] = useState<ProductCardProps[]>(
    []
  );

  useEffect(() => {
    setShuffledProducts([...initialProducts].sort(() => Math.random() - 0.5));
  }, [initialProducts]);

  return (
    
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
      <div className={`flex ${rtl ? "flex-row-reverse" : ""}`}>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          dir={rtl ? "rtl" : "ltr"}
          className="w-full"
        >
          {shuffledProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// Product Card Component
type ProductCardProps = {
  title: string;
  image: string;
  price: string;
};

function ProductCard({ title, image, price }: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center w-[212px] mx-auto">
      <div className="w-[180px] h-[200px] mx-auto">
        <Image
          src={image}
          width={180}
          height={200}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold mt-3">{title}</h3>
      <p className="text-gray-600">{price}</p>
      <button className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">
        Buy Now
      </button>
    </div>
  );
}

// Product Data
const menProducts: ProductCardProps[] = [
  { title: "Men's T-Shirt", image: "/t-shirt_1.jpg", price: "$50" },
  { title: "Men's Half-Shirt", image: "/half-shirt_1.jpg", price: "$75" },
  { title: "Men's Full-Shirt", image: "/full-shirt_1.jpg", price: "$90" },
  { title: "Formal Shoes", image: "/formal-shoe_1.jpg", price: "$90" },
  { title: "Male Perfume", image: "/men-perfume_1.jpg", price: "$110" },
];

const womenProducts: ProductCardProps[] = [
  { title: "Women's Dress", image: "/dress_1.jpg", price: "$60" },
  { title: "Saree", image: "/saree-1.jpg", price: "$70" },
  { title: "Ladies Sandals", image: "/sandal_1.jpg", price: "$80" },
  { title: "Handbag", image: "/handbag_1.jpg", price: "$120" },
  { title: "Female Perfume", image: "/women-perfume_1.jpg", price: "$120" },
];

const kidsProducts: ProductCardProps[] = [
  { title: "Kids Dress", image: "/kid-dress.jpg", price: "$30" },
  { title: "Kids Sneakers", image: "/kid-sneaker_1.jpg", price: "$40" },
  { title: "Kids Bags", image: "/kid-bag_1.jpg", price: "$55" },
  { title: "Toy Set", image: "/kid-toy_1.jpg", price: "$35" },
];



