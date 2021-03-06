import React, {lazy, Suspense} from 'react';
import client from "./Network/Apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import './css/common.scss';
import './css/reset.css';
import './css/checkbox.scss';

function App() {
    //@ts-ignore
    window.Sentry.init({ dsn: 'https://da3498ecc47c4e9a90767ae609cda3f3@o420804.ingest.sentry.io/5339634' });
    const IndexPage = lazy(() => import('./entry/IndexPage'));
    const Products = lazy(() => import('./entry/Products'));
    const Product = lazy(() => import('./entry/Product'));
    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Suspense fallback={<div/>}>
                            <IndexPage/>
                        </Suspense>
                    </Route>
                    <Route path="/products">
                        <Suspense fallback={<div/>}>
                            <Products/>
                        </Suspense>
                    </Route>
                    <Route path="/product">
                        <Suspense fallback={<div/>}>
                            <Product/>
                        </Suspense>
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
