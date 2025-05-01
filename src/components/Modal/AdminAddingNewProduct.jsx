// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { add } from "../../assets/icons"; // Image for the placeholder
// import { firebase } from "../../firebaseConfig";

// const AdminAddingNewProduct = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
//   if (!isOpen) return null;

//   const [productData, setProductData] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [subCategoryOptions, setSubCategoryOptions] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [brand, setBrand] = useState(null);
//   const [gender, setGender] = useState(null);
//   const [size, setSize] = useState(null);
//   const [color, setColor] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch product and supplier data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await axios.get("http://localhost:3000/api/product-maintenance");
//         setProductData(productResponse.data);
//       } catch (error) {
//         console.error("Error fetching product or supplier data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const categoryOptions = [...new Set(productData.map((item) => item.category))].map((cat) => ({ value: cat, label: cat }));
//   const subCategoryOptionsList = category
//     ? [...new Set(
//       productData
//         .filter((item) => item.category === category.value)
//         .flatMap((item) => item.subCategory)
//     )].map((sub) => ({ value: sub, label: sub }))
//     : [];

//   const brandOptions = category
//     ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.brand))].map((brand) => ({ value: brand, label: brand }))
//     : [];

//   const sizeOptions = category
//     ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.sizes))].map((size) => ({ value: size, label: size }))
//     : [];

//   const colorOptions = category
//     ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.color))].map((col) => ({ value: col, label: col }))
//     : [];

//   const handleCategoryChange = (selected) => {
//     setCategory(selected);
//     setSubCategory(null);
//     setSize(null);
//     setColor(null);
//   };

//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   // const handleSave = async () => {
//   //   if (!productName) {
//   //     alert("Please enter the product name.");
//   //     return;
//   //   }
//   //   if (!category) {
//   //     alert("Please select a category.");
//   //     return;
//   //   }
//   //   if (!color) {
//   //     alert("Please select a color.");
//   //     return;
//   //   }
//   //   if (!imageFile) {
//   //     alert("Please upload an image.");
//   //     return;
//   //   }
//   //   setLoading(true);

//   //   try {
//   //     let downloadURL = null;

//   //     if (imageFile) {
//   //       const storageRef = firebase.storage().ref();
//   //       const fileRef = storageRef.child(`product_images/${staffUsername}_${Date.now()}`);
//   //       await fileRef.put(imageFile);
//   //       downloadURL = await fileRef.getDownloadURL();
//   //     }

//   //     const newProduct = {
//   //       staffUsername,
//   //       productName,
//   //       category: category.value,
//   //       subCategory: subCategory?.value || null,
//   //       brand: brand?.value || null,
//   //       gender: gender?.value || null,
//   //       size: size?.value || null,
//   //       color: color.value,
//   //       imageUrl: downloadURL,
//   //     };

//   //     console.log("Payload to send:", newProduct);

//   //     const response = await axios.post("http://localhost:3000/api/admin-add-product", newProduct);
//   //     alert(response.data.message);

//   //     refreshProducts();
//   //     onClose();
//   //   } catch (error) {
//   //     console.error("Error adding product:", error);
//   //     alert("Failed to add product.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSave = async () => {
//     if (!productName) {
//       alert("Please enter the product name.");
//       return;
//     }
//     if (!category) {
//       alert("Please select a category.");
//       return;
//     }
//     if (!color) {
//       alert("Please select a color.");
//       return;
//     }
//     if (!imageFile) {
//       alert("Please upload an image.");
//       return;
//     }
//     setLoading(true);
  
//     try {
//       let downloadURL = null;
  
//       if (imageFile) {
//         const storageRef = firebase.storage().ref();
//         const fileRef = storageRef.child(`product_images/${staffUsername}_${Date.now()}`);
//         await fileRef.put(imageFile);
//         downloadURL = await fileRef.getDownloadURL();
//       }
  
//       // 🎯 Find matching productMaintenance entry
//       const matchedProduct = productData.find((item) => 
//         item.category === category.value &&
//         (subCategory ? item.subCategory.includes(subCategory.value) : true) &&
//         (brand ? item.brand.includes(brand.value) : true) &&
//         (size ? item.sizes.includes(size.value) : true) &&
//         item.color.includes(color.value)
//       );
  
//       if (!matchedProduct) {
//         alert("No matching product maintenance entry found.");
//         setLoading(false);
//         return;
//       }
  
//       const newProduct = {
//         staffUsername,
//         productID: matchedProduct.productID, // 🎯 Use the found productID
//         productName,
//         category: category.value,
//         subCategory: subCategory?.value || null,
//         brand: brand?.value || null,
//         gender: gender?.value || null,
//         size: size?.value || null,
//         color: color.value,
//         imageUrl: downloadURL,
//       };
  
//       console.log("Payload to send:", newProduct);
  
//       const response = await axios.post("http://localhost:3000/api/admin-add-product", newProduct);
//       alert(response.data.message);
  
//       refreshProducts();
//       onClose();
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };  

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[75vh] overflow-auto">
//         <h2 className="text-xl font-semibold mb-4">ADD Product</h2>

//         <label className="block text-sm font-medium mb-2">Product Image</label>
//         <input type="file" accept="image/*" onChange={addImage} className="hidden" id="fileInput" />
//         <div
//           className={`${selectedImage ? "" : "border-[1px] border-[#2196F3] hover:bg-[#FCFCFC] hover:border-[2px]"} w-full flex justify-center items-center h-52 rounded-2xl mb-5 cursor-pointer active:opacity-65 relative group`}
//           onClick={() => document.getElementById("fileInput").click()}
//         >
//           <img src={selectedImage || add} alt="Preview" className={`${selectedImage ? "w-full h-full rounded-2xl" : "w-8 h-8"} object-contain mb-2`} />
//           <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
//             Add Image
//           </span>
//         </div>

//         <label className="block text-sm font-medium my-2">Product Name</label>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Enter product name"
//         />

//         <label className="block text-sm font-medium mb-2">Category</label>
//         <Select options={categoryOptions} value={category} onChange={handleCategoryChange} />

//         <label className="block text-sm font-medium my-2">SubCategory</label>
//         <Select options={subCategoryOptionsList} value={subCategory} onChange={setSubCategory} />

//         <label className="block text-sm font-medium my-2">Brand</label>
//         <Select options={brandOptions} value={brand} onChange={setBrand} />

//         <label className="block text-sm font-medium mb-2">Sizes</label>
//         <Select options={sizeOptions} value={size} onChange={setSize} className="mb-2" />

//         <label className="block text-sm font-medium my-2">Color</label>
//         <Select options={colorOptions} value={color} onChange={setColor} />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAddingNewProduct;
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { add } from "../../assets/icons"; // Image for the placeholder
import { firebase } from "../../firebaseConfig";
import Swal from "sweetalert2"; // Import SweetAlert2

const AdminAddingNewProduct = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
  if (!isOpen) return null;

  const [productData, setProductData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState(null);
  const [gender, setGender] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch product and supplier data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://localhost:3000/api/product-maintenance");
        setProductData(productResponse.data);
      } catch (error) {
        console.error("Error fetching product or supplier data:", error);
      }
    };
    fetchData();
  }, []);

  const categoryOptions = [...new Set(productData.map((item) => item.category))].map((cat) => ({ value: cat, label: cat }));
  const subCategoryOptionsList = category
    ? [...new Set(
      productData
        .filter((item) => item.category === category.value)
        .flatMap((item) => item.subCategory)
    )].map((sub) => ({ value: sub, label: sub }))
    : [];

  const brandOptions = category
    ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.brand))].map((brand) => ({ value: brand, label: brand }))
    : [];

  const sizeOptions = category
    ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.sizes))].map((size) => ({ value: size, label: size }))
    : [];

  const colorOptions = category
    ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.color))].map((col) => ({ value: col, label: col }))
    : [];

  const handleCategoryChange = (selected) => {
    setCategory(selected);
    setSubCategory(null);
    setSize(null);
    setColor(null);
  };

  const addImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    if (!productName) {
      Swal.fire({
        title: "Error",
        text: "Please enter the product name.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!category) {
      Swal.fire({
        title: "Error",
        text: "Please select a category.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!color) {
      Swal.fire({
        title: "Error",
        text: "Please select a color.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!imageFile) {
      Swal.fire({
        title: "Error",
        text: "Please upload an image.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    setLoading(true);
  
    try {
      let downloadURL = null;
  
      if (imageFile) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`product_images/${staffUsername}_${Date.now()}`);
        await fileRef.put(imageFile);
        downloadURL = await fileRef.getDownloadURL();
      }
  
      const matchedProduct = productData.find((item) => 
        item.category === category.value &&
        (subCategory ? item.subCategory.includes(subCategory.value) : true) &&
        (brand ? item.brand.includes(brand.value) : true) &&
        (size ? item.sizes.includes(size.value) : true) &&
        item.color.includes(color.value)
      );
  
      if (!matchedProduct) {
        Swal.fire({
          title: "Error",
          text: "No matching product maintenance entry found.",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }
  
      const newProduct = {
        staffUsername,
        productID: matchedProduct.productID,
        productName,
        category: category.value,
        subCategory: subCategory?.value || null,
        brand: brand?.value || null,
        gender: gender?.value || null,
        size: size?.value || null,
        color: color.value,
        imageUrl: downloadURL,
      };
  
      console.log("Payload to send:", newProduct);
  
      const response = await axios.post("http://localhost:3000/api/admin-add-product", newProduct);
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
  
      refreshProducts();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[75vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">ADD Product</h2>

        <label className="block text-sm font-medium mb-2">Product Image</label>
        <input type="file" accept="image/*" onChange={addImage} className="hidden" id="fileInput" />
        <div
          className={`${selectedImage ? "" : "border-[1px] border-[#2196F3] hover:bg-[#FCFCFC] hover:border-[2px]"} w-full flex justify-center items-center h-52 rounded-2xl mb-5 cursor-pointer active:opacity-65 relative group`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img src={selectedImage || add} alt="Preview" className={`${selectedImage ? "w-full h-full rounded-2xl" : "w-8 h-8"} object-contain mb-2`} />
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Add Image
          </span>
        </div>

        <label className="block text-sm font-medium my-2">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter product name"
        />

        <label className="block text-sm font-medium mb-2">Category</label>
        <Select options={categoryOptions} value={category} onChange={handleCategoryChange} />

        <label className="block text-sm font-medium my-2">SubCategory</label>
        <Select options={subCategoryOptionsList} value={subCategory} onChange={setSubCategory} />

        <label className="block text-sm font-medium my-2">Brand</label>
        <Select options={brandOptions} value={brand} onChange={setBrand} />

        <label className="block text-sm font-medium mb-2">Sizes</label>
        <Select options={sizeOptions} value={size} onChange={setSize} className="mb-2" />

        <label className="block text-sm font-medium my-2">Color</label>
        <Select options={colorOptions} value={color} onChange={setColor} />

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddingNewProduct;
