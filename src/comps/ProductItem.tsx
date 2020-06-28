import React from 'react';
import '../css/product.scss';

const ProductItem = (product: { images?: any, name?: string }) => {
    return (
        <div className='product-item'>
            {
                product.images !== undefined && <img src={product.images[0]} alt="productimage"/>
            }
            <div className='product-item__name'>{product.name}</div>
        </div>
    );
};

export default ProductItem;