import Nav from "../comps/Nav";
import Page from "../comps/PageContainer";
import React, {useEffect, useState} from "react";
import '../css/slider.scss';
import '../css/breadcrumb.scss';
import {Link, useLocation} from "react-router-dom";
import Social from "../comps/Social";
import {Product as Interface, QueryAllProductsArgs} from "../gql/types";
import {useLazyQuery} from "@apollo/react-hooks";
import {FETCH_PRODUCTS} from "../Network/schemaFormats";
import Loading from "../comps/Loading";
import SimilarCategoryTwo from "../comps/SimilarCategoryTwo";
import SimilarProducts from "../comps/SimilarProducts";
import Slider from "../comps/IndexPage/Slider";
import FooterContact from "../comps/FooterContant";
import RecentSearchesProd from "../comps/RecentSearchesProd";

const Product = function () {
    const location = useLocation();
    const [fetchProduct, {loading, data}] = useLazyQuery<{ allProducts: Interface[] }>(FETCH_PRODUCTS, {fetchPolicy: "network-only"});
    const [product, setProduct] = useState<any>();
    const [startedFetching, setStartedFetching] = useState<boolean>(true);
    const [value, setValue] = React.useState<{ products?: string[] }>(
        () => {
            let local = localStorage.getItem('recentSearches');
            return (local && JSON.parse(local)) || {};
        }
    );

    useEffect(() => {
        localStorage.setItem('recentSearches', JSON.stringify(value));
    }, [value])

    useEffect(() => {
        async function wrapperFn() {
            const search = location.search;
            if (search) {
                const productId = search.split('=')[1];
                let filterObj: QueryAllProductsArgs = {productId};
                await fetchProduct({
                    variables: filterObj
                });
                setStartedFetching(false);
                let currentProd = value.products || [];
                if (value.products && value.products.includes(productId)) {
                    value.products.splice(value.products.indexOf(productId), 1);
                }
                currentProd.unshift(productId);
                setValue({
                    ...value,
                    products: currentProd
                });
            } else {
                window.location.replace('/');
            }
        }

        wrapperFn();
    }, [fetchProduct, location]);

    useEffect(() => {
        if (!startedFetching && !loading) {
            if (data !== undefined && data.allProducts !== undefined) {
                setProduct(data.allProducts[0])
            } else {
                window.location.replace('/');
            }
        }
    }, [data, loading, startedFetching]);

    if (loading || product === undefined) {
        return <Loading/>
    } else {
        return <>
            <Nav/>
            <Page className="product__page">
                <Slider>
                    {
                        product.images && product.images.map(img => <img loading='lazy' key={img} className="product__image"
                                                                         alt="productImage" src={img}/>)
                    }
                </Slider>
                <div className="breadcrumb">
                    <span className="breadcrumb__item">Gold</span>
                    <Link to={'/products?c2=' + product.categoryTwo.id} className="breadcrumb__item">
                        <u>{product.categoryTwo.name}</u>
                    </Link>
                </div>
                <div className="product__holder">
                    <div className='product__name'>{product.name}</div>
                    {product.description && <div className='product__desc'>{product.description}</div>}
                    {product.weight && <div className='product__item'>
                        <div className="product__item-key">Weight</div>
                        <div className="product__item-value product__item-value--gms">{product.weight}</div>
                    </div>}
                    {product.purity && <div className='product__item'>
                        <div className="product__item-key">Purity</div>
                        <div className="product__item-value">{product.purity}</div>
                    </div>}
                    {product.size && <div className='product__item'>
                        <div className="product__item-key">Size</div>
                        <div className="product__item-value">{product.size}</div>
                    </div>}
                    {product.gender && <div className='product__item'>
                        <div className="product__item-key">Gender</div>
                        <div className="product__item-value product__item-value--gender">{product.gender}</div>
                    </div>}
                    <Social id={product.id}/>
                </div>
                <SimilarCategoryTwo categoryId={product.categoryTwo.id}/>
                <SimilarProducts categoryId={product.categoryTwo.id}/>
                <RecentSearchesProd/>
                <FooterContact/>
            </Page>
        </>
    }
}

export default Product;

