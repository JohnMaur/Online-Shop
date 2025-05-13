// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { UserNavBar, Header, MobileNavBar } from "../layout";
// import { motion } from "framer-motion";
// import { Package, CalendarCheck, CreditCard, ShoppingCart, Star } from "lucide-react";
// import { firebase } from "../../firebaseConfig"; // <-- Make sure you import firebase
// import { add } from "../../assets/icons"; // Placeholder image (like your first code)
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const UserOrderReceived = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [rating, setRating] = useState({});
//   const [review, setReview] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [hasReviewed, setHasReviewed] = useState({});
//   const [selectedImage, setSelectedImage] = useState({});
//   const [imageFile, setImageFile] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.username) {
//       fetchOrders(user.username);
//     }
//   }, []);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setShowMobileNav(prev => !prev);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchOrders = async (username) => {
//     try {
//       const response = await axios.get(`https://online-shop-server-1.onrender.com/api/order-received/${username}`);
//       setOrders(response.data);

//       const reviewResponses = await Promise.all(
//         response.data.map(order =>
//           axios.get(`https://online-shop-server-1.onrender.com/api/review/${order._id}/${username}`)
//         )
//       );

//       const reviewStatus = reviewResponses.reduce((acc, res, idx) => {
//         acc[response.data[idx]._id] = res.data.hasReviewed;
//         return acc;
//       }, {});
//       setHasReviewed(reviewStatus);
//     } catch (error) {
//       console.error("Error fetching received orders:", error);
//     }
//   };

//   const openReviewModal = async (order) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (hasReviewed[order._id]) {
//       try {
//         const res = await axios.get(`https://online-shop-server-1.onrender.com/api/review/${order._id}/${user.username}`);
//         const reviewData = res.data.review;

//         setRating(prev => ({ ...prev, [order._id]: reviewData.rating }));
//         setReview(prev => ({ ...prev, [order._id]: reviewData.review }));

//         // ADD THIS: If there is a review image, load it into selectedImage
//         if (reviewData.reviewImageUrl) {
//           setSelectedImage(prev => ({ ...prev, [order._id]: reviewData.reviewImageUrl }));
//         }

//       } catch (error) {
//         console.error("Failed to load previous review:", error);
//       }
//     }

//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//     setSelectedImage({});
//     setImageFile({});
//   };

//   const handleStarClick = (orderId, starCount) => {
//     setRating(prev => ({ ...prev, [orderId]: starCount }));
//   };

//   const handleReviewChange = (orderId, text) => {
//     setReview(prev => ({ ...prev, [orderId]: text }));
//   };

//   const addImage = (event, orderId) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(prev => ({ ...prev, [orderId]: URL.createObjectURL(file) }));
//       setImageFile(prev => ({ ...prev, [orderId]: file }));
//     }
//   };

//   const handleSubmitReview = async (order) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!rating[order._id] || !review[order._id]) {
//       MySwal.fire({
//         icon: 'warning',
//         title: 'Incomplete!',
//         text: 'Please complete both star rating and review text!',
//       });
//       return;
//     }

//     setIsSubmitting(true); // <--- Start loading

//     try {
//       let imageUrl = null;

//       if (imageFile[order._id]) {
//         const storageRef = firebase.storage().ref();
//         const fileRef = storageRef.child(`review_images/${user.username}_${Date.now()}`);
//         await fileRef.put(imageFile[order._id]);
//         imageUrl = await fileRef.getDownloadURL();
//       }

//       const accountInfoRes = await axios.get(`https://online-shop-server-1.onrender.com/api/account-info/${user.username}`);
//       const accountInfo = accountInfoRes.data;

//       const reviewPayload = {
//         orderId: order._id,
//         productID: order.productID,
//         username: user.username,
//         productName: order.productName,
//         rating: rating[order._id],
//         review: review[order._id],
//         accountInfo,
//         reviewImageUrl: imageUrl, // pass the image URL
//       };

//       if (hasReviewed[order._id]) {
//         await axios.put("https://online-shop-server-1.onrender.com/api/update-review", reviewPayload);
//         MySwal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Review updated successfully!',
//         });
//       } else {
//         await axios.post("https://online-shop-server-1.onrender.com/api/submit-review", reviewPayload);
//         MySwal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Review submitted successfully!',
//         });
//       }

//       setRating(prev => ({ ...prev, [order._id]: 0 }));
//       setReview(prev => ({ ...prev, [order._id]: "" }));
//       setSelectedImage(prev => ({ ...prev, [order._id]: null }));
//       setImageFile(prev => ({ ...prev, [order._id]: null }));

//       fetchOrders(user.username);
//       closeModal();
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to submit review. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false); // <--- Stop loading
//     }
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />

//         {showMobileNav && (
//           <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
//             <MobileNavBar />
//           </div>
//         )}

//         <div className="flex-1 overflow-auto mt-14 bg-gradient-to-b from-[#f4f4f4] to-[#e6e6e6] p-4">
//           <div className="grid gap-6">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <motion.div
//                   key={order._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6 space-y-4"
//                 >
//                   <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                     <CalendarCheck size={20} /> Order Received Date:
//                     <span className="ml-2">{order.orderReceivedDate}</span>
//                   </p>

//                   <div className="flex flex-col md:flex-row gap-5">
//                     <img
//                       src={order.imageUrl}
//                       alt="Product"
//                       className="w-32 h-32 object-contain border rounded-lg"
//                     />

//                     <div className="flex-1 space-y-1 text-gray-700">
//                       <p className="text-lg font-bold flex items-center gap-2">
//                         <Package size={18} /> {order.productName}
//                       </p>
//                       <p className="text-base">₱{order.price}</p>
//                       <p className="text-base">Quantity: {order.quantity}</p>
//                       <p className="text-base flex items-center gap-1">
//                         <CreditCard size={16} /> {order.paymentMethod}
//                       </p>
//                       <p className="text-sm text-gray-500 flex items-center gap-1">
//                         <ShoppingCart size={16} /> Ordered At:{" "}
//                         {new Date(order.orderedAt).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => openReviewModal(order)}
//                     className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer"
//                   >
//                     {hasReviewed[order._id] ? "Update Review" : "Leave a Review"}
//                   </button>

//                 </motion.div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 text-lg mt-10">
//                 No orders received yet.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>

// {/* Review Modal */}
// {showModal && selectedOrder && (
//   <div className="fixed inset-0 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg w-96">
//       <h2 className="text-xl font-bold mb-4">Review Product</h2>

//       {/* Star Rating */}
//       <div className="flex mb-4">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`h-8 w-8 cursor-pointer ${rating[selectedOrder._id] >= star ? "text-yellow-400" : "text-gray-400"}`}
//             onClick={() => handleStarClick(selectedOrder._id, star)}
//           />
//         ))}
//       </div>

//       {/* Review Text */}
//       <textarea
//         className="w-full p-2 border rounded mb-4"
//         rows="4"
//         placeholder="Write your review..."
//         value={review[selectedOrder._id] || ""}
//         onChange={(e) => handleReviewChange(selectedOrder._id, e.target.value)}
//       />

//       {/* Upload Image */}
//       <input type="file" accept="image/*" onChange={(e) => addImage(e, selectedOrder._id)} className="hidden" id="fileInput" />
//       <div
//         className={`${selectedImage[selectedOrder._id] ? "" : "border-[1px] border-blue-500 hover:bg-gray-100 hover:border-[2px]"} w-full flex justify-center items-center h-40 rounded-2xl mb-4 cursor-pointer relative group`}
//         onClick={() => document.getElementById("fileInput").click()}
//       >
//         <img
//           src={selectedImage[selectedOrder._id] || add}
//           alt="Preview"
//           className={`${selectedImage[selectedOrder._id] ? "w-full h-full rounded-2xl" : "w-8 h-8"} object-contain border-[1px] border-blue-500`}
//         />
//         <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
//           Add Image
//         </span>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-2">
//         <button className="px-4 py-2 bg-gray-300 rounded cursor-pointer" onClick={closeModal}>
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:opacity-50 cursor-pointer"
//           onClick={() => handleSubmitReview(selectedOrder)}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default UserOrderReceived;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserNavBar, Header, MobileNavBar } from "../layout";
import { motion } from "framer-motion";
import { Package, CalendarCheck, CreditCard, ShoppingCart, Star } from "lucide-react";
import { firebase } from "../../firebaseConfig";
import { add } from "../../assets/icons";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Spin } from "antd"; // <-- Import Spin from Ant Design

const MySwal = withReactContent(Swal);

const UserOrderReceived = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState({});
  const [review, setReview] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasReviewed, setHasReviewed] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- Add loading state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      fetchOrders(user.username);
    }
  }, []);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setShowMobileNav(prev => !prev);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const fetchOrders = async (username) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`https://online-shop-server-1.onrender.com/api/order-received/${username}`);
      setOrders(response.data);

      const reviewResponses = await Promise.all(
        response.data.map(order =>
          axios.get(`https://online-shop-server-1.onrender.com/api/review/${order._id}/${username}`)
        )
      );

      const reviewStatus = reviewResponses.reduce((acc, res, idx) => {
        acc[response.data[idx]._id] = res.data.hasReviewed;
        return acc;
      }, {});
      setHasReviewed(reviewStatus);
    } catch (error) {
      console.error("Error fetching received orders:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const openReviewModal = async (order) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (hasReviewed[order._id]) {
      try {
        const res = await axios.get(`https://online-shop-server-1.onrender.com/api/review/${order._id}/${user.username}`);
        const reviewData = res.data.review;

        setRating(prev => ({ ...prev, [order._id]: reviewData.rating }));
        setReview(prev => ({ ...prev, [order._id]: reviewData.review }));

        if (reviewData.reviewImageUrl) {
          setSelectedImage(prev => ({ ...prev, [order._id]: reviewData.reviewImageUrl }));
        }
      } catch (error) {
        console.error("Failed to load previous review:", error);
      }
    }

    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setSelectedImage({});
    setImageFile({});
  };

  const handleStarClick = (orderId, starCount) => {
    setRating(prev => ({ ...prev, [orderId]: starCount }));
  };

  const handleReviewChange = (orderId, text) => {
    setReview(prev => ({ ...prev, [orderId]: text }));
  };

  const addImage = (event, orderId) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(prev => ({ ...prev, [orderId]: URL.createObjectURL(file) }));
      setImageFile(prev => ({ ...prev, [orderId]: file }));
    }
  };

  const handleSubmitReview = async (order) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!rating[order._id] || !review[order._id]) {
      MySwal.fire({
        icon: 'warning',
        title: 'Incomplete!',
        text: 'Please complete both star rating and review text!',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (imageFile[order._id]) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`review_images/${user.username}_${Date.now()}`);
        await fileRef.put(imageFile[order._id]);
        imageUrl = await fileRef.getDownloadURL();
      }

      const accountInfoRes = await axios.get(`https://online-shop-server-1.onrender.com/api/account-info/${user.username}`);
      const accountInfo = accountInfoRes.data;

      const reviewPayload = {
        orderId: order._id,
        productID: order.productID,
        username: user.username,
        productName: order.productName,
        rating: rating[order._id],
        review: review[order._id],
        accountInfo,
        reviewImageUrl: imageUrl,
      };

      if (hasReviewed[order._id]) {
        await axios.put("https://online-shop-server-1.onrender.com/api/update-review", reviewPayload);
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Review updated successfully!',
        });
      } else {
        await axios.post("https://online-shop-server-1.onrender.com/api/submit-review", reviewPayload);
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Review submitted successfully!',
        });
      }

      setRating(prev => ({ ...prev, [order._id]: 0 }));
      setReview(prev => ({ ...prev, [order._id]: "" }));
      setSelectedImage(prev => ({ ...prev, [order._id]: null }));
      setImageFile(prev => ({ ...prev, [order._id]: null }));

      fetchOrders(user.username);
      closeModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit review. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />

        {showMobileNav && (
          <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
            <MobileNavBar />
          </div>
        )}

        <div className="flex-1 overflow-auto mt-14 bg-gradient-to-b from-[#f4f4f4] to-[#e6e6e6] p-4">
          <div className="grid gap-6">
            {isLoading ? ( // <-- Show Spinner while loading
              <div className="flex justify-center items-center w-full h-64">
                <Spin size="large" />
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6 space-y-4"
                >
                  <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <CalendarCheck size={20} /> Order Received Date:
                    <span className="ml-2">{order.orderReceivedDate}</span>
                  </p>

                  <div className="flex flex-col md:flex-row gap-5">
                    <img
                      src={order.imageUrl}
                      alt="Product"
                      className="w-32 h-32 object-contain border rounded-lg"
                    />

                    <div className="flex-1 space-y-1 text-gray-700">
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Package size={18} /> {order.productName}
                      </p>
                      <p className="text-base">₱{order.price}</p>
                      <p className="text-base">Quantity: {order.quantity}</p>
                      <p className="text-base flex items-center gap-1">
                        <CreditCard size={16} /> {order.paymentMethod}
                      </p>
                      <p className="text-base flex items-center gap-1">
                        <ShoppingCart size={16} /> {order.shippingStatus}
                      </p>
                    </div>
                  </div>

                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer active:opacity-65"
                    onClick={() => openReviewModal(order)}
                  >
                    {hasReviewed[order._id] ? "Edit Review" : "Write a Review"}
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600">No orders received yet.</p>
            )}
          </div>
        </div>
      </div>
      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>


      {/* Review Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Review Product</h2>

            {/* Star Rating */}
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${rating[selectedOrder._id] >= star ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => handleStarClick(selectedOrder._id, star)}
                />
              ))}
            </div>

            {/* Review Text */}
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Write your review..."
              value={review[selectedOrder._id] || ""}
              onChange={(e) => handleReviewChange(selectedOrder._id, e.target.value)}
            />

            <p className="mb-2">Picture of product</p>
            {/* Upload Image */}
            <input type="file" accept="image/*" onChange={(e) => addImage(e, selectedOrder._id)} className="hidden" id="fileInput" />
            <div
              className={`${selectedImage[selectedOrder._id] ? "" : "border-[1px] border-blue-500 hover:bg-gray-100 hover:border-[2px]"} w-full flex justify-center items-center h-40 rounded-2xl mb-4 cursor-pointer relative group`}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img
                src={selectedImage[selectedOrder._id] || add}
                alt="Preview"
                className={`${selectedImage[selectedOrder._id] ? "w-full h-full rounded-2xl" : "w-8 h-8"} object-contain border-[1px] border-blue-500`}
              />
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Add Image
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 active:bg-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:opacity-50 hover:bg-blue-600 active:bg-blue-700"
                onClick={() => handleSubmitReview(selectedOrder)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default UserOrderReceived;
