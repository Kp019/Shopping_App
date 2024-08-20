import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/actions/CartActions";
import { useAuth0 } from "@auth0/auth0-react";
import { checkDuplicateInCart } from "../Utils/checkCartDuplicate";
import Cards, { updateCartData } from "./Cards";
import { SecondaryButton } from "./ui-components/Button";
import { Alert } from "./Alert";

interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
}

function ProductDetails() {
  const { id } = useParams();
  const productId = parseFloat(id);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [productCategory, setProductCategory] = useState("");
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [alert, setAlert] = useState('')


    const handlealert = (flag:boolean) => {
      if(flag){
        setAlert('')
      }
    }

    useEffect(()=>{
        const productss = products.find((uproduct: { id: number; }) => uproduct.id == productId);
        setProductCategory(productss.category)
        const proSmi = products.filter((item: { category: string; }) => item.category === productCategory)
        setSimilarProducts(proSmi)
        console.log(proSmi);
        setProduct(productss)
    }, [products, productId, productCategory])

    const handleAddToCart = () => {
        const productss = products.find((uproduct: { id: number; }) => uproduct.id == productId);
        if (!checkDuplicateInCart(productss, cartItems, user?.sub)) {
          productss['userID'] = user?.sub
          dispatch(addToCart(productss))
          updateCartData(productss.title, productss.category)
          setAlert('product added to cart')
        } else {
          setAlert('Item already exists in cart')
        }
    }


  return (
    <div className='flex flex-col gap-20 items-center'>
      {alert.length > 0 ? <Alert text={alert} fn = {handlealert}/> : ''}
        <Navbar/>
        <div className='flex flex-col items-start justify-center gap-20 px-20 py-40 w-full'>
            <div className='flex md:flex-row flex-col justify-center items-center w-full gap-16'>
              <div className='flex justify-center items-center md:w-96 w-60 h-auto overflow-hidden border-4 p-5'>
                  <img className='w-full h-full' src={product?.image} />
              </div>
              <div className='flex flex-col md:w-[500px] sm:w-[300px] gap-3'>
                  <div className=' text-3xl font-bold'>{product?.title}</div>
                  <div className=' text-md font-normal'>{product?.category}</div>
                  <div className='flex gap-5 items-center pt-5'>
                      <div className=' text-3xl font-bold'>${product?.price}</div>
                      <div>{product?.rating ?
                          <div>
                          <span className="text-yellow-500">
                            {'★'.repeat(Math.round(product.rating.rate))}
                            {'☆'.repeat(5 - Math.round(product.rating.rate))}
                          </span>({product.rating.count})</div>: ''}
                      </div>
                  </div>
                  <div onClick={handleAddToCart} className='w-full mt-3'>
                    <SecondaryButton btnName='Buy Now'/>
                  </div>
                  <div className='h-[1px] w-full bg-gray-700 mt-10'></div>
                  <div className='flex flex-col pt-10 gap-3'>
                      <div className='text-xl'>Description</div>
                      <div className=' text-sm '>{product?.description}</div>
                  </div>
              </div>
            </div>
              <div className='flex flex-col w-full justify-center items-start gap-10 pt-10'>
                <div className=' text-3xl font-bold'>Similar Products</div>
                <div className="flex flex-col w-full overflow-x-auto justify-center items-start gap-10">
                  <div className='flex gap-5 w-screen overflow-hidden '>
                  {
                    similarProducts.map((product) => (
                      <Cards action={'buy'} setIsproduct={false} setIsEdit={false} {...product}/>))
                    }
                  </div>
                </div>
              </div>
              
        </div>
    </div>
  )
}

export default ProductDetails