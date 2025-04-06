const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Confirm Action</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-500" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;