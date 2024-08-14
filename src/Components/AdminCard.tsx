import { useDispatch } from "react-redux";
import { PrimaryButton } from "./ui-components/Button";
import { deleteProduct } from "../Redux/actions/ProductActions";

interface ProductData {
    id: number;
    image: string;
    title: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
}
  
interface AdminCardProps {
  setIsproduct: (product: ProductData) => void;
  setIsEdit: (isEdit: boolean) => void;
  data: ProductData;
}

function AdminCard({setIsproduct, setIsEdit, ...data}: AdminCardProps) {

    const dispatch = useDispatch()
    // console.log(data);
    

    const handleUpdateProduct = (product: ProductData) => {
        // dispatch(updateProduct(product));
        setIsEdit(true);
        setIsproduct(product);
    };

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
      };

  return (
    <div className='flex flex-col w-[300px] justify-center items-center bg-[#fff] shadow-lg rounded-md overflow-hidden'>
        <div className=" aspect-square w-full overflow-hidden">
            <img className='h-full w-full object-cover' src={data?.image}/>
        </div>
        <div className='flex flex-col justify-center items-center gap-5 py-5 px-5 w-full bg-[#f6f4ea]'>
            <div className="flex items-start flex-col w-full">
                <div className="flex items-start text-left text-sm">{data?.title}</div>
                <div className="flex text-2xl font-extrabold items-start text-left">${data?.price}</div>
                <div>{data.rating?
                        <div>
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.round(data.rating.rate))}
                          {'☆'.repeat(5 - Math.round(data.rating.rate))}
                        </span>({data.rating.count})</div>: ''}
                    </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                {/* <button onClick={handleAddtoCart} className="w-full"><CartButtons/></button> */}
                <button onClick={()=>handleUpdateProduct(data)} className="w-full"><PrimaryButton btnName= {'Edit'}/></button>
                <button onClick={()=>handleDeleteProduct(data.id)} className="w-full"><PrimaryButton btnName= {'delete'}/></button>
            </div>
        </div>
    </div>
  )
}

export default AdminCard