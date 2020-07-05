import React from 'react';
import {Link} from "react-router-dom";
import '../css/imageCard.scss';

interface ImageCardInterface {
    title?: string,
    src: string,
    style?: any,
    onClick?: any,
    href: string
}

export default function ImageCard(props: ImageCardInterface) {

    return (
        <Link to={props.href}>
            <div className='image-card' style={props.style} onClick={props.onClick}>
                <img loading='lazy' className='image-card__image' src={props.src}/>
            </div>
        </Link>
    );
};
