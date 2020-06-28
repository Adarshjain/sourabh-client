import React from 'react';
// import Gender from "../comps/Gender";
// import ProductList from "../comps/ProductList";
import Page from "../comps/PageContainer";
import Nav from "../comps/Nav";
import Gender from "../comps/IndexPage/Gender";
import ProductList from "../comps/IndexPage/ProductList";

const IndexPage = () => {
    return (
        <>
            <Nav/>
            <Page>
                <Gender/>
                <ProductList/>
            </Page>
        </>
    );
};

export default IndexPage;