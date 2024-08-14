import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VerticalBarChart } from './ui/VerticalBarCharts';
import { HorizontalBarChart } from './ui/HorizontalBarChart';
import { LineCharts } from './ui/LineChart';
import { SecondaryButton } from './ui-components/Button';
import { useAuth0 } from '@auth0/auth0-react';

interface Product {
  category: string;
  rating: {
    rate: number;
  };
  title: string;
}

interface CategoryListCount {
  category: string;
  count: number;
}

interface CategoryPopularityList {
  category: string;
  count: number;
  averageRating: number;
  popularityIndex: number;
}

interface ProductPopularityList {
  category: string;
  rating: {
    rate: number;
  };
  popularityIndex: number;
  title: string;
}

interface SalesData {
  title: string;
  count: number;
}

function ProductAnalytics() {
  const { user, isAuthenticated } = useAuth0();
  const products: Product[] = useSelector((state: any) => state.product.products);
  const [categoryListCount, setCategoryListCount] = useState<CategoryListCount[]>([]);
  const [categoryPopularityList, setCategoryPopularityList] = useState<CategoryPopularityList[]>([]);
  const [productPopularityList, setProductPopularityList] = useState<ProductPopularityList[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    let rev = 0
    products.map((product)=>{
      // console.log(product.rating.count);
      const num = (product.rating.count * product.price)
      rev += num
    })
    
    setRevenue(rev.toFixed(2))
    

    // get cartData from localStorage
    const cartData: SalesData[] = JSON.parse(localStorage.getItem('cartData') || '[]');
    setSalesData(cartData);

    // category wise counting
    const categoryCounts: { [category: string]: number } = products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});

    const categoryList: CategoryListCount[] = Object.keys(categoryCounts).map((category) => ({
      category,
      count: categoryCounts[category],
    }));

    // calculate popularity index by category
    const popularityListViaCategory: CategoryPopularityList[] = categoryList.map((item) => {
      const categoryProducts = products.filter((product) => product.category === item.category);
      const totalRating = categoryProducts.reduce((acc, product) => acc + product.rating.rate, 0);
      const averageRating = totalRating / categoryProducts.length;
      const popularityIndex = (item.count + averageRating) / 2;
      return {
        category: item.category,
        count: item.count,
        averageRating,
        popularityIndex,
      };
    });

    // calculate popularity index of each product
    const PopularityListViaProduct: ProductPopularityList[] = products.map((product) => {
      const categoryCount = categoryCounts[product.category];
      const popularityIndex = (product.rating.rate + categoryCount) / 2;
      return {
        ...product,
        popularityIndex,
      };
    });

    setCategoryListCount(categoryList);
    setCategoryPopularityList(popularityListViaCategory);
    setProductPopularityList(PopularityListViaProduct);
  }, [products]);

    return (
        <div className='w-full flex flex-col items-center mx-0'>
          {isAuthenticated && user?.email === 'krishnaprasadr666@gmail.com' ?
          <div className='w-full flex flex-col items-center mx-0'>
            <div className='flex flex-col sm:flex-row gap-5 w-full justify-between px-5 md:px-20 lg:px-60 md:py-10 p-5 bg-blue-700 items-center'>
              <div className=' text-3xl font-bold text-white'>Product Analytics Dashboard</div>
              <div className='flex gap-5'>
                <div onClick={()=>window.location.href = '/'}><SecondaryButton btnName={'Home'}/></div>
                <div onClick={()=> window.location.href = '/admin'}><SecondaryButton btnName={'Admin'}/></div>
              </div>
            </div>
            <div className='flex flex-wrap gap-10 pt-10'>
              <div className='flex flex-col gap-5 justify-center items-center flex-grow w-80 p-10 bg-blue-100 rounded-md'>
                <div className=' text-xl'>Total Products</div>
                <div className=' font-bold text-3xl'>{products.length}</div>
              </div>
              <div className='flex flex-col gap-5 justify-center items-center flex-grow w-80 p-10 bg-blue-100 rounded-md'>
                <div className=' text-xl'>Total Category</div>
                <div className=' font-bold text-3xl'>4</div>
              </div>
              <div className='flex flex-col gap-5 justify-center items-center flex-grow w-80 p-10 bg-blue-100 rounded-md'>
                <div className=' text-xl'>Total Revenue Generated</div>
                <div className=' font-bold text-3xl'>$ {revenue}</div>
              </div>
            </div>
            <div className='flex w-4/5 gap-5 py-10 flex-col'>
              <div>

              </div>
              <div className='flex flex-col md:flex-row justify-center w-full gap-5'>
                  <div className='md:w-1/2 drop-shadow-xl'><VerticalBarChart data={categoryListCount} x={'category'} y={'count'} chartTitle = {'Product Category Count'} action={'false'}/></div>
                  <div className='md:w-1/2 drop-shadow-xl'><HorizontalBarChart data={categoryPopularityList} /></div>
              </div>
              <div className='flex flex-col md:flex-row justify-center gap-5 w-full'>
                  <div className='md:w-1/2 drop-shadow-xl'><LineCharts data={productPopularityList} /></div>
                  <div className='md:w-1/2 drop-shadow-xl'><VerticalBarChart data={salesData} x={'title'} y={'count'} chartTitle = {'Cart Chart'} action={'true'}/></div>
              </div>
            </div> 
          </div>:<div>Page not Found</div>
      }
        </div>
    )
}

export default ProductAnalytics;