import React from 'react';
import Section from "./section";
import {useQuery} from "@apollo/react-hooks";
import {Product, QueryFilterProductArgs} from "../../gql/types";
import {FILTER_PRODUCTS} from "../../Network/schemaFormats";
import Loading from "../Loading";
import ProductItem from "../ProductItem";

export default function ProductList() {
    const {loading, data} = useQuery<{ filterProduct: Product[] }, QueryFilterProductArgs>(FILTER_PRODUCTS, {variables: {productId: ['112', '113', '114']}});

    if (loading) {
        return <Loading/>
    }
    if (data !== undefined && data.filterProduct.length > 0) {
        return (
            <Section header="Featured Products">
                <div className='index__products-holder'>
                    {
                        data.filterProduct.slice(0, 3).map(product => <a href={'/product?id=' + product.id}>
                            <ProductItem claz='index__products' {...product} />
                        </a>)
                    }
                    {/*<Link to='/products' className='index__products-explore'>Explore all our products</Link>*/}
                </div>
            </Section>
        );
    } else {
        return <></>
    }
};
