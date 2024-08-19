import { useState } from "react";
import AdminProductsList from "../Pages/AdminProductsList"
import AddProduct from "./AddProduct"
import AllUserData from "./AllUsers"

interface Props {
  component: (component: JSX.Element) => void;
}

function BottomBar({ component }: Props) {
  const [activeButton, setActiveButton] = useState('products');

  return (
    <div className='z-10 flex flex-col sm:flex-row fixed bottom-0 sm:gap-10 bg-blue-100 sm:px-8 sm:py-3 rounded-md sm:rounded-full mb-20 shadow-xl hover:shadow-md duration-300 justify-center items-center'>
      <div className="flex sm:gap-10">
        <div className="flex flex-col sm:flex-row justify-center sm:flex sm:gap-10">
          <button
            onClick={() => {
              component(<AdminProductsList />);
              setActiveButton('products');
            }}
            className={`flex sm:text-lg px-6 py-2 ${activeButton === 'products' ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} hover:text-white duration-300 rounded-md sm:rounded-full font-medium`}
          >
            Products
          </button>
          <button
            onClick={() => {
              component(<AddProduct />);
              setActiveButton('add');
            }}
            className={`flex sm:text-lg px-6 py-2 ${activeButton === 'add' ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} hover:text-white duration-300 rounded-md sm:rounded-full font-medium`}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:flex sm:gap-10">
          <button
            onClick={() => {
              component(<AllUserData />);
              setActiveButton('users');
            }}
            className={`flex sm:text-lg px-6 py-2 ${activeButton === 'users' ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} hover:text-white duration-300 rounded-md sm:rounded-full font-medium`}
          >
            Users
          </button>
          <button
            onClick={() => {
              window.location.href = '/dashboard';
              setActiveButton('analytics');
            }}
            className={`flex sm:text-lg px-6 py-2 ${activeButton === 'analytics' ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} hover:text-white duration-300 rounded-md sm:rounded-full font-medium`}
          >
            Analytics
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          window.location.href = '/';
          setActiveButton('');
        }}
        className='flex justify-center sm:text-lg px-6 py-2 border-2 border-black duration-300 rounded-md sm:rounded-full font-medium'
      >
        Home
      </button>
    </div>
  );
}

export default BottomBar;