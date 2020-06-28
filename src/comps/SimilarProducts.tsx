import ProductItem from "./ProductItem";
import React, {useEffect} from "react";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {FETCH_SECOND_CATEGORIES, FILTER_PRODUCTS} from "../Network/schemaFormats";
import {CategoryTwo, Product, QueryFilterProductArgs} from "../gql/types";
import Loading from "./Loading";

export default function SimilarProducts({categoryId}: { categoryId: string }) {

    const {loading, data} = useQuery<{ categoriesTwo: CategoryTwo[] }, { categoryTwo: string }>(FETCH_SECOND_CATEGORIES, {variables: {categoryTwo: categoryId}});
    const [fetchProducts, {loading: productsLoading, data: products}] = useLazyQuery<{ filterProduct: Product[] }, QueryFilterProductArgs>(FILTER_PRODUCTS);

    useEffect(() => {
        if (data !== undefined) {
            fetchProducts({
                variables: {
                    categoryTwo: [data.categoriesTwo[0].id]
                }
            })
        }
    }, [data, fetchProducts]);

    if (loading || productsLoading) {
        return <Loading/>
    } else {
        if (products && products.filterProduct && products.filterProduct.length > 0) {
            return <div className="product__suggestion">
                <div className="product__suggestion-title">Suggested Products</div>
                <div className="product__suggestion-content">
                    {
                        products.filterProduct.slice(0, 4).map(product => <a href={'/product?id=' + product.id}>
                            <ProductItem images={product.images} name={product.name}/></a>)
                    }
                </div>
            </div>
        } else {
            return <></>
        }
    }
}