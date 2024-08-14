import { useEffect, useState } from "react"
import { CartButtons, PrimaryButton } from "./ui-components/Button"
import { useDispatch } from "react-redux";
import { deleteProduct } from "../Redux/actions/ProductActions";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { checkDuplicateInCart } from "../Utils/checkCartDuplicate";
import { addToCart } from "../Redux/actions/CartActions";

interface TestData {
    image: string;
    title: string;
    price: number;
    rating?: {
      rate: number;
      count: number;
    };
    id: number;
    category: string;
  }
  
  interface TestProps {
    action: string;
    data: TestData;
    setIsproduct: (product: TestData) => void; // added setIsproduct property
    setIsEdit: (isEdit: boolean) => void; // added setIsEdit property
}

const getCartData = (): { title: string; count: number }[] => {
    const cartData = localStorage.getItem('cartData');
    return cartData ? JSON.parse(cartData) : [];
  };
  
export const updateCartData = (title: string, category: string) => {
    const cartData = getCartData();
    const existingItem = cartData.find((item) => item.title === title);
  
    if (existingItem) {
      existingItem.count += 1;
    } else {
      cartData.push({ title, category, count: 1 });
    }
  
    localStorage.setItem('cartData', JSON.stringify(cartData));
  };
  

function Cards({action, setIsproduct, setIsEdit, ...data}: TestProps) {
    const [btn, setBtn] = useState<JSX.Element | null>(null);
    const [btn2, setBtn2] = useState<JSX.Element | null>(null);
    // const [expand, setExpanded] = useState(false)
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleTitle = () => {
        setIsExpanded(!isExpanded);
    };

    const { user, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems);
    useEffect(()=>{
        // console.log(user?.sub);
        
        if(action === 'edit'){
            setBtn(<PrimaryButton btnName={'Edit'}/>)
            setBtn2(<PrimaryButton btnName={'Delete'}/>)
        }else if(action === 'buy'){
            setBtn(<CartButtons/>)
            // setBtn2(<PrimaryButton btnName={'Buy Now'}/>)
        }
    },[action, user])

    const handleUpdateProduct = (product: TestData) => {
        // dispatch(updateProduct(product));
        setIsEdit(true);
        setIsproduct(product);
    };
    
    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
    };
    
    
    // const handleAddtoCartNavigate = () => {
    //     if (!checkDuplicateInCart(data, cartItems, user?.sub)) {
    //         data['userID'] = user?.sub
    //         dispatch(addToCart(data))
    //         window.location.href = '/cart'
    //     } else {
    //         alert('Item already exists in cart')
    //     }
    // }
        
    const handleAddtoCart = () => {
        console.log(data);
        if (!checkDuplicateInCart(data, cartItems, user?.sub) && isAuthenticated) {
            data['userID'] = user?.sub
            dispatch(addToCart(data))
            updateCartData(data.title, data.category);
            alert('product added')
        } else{
            if(isAuthenticated){
                alert('Item already exists in cart')
            }else{
                window.location.href = '/login'
            }
        }
    }

    const handlenavigaet = () =>{
        window.location.href = `/product/${data.id}`
    }
  

  return (
    <div className=' relative flex flex-col w-[300px] justify-center items-center bg-[#fff] border-2 overflow-hidden group hover:shadow-xl duration-300'>
        <div onClick={action === 'buy' ? handlenavigaet : undefined} className=" aspect-square w-full overflow-hidden flex justify-center items-center ">
            {action==='buy'?
            <div className="absolute bg-white rounded-full shadow-lg p-2 flex justify-center items-center opacity-0 sm:group-hover:opacity-100 duration-500 translate-y-10 group-hover:translate-y-0">
                <img className="w-10 opacity-50" src="https://img.icons8.com/?size=100&id=o90MnZhnB2CM&format=png&color=000000" alt="" />
            </div> : ''
            }
            <img className='h-full w-full object-cover' src={data.image}/>
        </div>
        <div className='flex flex-col justify-center items-center gap-5 py-5 px-5 w-full '>
            <div className="flex items-start flex-col w-full">
            <div className="max-w-md">
                <div className={`flex flex-col items-start text-left text-sm ${isExpanded ? 'h-5 overflow-hidden':''}`}>{data.title}
                </div>
                {data.title.length > 40 ? 
                <button onClick={toggleTitle}
                >
                {isExpanded ? '...' : 'showless'}
                </button>
                :<div className="h-5"></div>}
            </div>
            <div className={`flex text-2xl font-extrabold items-start text-left`}>${data.price}</div>
                <div>{data.rating?
                        <div>
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.round(data.rating.rate))}
                          {'☆'.repeat(5 - Math.round(data.rating.rate))}
                        </span>({data.rating.count})</div>: ''}
                    </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                    {action === 'edit' ? (
                        <>
                            <button onClick={() => handleUpdateProduct(data)} className="w-full">{btn}</button>
                            <button onClick={() => handleDeleteProduct(data.id)} className="w-full">{btn2}</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleAddtoCart } className="w-full">{btn}</button>
                        </>
                    )}
                </div>
        </div>
    </div>
  )
}

export default Cards