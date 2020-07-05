import React, {useEffect, useRef, useState} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';
import {FILTER_PRODUCTS} from '../Network/schemaFormats';
import Nav from "../comps/Nav";
import Page from "../comps/PageContainer";
import {Product, QueryFilterProductArgs} from "../gql/types";
import '../css/product.scss';
import Filters from "../comps/ProductListPage/Filters";
import Loading from "../comps/Loading";
import {useLocation} from 'react-router-dom';
import {motion, useAnimation} from 'framer-motion';
import GridItem from "../comps/ProductListPage/GridItem";
import FooterContact from "../comps/FooterContant";

function getJsonFromUrl(url?: string) {
    if (!url) url = window.location.search;
    let query = url.substr(1);
    let result = {};
    query.split("&").forEach(function (part) {
        let item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

const Products = () => {
    const [products, updateProducts] = useState<Product[]>([]);
    // const {loading, error, data} = useQuery<{ filterProduct: Product[] }>(FILTER_PRODUCTS);
    const [filterProducts, {loading: loading2, data: data2}] = useLazyQuery<{ filterProduct: Product[] }>(FILTER_PRODUCTS, {fetchPolicy: "network-only"});
    const [isFilterOpen, toggleFilter] = useState<boolean>(false);
    const controls = useAnimation();
    const [localFilters, setLocalFilters] = useState<QueryFilterProductArgs>({});
    const originOffset = useRef({top: 0, left: 0});
    const location = useLocation();
    useEffect(() => {
        async function wrapperFn() {
            const search = location.search;
            let filterObj: QueryFilterProductArgs;
            if (search !== "") {
                const params: any = getJsonFromUrl();
                if (params.hasOwnProperty('gender')) {
                    filterObj = {gender: [params.gender]}
                } else if (params.hasOwnProperty('c1')) {
                    filterObj = {categoriesOne: [params.c1]}
                } else if (params.hasOwnProperty('c2')) {
                    filterObj = {categoriesTwo: [params.c2]}
                } else {
                    filterObj = {};
                }
            } else {
                filterObj = {};
            }
            await filterProducts({
                variables: filterObj
            });
            setLocalFilters(filterObj);
        }

        wrapperFn();
    }, [filterProducts, location]);
    useEffect(() => {
        if (data2 !== undefined) {
            updateProducts(data2.filterProduct)
            setTimeout(() => controls.start("visible"), 100);
        }
    }, [controls, data2]);

    // if (error) return <h3>Server under maintenance,  please retry after a couple of minutes</h3>;

    async function updateFilter(filterObj: QueryFilterProductArgs) {
        await filterProducts({
            variables: filterObj
        });
        setLocalFilters(filterObj);
    }

    if (loading2) {
        return <Loading size='large'/>;
    } else {
        return (
            <>
                <Nav/>
                <Page className='page__products'>
                    <div className='list__cont'>
                        {
                            (data2 !== undefined &&
                                products.length > 0) &&
                            <div className='product__count'>We found {products.length} products for you</div>
                        }
                        <motion.div initial="hidden" animate={controls} variants={{}}
                                    className={'product__list ' + (data2 === undefined || products.length === 0 ? 'cent' : '')}>
                            {
                                data2 !== undefined ?
                                    products.length > 0 ? products.map(
                                        (prod, index) => {
                                            return <GridItem
                                                key={prod.id}
                                                i={index}
                                                originIndex={0}
                                                delayPerPixel={0.00085}
                                                originOffset={originOffset}
                                                prod={prod}
                                            />
                                        })
                                        : <div>No products match</div>
                                    : <div>No products match</div>
                            }
                        </motion.div>
                    </div>
                    <div className='products__filter-cta-container'>
                        <div className='products__filter-cta' onClick={() => toggleFilter(!isFilterOpen)}>Filters</div>
                    </div>
                    <Filters isOpen={isFilterOpen}
                             onFilterUpdate={updateFilter}
                             onClose={() => toggleFilter(false)}
                             appliedFilters={localFilters}/>
                    <FooterContact/>
                </Page>
            </>
        );
    }
};

export default Products;


