const DashboardCard = ({ icon, iconName, title, subtext, subtextResult, subtext1, subtext1Result, linkTo }) => {
  return (
    <a
      href={linkTo} // Ensure linkTo is correctly interpolated in the href
      className='bg-white shadow-sm w-full max-md:w-full h-32 rounded-2xl px-5 flex items-center cursor-pointer hover:border-[0.5px] hover:border-[#3B82F6] hover:shadow-lg hover:shadow-[#3B82F6] active:opacity-70'
    >
      <img
        src={icon}
        alt={iconName}
        className='w-12 h-12 object-contain '
      />

      <div className='ml-4'>
        <h2 className="text-xl font-bold mt-5">{title}</h2>
        <p className="text-gray-600 text-xs">{subtext}: <span className="font-semibold">{subtextResult}</span></p>
        <p className="text-gray-600 text-xs">{subtext1}: <span className="font-semibold">{subtext1Result}</span></p>
      </div>
    </a>
  )
}

export default DashboardCard