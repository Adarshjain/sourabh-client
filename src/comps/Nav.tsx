import React, {useEffect, useState} from 'react';
import {motion, useCycle} from 'framer-motion';
import {MenuToggle} from "./Navigation/MenuToggle";
import {Navigation} from "./Navigation/Navigation";
import '../css/nav.scss';
import {CategoryOne, CategoryTwo, Misc} from "../gql/types";
import {FETCH_CATEGORIES, FETCH_MISC, FETCH_SECOND_CATEGORIES} from "../Network/schemaFormats";
import {useQuery} from "@apollo/react-hooks";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import BoardRate from "./BoardRate";

export default function Nav() {
    const {data: dataMisc} = useQuery<{ findMisc: Misc }>(FETCH_MISC, {variables: {key: "BOARD_RATE"}});
    const [boardRate,setBoardRate] = useState("");
    useEffect(() => {
        if (dataMisc !== undefined && dataMisc.findMisc !== undefined) {
            let resp = JSON.parse(dataMisc.findMisc.value || '{}');
            if (resp.hasOwnProperty('BOARD_RATE')) {
                setBoardRate(resp.BOARD_RATE);
            }
        }
    }, [dataMisc]);

    return window.innerWidth > 720 ? <FullNav boardRate={boardRate}/> : <MobileNav boardRate={boardRate}/>;
};

function MobileNav({boardRate}:{boardRate?:string}) {
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
        <>
            <motion.div className={'nav ' + (isOpen ? 'nav--open' : '')}>
                <div className='flex flex-dr jc-sb nav__header'>
                    <Link to='/' className='logo__holder'>
                        <img src="/assets/images/logo.png" alt="Sunil Jewellers" className='logo'/>
                        <div>
                            <div className='logo__name'>SUNIL JEWELLERS</div>
                            <div className='logo__location'>SRIKALAHASTHI</div>
                        </div>
                    </Link>
                    <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()}/>
                </div>
                <div className='nav__items'>
                    <Navigation isOpen={isOpen} items={data?.categoriesTwo} onItemClick={handleNav}/>
                </div>
            </motion.div>
            <BoardRate boardRate={boardRate}/>
        </>
    );
}

function FullNav({boardRate}:{boardRate?:string}) {
    const {data,loading} = useQuery<{ categoriesOne: CategoryOne[] }>(FETCH_CATEGORIES);
    return (
        <>
            <div className='flex flex-dr jc-sb nav'>
                <Link to='/' className='nav__logo logo__holder'>
                    <img src="/assets/images/logo.png" alt="Sunil Jewellers" className='logo'/>
                    <div>
                        <div className='logo__name'>SUNIL JEWELLERS</div>
                        <div className='logo__location'>SRIKALAHASTHI</div>
                    </div>
                </Link>

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
            <BoardRate boardRate={boardRate}/>
        </>

    );
}