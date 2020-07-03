import React from "react";
import Section from "./section";
import {useQuery} from "@apollo/react-hooks";
import {CategoryTwo} from "../../gql/types";
import {FETCH_SECOND_CATEGORIES} from "../../Network/schemaFormats";

export default function ProductCategories() {
    const {data, loading} = useQuery<{ categoriesTwo: CategoryTwo[] }>(FETCH_SECOND_CATEGORIES);

    if (loading || data === undefined) {
        return <></>
    } else {
        return <Section header="Shop By Categories">
            <div className='index__categories-holder'>
                {
                    data.categoriesTwo.slice(0, 12).map(cat2 => <a href={`/products?c2=${cat2.id}`}>
                        <div className='index__categories'>
                            <img src={cat2.imageUrl} alt="Category Image" className='index__categories-img'/>
                            <div className='index__categories-title'>{cat2.name}</div>
                        </div>
                    </a>)
                }
            </div>
        </Section>
    }
}