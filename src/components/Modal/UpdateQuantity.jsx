// const UpdateQuantity = ({ isOpen, onClose, product, newQuantity, setNewQuantity, handleUpdateQuantity }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Update Quantity</h2>
//         <p className="mb-2">{product?.productName}</p>
//         <input
//           type="number"
//           value={newQuantity}
//           onChange={(e) => setNewQuantity(parseInt(e.target.value))}
//           className="border border-gray-300 p-2 w-full rounded"
//           min="1"
//         />
//         <div className="flex justify-end space-x-3 mt-4">
//           <button 
//             onClick={onClose} 
//             className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => handleUpdateQuantity(product._id, newQuantity)}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateQuantity;

const UpdateQuantity = ({ isOpen, onClose, product, newQuantity, setNewQuantity, handleUpdateQuantity }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= product.availableQuantity) {
      setNewQuantity(value);
    } else {
      setNewQuantity(product.availableQuantity);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Quantity</h2>
        <p className="mb-2">{product?.productName}</p>
        <input
          type="number"
          value={newQuantity}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          min="1"
          max={product.availableQuantity} // Set maximum allowed quantity
        />
        <p className="text-sm text-gray-500 mt-1">
          Max available: {product.availableQuantity}
        </p>
        <div className="flex justify-end space-x-3 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateQuantity(product._id, newQuantity)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};


export default UpdateQuantity;