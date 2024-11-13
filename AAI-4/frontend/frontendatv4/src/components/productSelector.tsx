import React from 'react';
import { products } from '../data/data';

type ProductSelectorProps = {
  onSelect: (productName: string) => void;
};

const ProductSelector: React.FC<ProductSelectorProps> = ({ onSelect }) => {
  return (
    <div>
      <label>Select a Product:</label>
      <select onChange={(e) => onSelect((e.target.value))}>
        <option value="">-- Select Product --</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelector;
