import React, {FC, useState} from "react";
import Icon from "react-eva-icons";

const FilterAccordion: FC<{ title: string }> = ({title, children}) => {
    const [isExpanded, toggleExpand] = useState<boolean>(false);
    return (
        <div className='filter__accordion'>
            <div className='filter__accordion-anchor' onClick={() => toggleExpand(!isExpanded)}>
                <span>{title}</span>
                <Icon name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"} fill='#212121' size="medium"/>
            </div>
            <div className={'filter__accordion-content ' + (isExpanded ? 'filter__accordion-content--open' : '')}>
                {children}
            </div>
        </div>
    )
}
export default FilterAccordion;
