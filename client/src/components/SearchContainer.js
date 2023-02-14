import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/appContext';

const SearchContainer = () => {
    const [localSearch, setLocalSearch] = useState('');
    const { handleChange} = useAppContext()

    const debounce = () => {
        let timeoutID;
        return (e) => {
          setLocalSearch(e.target.value);
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            handleChange({ name: e.target.name, value: e.target.value });
          }, 1000);
        };
    };

    const optimizedDebounce = useMemo(() => debounce(), 
    // eslint-disable-next-line
    []);
    
    return (
        <>
            <form className='searchform'>
                <input 
                    type='text'
                    name='username'
                    value={localSearch}
                    className="search-input"
                    placeholder='Search'
                    onChange={optimizedDebounce}
                />
            </form>
        </>
    )
}

export default SearchContainer