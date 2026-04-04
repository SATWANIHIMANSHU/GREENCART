import React from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const Categories = () => {

    const {navigate} = useAppContext();

  return (
   <div className='mt-16'>
  <p className='text-2xl md:text-3xl font-medium'>Categories</p>

  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-4'>
    {categories.map((category, index) => (
      <div
        key={index}
        className='group cursor-pointer py-4 px-2 gap-2 rounded-xl flex flex-col items-center justify-center transition hover:shadow-md'
        style={{ backgroundColor: category.bgColor }}
        onClick={() => {
          navigate(`/products/${category.path.toLowerCase()}`);
          scrollTo(0, 0);
        }}
      >
        <img
          src={category.image}
          alt={category.text}
          className='w-16 sm:w-20 md:w-24 object-contain transition-transform duration-300 group-hover:scale-110'
        />

        <p className='text-xs sm:text-sm font-medium text-center leading-tight'>
          {category.text}
        </p>
      </div>
    ))}
  </div>
</div>


  );
};

export default Categories;
