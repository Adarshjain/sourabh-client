import * as React from "react";
import {motion} from "framer-motion";
import {CategoryTwo} from "../../gql/types";

const variants = {
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

export const MenuItem = ({item, items, idx, onItemClick}: { item: CategoryTwo, items: CategoryTwo[], idx: number, onItemClick: (path: string) => any }) => {
    return (
        <motion.div
            variants={variants}
            // whileHover={{scale: 1.1}}
            // whileTap={{scale: 0.95}}
            className='nav__item'
            onClick={() => onItemClick('/products?c2=' + item.id)}
        >
            {
                (idx === 0 || (items[idx - 1].categoryOne.name !== items[idx].categoryOne.name))
                && <div className='nav__item-title'>{item.categoryOne.name}</div>
            }

            <div className='nav__item-name'>{item.name}</div>
        </motion.div>
    );
};
