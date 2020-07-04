import React, {useEffect, useState} from 'react';
import useScrollPosition from '@react-hook/window-scroll';
import {motion, useCycle} from 'framer-motion';
import {MenuToggle} from "./Navigation/MenuToggle";
import {Navigation} from "./Navigation/Navigation";
import '../css/nav.scss';
import {CategoryTwo} from "../gql/types";
import {FETCH_SECOND_CATEGORIES} from "../Network/schemaFormats";
import {useQuery} from "@apollo/react-hooks";
import Loading from "./Loading";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

export default function Nav() {
    const {data, loading} = useQuery<{ categoriesTwo: CategoryTwo[] }>(FETCH_SECOND_CATEGORIES);
    return loading ? <Loading/> : window.innerWidth > 640 ? <FullNav/> :
        <MobileNav items={data?.categoriesTwo}/>;
};

function MobileNav({items}: { items?: CategoryTwo[] }) {
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
                <Navigation isOpen={isOpen} items={items} onItemClick={handleNav}/>
            </div>
        </motion.div>
    );
}

function FullNav() {
    const variants = {
        full: {width: 'calc(100% - 80px)'},
        small: {width: 'calc(80% - 80px)'},
    };
    const [isFull, setIsFull] = useState(false);
    const scrollY = useScrollPosition(60 /*fps*/);

    useEffect(() => {
        setIsFull(scrollY > 40);
    }, [scrollY, isFull]);

    return (
        <div className='flex flex-dr jc-sb nav'
             style={isFull ? variants.full : variants.small}
        >
            <Link to='/'>
                Sourabh Jewellers
            </Link>
            <div>
                <a href="">Home</a>
                <a href="">Shop</a>
                <a href="">Contact</a>
                <a href="">Search</a>
            </div>
        </div>
    );
}