// src/components/Cart.js

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../Redux/actions/CartActions';
import Navbar from '../Components/Navbar';
import { PrimaryButton } from '../Components/ui-components/Button';
import { Counterbtn } from '../Components/ui-components/Couter';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Components/Login';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const { isAuthenticated, user} = useAuth0()
    const [price, setprice] = useState(0)
    const [auth,setAuth] = useState(false)
    const [filteredCartItems, setFilteredCartItems] = useState([])
    const [tax, setTax] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [subtotal, setSubTotal] = useState(0)

    const handlePriceCalculator = () => {
      const userID = user?.sub
      const userCartItems = cartItems.filter((items)=> items.userID === userID )
      let totalCost = parseFloat((userCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)))
      setSubTotal(totalCost.toFixed(3))
      const taaxx = (totalCost*18)/100
      const shippings = 20
      totalCost = totalCost + taaxx + shippings
      setTax(taaxx.toFixed(3))
      setShipping(shippings)
      setprice(totalCost.toFixed(3))
    } 

    const handleUpdateQuantity = (productId, quantity) => {
        if(quantity>=1){
            dispatch(updateCartItem(productId, quantity));
        }
    };
    
    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };
    
    useEffect(()=>{
        setFilteredCartItems(cartItems.filter(item => item.userID === user?.sub));
        handlePriceCalculator()
        if(isAuthenticated){
            setAuth(true)
        }
    }, [isAuthenticated, cartItems])

    if(!auth){
        return(
            <div className='flex h-[100vh] justify-center items-center'>
                <Login/>
            </div>
        )
    }

    return (
        <div className=''>
            <Navbar />
            <div className='flex flex-col justify-center items-center pt-32'>
                <h1 className='text-3xl font-bold'>Shopping Cart</h1>
                <div className='w-full overflow-y-auto py-10'>
                {filteredCartItems.length != 0  ? 
                <div className='relative w-full pb-40'>
                    <div className='relative lg:mx-60 sm:mx-20 mx-5'>
                        <ul className=' flex flex-col gap-5'>
                            {filteredCartItems.map(item => (
                                <div className='flex flex-col justify-center border' key={item.id}>
                                    <div className='flex flex-col sm:flex-row gap-10 bg-[#fff] shadow-lg rounded-md p-4 justify-center'>
                                        <div className='aspect-square overflow-hidden'>
                                            <img className='w-80' src={item.image} alt={item.title} />
                                        </div>
                                        <div className="flex justify-center items-start flex-col w-full gap-3">
                                            <div className="flex items-start text-left text-sm">{item.title}</div>
                                            <div>{item.rating?
                                                <div><span className="text-yellow-500">
                                                  {'★'.repeat(Math.round(item.rating.rate))}
                                                  {'☆'.repeat(5 - Math.round(item.rating.rate))}
                                                </span>({item.rating.count})</div>: ''}
                                            </div>
                                            <div className='flex justify-center items-center gap-3 bg-stone-200 p-2 rounded-lg'>
                                                <div onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}><Counterbtn action={'add'}/></div>
                                                <div className='text-xl'>{item.quantity}</div>
                                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}><Counterbtn action={''}/></button>
                                            </div>
                                            <div className="flex text-2xl font-extrabold items-start text-left">${item.price}</div>
                                        </div>
                                        <div className=' flex top-0'>
                                            <div className=' text-red-500 hover:cursor-pointer' onClick={() => handleRemoveItem(item.id)}>
                                                <img className='w-10' src='https://img.icons8.com/?size=100&id=95771&format=png&color=000000'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className='bottom-0 w-full fixed'>
                        <div className=' justify-between items-center bg-blue-100 flex px-5 md:px-40 py-5'>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-2xl'>Subtotal: ${subtotal}</h1>
                                <h1>tax(18%): ${tax}</h1>
                                <h1>shipping: ${shipping}</h1>
                            </div>
                            <div className=' space-y-3'>
                                <div className=''>
                                    <div>Total :</div><div className='text-2xl font-bold'>${price}</div></div>
                                <button className='w-full'><PrimaryButton btnName = {'Check Out'}/></button>
                            </div>
                        </div>
                    </div>
                </div>
                :<div></div>}
                </div>
            </div>
        </div>
    );
};

export default Cart;
