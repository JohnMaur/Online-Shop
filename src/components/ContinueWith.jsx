import { gmail, facebook, apple } from "../assets/icons"

const ContinueWith = () => {

  return (
    <div>
       <div className="flex items-center justify-center my-5">
        <div className="bg-[#8699DA] h-px flex-1 ml-10"></div>
        <p className="mx-3 text-sm text-[#444B59]">or continue with</p>  
        <div className="bg-[#8699DA] h-px flex-1 mr-10"></div>
      </div>
      <div className="flex space-x-5 justify-center">
        <div className="flex py-1 px-4 rounded-lg border-[2px] border-[#8699DA] cursor-pointer hover:bg-[#ecf1ff] active:opacity-70">
          <img
            src={gmail}
            alt="Gmail Icon"
            className="w-8 h-8"
          />
        </div>

        <div className="flex py-1 px-4 rounded-lg border-[2px] border-[#8699DA] cursor-pointer hover:bg-[#ecf1ff] active:opacity-70">
          <img
            src={facebook}
            alt="Facebook Icon"
            className="w-8 h-8"
          />
        </div>

        <div className="flex py-1.5 px-4.5 rounded-lg border-[2px] border-[#8699DA] cursor-pointer hover:bg-[#ecf1ff] active:opacity-70">
          <img
            src={apple}
            alt="Apple Icon"
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  )
}

export default ContinueWith