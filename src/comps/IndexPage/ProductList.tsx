import React from 'react';
import Section from "./section";
import {Product} from "../../gql/types";
import ImageCard from "../ImageCard";
// import '../css/pro';


interface ProductList {
    title?: string,
    products: Product
}

export default function ProductList() {
    const productMap = [
        {
            title: "Earringin",
            src: 'https://cdn.caratlane.com/media/catalog/product/cache/6/image/480x480/9df78eab33525d08d6e5fb8d27136e95//J/R/JR03162-WGP9RH_11_listfront.jpg',
            href: ''
        },
        {
            title: "Earringin2",
            src: 'https://cdn.caratlane.com/media/catalog/product/cache/6/image/480x480/9df78eab33525d08d6e5fb8d27136e95//J/T/JT00492-YGP9EB_11_listfront.jpg',
            href: ''
        },
        {
            title: "Earringin3",
            src: 'https://cdn.caratlane.com/media/catalog/product/cache/6/image/480x480/9df78eab33525d08d6e5fb8d27136e95//J/T/JT00920-1RP900_11_listfront.jpg',
            href: ''
        }
    ]
    return (
        <Section header="Featured Products">
            {
                productMap.map(product => <ImageCard key={product.title} href={product.href} style={{margin: '24px'}} src={product.src}/>)
            }
        </Section>
    );
};
