// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { add } from "../assets/icons"; // Image for the placeholder
// import { firebase } from "../firebaseConfig";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const Modal = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
//   if (!isOpen) return null;

//   const [productData, setProductData] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [subCategoryOptions, setSubCategoryOptions] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [brand, setBrand] = useState(null);
//   const [sex, setsex] = useState(null);
//   const [size, setSize] = useState(null);
//   const [color, setColor] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await axios.get("https://online-shop-server-1.onrender.com/api/product-maintenance");
//         setProductData(productResponse.data);

//         const allProductResponse = await axios.get("https://online-shop-server-1.onrender.com/api/products");
//         setAllProducts(allProductResponse.data); // Save the product list
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

//   const handleSave = async () => {
//     if (!productName) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please enter the product name.',
//       });
//       return;
//     }

//     // 🔍 Check if productName already exists
//     const normalized = (str) => str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

//     const duplicate = allProducts.some(
//       (item) => item.productName && normalized(item.productName) === normalized(productName)
//     );

//     console.log("Product data:", allProducts.productName);

//     if (duplicate) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Duplicate Product',
//         text: 'A product with this name already exists.',
//       });
//       return;
//     }

//     if (!category) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please select a category.',
//       });
//       return;
//     }

//     if (!color) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please select a color.',
//       });
//       return;
//     }

//     if (!imageFile) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please upload an image.',
//       });
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

//       const matchedProduct = productData.find((item) =>
//         item.category === category.value &&
//         (subCategory ? item.subCategory.includes(subCategory.value) : true) &&
//         (brand ? item.brand.includes(brand.value) : true) &&
//         (size ? item.sizes.includes(size.value) : true) &&
//         item.color.includes(color.value)
//       );

//       if (!matchedProduct) {
//         MySwal.fire({
//           icon: 'error',
//           title: 'No matching product',
//           text: 'No matching product maintenance entry found.',
//         });
//         setLoading(false);
//         return;
//       }

//       const newProduct = {
//         staffUsername,
//         productID: matchedProduct.productID,
//         productName,
//         category: category.value,
//         subCategory: subCategory?.value || null,
//         brand: brand?.value || null,
//         sex: sex?.value || null,
//         size: size?.value || null,
//         color: color.value,
//         imageUrl: downloadURL,
//       };

//       const response = await axios.post("https://online-shop-server-1.onrender.com/api/add-product", newProduct);

//       MySwal.fire({
//         icon: 'success',
//         title: 'Product Added!',
//         text: response.data.message,
//       });

//       refreshProducts();
//       onClose();
//     } catch (error) {
//       console.error("Error adding product:", error);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Failed to Add Product',
//         text: 'There was an issue adding the product.',
//       });
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

//         <div className="flex justify-end gap-2 mt-5">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// With multiple images

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { add } from "../assets/icons"; // Image for the placeholder
import { firebase } from "../firebaseConfig";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
 
const MySwal = withReactContent(Swal); 

const Modal = ({ isOpen, onClose, staffUsername, refreshProducts }) => {
  if (!isOpen) return null;

  const [productData, setProductData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState(null);
  const [sex, setsex] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]); // Store multiple images
  const [imageFiles, setImageFiles] = useState([]); // Array to hold image files
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("https://online-shop-server-1.onrender.com/api/product-maintenance");
        setProductData(productResponse.data);

        const allProductResponse = await axios.get("https://online-shop-server-1.onrender.com/api/products");
        setAllProducts(allProductResponse.data); // Save the product list
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

  // const sexOptions = category
  //   ? [...new Set(productData.filter((item) => item.category === category.value).flatMap((item) => item.sex))].map((sex) => ({ value: sex, label: sex }))
  //   : [];
  const sexOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Unisex', label: 'Unisex' },
  ];  

  const handleCategoryChange = (selected) => {
    setCategory(selected);
    setSubCategory(null);
    setSize(null);
    setColor(null);
  };

  const addImages = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedImages(files.map(file => URL.createObjectURL(file)));
      setImageFiles(files);
    }
  };

  const handleSave = async () => {
    if (!productName) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter the product name.',
      });
      return;
    }

    const normalized = (str) => str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const duplicate = allProducts.some(
      (item) => item.productName && normalized(item.productName) === normalized(productName)
    );

    console.log("Product data:", allProducts.productName);

    if (duplicate) {
      MySwal.fire({
        icon: 'error',
        title: 'Duplicate Product',
        text: 'A product with this name already exists.',
      });
      return;
    }

    if (!category) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a category.',
      });
      return;
    }

    if (!color) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a color.',
      });
      return;
    }

    if (imageFiles.length === 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload at least one image.',
      });
      return;
    }

    setLoading(true);

    try {
      let downloadURLs = [];

      for (const file of imageFiles) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`product_images/${staffUsername}_${Date.now()}_${file.name}`);
        await fileRef.put(file);
        const downloadURL = await fileRef.getDownloadURL();
        downloadURLs.push(downloadURL);
      }

      const matchedProduct = productData.find((item) =>
        item.category === category.value &&
        (subCategory ? item.subCategory.includes(subCategory.value) : true) &&
        (brand ? item.brand.includes(brand.value) : true) &&
        (size ? item.sizes.includes(size.value) : true) &&
        item.color.includes(color.value)
      );

      if (!matchedProduct) {
        MySwal.fire({
          icon: 'error',
          title: 'No matching product',
          text: 'No matching product maintenance entry found.',
        });
        setLoading(false);
        return;
      }

      const newProduct = {
        staffUsername: staffUsername || null,
        productID: matchedProduct.productID,
        productName,
        category: category.value,
        subCategory: subCategory?.value || null,
        brand: brand?.value || null,
        sex: sex?.value || null,
        size: size?.value || null,
        color: color.value,
        imageUrls: downloadURLs, // Store multiple image URLs
      };

      const response = await axios.post("https://online-shop-server-1.onrender.com/api/add-product", newProduct);

      MySwal.fire({
        icon: 'success',
        title: 'Product Added!',
        text: response.data.message,
      });

      refreshProducts(); 
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Failed to Add Product',
        text: 'There was an issue adding the product.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[75vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">ADD Product</h2>
 
        <label className="block text-sm font-medium mb-2">Product Images</label>
        <input type="file" accept="image/*" multiple onChange={addImages} className="hidden" id="fileInput" />
        <div
          className="w-full h-52 overflow-y-auto border border-dashed border-gray-400 rounded-2xl p-3 mb-5 cursor-pointer relative group"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {selectedImages.length === 0 ? (
            <div className="flex flex-col items-center content-center justify-center h-full">
              <img src={add} alt="Add" className="w-8 h-8 object-contain mb-2" />
              <p className="text-gray-500 text-sm">Click to upload images</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {selectedImages.map((img, index) => (
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

        <label className="block text-sm font-medium my-2">Sex</label>
        <Select options={sexOptions} value={sex} onChange={setsex} />

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">{loading ? "Adding..." : "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
