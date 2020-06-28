import * as React from "react";
import {motion} from "framer-motion";
import {MenuItem} from "./MenuItem";
import {CategoryTwo} from "../../gql/types";

const variants = {
    open: {
        transition: {staggerChildren: 0.15, delayChildren: 0.1}
    },
    closed: {
        transition: {staggerChildren: 0, staggerDirection: -1}
    }
};

export const Navigation = ({isOpen, items, onItemClick}: { isOpen: boolean, items?: CategoryTwo[], onItemClick: (path: string) => any }) => {
    return (
        <motion.div variants={variants} animate={isOpen ? "open" : "closed"} className='nav__container'>
            {items && items.map((item, idx) => <MenuItem item={item} key={idx} idx={idx} items={items}
                                                         onItemClick={onItemClick}/>)}
        </motion.div>
    );
}