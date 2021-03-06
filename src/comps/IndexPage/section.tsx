import React from 'react';

interface Section {
    header?: string | Element[],
    direction?: string,
    children?: any
}

export default function Section(props: Section) {
    return (
        <div className='flex flex-dc aic section'>
            <div className='section__header'>
                {props.header}
            </div>
            <div className={'flex ' + (props.direction === "column" ? "flex-dc" : "")}>
                {props.children}
            </div>
        </div>
    );
};
