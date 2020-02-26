import React from 'react'
import classes from './SearchBar.module.css';

const SearchBar = (props) => {
    return (
        <div className={classes.SearchBar}>
            <input type="text" placeholder={props.placeholder}  value={props.searchValue}></input>
        </div>
    )
}

export default SearchBar
