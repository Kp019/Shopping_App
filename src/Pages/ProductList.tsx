import Navbar from '../Components/Navbar';
import FilterProducts from '../Components/FilterProducts';
import useAuth from '@/hooks/useAuth';

import { useSelector } from 'react-redux';
import ComponentCarousel from '@/Components/ui-components/Carousel';


const ProductList = () => {
    const {isLoading} = useAuth()
    const products = useSelector((state:Product) => state.product.products);

    if(isLoading){
        return(
            <div className='flex justify-center items-center h-[100vh]'>
              <svg className='w-80 flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#bff3ff" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
            </div>
        )
      }
      
    return (
        <div className='pb-20'>
            <Navbar />
            <ComponentCarousel productList = {products}/>
            <FilterProducts action={'buy'}/>
        </div>
    );
};

export default ProductList;
