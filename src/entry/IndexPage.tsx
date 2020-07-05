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
import {Misc, Product, QueryFilterProductArgs} from "../gql/types";
import {FETCH_MISC, FILTER_PRODUCTS} from "../Network/schemaFormats";
import ProductList from "../comps/IndexPage/ProductList";

const IndexPage = () => {
    const {data} = useQuery<{ filterProduct: Product[] }, QueryFilterProductArgs>(FILTER_PRODUCTS, {
        variables: {
            isFeatured: true,
            isTrending: true
        }
    });
    const {data: dataMisc, loading} = useQuery<{ findMisc: Misc }>(FETCH_MISC, {variables: {key: "BANNER_IMAGES"}});
    const [bannerImages, setBannerImages] = useState<string[]>([]);
    const [trendingProd, setTrendingProd] = useState<Product[]>([]);
    const [featuredProd, setFeaturedProd] = useState<Product[]>([]);
    useEffect(() => {
        if (data !== undefined) {
            setTrendingProd(data.filterProduct.filter(product => product.isTrending).slice(0, 5));
            setFeaturedProd(data.filterProduct.filter(product => product.isFeatured).slice(0, 5));
        }
    }, [data]);
    useEffect(() => {
        if (dataMisc !== undefined && dataMisc.findMisc !== undefined) {
            let resp = JSON.parse(dataMisc.findMisc.value || '{}');
            if (resp.hasOwnProperty('BANNER_IMAGES')) {
                let bannerImages: { url: string, orderOfDisplay: number }[] = JSON.parse(resp.BANNER_IMAGES);
                setBannerImages(
                    bannerImages
                        .sort((objB, objA) => objA.orderOfDisplay - objB.orderOfDisplay)
                        .map(img => img.url)
                )

            }
        }
    }, [dataMisc]);
    return (
        <>
            <Nav/>
            <Page className='index-page'>
                {
                    !loading && <Slider>
                        {
                            bannerImages.map(img => <img loading='lazy' src={img} key={img} className="banner__img" alt=""/>)
                        }
                    </Slider>
                }
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