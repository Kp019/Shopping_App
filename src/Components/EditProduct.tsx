import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../Redux/actions/ProductActions';
import { PrimaryButton, SecondaryButton } from './ui-components/Button';

const EditProduct = ({ isproductedit, product }) => {
  const dispatch = useDispatch();
  console.log(product);
  
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description)
  const [rating, setRating] = useState(product.rating);
  

  const handleUpdateProduct = (e:Event) => {
    e.preventDefault();
    
    const updatedProduct = {
      id: product.id,
      title,
      price,
      image,
      category: product.category,
      description,
      rating: rating,
    };
    
    dispatch(updateProduct(updatedProduct));
    isproductedit(false)
  };

  return (
    <div className=' flex justify-center items-center pt-20'>
      <div>
        <h2 className='text-2xl font-bold'>Edit Product</h2>
        <form className=' flex flex-col gap-5 pt-10'>
          <div className='flex flex-col gap-2'>
            <label className='text-xl'>Title:</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Price:</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Image:</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Description</label>
            <input className='shadow-xl w-96 p-4 rounded-md border-2' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className='flex flex-row gap-2'>
            <button className='' onClick={handleUpdateProduct} type="submit"><PrimaryButton btnName = {'update'}/></button>
            <button className='' onClick={()=>{isproductedit(false)}} type='submit'><SecondaryButton btnName={'cancel'}/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;