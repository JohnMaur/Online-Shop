import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ProductDetails = ({
  product,
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
  navigate
}) => {
  if (!product) {
    return <p className="text-gray-500 text-sm">Product details not found.</p>;
  }

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-5">
        <div className='w-full flex-1 flex justify-center'>
          {product.product.imageUrl?.length > 0 && (
            <div className="relative w-full max-w-md">
              <img
                src={product.product.imageUrl[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
                className="w-full h-[25rem] rounded-md object-contain shadow"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded-full shadow hover:bg-gray-800 transition active:opacity-65 cursor-pointer"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded-full shadow hover:bg-gray-800 transition active:opacity-65 cursor-pointer"
              >
                ›
              </button>
            </div>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">{product.product.productName}</p>
          <p className="text-sm text-gray-500">Brand: {product.product.brand}</p>
          <p className="text-sm text-gray-500">Category: {product.product.category}</p>
          <p className="text-sm text-gray-500">Sub Category: {product.product.subCategory}</p>
          <p className="text-sm text-gray-500">Color: {product.product.color}</p>
          <p className="text-sm text-gray-500">Size: {product.product.size}</p>
          <p className="text-sm text-gray-500">Sex: {product.product.gender}</p>
          <p className="text-md font-bold text-green-600 mt-2">₱{product.shopPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
