// import React, { useState } from 'react';
// import { UserNavBar, Header } from "../layout"

// const UsersProduct = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <p>Usersproduct</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar
//           isNavCollapsed={isNavCollapsed}
//           responsiveLink="/user-product"
//         />
//       </nav>

//     </div>
//   )
// }

// export default UsersProduct

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { UserNavBar, Header } from "../layout";
// import axios from 'axios'; // 🛑 install axios if you haven't: npm install axios
// import { Star } from 'lucide-react'; // Import Star from lucide-react

// const UsersProduct = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [productID, setProductID] = useState(null);
//   const [reviews, setReviews] = useState([]); // 🛑 Add reviews state

//   const location = useLocation();

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const id = queryParams.get('productID');
//     setProductID(id);
//   }, [location.search]);

//   useEffect(() => {
//     if (productID) {
//       fetchReviews();
//     }
//   }, [productID]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/reviews-by-product/${productID}`);
//       console.log(res.data); // <-- you added this line
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   // Helper function to render stars
//   const renderStars = (rating) => {
//     let stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         stars.push(<Star key={i} color="#ffd700" size={24} />); // Filled star
//       } else {
//         stars.push(<Star key={i} color="#e4e4e4" size={24} />); // Empty star
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-4`}>
//           <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>

//           {reviews.length === 0 ? (
//             <p>No reviews for this product yet.</p>
//           ) : (
//             <div className="grid gap-4">
//               {reviews.map((review, idx) => (
//                 <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
//                   <div className="flex items-center mb-2">
//                     {renderStars(Number(review.rating) || 0)} {/* Call the renderStars function */}
//                   </div>

//                   <p className="text-gray-800 mb-2">{review.review}</p>

//                   {review.reviewImageUrl && (
//                     <img
//                       src={review.reviewImageUrl}
//                       alt="Review"
//                       className="w-40 h-40 object-cover rounded-md mb-2"
//                     />
//                   )}

//                   <p className="text-sm text-gray-500">Reviewed by: {review.accountInfo?.recipientName || "Anonymous"}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} responsiveLink="/user-product" />
//       </nav>
//     </div>
//   );
// };

// export default UsersProduct;


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { UserNavBar, Header } from "../layout";
// import axios from 'axios'; // 🛑 install axios if you haven't: npm install axios
// import { Star } from 'lucide-react'; // Import Star from lucide-react
// import { FaUserCircle } from 'react-icons/fa'; // Importing a smaller User icon from react-icons

// const UsersProduct = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [productID, setProductID] = useState(null);
//   const [reviews, setReviews] = useState([]); // 🛑 Add reviews state

//   const location = useLocation();

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const id = queryParams.get('productID');
//     setProductID(id);
//   }, [location.search]);

//   useEffect(() => {
//     if (productID) {
//       fetchReviews();
//     }
//   }, [productID]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/reviews-by-product/${productID}`);
//       console.log(res.data); // <-- you added this line
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   // Helper function to render stars
//   const renderStars = (rating) => {
//     let stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         stars.push(<Star key={i} color="#ffd700" size={24} />);
//       } else {
//         stars.push(<Star key={i} color="#e4e4e4" size={24} />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         <div className={`flex-1 overflow-auto mt-14 bg-white p-8`}>
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product Reviews</h2>

//           {reviews.length === 0 ? (
//             <p className="text-lg text-gray-500">No reviews for this product yet.</p>
//           ) : (
//             <div className="space-y-6">
//               {reviews.map((review, idx) => (
//                 <div key={idx} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
//                   <div className="flex items-center mb-3">
//                     <div className="flex-shrink-0">
//                       {/* Profile Icon or Image */}
//                       {review.accountInfo?.profilePicture ? (
//                         <img
//                           src={review.accountInfo.profilePicture}
//                           alt="Reviewer"
//                           className="w-10 h-10 object-cover rounded-full mr-4"
//                         />
//                       ) : (
//                         <FaUserCircle size={36} color="#4A90E2" className="mr-4" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center">
//                         {renderStars(Number(review.rating) || 0)} {/* Star rating */}
//                       </div>
//                       <p className="text-gray-600 text-sm mt-1">
//                         <span className="font-semibold">{review.accountInfo?.recipientName || "Anonymous"}</span>
//                         <span className="text-gray-400 ml-2">- {new Date(review.createdAt).toLocaleDateString()}</span>
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-gray-700 mb-4">{review.review}</p>

//                   {review.reviewImageUrl && (
//                     <div className="mb-4">
//                       <img
//                         src={review.reviewImageUrl}
//                         alt="Review"
//                         className="w-full h-auto object-cover rounded-md shadow-md"
//                       />
//                     </div>
//                   )}

//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} responsiveLink="/user-product" />
//       </nav>
//     </div>
//   );
// };

// export default UsersProduct;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { UserNavBar, Header } from "../layout";
// import axios from 'axios';
// import { FaUserCircle } from 'react-icons/fa';
// import { Star } from 'lucide-react'; // Import Star from lucide-react

// const UsersProduct = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [productID, setProductID] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const location = useLocation();
//   const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const id = queryParams.get('productID');
//     setProductID(id);
//   }, [location.search]);

//   useEffect(() => {
//     if (productID) fetchReviews();
//   }, [productID]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/reviews-by-product/${productID}`);
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   // Helper function to render stars
//   const renderStars = (rating) => {
//     let stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         stars.push(<Star key={i} color="#ffd700" size={24} />);
//       } else {
//         stars.push(<Star key={i} color="#e4e4e4" size={24} />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         {/* Content inside this */}
//         <div className="flex-1 overflow-auto mt-14 bg-gray-50 p-6">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Reviews</h2>

//           {reviews.length === 0 ? (
//             <p className="text-gray-500 text-sm">No reviews for this product yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {reviews.map((review, idx) => (
//                 <div key={idx} className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-2">
//                     {review.accountInfo?.profilePicture ? (
//                       <img
//                         src={review.accountInfo.profilePicture}
//                         alt="Reviewer"
//                         className="w-8 h-8 rounded-full object-cover mr-3"
//                       />
//                     ) : (
//                       <FaUserCircle size={28} className="text-blue-400 mr-3" />
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center">
//                         {renderStars(Number(review.rating) || 0)} {/* Star rating */}
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {review.accountInfo?.recipientName || "Anonymous"} • {new Date(review.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-gray-700 text-sm mb-2">{review.review}</p>

//                   {review.reviewImageUrl && (
//                     <img
//                       src={review.reviewImageUrl}
//                       alt="Review"
//                       className="w-full max-w-xs rounded-md shadow-sm"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>


//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} responsiveLink="/user-product" />
//       </nav>
//     </div>
//   );
// };
 
// export default UsersProduct;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserNavBar, Header, MobileNavBar } from "../layout";
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { Star } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

const UsersProduct = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [productID, setProductID] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setShowMobileNav(prev => !prev);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  // Close mobile nav on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const res = await axios.get(`http://localhost:3000/api/reviews-by-product/${productID}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/stocks");
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
        <UserNavBar isNavCollapsed={isNavCollapsed} responsiveLink="/user-product" />
      </nav>

      {/* Main Content */}
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        {showMobileNav && (
          <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
            <MobileNavBar />
          </div>
        )}

        <div className="flex-1 overflow-auto mt-14 bg-gray-50 p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/home')}
            className="flex items-center mb-4 text-blue-500 hover:underline"
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

export default UsersProduct;
 