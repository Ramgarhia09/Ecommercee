import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext) || []; // Added fallback
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller); 
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]); // Added products as dependency

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'Best'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam eum libero quo vitae aliquid quod dignissimos? Quisquam magnam aliquam id!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id || 'default-id'}
            name={item.name || 'No name available'}
            image={item.images || 'default-image.jpg'}
            price={item.price || 'N/A'}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
