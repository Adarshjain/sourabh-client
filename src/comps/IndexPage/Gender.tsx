import React, {useEffect} from 'react';
import Section from "./section";
import '../../css/section.scss';
import {useQuery} from "@apollo/react-hooks";
import {Filter} from "../../gql/types";
import {VALID_FILTERS} from "../../Network/schemaFormats";
import Loading from "../Loading";

export default function Gender() {
    const {data, loading} = useQuery<{ filters: Filter }>(VALID_FILTERS);
    const genderMap = {
        "Man": "/assets/images/man.svg",
        "Women": "/assets/images/woman.svg",
        "Kids": "/assets/images/kid.svg",
        "Couples": "/assets/images/couple.svg",
        "Unisex": "/assets/images/unisex.svg",
    };

    if (loading) {
        return <Loading/>
    } else {
        if (data !== undefined && data.filters.gender && data.filters.gender.length > 0) {
            return (
                <Section header="Search By Gender">
                    {
                        data.filters.gender.filter(g => genderMap.hasOwnProperty(g || ""))
                            .map(gender => <div className='gender' key={gender}>
                            <img className='gender__icon' src={genderMap[gender || ""]} alt={gender}/>
                            <div className='gender__name'>{gender}</div>
                        </div>)
                    }
                </Section>
            );
        } else {
            return <></>
        }
    }
};
