import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cards from '../Components/Cards';
import EditProduct from './EditProduct';
import { Dropdown } from './ui-components/DropDown';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: { rate: number };
  }
  
function FilterProducts({action}: { action: string }) {
    const products = useSelector((state) => state.product.products);
    const [search, setSearch] = useState('')
    const [productFilteredData, setProductFilteredData] = useState<Product[]>([]);
    const [productSort, setProductSort] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [rating, setRating] = useState('');
    const [isEdit, setIsEdit]= useState(false)
    const [editProduct, setEditProduct] = useState({});

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
        e.preventDefault()
        switch (type) {
            case 'category':
                setProductCategory(e.target.value);
                const filteredData = products.filter((dat: Product) => dat.category === e.target.value);
                setProductFilteredData(filteredData)
                break;
            case 'sort':
                setProductSort(e.target.value)
                break;
            case 'rating':
                setRating(e.target.value);
                break;
            default:
                break;
        }
    }

    const filteredProducts = () => {
        let filteredData = productFilteredData;
        if (!productCategory) {
            filteredData = products;
        }

        return filteredData.filter((item) => {
            return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
        }).filter((item) => {
            if (rating === '') {
                return item;
            } else {
                return item.rating.rate >= parseInt(rating);
            }
        }).sort((a: Product, b: Product) => {
            if (productSort === 'asc') {
                return a.price - b.price
            } else if (productSort === 'desc') {
                return b.price - a.price
            }
        });
    }

    useEffect(() => {
        if (!productCategory) {
            setProductFilteredData(products)
        }
    }, [productCategory, products])

    if(isEdit){
        return(
            <EditProduct isproductedit={setIsEdit} product={editProduct}/>
        )
    }

  return (
    <div className='py-10'>
        <div className='flex flex-col-reverse lg:flex-row justify-center items-center gap-10 sm:py-40 py-20'>
            <div className='flex gap-8 flex-wrap justify-center items-center'>
                <Dropdown
                  label="Choose Category"
                  value={productCategory}
                  options={[
                      { value: "electronics", label: "electronics" },
                      { value: "jewelery", label: "jewelery" },
                      { value: "men's clothing", label: "men's clothing" },
                      { value: "women's clothing", label: "women's clothing" },
                    ]}
                  onChange={(e) => handleFilter(e, 'category')}
                />
                <Dropdown
                  label="Sort By"
                  value={productSort}
                  options={[
                      { value: "asc", label: "Low - High" },
                      { value: "desc", label: "High - Low" },
                    ]}
                  onChange={(e) => handleFilter(e, 'sort')}
                />
                <Dropdown
                  label='Rating'
                  value={rating}
                  options={[
                      {value: '1', label: "1 and more"},
                      {value: '2', label: "2 and more"},
                      {value: '3', label: "3 and more"},
                      {value: '4', label: "4 and more"}
                    ]}
                  onChange={(e) => handleFilter(e, 'rating')}
                  />
            </div>
            <input onChange={(e) => { setSearch(e.target.value) }} className='sm:w-[500px] h-10 border-2 rounded-sm px-5 w-[300px] focus:shadow-xl duration-300' type='text' placeholder='search' />
        </div>
        <div className='flex flex-wrap gap-10 justify-center items-start'>
            {filteredProducts().length === 0 ? (<div>No Product Found</div>):(
                filteredProducts().map((datas:object) => {
                    return (
                        <div key={datas.id} className='flex flex-row flex-wrap'>
                            { action === 'buy' ? 
                                <Cards action={'buy'} setIsproduct={false} setIsEdit={false} {...datas}/> : 
                                <Cards action={'edit'} setIsproduct={setEditProduct} setIsEdit={setIsEdit} {...datas}/>
                            }
                        </div>
                    )
                })
            )}
        </div>
    </div>
  )
}

export default FilterProducts