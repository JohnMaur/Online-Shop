import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import axios from 'axios';
import { Star } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ProductDetails, ProductReviews } from '../../components';

const StaffProductreview = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [productID, setProductID] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('productID');
    setProductID(id);
  }, [location.search]);

  useEffect(() => {
    if (productID) {
      fetchReviews();
      fetchProduct();
    }
  }, [productID]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`https://online-shop-server-1.onrender.com/api/reviews-by-product/${productID}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("https://online-shop-server-1.onrender.com/api/stocks");
      const foundProduct = res.data.find(p => p.productID === productID);
      setProduct(foundProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          color={i <= rating ? "#ffd700" : "#e4e4e4"}
          size={20}
        />
      );
    }
    return stars;
  };

  const handleNextImage = () => {
    if (product?.product?.imageUrl?.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.product.imageUrl.length);
    }
  };

  const handlePrevImage = () => {
    if (product?.product?.imageUrl?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + product.product.imageUrl.length) % product.product.imageUrl.length
      );
    }
  };

  return (
    <div className="flex w-full">
      {/* Sidebar (left) */}
      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>

      {/* Main Content */}
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} responsiveLink="/staff-product-review" />

        <div className="flex-1 overflow-auto mt-14 bg-gray-50 p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/stock-maintenance')}
            className="flex items-center mb-4 text-blue-500 hover:underline cursor-pointer"
          >
            <ArrowLeft className="mr-2" /> Back to Home
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Section */}
            <ProductDetails
              product={product}
              currentImageIndex={currentImageIndex}
              handlePrevImage={handlePrevImage}
              handleNextImage={handleNextImage}
              navigate={navigate}
            />
            <ProductReviews reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProductreview;