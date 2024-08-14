import { CartButtons, PrimaryButton } from "./ui-components/Button"
import { addToCart } from "../Redux/actions/CartActions"
import { useDispatch } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from "react-redux"
import { checkDuplicateInCart } from "../Utils/checkCartDuplicate"
import { useEffect } from "react"

function Card({...data}) {

    const { user } = useAuth0()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems);

    const handleAddtoCartNavigate = () => {
        if (!checkDuplicateInCart(data, cartItems, user?.sub)) {
            data['userID'] = user?.sub
            dispatch(addToCart(data))
            window.location.href = '/cart'
        } else {
            alert('Item already exists in cart')
        }
    }

    const handleAddtoCart = () => {
        if (!checkDuplicateInCart(data, cartItems, user?.sub)) {
            data['userID'] = user?.sub
            dispatch(addToCart(data))
        } else {
            alert('Item already exists in cart')
        }
    }

    const handlenavigaet = () =>{
        window.location.href = `/product/${data.id}`
    }

  return (
    <div className='flex flex-col w-[300px] justify-center items-center bg-[#fff] shadow-lg rounded-md overflow-hidden'>
        <div onClick={handlenavigaet} className=" aspect-square w-full overflow-hidden">
            <img className='h-full w-full object-cover' src={data.image}/>
        </div>
        <div className='flex flex-col justify-center items-center gap-5 py-5 px-5 w-full bg-[#f6f4ea]'>
            <div className="flex items-start flex-col w-full">
                <div className="flex items-start text-left text-sm">{data.title}</div>
                <div className="flex text-2xl font-extrabold items-start text-left">${data.price}</div>
                <div>{data.rating?
                        <div>
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.round(data.rating.rate))}
                          {'☆'.repeat(5 - Math.round(data.rating.rate))}
                        </span>({data.rating.count})</div>: ''}
                    </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                <button onClick={handleAddtoCart} className="w-full"><CartButtons/></button>
                <button onClick={handleAddtoCartNavigate} className="w-full"><PrimaryButton btnName= {'Buy Now'}/></button>
            </div>
        </div>
    </div>
  )
}

export default Card