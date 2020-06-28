import * as React from "react";
import {motion} from "framer-motion";

// const Path = props => (
//     <motion.path
//         fill="transparent"
//         strokeWidth="3"
//         stroke="hsl(0, 0%, 18%)"
//         strokeLinecap="round"
//         {...props}
//     />
// );

export const MenuToggle = ({toggle, isOpen}) => (
    <div onClick={toggle} className='hamburger'>
        <motion.div
            className='hamburger__top'
            animate={isOpen ? "open" : "closed"}
            variants={{
                closed: {transform: 'rotate(0deg)'},
                open: {transform: 'rotate(-45deg)'}
            }}
        />
        <motion.div
            className='hamburger__middle'
            animate={isOpen ? "open" : "closed"}
            variants={{
                closed: {opacity: 1},
                open: {opacity: 0}
            }}
        />
        <motion.div
            className='hamburger__bottom'
            animate={isOpen ? "open" : "closed"}
            variants={{
                closed: {transform: 'rotate(0deg)'},
                open: {transform: 'rotate(45deg)'}
            }}
        />
    </div>
);
