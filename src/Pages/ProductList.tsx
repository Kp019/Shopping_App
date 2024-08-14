import Navbar from '../Components/Navbar';
import FilterProducts from '../Components/FilterProducts';


const ProductList = () => {
    return (
        <div className='pb-20'>
            <Navbar />
            <FilterProducts action={'buy'}/>
        </div>
    );
};

export default ProductList;
