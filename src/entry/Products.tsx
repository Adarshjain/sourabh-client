import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';
import {FILTER_PRODUCTS} from '../Network/schemaFormats';
import Nav from "../comps/Nav";
import Page from "../comps/PageContainer";
import {Product, QueryFilterProductArgs} from "../gql/types";
import ProductItem from "../comps/ProductItem";
import '../css/product.scss';
import Filters from "../comps/ProductListPage/Filters";
import Loading from "../comps/Loading";
import {useLocation} from 'react-router-dom';

const Products = () => {
    const [products, updateProducts] = useState<Product[]>([]);
    // const {loading, error, data} = useQuery<{ filterProduct: Product[] }>(FILTER_PRODUCTS);
    const [filterProducts, {loading: loading2, data: data2}] = useLazyQuery<{ filterProduct: Product[] }>(FILTER_PRODUCTS, {fetchPolicy: "network-only"});
    const [isFilterOpen, toggleFilter] = useState<boolean>(false);
    const [localFilters, setLocalFilters] = useState<QueryFilterProductArgs>({});
    const location = useLocation();
    useEffect(() => {
        async function wrapperFn() {
            const search = location.search//.slice(1)
            let filterObj: QueryFilterProductArgs;
            if (search !== "") {
                const c2id = search.split('=')[1];
                filterObj = {categoriesTwo: [c2id]}
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
        // if (data !== undefined) {
        //     updateProducts(data.filterProduct)
        // }
        console.log(data2);
        if (data2 !== undefined) {
            updateProducts(data2.filterProduct)
        }
    }, [data2]);

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
                    <div className='product__list'>
                        {
                            data2 !== undefined ?
                                products.length > 0 ? products.map(
                                    (prod, index) => {
                                        return <a href={'/product?id=' + prod.id}
                                                  className={'product-container ' + (index === 0 ? 'product-container--full-width' : '')}
                                                  key={prod.id}>
                                            <ProductItem {...prod} />
                                        </a>
                                    })
                                    : 'No products match'
                                : 'No products match'
                        }
                    </div>
                    <div className='products__filter-cta-container'>
                        <div className='products__filter-cta' onClick={() => toggleFilter(!isFilterOpen)}>Filters</div>
                    </div>
                    <Filters isOpen={isFilterOpen}
                             onFilterUpdate={updateFilter}
                             onClose={() => toggleFilter(false)}
                             appliedFilters={localFilters}/>
                </Page>
            </>
        );
    }
};

export default Products;