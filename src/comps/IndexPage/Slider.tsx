import React, {useState} from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import '../../css/slider.scss';

export default function Slider(props) {
    const [value, setValue] = useState<number>(0);
    return <>
        <Carousel
            value={value}
            infinite
            slidesPerScroll={1}
            slidesPerPage={1}
            keepDirectionWhenDragging
            onChange={e => setValue(e || 0)}
            breakpoints={{
                0: {
                    slidesPerPage: 1,
                    arrows: false
                }
            }}
        >
            {props.children}
        </Carousel>
        <div className='slider__dots'>
            {
                props.children.map((c, i) => <span key={i} onClick={_ => setValue(i)}
                                                   className={`slider__dot ${i === value % props.children.length ? 'slider__dot--active' : ''}`}/>)
            }
        </div>
    </>
}