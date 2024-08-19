import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../Redux/actions/ProductActions';
import { PrimaryButton, SecondaryButton } from './ui-components/Button';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface Props {
  isproductedit: (isEdit: boolean) => void;
  product: Product;
}

const EditProduct: React.FC<Props> = ({ isproductedit, product }) => {
  const dispatch = useDispatch();
  console.log(product);
  
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description)
  const [rating, setRating] = useState(product.rating);
  const [errors, setErrors] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
  });

  const handleUpdateProduct = (e:Event) => {
    e.preventDefault();
    
    const updatedProduct = {
      id: product.id,
      title: title.trim(),
      price,
      image: image.trim(),
      category: product.category,
      description: description.trim(),
      rating: rating,
    };
    
    const newErrors = validateForm(updatedProduct);
    setErrors(newErrors);

    if (Object.keys(newErrors).every((key) => newErrors[key] === '')) {
      dispatch(updateProduct(updatedProduct));
      isproductedit(false)
    }
  };

  const validateForm = (data: any) => {
    const errors = {
      title: '',
      price: '',
      image: '',
      description: '',
    };

    if (!data.title) {
      errors.title = 'Title is required';
    }

    if (!data.price || isNaN(Number(data.price)) || data.price <= 0) {
      errors.price = 'Price is required and must be a positive number';
    }

    if (!data.image || !isValidUrl(data.image)) {
      errors.image = 'Image URL is required and must be a valid URL';
    }

    if (!data.description) {
      errors.description = 'Description is required';
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
    <div className=' flex justify-center items-center pt-20'>
      <div>
        <h2 className='text-2xl font-bold'>Edit Product</h2>
        <form className=' flex flex-col gap-5 pt-10'>
          <div className='flex flex-col gap-2'>
            <label className='text-xl'>Title:</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <div className="text-red-500">{errors.title}</div>}
          </div>
          <div className='flex flex-col gap-2'>
            <label>Price:</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            {errors.price && <div className="text-red-500">{errors.price}</div>}
          </div>
          <div className='flex flex-col gap-2'>
            <label>Image:</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="url" value={image} onChange={(e) => setImage(e.target.value.trim())} />
            {errors.image && <div className="text-red-500">{errors.image}</div>}
          </div>
          <div className='flex flex-col gap-2'>
            <label>Description</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="text" value={description} onChange={(e) => setDescription(e.target.value.trim())} />
            {errors.description && <div className="text-red-500">{errors.description}</div>}
          </div>
          <div className='flex flex-row gap-2'>
            <button className='' onClick={(e)=> {handleUpdateProduct(e)}} type="submit"><PrimaryButton btnName = {'update'}/></button>
            <button className='' onClick={()=>{isproductedit(false)}} type='submit'><SecondaryButton btnName={'cancel'}/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct