import React from "react";
import '../../css/filter.scss';
import {useQuery} from "@apollo/react-hooks";
import {VALID_FILTERS} from "../../Network/schemaFormats";
import {Filter, QueryFilterProductArgs} from "../../gql/types";
import Icon from "react-eva-icons";
import FilterAccordion from "./FilterAccordion";
import Loading from "../Loading";

interface Props {
    isOpen: boolean,
    onFilterUpdate: (filterObj: QueryFilterProductArgs) => any
    onClose: () => void
    appliedFilters?: QueryFilterProductArgs
}

export default function Filters({isOpen, onFilterUpdate, onClose, appliedFilters}: Props) {
    const {data, loading} = useQuery<{ filters: Filter }>(VALID_FILTERS);
    const filterNames = {
        categoriesOne: {
            name: "Category",
            type: "object"
        },
        categoriesTwo: {
            name: "Product Type",
            type: "object"
        },
        isHallmark: {
            name: "Hallmark",
            type: "boolean"
        },
        purity: {
            name: "Purity",
            type: "string"
        },
        weight: {
            name: "Weight",
            type: "string"
        },
        gender: {
            name: "Gender",
            type: "string"
        },
        size: {
            name: "Size",
            type: "string"
        },
        booleans: ["isHallmark"]
    }
    if (loading) return <Loading size='large'/>;

    function applyFilters() {
        let filterObj = {};
        const form = document.getElementById('FilterForm');
        if (form !== null) {
            Object.keys(filterNames).forEach(key => {
                const inputEls: HTMLInputElement[] = form[filterNames[key].name];
                if (!!inputEls) {
                    const vals = Array.from(inputEls).filter(el => el.checked).map(el => el.value);
                    if (vals.length > 0) {
                        filterObj[key] = vals;
                    }
                }
            });
        }
        if(form !== null && form['isHallmark']){
            filterObj['isHallmark'] = form['isHallmark'].checked;
        }
        onClose();
        onFilterUpdate(filterObj);
    }

    function clearFilters() {
        onClose();
        onFilterUpdate({});

    }

    return (
        <div className={'filter__container ' + (isOpen ? 'filter--open' : '')}>
            <div className='filter__header'>
                <div className='filter__header-title'>Filters</div>
                <div onClick={onClose} className='filter__close'>
                    <Icon name="close-outline" fill='#212121' size="medium"/>
                </div>
            </div>
            <form className='filter__form' id='FilterForm'>
                {
                    data !== undefined
                    && Object.keys(data.filters)
                        .filter(key => filterNames[key] !== undefined &&  data.filters[key].length > 0)
                        .map(key => <FilterAccordion title={filterNames[key].name} key={filterNames[key].name}>
                            {data.filters[key].map(val => {
                                let displayValue = "";
                                let value = "";
                                let checked = false;
                                switch (filterNames[key].type) {
                                    case 'object':
                                        displayValue = val.name;
                                        value = val.id;
                                        checked = appliedFilters && appliedFilters[key] && appliedFilters[key].includes(val.id)
                                        break;
                                    case 'string':
                                    case 'boolean':
                                        displayValue = val;
                                        value = val;
                                        checked = appliedFilters && appliedFilters[key] && appliedFilters[key].includes(val)
                                        break;
                                }
                                return <div className='filter__list' key={JSON.stringify(val)}>
                                    <label className='checkbox'>
                                        <input type="checkbox" name={filterNames[key].name} value={value}
                                               defaultChecked={checked}/>
                                        <span>{displayValue}</span>
                                    </label>
                                </div>
                            })}
                        </FilterAccordion>)
                }
                {
                    <div className='filter__list'>
                        <label className='checkbox'>
                            <input type="checkbox" name='isHallmark' value='isHallmark'
                                   defaultChecked={appliedFilters && appliedFilters.isHallmark}/>
                            <span>Hallmark only</span>
                        </label>
                    </div>
                }
            </form>
            <div className='filter__apply-container'>
                <div className='filter__apply-cta filter__apply-clear' onClick={clearFilters}>Clear Filters</div>
                <div className='filter__apply-cta' onClick={applyFilters}>Apply Filters</div>
            </div>
        </div>
    )
}