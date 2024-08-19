import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Redux/actions/ProductActions';
import { DropdownV2 } from './ui-components/DropDown';

const AddProduct = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const data = {
      title: title.trim(),
      price: price.trim(),
      description: description.trim(),
      category: category.trim(),
      image: image.trim(),
      rating: {
        rate: 0,
        count: 0,
      },
    };

    const newErrors = validateForm(data);
    setErrors(newErrors);

    if (Object.keys(newErrors).every((key) => newErrors[key] === '')) {
      console.log(data);
      dispatch(addProduct(data));
      const existingProducts = localStorage.getItem('products');
      let products = existingProducts ? JSON.parse(existingProducts) : [];
      products.push(data);
      localStorage.setItem('products', JSON.stringify(products));
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage('');
    }
  };

  const validateForm = (data: any) => {
    const errors = {
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
    };

    if (!data.title) {
      errors.title = 'Title is required';
    }

    if (!data.price || isNaN(Number(data.price)) || data.price <= 0) {
      errors.price = 'Price is required and must be a positive number';
    }

    if (!data.description) {
      errors.description = 'Description is required';
    }

    if (!data.category) {
      errors.category = 'Category is required';
    }

    if (!data.image || !isValidUrl(data.image)) {
      errors.image = 'Image URL is required and must be a valid URL';
    }

    return errors;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className='flex flex-col w-full justify-center items-center py-20'>
      <div className='flex flex-col gap-5'>
        <div className=' text-3xl font-bold'>Add Product</div>
        <form className='flex flex-col gap-5 pt-5'>
          <input
            className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
          <input
            className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="number"
            placeholder="Product Price in $"
            value={price}
            onChange={(event) => setPrice(event.target.value.trim())}
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
          <input
            className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="text"
            placeholder="Product description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {errors.description && <div className="text-red-500">{errors.description}</div>}
          <input
            className="p-2 w-[300px] sm:w-[400px] bg-[#fff] rounded-md border-2"
            type="url"
            placeholder="Product Image URL"
            value={image}
            onChange={(event) => setImage(event.target.value.trim())}
          />
          {errors.image && <div className="text-red-500">{errors.image}</div>}
          <div className='flex gap-5 sm:flex-row flex-col'>
            <DropdownV2
              label="Choose Category"
              value={category}
              options={[
                { value: "electronics", label: "electronics" },
                { value: "jewelery", label: "jewelery" },
                { value: "men's clothing", label: "men's clothing" },
                { value: "women's clothing", label: "women's clothing" },
              ]}
              onChange={(event) => setCategory(event.target.value)}
            />
            <button className="bg-white border-2 text-black rounded-md px-4 py-2" onClick={handleSubmit} type="submit">Add Product</button>
          </div>
            {errors.category && <div className="text-red-500">{errors.category}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
