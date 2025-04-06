// import React, { useState } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { categoryOptions, genderOptions, shirtSizes, shoeSizes, colorOptions, subCategoryOptions } from "../data/Option";
// import { add } from "../assets/icons";
// import { firebase } from "../firebaseConfig";

// const Modal = ({ isOpen, onClose, staffUsername }) => {
//   if (!isOpen) return null;

//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [subCategoryOptionsList, setSubCategoryOptionsList] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [gender, setGender] = useState("");
//   const [size, setSize] = useState("");
//   const [color, setColor] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       cursor: "pointer",
//       backgroundColor: state.isFocused ? "#3B82F6" : "white",
//       color: state.isFocused ? "white" : "black",
//     }),
//     control: (provided) => ({
//       ...provided,
//       cursor: "pointer",
//       borderColor: "#2196F3",
//     }),
//   };

//   const handleCategoryChange = (selectedOption) => {
//     setCategory(selectedOption);
//     setSubCategory(""); // Reset subcategory when category changes
//     setSubCategoryOptionsList(subCategoryOptions[selectedOption.value] || []);
//   };

//   const handleSave = async () => {
//     if (!productName || !category || !subCategory || !gender || !size || !color || !quantity || !price || !imageFile) {
//       alert("Please fill in all required fields.");
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

//       const newProduct = {
//         staffUsername,
//         productName,
//         category: category.value,
//         subCategory: subCategory.value,
//         gender: gender.value,
//         size: size.value,
//         color: color.value,
//         quantity: parseInt(quantity),
//         price: parseFloat(price),
//         imageUrl: downloadURL,  
//       };

//       const response = await axios.post("http://localhost:3000/api/add-product", newProduct);
//       alert(response.data.message);
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

//         <label className="block text-sm font-medium mb-2">Product Name</label>
//         <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2 border rounded mb-4 border-[#2196F3]" placeholder="Enter product name" />

//         <label className="block text-sm font-medium mb-2">Category</label>
//         <Select options={categoryOptions} value={category} onChange={handleCategoryChange} styles={customStyles} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Sub Category</label>
//         <Select options={subCategoryOptionsList} value={subCategory} onChange={setSubCategory} styles={customStyles} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Gender</label>
//         <Select options={genderOptions} value={gender} onChange={setGender} styles={customStyles} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Sizes</label>
//         <Select options={category.value === "Shirt" ? shirtSizes : shoeSizes} value={size} onChange={setSize} styles={customStyles} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Color</label>
//         <Select options={colorOptions} value={color} onChange={setColor} styles={customStyles} className="mb-2" />

//         <label className="block text-sm font-medium mb-1">Quantity</label>
//         <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border rounded mb-2 border-[#2196F3]" placeholder="Quantity" />

//         <label className="block text-sm font-medium mb-2">Price</label>
//         <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-4 border-[#2196F3]" placeholder="Enter price" />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { add } from "../assets/icons";
// import { firebase } from "../firebaseConfig";

// const Modal = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
//   if (!isOpen) return null;

//   const [productData, setProductData] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [subCategoryOptions, setSubCategoryOptions] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [brand, setBrand] = useState(null);
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [gender, setGender] = useState(null);
//   const [size, setSize] = useState(null);
//   const [color, setColor] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch product maintenance data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/product-maintenance");
//         setProductData(response.data);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Extract unique values for dropdowns
//   const categoryOptions = [...new Set(productData.map((item) => item.category))].map((cat) => ({ value: cat, label: cat }));

//   const subCategoryOptionsList = category
//     ? [...new Set(
//       productData
//         .filter((item) => item.category === category.value)
//         .flatMap((item) => item.subCategory) // Flatten subCategory arrays
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
//     if (!quantity) {
//       alert("Please enter the quantity.");
//       return;
//     }
//     if (!price) {
//       alert("Please enter the price.");
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

//       const newProduct = {
//         staffUsername,
//         productName,
//         category: category.value,
//         subCategory: subCategory?.value || null,  // Allow null if not selected
//         brand: brand.value,
//         gender: gender?.value || null,  // Allow null if not selected
//         size: size?.value || null,  // Allow null if not selected
//         color: color.value,
//         quantity: parseInt(quantity),
//         price: parseFloat(price),
//         imageUrl: downloadURL,
//       };

//       const response = await axios.post("http://localhost:3000/api/add-product", newProduct);
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

//         <label className="block text-sm font-medium mb-2">Product Name</label>
//         <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Enter product name" />

//         <label className="block text-sm font-medium mb-2">Category</label>
//         <Select options={categoryOptions} value={category} onChange={handleCategoryChange} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Sub Category</label>
//         <Select options={subCategoryOptionsList} value={subCategory} onChange={setSubCategory} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Brand</label>
//         <Select options={brandOptions} value={brand} onChange={setBrand} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Gender</label>
//         <Select options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} value={gender} onChange={setGender} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Sizes</label>
//         <Select options={sizeOptions} value={size} onChange={setSize} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Color</label>
//         <Select options={colorOptions} value={color} onChange={setColor} className="mb-2" />

//         <label className="block text-sm font-medium mb-1">Quantity</label>
//         <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Quantity" />

//         <label className="block text-sm font-medium mb-2">Price</label>
//         <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Enter price" />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { add } from "../assets/icons";
// import { firebase } from "../firebaseConfig";

// const Modal = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
//   if (!isOpen) return null;

//   const [productData, setProductData] = useState([]);
//   const [supplierData, setSupplierData] = useState([]); // New state for suppliers
//   const [category, setCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [subCategoryOptions, setSubCategoryOptions] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [brand, setBrand] = useState(null);
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [gender, setGender] = useState(null);
//   const [size, setSize] = useState(null);
//   const [color, setColor] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedSupplier, setSelectedSupplier] = useState(null); // New state for selected supplier
//   const [supplierName, setSupplierName] = useState(""); // State for the supplier name input

//   // Fetch product and supplier data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await axios.get("http://localhost:3000/api/product-maintenance");
//         setProductData(productResponse.data);

//         const supplierResponse = await axios.get("http://localhost:3000/api/suppliers");
//         setSupplierData(supplierResponse.data);
//       } catch (error) {
//         console.error("Error fetching product or supplier data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle Supplier selection
//   const handleSupplierChange = (selected) => {
//     setSelectedSupplier(selected);
//     setSupplierName(selected ? selected.label : ""); // Update the text input when supplier is selected
//   };

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
//     if (!quantity) {
//       alert("Please enter the quantity.");
//       return;
//     }
//     if (!price) {
//       alert("Please enter the price.");
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

//       const newProduct = {
//         staffUsername,
//         productName,
//         category: category.value,
//         subCategory: subCategory?.value || null,
//         brand: brand?.value || null,
//         gender: gender?.value || null,
//         size: size?.value || null,
//         color: color.value,
//         quantity: parseInt(quantity),
//         price: parseFloat(price),
//         imageUrl: downloadURL,
//         supplierName: selectedSupplier?.label, // Ensure the correct supplier data is passed
//         supplierContact: selectedSupplier?.contactPerson, // Attach contact info
//         supplierEmail: selectedSupplier?.email,
//         supplierRegion: selectedSupplier?.region,
//         supplierHouseStreet: selectedSupplier?.houseStreet,
//         supplierPhone: selectedSupplier?.phone,
//       };

//       console.log("Payload to send:", newProduct);  // Log the request data

//       const response = await axios.post("http://localhost:3000/api/add-product", newProduct);
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

//         <label className="block text-sm font-medium mb-2">Supplier</label>
//         <Select
//           options={supplierData.map((supplier) => ({ value: supplier.name, label: supplier.name }))}
//           value={selectedSupplier ? { value: selectedSupplier.name, label: selectedSupplier.name } : null}
//           onChange={handleSupplierChange}
//           className="mb-2"
//         />

//         <label className="block text-sm font-medium mb-2">Supplier Name (Displayed)</label>
//         <input
//           type="text"
//           value={supplierName}
//           readOnly
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Supplier Name will appear here"
//         />

//         <label className="block text-sm font-medium mb-2">Product Name</label>
//         <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Enter product name" />

//         <label className="block text-sm font-medium mb-2">Category</label>
//         <Select options={categoryOptions} value={category} onChange={handleCategoryChange} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Sub Category</label>
//         <Select options={subCategoryOptionsList} value={subCategory} onChange={setSubCategory} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Brand</label>
//         <Select options={brandOptions} value={brand} onChange={setBrand} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Gender</label>
//         <Select options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} value={gender} onChange={setGender} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Sizes</label>
//         <Select options={sizeOptions} value={size} onChange={setSize} className="mb-2" />

//         <label className="block text-sm font-medium mb-2">Color</label>
//         <Select options={colorOptions} value={color} onChange={setColor} className="mb-2" />

//         <label className="block text-sm font-medium mb-1">Quantity</label>
//         <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Quantity" />

//         <label className="block text-sm font-medium mb-2">Price</label>
//         <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Enter price" />


//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { add } from "../assets/icons"; // Image for the placeholder
import { firebase } from "../firebaseConfig";

const Modal = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
  if (!isOpen) return null;

  const [productData, setProductData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierName, setSupplierName] = useState("");

  // Fetch product and supplier data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://localhost:3000/api/product-maintenance");
        setProductData(productResponse.data);

        const supplierResponse = await axios.get("http://localhost:3000/api/suppliers");
        setSupplierData(supplierResponse.data);
      } catch (error) {
        console.error("Error fetching product or supplier data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Supplier selection
  const handleSupplierChange = (selected) => {
    const supplier = supplierData.find((supplier) => supplier.name === selected.label);
    setSelectedSupplier(supplier);  // Set the full supplier data
    setSupplierName(supplier ? supplier.name : ""); // Set the name directly
  };


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
      alert("Please enter the product name.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    if (!color) {
      alert("Please select a color.");
      return;
    }
    if (!quantity) {
      alert("Please enter the quantity.");
      return;
    }
    if (!price) {
      alert("Please enter the price.");
      return;
    }
    if (!imageFile) {
      alert("Please upload an image.");
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

      const newProduct = {
        staffUsername,
        productName,
        category: category.value,
        subCategory: subCategory?.value || null,
        brand: brand?.value || null,
        gender: gender?.value || null,
        size: size?.value || null,
        color: color.value,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        imageUrl: downloadURL,
        supplierName: selectedSupplier?.name || "",
        supplierContact: selectedSupplier?.contactPerson || "",
        supplierEmail: selectedSupplier?.email || "",
        supplierRegion: selectedSupplier?.region || "",
        supplierHouseStreet: selectedSupplier?.houseStreet || "",
        supplierPhone: selectedSupplier?.phone || "",
      };


      console.log("Payload to send:", newProduct);

      const response = await axios.post("http://localhost:3000/api/add-product", newProduct);
      alert(response.data.message);

      refreshProducts();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
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

        <label className="block text-sm font-medium mb-2">Supplier</label>
        <Select
          options={supplierData.map((supplier) => ({ value: supplier.name, label: supplier.name }))}
          value={selectedSupplier ? { value: selectedSupplier.name, label: selectedSupplier.name } : null}
          onChange={handleSupplierChange}
        />

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

        <label className="block text-sm font-medium my-2">Color</label>
        <Select options={colorOptions} value={color} onChange={setColor} />

        <label className="block text-sm font-medium my-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter product quantity"
        />

        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter product price"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;