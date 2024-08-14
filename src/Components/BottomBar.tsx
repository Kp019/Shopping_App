import AdminProductsList from "../Pages/AdminProductsList"
import AddProduct from "./AddProduct"
import AllUserData from "./AllUsers"

interface Props {
  component: (component: JSX.Element) => void;
}


function BottomBar({component}: Props) {
  return (
    <div className=' z-10 flex flex-col sm:flex-row fixed bottom-0 sm:gap-10 bg-blue-100 sm:px-8 sm:py-3 rounded-md sm:rounded-full mb-20 shadow-xl hover:shadow-md duration-300 justify-center items-center'>
      <div className="flex">
        <div className="flex flex-col sm:flex-row justify-center sm:flex sm:gap-10">
            <button onClick={()=> window.location.href = '/'} className='flex justify-center sm:text-lg px-6 py-2 border-2 border-black duration-300 rounded-md sm:rounded-full font-medium'>Home</button>
            <button onClick={()=> component(<AdminProductsList/>)} className='flex sm:text-lg px-6 py-2 hover:bg-blue-700 hover:text-white duration-300 rounded-md sm:rounded-full font-medium'>Products</button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:flex sm:gap-10">
            <button onClick={()=> component(<AddProduct/>)} className='flex sm:text-lg px-6 py-2 hover:bg-blue-700 hover:text-white duration-300 rounded-md sm:rounded-full font-medium'>Add</button>
            <button onClick={()=> component(<AllUserData/>)} className='flex sm:text-lg px-6 py-2 hover:bg-blue-700 hover:text-white duration-300 rounded-md sm:rounded-full font-medium'>Users</button>
        </div>
      </div>
        <div>
          <button onClick={()=> window.location.href = '/dashboard'} className='flex sm:text-lg px-6 py-2 hover:bg-blue-700 hover:text-white duration-300 rounded-md sm:rounded-full font-medium'>Analytics</button>
        </div>
    </div>
  )
}

export default BottomBar