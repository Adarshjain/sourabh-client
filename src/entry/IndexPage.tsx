import React from 'react';
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
                <ProductList ids={['112','113']}/>
            </Page>
        </>
    );
};

export default IndexPage;