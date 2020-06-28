import React from "react";
import '../css/loading.scss';

const Loading = ({size}: { size?: string }) => {
    return <div className='loading__container'>
        <div className={'loading__spinner ' + (size ? 'loading__spinner--' + size : '')}/>
    </div>
}

export default Loading;