import React from 'react';
import Section from "./section";
import {Product} from "../../gql/types";
import ProductItem from "../ProductItem";

export default function ProductList({products, title}: { products: Product[], title?: string }) {
    return (
        <Section header={title}>
            <div className='index__products-holder'>
                {
                    products.map(product => <a key={product.id} href={'/product?id=' + product.id}>
                        <ProductItem claz='index__products' {...product} />
                    </a>)
                }
                {/*<Link to='/products' className='index__products-explore'>Explore all our products</Link>*/}
            </div>
        </Section>
    );
};
