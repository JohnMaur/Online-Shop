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


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UpdateQuantity = ({ isOpen, onClose, product, newQuantity, setNewQuantity, handleUpdateQuantity }) => {
  if (!isOpen) return null;

  // const handleChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (value <= product.availableQuantity) {
  //     setNewQuantity(value);
  //   } else {
  //     setNewQuantity(product.availableQuantity);
  //   }
  // };

  const handleChange = (e) => {
    const input = e.target.value;

    // Allow empty string so user can delete input
    if (input === "") {
      setNewQuantity("");
      return;
    }

    // Parse to int
    const value = parseInt(input, 10);

    // If not a number or less than 1, set to 1
    if (isNaN(value) || value < 1) {
      setNewQuantity(1);
      return;
    }

    // If greater than max, show alert and clamp
    if (value > product.availableQuantity) {
      MySwal.fire({
        icon: 'warning',
        title: 'Exceeded maximum quantity',
        text: `You can only select up to ${product.availableQuantity} items.`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setNewQuantity(product.availableQuantity);
    } else {
      setNewQuantity(value);
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