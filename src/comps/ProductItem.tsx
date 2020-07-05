import React from 'react';
import '../css/product.scss';

const ProductItem = ({images, name, claz,isHallmark}: { images?: any, name?: string, claz?: string, isHallmark?:boolean }) => {
    return (
        <div className={`product-item ${claz !== undefined ? claz : ''} ${!!isHallmark ? 'product-item--hallmark' : ''}`}>
            {
                images !== undefined && <img loading='lazy' src={images[0]} alt="productimage"/>
            }
            <div className='product-item__name'>{name}</div>
        </div>
    );
};

export default ProductItem;