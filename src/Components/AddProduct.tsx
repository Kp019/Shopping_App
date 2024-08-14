import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Redux/actions/ProductActions';
import { DropdownV2 } from './ui-components/DropDown';

const AddProduct = () => {

  const dispact = useDispatch();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e:Event) => {
    e.preventDefault();


    const data = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating:{
        rate: 0,
        count: 0
      },
    };

    console.log(data);
    
    // dispact(addProduct(data))

    const existingProducts = localStorage.getItem('products');
    // console.log(existingProducts);
    
    let products = existingProducts ? JSON.parse(existingProducts) : [];
    products.push(data);
    dispact(addProduct(data))
    localStorage.setItem('products', JSON.stringify(products));

    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage('');
  };

  return (
    <div className='flex flex-col w-full justify-center items-center py-20'>
      <div className='flex flex-col gap-5'>
        <div className=' text-3xl font-bold'>Add Product</div>
        <form className='flex flex-col gap-5 pt-5'>
          <input className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="text"
            placeholder="Product Price in $"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <input className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="text"
            placeholder="Product description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
            <input 
            className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
              type="text" 
              placeholder="Product Image URL" 
              value={image} 
              onChange={(e)=> setImage(e.target.value)} 
            />
          <div className='flex gap-5 sm:flex-row flex-col'>
            <DropdownV2 label="Choose Category"
                  value={category}
                  options={[
                    { value: "electronics", label: "electronics" },
                    { value: "jewelery", label: "jewelery" },
                    { value: "men's clothing", label: "men's clothing" },
                    { value: "women's clothing", label: "women's clothing" },
                  ]}
                    onChange={(event) => {console.log(event.target.value); setCategory(event.target.value)}}/>
            <button className="bg-white border-2 text-black rounded-md px-4 py-2" onClick={handleSubmit} type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
