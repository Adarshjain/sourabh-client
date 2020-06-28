import React from 'react';
import Section from "./section";
import '../../css/section.scss';

export default function Gender() {
    const genderMap = [
        {
            name: "Man",
            imgpath: "/assets/images/man.svg"
        },
        {
            name: "Women",
            imgpath: "/assets/images/woman.svg"
        },
        // {
        //     name: "Kids",
        //     imgpath: "/assets/images/kid.svg"
        // },
        // {
        //     name: "Couples",
        //     imgpath: "/assets/images/couple.svg"
        // },
        {
            name: "Unisex",
            imgpath: "/assets/images/unisex.svg"
        },
    ];
    return (
        <Section header="Search By Gender">
            {
                genderMap.map(gender => <div className='gender' key={gender.name}>
                    <img className='gender__icon' src={gender.imgpath} alt={gender.name}/>
                    <div className='gender__name'>{gender.name}</div>
                </div>)
            }
        </Section>
    );
};
