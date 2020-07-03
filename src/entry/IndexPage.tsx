import React from 'react';
import Page from "../comps/PageContainer";
import Nav from "../comps/Nav";
import Gender from "../comps/IndexPage/Gender";
import Slider from "../comps/IndexPage/Slider";
import FooterContact from "../comps/FooterContant";
import {Link} from "react-router-dom";
import '../css/index.scss';
import ProductList from "../comps/IndexPage/ProductList";
import ProductCategories from "../comps/IndexPage/ProductCategories";
import Icon from "react-eva-icons";

const IndexPage = () => {
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
                <ProductList/>
                <Gender/>
                <FooterContact/>
            </Page>
        </>
    );
};

export default IndexPage;