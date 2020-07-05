import React from 'react';
import Section from "./section";
import '../../css/section.scss';
import {useQuery} from "@apollo/react-hooks";
import {Filter} from "../../gql/types";
import {VALID_FILTERS} from "../../Network/schemaFormats";
import {Link} from "react-router-dom";

export default function Gender() {
    const {data} = useQuery<{ filters: Filter }>(VALID_FILTERS);
    const genderMap = {
        "Men": "/assets/images/man.svg",
        "Women": "/assets/images/woman.svg",
        "Unisex": "/assets/images/unisex.svg",
        "Kids": "/assets/images/kid.svg",
        "Couples": "/assets/images/couple.svg"
    };
    const keys = Object.keys(genderMap);

        if (data !== undefined && data.filters.gender && data.filters.gender.length > 0) {
            return (
                <Section header="Shop By Gender">
                    {
                        data.filters.gender
                            .sort((gA, gB) => keys.indexOf(gA || '') - keys.indexOf(gB || ''))
                            .filter(g => genderMap.hasOwnProperty(g || ""))
                            .map(gender => <Link to={'/products?gender=' + gender} className='gender' key={gender}>
                                <img loading='lazy' className='gender__icon' src={genderMap[gender || ""]} alt={gender}/>
                                <div className='gender__name'>{gender}</div>
                            </Link>)
                    }
                </Section>
            );
        } else {
            return <></>
        }
};
