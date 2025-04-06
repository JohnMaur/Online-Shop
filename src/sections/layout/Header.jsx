import { hamburger } from "../../assets/icons"

const Header = ({ toggleNav }) => {
  return (
    <header className={`flex flex-1 max-md:justify-end fixed text-black bg-[#FEFEFF] border-l border-gray-200 shadow-sm h-14 w-full`}>
      <button 
        className={`w-fit cursor-pointer rounded-md active:opacity-45 p-4 hover:bg-[#EDEDED]`}
        onClick={toggleNav}
      >
        <img
          src={hamburger}
          alt="Hamburger button"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>
    </header>
  )
}

export default Header