import React from "react";
import './search.component.scss';

export type SearchProps = {
    onChangeSearch: Function;
}

export const SearchComponent = ({onChangeSearch}: SearchProps) => {

    function handleChange(event: React.ChangeEvent) {
        const element: any = event.target;
        if (element) {
            const value = element.value;
            onChangeSearch(value);
        }
    } 

    return (
        <div className="search-container">
            <input id="search-box" 
                type="text" 
                placeholder="Search by term..."
                onChange={(e) => handleChange(e)}/>
        </div>
    );
}