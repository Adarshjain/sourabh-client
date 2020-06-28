import React from 'react';
import client from "./Network/Apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import './css/common.scss';
import './css/reset.css';
import './css/checkbox.scss';

import IndexPage from "./entry/IndexPage";
import Products from "./entry/Products";
import Product from "./entry/Product";

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <IndexPage/>
                    </Route>
                    <Route path="/products">
                        <Products/>
                    </Route>
                    <Route path="/product">
                        <Product/>
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
