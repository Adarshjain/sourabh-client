import React from 'react';
import '../css/page.scss';
import Icon from "react-eva-icons";

const Page = (props) => {

    return (
        <div className={'page ' + (props.className ?? '')}>
            {props.children}
            <>
                <div className='page__landscape'>
                    <Icon name="alert-circle-outline" fill='#212121' size="xlarge"/>
                    <div className='page__landscape-text'>We do not support landscape mode.</div>
                    <div className='page__landscape-sub-text'>Please rotate you device to portrait mode.</div>
                </div>
            </>
        </div>
    );
};

export default Page;