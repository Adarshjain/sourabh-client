import React from 'react';
import Section from "./section";
import {useQuery} from "@apollo/react-hooks";
import {Product, QueryFilterProductArgs} from "../../gql/types";
import {FILTER_PRODUCTS} from "../../Network/schemaFormats";
import Loading from "../Loading";
import ProductItem from "../ProductItem";

export default function ProductList({ids}: { ids: string[] }) {
    const {loading, data} = useQuery<{ filterProduct: Product[] }, QueryFilterProductArgs>(FILTER_PRODUCTS, {variables: {id: ids}});

    if (loading) {
        return <Loading/>
    }
    if (data !== undefined && data.filterProduct.length > 0) {
        return (
            <Section header="Featured Products">
                {
                    data.filterProduct.map(product => <ProductItem {...product} />)
                }
            </Section>
        );
    } else {
        return <></>
    }
};
