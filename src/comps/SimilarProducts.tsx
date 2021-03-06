import ProductItem from "./ProductItem";
import React, {useEffect} from "react";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {FETCH_SECOND_CATEGORIES, FILTER_PRODUCTS} from "../Network/schemaFormats";
import {CategoryTwo, Product, QueryFilterProductArgs} from "../gql/types";
import Loading from "./Loading";
import {Link} from "react-router-dom";

export default function SimilarProducts({categoryId}: { categoryId: string }) {

    const {loading, data} = useQuery<{ categoriesTwo: CategoryTwo[] }, { categoryTwo: string }>(FETCH_SECOND_CATEGORIES, {variables: {categoryTwo: categoryId}});
    const [fetchProducts, {loading: productsLoading, data: products}] = useLazyQuery<{ filterProduct: Product[] }, QueryFilterProductArgs>(FILTER_PRODUCTS);

    useEffect(() => {
        if (data !== undefined) {
            fetchProducts({
                variables: {
                    categoriesTwo: [data.categoriesTwo[0].id]
                }
            })
        }
    }, [data, fetchProducts]);

    if (loading || productsLoading) {
        return <Loading/>
    } else {
        if (products && products.filterProduct && products.filterProduct.length > 0) {
            return <div className="product__suggestion">
                <div className="product__suggestion-title">You may also like</div>
                <div className="product__suggestion-content">
                    {
                        products.filterProduct.slice(0, 4).map(product => <Link key={product.id} to={'/product?id=' + product.id}>
                            <ProductItem images={product.images} name={product.name} isHallmark={product.isHallmark}/></Link>)
                    }
                </div>
            </div>
        } else {
            return <></>
        }
    }
}