import * as React from "react";
import {motion} from "framer-motion";
import {MenuItem} from "./MenuItem";
import {CategoryTwo} from "../../gql/types";

const variants = {
    open: {
        transition: {staggerChildren: 0.15, delayChildren: 0.06}
    },
    closed: {
        transition: {staggerChildren: 0, staggerDirection: -1}
    }
};

const variants2 = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 1000}
        }
    }
};


export const Navigation = ({isOpen, items, onItemClick}: { isOpen: boolean, items?: CategoryTwo[], onItemClick: (path: string) => any }) => {
    return (
        <motion.div variants={variants} animate={isOpen ? "open" : "closed"} className='nav__container'>
            <motion.div
                variants={variants2}
                className='nav__item' onClick={() =>
                onItemClick('/products')}>
                <div className='nav__item-name'>Explore all products</div>
            </motion.div>
            {items && items.map((item, idx) => <MenuItem item={item} key={idx} idx={idx} items={items}
                                                         onItemClick={onItemClick}/>)}
        </motion.div>
    );
}