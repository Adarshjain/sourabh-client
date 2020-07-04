import React, {useEffect, useState} from 'react';
import Page from "../comps/PageContainer";
import Nav from "../comps/Nav";
import Gender from "../comps/IndexPage/Gender";
import Slider from "../comps/IndexPage/Slider";
import FooterContact from "../comps/FooterContant";
import {Link} from "react-router-dom";
import '../css/index.scss';
import ProductCategories from "../comps/IndexPage/ProductCategories";
import Icon from "react-eva-icons";
import {useQuery} from "@apollo/react-hooks";
import {Product, QueryFilterProductArgs} from "../gql/types";
import {FILTER_PRODUCTS} from "../Network/schemaFormats";
import ProductList from "../comps/IndexPage/ProductList";

const IndexPage = () => {
    const {data} = useQuery<{ filterProduct: Product[] }, QueryFilterProductArgs>(FILTER_PRODUCTS, {
        variables: {
            isFeatured: true,
            isTrending: true
        }
    });
    const [trendingProd, setTrendingProd] = useState<Product[]>([]);
    const [featuredProd, setFeaturedProd] = useState<Product[]>([]);
    useEffect(() => {
        if (data !== undefined) {
            setTrendingProd(data.filterProduct.filter(product => product.isTrending).slice(0, 5));
            setFeaturedProd(data.filterProduct.filter(product => product.isFeatured).slice(0, 5));
        }
    }, [data])
    return (
        <>
            <Nav/>
            <Page className='index-page'>
                <Slider>
                    <img src="https://picsum.photos/id/30/300" className="banner__img" alt=""/>
                    <img src="https://picsum.photos/id/31/300" className="banner__img" alt=""/>
                    <img src="https://picsum.photos/id/32/300" className="banner__img" alt=""/>
                    <img src="https://picsum.photos/id/33/300" className="banner__img" alt=""/>
                </Slider>
                <ProductCategories/>
                <Link to='/products' className='index__explore-cta'>
                    <span>Explore all our products</span>
                    <Icon name="arrow-forward-outline" fill='#212121' size="medium"/>
                </Link>
                {
                    trendingProd.length > 0 && <ProductList products={trendingProd} title="Featured Products"/>
                }
                {
                    featuredProd.length > 0 && <ProductList products={featuredProd} title="Trending Products for you"/>
                }
                <Gender/>
                <FooterContact/>
            </Page>
        </>
    );
};

export default IndexPage;