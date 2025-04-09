import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { colorOptions } from "../../data/Option";
import { firebase } from "../../firebaseConfig";

const UpdateStock = ({ isOpen, onClose, product, refreshProducts }) => {
  if (!isOpen || !product) return null;

  const [productName, setProductName] = useState(product.product.productName || "");
  const [color, setColor] = useState(product.product.color || "");
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [shopPrice, setShopPrice] = useState(product.shopPrice || 0);
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(product.product.imageUrl || "");
  const [loading, setLoading] = useState(false);

  const addImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleUpdate = async () => {
    if (!productName || quantity < 0 || shopPrice < 0) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      let downloadURL = product.product.imageUrl;
      if (imageFile) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`stock_images/${product._id}_${Date.now()}`);
        await fileRef.put(imageFile);
        downloadURL = await fileRef.getDownloadURL();
      }

      const updatedStock = {
        stockId: product._id,
        product: {
          ...product.product,
          productName,
          color,
          imageUrl: downloadURL,
        },
        quantity,
        shopPrice,
      };

      const response = await axios.put(`http://localhost:3000/api/update-stock/${product._id}`, updatedStock);
      alert(response.data.message);
      onClose();
      refreshProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 lg:w-[35vw] h-[75vh] overflow-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Stock</h2>

        <label className="block text-sm font-medium mb-2">Product Image</label>
        <input type="file" accept="image/*" onChange={addImage} className="hidden" id="updateFileInput" />
        <div className="w-full flex justify-center items-center h-52 rounded-2xl mb-5 cursor-pointer border border-gray-300" onClick={() => document.getElementById("updateFileInput").click()}>
          <img src={selectedImage} alt="Preview" className="w-full h-full rounded-2xl object-contain" />
        </div>

        <label className="block text-sm font-medium mb-2">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded mb-4 border-gray-300"
          placeholder="Enter product name"
        />

        <label className="block text-sm font-medium mb-2">Color</label>
        <Select options={colorOptions} value={color} onChange={setColor} className="mb-4" />

        <label className="block text-sm font-medium mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full p-2 border rounded mb-4 border-gray-300"
        />

        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          value={shopPrice}
          onChange={(e) => setShopPrice(parseFloat(e.target.value))}
          className="w-full p-2 border rounded mb-4 border-gray-300"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStock;
