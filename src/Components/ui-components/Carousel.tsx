import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
  description: string;
}

interface CarouselProps {
  productList: Product[];
}

const ComponentCarousel: React.FC<CarouselProps> = ({ productList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productList.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [productList.length]);

  const scrollCarousel = (direction: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + direction + productList.length) % productList.length);
  };

  return (
    <div className=" hidden sm:block relative w-full flex-col justify-center items-center pt-20 bg-gray-100">
      <div className='mx-40 relative sm:mx-10'>
        <div className="overflow-hidden relative rounded-lg w-[500px] md:[700px] xl:w-[1000px] xl:mx-40 mx-10">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {productList.map((product, index) => (
              <div key={index} className="min-w-full flex flex-row justify-center items-center p-4 gap-10">
                <img
                  src={product.image}
                  alt={`Slide ${index + 1}`}
                  className="w-60 object-cover mb-4"
                />
                <div className='flex flex-col justify-start items-start xl:w-7/12 gap-2'>
                  <h2 className=" text-xl xl:text-3xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-2xl font-medium text-gray-700 mb-2">${product.price}</p>
                  <div onClick={()=>window.location.href = `/product/${product.id}`} className='flex text-white bg-blue-400 px-6 py-2 rounded-md hover:cursor-pointer'>View</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none"
          onClick={() => scrollCarousel(-1)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none"
          onClick={() => scrollCarousel(1)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ComponentCarousel;
