const Tooltip = ({ text, position = "top", showTooltip }) => {
  if (!showTooltip) return null;

  return (
    <div className="relative flex items-center top-[-20px] max-sm:top-[-28px] left-20">
      <div className={`tooltip-box absolute whitespace-nowrap bg-gray-700 text-white text-xs py-1 px-2 rounded ${position}`}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
