import { Carousel } from "flowbite-react";

export function Component({ productList }) {
//   console.log(productList);
  
  return (
    <div className=" h-80 md:h-[500px]">
      <Carousel slideInterval={5000} indicators={false}>
        {productList.map((item) => {
          return (
            <div className="w-full flex justify-center items-center gap-5 sm:gap-20 bg-gray-100 px-5 md:px-40 py-96 rounded-none">
                <div className=" aspect-square w-60 overflow-hidden flex justify-center items-center rounded-md">
                    <img className='h-full w-full object-cover' src={item.image}/>
                </div>
                <div className="w-3/5 flex flex-col gap-3">
                  <div className="sm:text-3xl font-bold text-black">{item.title}</div>
                  <div className="text-xl font-medium text-gray-700">${item.price}</div>
                  <div>{item.rating?
                        <div>
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.round(item.rating.rate))}
                          {'☆'.repeat(5 - Math.round(item.rating.rate))}
                        </span>({item.rating.count})</div>: ''}
                    </div>
                </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}