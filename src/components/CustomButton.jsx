const CustomButton = ({ nameButton, type, onClick, rounded, color, hoverButton, responsive, textColor }) => {
  return (
    <button
      type={type}
      onClick={onClick} // Add this line
      className={`${rounded} ${color ? color : "bg-[#8699DA]"} ${hoverButton ? hoverButton : "hover:bg-[#798dce]"} ${responsive} ${!textColor ? "text-white" : textColor} py-2 mt-3 w-full cursor-pointer focus:outline-none active:opacity-65`}
    >
      {nameButton}
    </button>
  );
};

export default CustomButton;
