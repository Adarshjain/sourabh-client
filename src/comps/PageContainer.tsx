import React from 'react';
import '../css/page.scss';

const Page = (props) => {

    return (
        <div className={'page ' + (props.className ?? '')}>
            {props.children}
        </div>
    );
};

export default Page;