import ProductItem from "./ProductItem";
import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {FETCH_SECOND_CATEGORIES} from "../Network/schemaFormats";
import {CategoryTwo} from "../gql/types";
import Loading from "./Loading";

export default function SimilarCategoryTwo({categoryId}: { categoryId: string }) {

    const {loading, data} = useQuery<{ categoriesTwo: CategoryTwo[] }, { categoryTwo: string }>(FETCH_SECOND_CATEGORIES, {variables: {categoryTwo: categoryId}});

    if (loading) {
        return <Loading/>
    } else {
        if (data && data.categoriesTwo && data.categoriesTwo.length > 0) {
            return <div className="product__suggestion">
                <div className="product__suggestion-title">Suggested Categories</div>
                <div className="product__suggestion-content">
                    {
                        data.categoriesTwo.slice(0, 4).map(categoryTwo => <a key={categoryTwo.id}
                                                                             href={'/products?c2=' + categoryTwo.id}>
                            <ProductItem images={[categoryTwo.imageUrl]} name={categoryTwo.name}/>
                        </a>)
                    }
                </div>
            </div>
        } else {
            return <></>
        }
    }
}