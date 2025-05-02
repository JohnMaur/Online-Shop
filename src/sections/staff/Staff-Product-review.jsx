
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { Star } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

const StaffProductreview = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [productID, setProductID] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);

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
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              {product ? (
                <div className="space-y-4">
                  <img
                    src={product.product.imageUrl}
                    alt={product.product.productName}
                    className="w-full max-w-md rounded-md object-cover shadow"
                  />
                  <div>
                    <p className="text-lg font-semibold">{product.product.productName}</p>
                    <p className="text-sm text-gray-500">{product.product.brand}</p>
                    <p className="text-md font-bold text-green-600">₱{product.shopPrice}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Product details not found.</p>
              )}
            </div>

            {/* Reviews Section */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Reviews</h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews for this product yet.</p>
              ) : (
                <div className="space-y-4 overflow-auto h-[70vh]">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-md shadow hover:shadow-md transition">
                      <div className="flex items-center mb-2">
                        {review.accountInfo?.profilePicture ? (
                          <img
                            src={review.accountInfo.profilePicture}
                            alt="Reviewer"
                            className="w-8 h-8 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <FaUserCircle size={28} className="text-blue-400 mr-3" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center">{renderStars(Number(review.rating) || 0)}</div>
                          <p className="text-xs text-gray-500 mt-1">
                            {review.accountInfo?.recipientName || "Anonymous"} • {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{review.review}</p>
                      {review.reviewImageUrl && (
                        <img
                          src={review.reviewImageUrl}
                          alt="Review"
                          className="w-full max-w-xs rounded-md shadow-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProductreview;