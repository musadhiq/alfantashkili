import React from 'react';
import ProductCard from './ProductCard';
import productPlaceholder from '../assets/productPlaceholder.jpg';

// Dummy product data
const dummyProducts = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Product ${index + 1}`,
  description: 'This is a sample description for the product.',
  brand: 'BrandX',
  model: `Model-${index + 100}`,
  price: (20 + index).toFixed(2),
  images: [
    {
      type: 'COVER',
      url: productPlaceholder,
    },
  ],
}));

function UserProductList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {dummyProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            actions={
              <button className="text-sm text-blue-600 hover:underline">View</button>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default UserProductList;
