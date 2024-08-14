import AdminProductsList from "../Pages/AdminProductsList"
import AddProduct from "./AddProduct"
import AllUserData from "./AllUsers"


const SideBar = ({component}) => {

    return(
        <div className="flex flex-col flex-wrap justify-center md:px-5 px-2 md:pt-20 md:gap-3 gap-1">
            <button className=" shadow-md"><div className=" bg-[#fff] px-4 py-2 md:px-12 md:py-2 rounded-md text-black" onClick={()=> component(<AdminProductsList/>)}>all products</div></button>
            <button className=" shadow-md"><div className=" bg-[#fff] px-4 py-2 md:px-12 md:py-2 rounded-md text-black" onClick={()=> component(<AddProduct/>)}>Add product</div></button>
            <button className=" shadow-md"><div className=" bg-[#fff] px-4 py-2 md:px-12 md:py-2 rounded-md text-black" onClick={()=> component(<AllUserData/>)}>Manage Users</div></button>
            <button className=" shadow-md"><div className=" bg-[#fff] px-4 py-2 md:px-12 md:py-2 rounded-md text-black" onClick={()=> window.location.href = '/'}>Home</div></button>
            {/* <button><div className="bg-[#fff] px-12 py-2 rounded-md text-black"><LogoutButton/></div></button> */}
        </div>
    )
}

export default SideBar