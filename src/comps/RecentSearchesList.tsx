import React, {useEffect} from "react";
import {useLazyQuery} from "@apollo/react-hooks";
import {Product} from "../gql/types";
import {FILTER_PRODUCTS} from "../Network/schemaFormats";
import ProductItem from "./ProductItem";

export default function RecentSearchesList() {
    const [value] = React.useState<{ products?: string[] }>(
        () => {
            let local = localStorage.getItem('recentSearches');
            return (local && JSON.parse(local)) || {};
        }
    );
    const [filterProducts, {data}] = useLazyQuery<{ filterProduct: Product[] }>(FILTER_PRODUCTS, {fetchPolicy: "network-only"});

    useEffect(() => {
        if (value && value.products) {
            filterProducts({
                variables: {
                    productId: value.products
                }
            });
        }
    }, [filterProducts, value]);
    if (data !== undefined && data.filterProduct !== undefined) {
        return <>
            {
                data.filterProduct
                    .slice(0, 5)
                    .sort((prodA, prodB) => (value.products?.indexOf('' + prodA.id) || -1) - (value.products?.indexOf('' + prodB.id) || -1))
                    .map(product => <a href={'/product?id=' + product.id}>
                        <ProductItem claz='' images={product.images} name={product.name}/>
                    </a>)
            }
        </>
    } else {
        return <></>
    }
}