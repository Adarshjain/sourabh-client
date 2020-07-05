import React, {useEffect, useState} from 'react';
import useScrollPosition from '@react-hook/window-scroll';
import {motion, useCycle} from 'framer-motion';
import {MenuToggle} from "./Navigation/MenuToggle";
import {Navigation} from "./Navigation/Navigation";
import '../css/nav.scss';
import {CategoryOne, CategoryTwo} from "../gql/types";
import {FETCH_CATEGORIES, FETCH_SECOND_CATEGORIES} from "../Network/schemaFormats";
import {useQuery} from "@apollo/react-hooks";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

export default function Nav() {
    return window.innerWidth > 720 ? <FullNav/> : <MobileNav/>;
};

function MobileNav() {
    const {data} = useQuery<{ categoriesTwo: CategoryTwo[] }>(FETCH_SECOND_CATEGORIES);
    const [isOpen, toggleOpen] = useCycle(false, true);
    const history = useHistory();
    useEffect(() => {
        if (isOpen) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }
    }, [isOpen]);

    function handleNav(path) {
        history.push(path);
        toggleOpen(0);
    }

    return (
        <motion.div className={'nav ' + (isOpen ? 'nav--open' : '')}>
            <div className='flex flex-dr jc-sb nav__header'>
                <Link to='/'>Sourabh<br/>Jewellers</Link>
                <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()}/>
            </div>
            <div className='nav__items'>
                <Navigation isOpen={isOpen} items={data?.categoriesTwo} onItemClick={handleNav}/>
            </div>
        </motion.div>
    );
}

function FullNav() {
    const {data,loading} = useQuery<{ categoriesOne: CategoryOne[] }>(FETCH_CATEGORIES);
    return (
        <div className='flex flex-dr jc-sb nav'>
            <Link to='/' className='nav__logo'>Sourabh Jewellers</Link>

            <div>
                {
                    data?.categoriesOne.map(categOne => <Link
                        className='nav__categ'
                        key={categOne.id}
                        to={'/products?c1=' + categOne.id}>
                        {categOne.name}
                    </Link>)
                }
                {
                    !loading && <Link to='/products' className='nav__categ'>All Products</Link>
                }
            </div>
        </div>
    );
}