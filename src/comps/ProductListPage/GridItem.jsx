import React, {useEffect, useLayoutEffect, useRef} from "react";
import {motion} from "framer-motion";
import ProductItem from "../ProductItem";

const itemVariants = {
    hidden: {
        opacity: 0,
        scale: 0.5
    },
    visible: delayRef => ({
        opacity: 1,
        scale: 1,
        transition: {delay: delayRef.current}
    })
};

export default function GridItem({delayPerPixel, i, originIndex, originOffset, prod}) {
    const delayRef = useRef(0);
    const offset = useRef({top: 0, left: 0});
    const ref = useRef();

    // The measurement for all elements happens in the layoutEffect cycle
    // This ensures that when we calculate distance in the effect cycle
    // all elements have already been measured
    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        offset.current = {
            top: element.offsetTop,
            left: element.offsetLeft
        };

        if (i === originIndex) {
            originOffset.current = offset.current;
        }
    }, [delayPerPixel, i, originIndex, originOffset]);

    useEffect(() => {
        const dx = Math.abs(offset.current.left - originOffset.current.left);
        const dy = Math.abs(offset.current.top - originOffset.current.top);
        const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        delayRef.current = d * delayPerPixel;
    }, [delayPerPixel, originOffset]);

    return <motion.a href={'/product?id=' + prod.id}
                     className='product-container'
                     key={prod.id}
                     ref={ref}
                     variants={itemVariants} custom={delayRef}
    >
        <ProductItem {...prod} />
    </motion.a>
    //+ (i === 0 ? 'product-container--full-width' : '')
}