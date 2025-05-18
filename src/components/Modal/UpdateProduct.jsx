// import React, { useState } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { colorOptions } from "../../data/Option";
// import { firebase } from "../../firebaseConfig";

// const UpdateProduct = ({ isOpen, onClose, product, editableApi, staffUsername }) => {
//   if (!isOpen || !product) return null;

//   const [productName, setProductName] = useState(product.productName || "");
//   const [category, setCategory] = useState(product.category || "");
//   const [subCategory, setSubCategory] = useState(product.subCategory || "");
//   const [gender, setGender] = useState(product.gender || "");
//   const [size, setSize] = useState(product.size || "");
//   const [color, setColor] = useState(product.color || "");
//   const [imageFile, setImageFile] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(product.imageUrl || "");
//   const [loading, setLoading] = useState(false);

//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!productName) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     setLoading(true);
//     try {
//       let downloadURL = product.imageUrl;
//       if (imageFile) {
//         const storageRef = firebase.storage().ref();
//         const fileRef = storageRef.child(`product_images/${product.staffUsername}_${Date.now()}`);
//         await fileRef.put(imageFile);
//         downloadURL = await fileRef.getDownloadURL();
//       }

//       const updatedProduct = {
//         ...product,
//         staffUsername,
//         productName,
//         category,
//         subCategory,
//         gender,
//         size,
//         color,
//         imageUrl: downloadURL,
//       };

//       const response = await axios.put(`https://online-shop-server-1.onrender.com/${editableApi}/${product._id}`, updatedProduct);
//       alert(response.data.message);
//       onClose();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[75vh] overflow-auto shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Update Product</h2>
//         <label className="block text-sm font-medium mb-2">Product Image</label>
//         <input type="file" accept="image/*" onChange={addImage} className="hidden" id="updateFileInput" />
//         <div className="w-full flex justify-center items-center h-52 rounded-2xl mb-5 cursor-pointer border border-gray-300" onClick={() => document.getElementById("updateFileInput").click()}>
//           <img src={selectedImage} alt="Preview" className="w-full h-full rounded-2xl object-contain" />
//         </div>
//         <label className="block text-sm font-medium mb-2">Product Name</label>
//         <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2 border rounded mb-4 border-gray-300" placeholder="Enter product name" />
//         <label className="block text-sm font-medium mb-2">Color</label>
//         <Select options={colorOptions} value={color} onChange={setColor} className="mb-4" />
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Updating..." : "Update"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;


// import React, { useState } from "react";
// import axios from "axios";
// import { firebase } from "../../firebaseConfig";

// const UpdateProduct = ({ isOpen, onClose, product, editableApi, staffUsername }) => {
//   if (!isOpen || !product) return null;

//   const [productName, setProductName] = useState(product.productName || "");
//   const [category, setCategory] = useState(product.category || "");
//   const [subCategory, setSubCategory] = useState(product.subCategory || "");
//   const [gender, setGender] = useState(product.gender || "");
//   const [size, setSize] = useState(product.size || "");
//   const [color, setColor] = useState(product.color || "");
//   const [imageFile, setImageFile] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(product.imageUrl || "");
//   const [loading, setLoading] = useState(false);

//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!productName) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     setLoading(true);
//     try {
//       let downloadURL = product.imageUrl;
//       if (imageFile) {
//         const storageRef = firebase.storage().ref();
//         const fileRef = storageRef.child(`product_images/${product.staffUsername}_${Date.now()}`);
//         await fileRef.put(imageFile);
//         downloadURL = await fileRef.getDownloadURL();
//       }

//       const updatedProduct = {
//         ...product,
//         staffUsername,
//         productName,
//         category,
//         subCategory,
//         gender,
//         size,
//         color,
//         imageUrl: downloadURL,
//       };

//       const response = await axios.put(`https://online-shop-server-1.onrender.com/${editableApi}/${product._id}`, updatedProduct);
//       alert(response.data.message);
//       onClose();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[75vh] overflow-auto shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Update Product</h2>

//         <label className="block text-sm font-medium mb-2">Product Image</label>
//         <input type="file" accept="image/*" onChange={addImage} className="hidden" id="updateFileInput" />
//         <div
//           className="w-full flex justify-center items-center h-52 rounded-2xl mb-5 cursor-pointer border border-gray-300"
//           onClick={() => document.getElementById("updateFileInput").click()}
//         >
//           <img src={selectedImage} alt="Preview" className="w-full h-full rounded-2xl object-contain" />
//         </div>

//         <label className="block text-sm font-medium mb-2">Product Name</label>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="w-full p-2 border rounded mb-4 border-gray-300"
//           placeholder="Enter product name"
//         />

//         <label className="block text-sm font-medium mb-2">Color</label>
//         <input
//           type="text"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           className="w-full p-2 border rounded mb-4 border-gray-300"
//           placeholder="Enter color"
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;


// With multiple images
import React, { useState, useEffect } from "react";
import axios from "axios";
import { firebase } from "../../firebaseConfig";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UpdateProduct = ({ isOpen, onClose, product, editableApi, staffUsername }) => {
  if (!isOpen || !product) return null;

  const [productName, setProductName] = useState(product.productName || "");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(product.imageUrls || []);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState({
    category: [],
    subCategory: [],
    brand: [],
    color: [],
    sizes: [],
    sex: [],
  });

  const [category, setCategory] = useState(product.category || "");
  const [subCategory, setSubCategory] = useState(product.subCategory || "");
  const [brand, setBrand] = useState(product.brand || "");
  const [size, setSize] = useState(product.size || "");
  const [color, setColor] = useState(product.color || "");
  const [sex, setSex] = useState(product.sex || "");


  // Field values and setters to avoid eval()
  const fieldValues = { category, subCategory, brand, size, color, sex };
  const setters = { category: setCategory, subCategory: setSubCategory, brand: setBrand, size: setSize, color: setColor, sex: setSex };

  // useEffect(() => {
  //   const fetchMaintenanceData = async () => {
  //     try {
  //       const [maintenanceRes, allProductRes] = await Promise.all([
  //         axios.get("https://online-shop-server-1.onrender.com/api/product-maintenance"),
  //         axios.get("https://online-shop-server-1.onrender.com/api/products"),
  //       ]);

  //       const data = maintenanceRes.data[0];
  //       setAllProducts(allProductRes.data);

  //       if (data) {
  //         setOptions({
  //           category: Array.isArray(data.category) ? data.category : [],
  //           subCategory: Array.isArray(data.subCategory) ? data.subCategory : [],
  //           brand: Array.isArray(data.brand) ? data.brand : [],
  //           color: Array.isArray(data.color) ? data.color : [],
  //           size: Array.isArray(data.sizes) ? data.sizes : [],
  //           sex: Array.isArray(data.sex) ? data.sex : [data.sex],
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch data:", err);
  //     }
  //   };

  //   fetchMaintenanceData();
  // }, []);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const maintenanceRes = await axios.get("https://online-shop-server-1.onrender.com/api/product-maintenance");
  
        const maintenanceData = maintenanceRes.data; // Array of maintenance objects
  
        // Find the maintenance entry where productID matches the current product's _id
        const matchedMaintenance = maintenanceData.find(item => item.productID === product.productID);
  
        if (matchedMaintenance) {
          setOptions({
            category: Array.isArray(matchedMaintenance.category) ? matchedMaintenance.category : [],
            subCategory: Array.isArray(matchedMaintenance.subCategory) ? matchedMaintenance.subCategory : [],
            brand: Array.isArray(matchedMaintenance.brand) ? matchedMaintenance.brand : [],
            color: Array.isArray(matchedMaintenance.color) ? matchedMaintenance.color : [],
            size: Array.isArray(matchedMaintenance.sizes) ? matchedMaintenance.sizes : [],
            sex: Array.isArray(matchedMaintenance.sex) ? matchedMaintenance.sex : [matchedMaintenance.sex],
          });
        } else {
          setOptions({
            category: [],
            subCategory: [],
            brand: [],
            color: [],
            size: [],
            sex: [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch product maintenance data:", err);
      }
    };
  
    if (product && product.productID) {
      fetchMaintenanceData();
    }
  }, [product]);
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleUpdate = async () => {
    if (!productName || !category || !brand || !color) {
      return MySwal.fire({
        icon: "warning",
        title: "Incomplete fields",
        text: "Please fill in all required fields.",
      });
    }

    const normalized = (str) =>
      str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const duplicate = allProducts.some(
      (item) =>
        item._id !== product._id && // exclude the product being updated
        item.productName &&
        normalized(item.productName) === normalized(productName)
    );

    if (duplicate) {
      setLoading(false);
      return MySwal.fire({
        icon: "error",
        title: "Duplicate Product",
        text: "Another product with this name already exists.",
      });
    }

    setLoading(true);
    try {
      let uploadedUrls = [...product.imageUrls];

      if (imageFiles.length > 0) {
        const storageRef = firebase.storage().ref();
        uploadedUrls = [];

        for (const file of imageFiles) {
          const fileRef = storageRef.child(`product_images/${staffUsername}_${Date.now()}_${file.name}`);
          await fileRef.put(file);
          const url = await fileRef.getDownloadURL();
          uploadedUrls.push(url);
        }
      }

      const updatedProduct = {
        ...product,
        staffUsername,
        productName,
        category,
        subCategory,
        brand,
        size,
        color,
        sex,
        imageUrls: uploadedUrls,
      };

      const response = await axios.put(`https://online-shop-server-1.onrender.com/${editableApi}/${product._id}`, updatedProduct);

      await MySwal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message || "Product updated successfully!",
      });

      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      MySwal.fire({
        icon: "error",
        title: "Update failed",
        text: "Failed to update product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[85vh] overflow-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>

        <label className="block text-sm font-medium mb-2">Product Images</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" id="fileInput" />
        <div
          className="w-full h-52 overflow-y-auto border border-dashed border-gray-400 rounded-2xl p-3 mb-5 cursor-pointer relative group"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {imagePreviews.length === 0 ? (
            <div className="flex flex-col items-center content-center justify-center h-full">
              <img src={add} alt="Add" className="w-8 h-8 object-contain mb-2" />
              <p className="text-gray-500 text-sm">Click to upload images</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {imagePreviews.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview-${index}`}
                  className="w-full h-20 object-contain rounded-lg border"
                />
              ))}
            </div>
          )}
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Add Images
          </span>
        </div>

        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          value={productName}
          onChange={e => setProductName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {["category", "subCategory", "brand", "size", "color", "sex"].map(field => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <select
              value={fieldValues[field]}
              onChange={e => setters[field](e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select {field}</option>
              {(Array.isArray(options[field]) ? options[field] : []).map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
