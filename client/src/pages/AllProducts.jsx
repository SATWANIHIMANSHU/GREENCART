import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';
import { useState,useEffect } from 'react'

const AllProducts = () => {

   const {products,searchQuery} = useAppContext();
   const [filteredProducts, setFilteredProducts] = useState([])

   useEffect(() => {
     if(searchQuery.length > 0){
        setFilteredProducts(products.filter(
            product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))}else{
            setFilteredProducts(products)
        }
   }, [products,searchQuery])
   
     const inStockProducts = filteredProducts.filter(
     (product) => product.inStock
   );

  return (
    <div>
<div className='mt-16 flex flex-col'>
    <div className='flex flex-col items-end w-max'>
      <p className='text-2xl font-medium uppercase'>All products</p>
      <div className='w-16 h-0.5 bg-primary rounded-full'></div>
    </div>
  </div>

  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>

        {inStockProducts.length > 0 ? (
          inStockProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg md:text-xl font-medium text-gray-600">
               No products found
            </p>

            {searchQuery && (
              <p className="text-sm text-gray-400 mt-2">
                Try searching for something else
              </p>
            )}
          </div>
        )}

      </div>

    </div>
  )
}

export default AllProducts