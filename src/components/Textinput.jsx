// const TextInput = ({ label, placeholder, type, value, onChange }) => {
//   return (
//     <div className="mb-4">
//       {/* Label */}
//       {label && (
//         <label className="block text-base text-[#444B59] mb-2 font-semibold">
//           {label}
//         </label>
//       )}
      
//       {/* Input */}
//       <input
//         type={type}
//         placeholder={placeholder}
//         value={value} // Controlled input value
//         onChange={onChange} // Event handler for changes
//         className="w-full px-4 py-2 border-[1px] border-[#8699DA] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default TextInput;

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import icons

const TextInput = ({ label, placeholder, type, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      {/* Label */}
      {label && (
        <label className="block text-base text-[#444B59] mb-2 font-semibold">
          {label}
        </label>
      )}

      {/* Input with Eye Icon */}
      <div className="relative">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          value={value} // Controlled input value
          onChange={onChange} // Event handler for changes
          className="w-full px-4 py-2 border-[1px] border-[#8699DA] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
