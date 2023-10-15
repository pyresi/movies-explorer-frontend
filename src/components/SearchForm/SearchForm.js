import './SearchForm.css';
import './SearchForm__button.css';
import './SearchForm__bar.css';
import './SearchForm__searchbar-section.css';
import './SearchForm__short-movies-section.css';
import './SearchForm__short-movies-checkbox.css';
import './SearchForm__short-movies-checkbox-description.css';
import { useState } from 'react';

function SearchForm({
    moviesShortFilmToggle,
    setMoviesShortFilmToggle,
    queryMovies,
    defaultSearchText = ''
}) {

    const [searchText, setSearchText] = useState(defaultSearchText);

    function handleInputChange(e) {
        setSearchText(e.target.value);
    }

    function handleSearch(e) {
        e.preventDefault();
        queryMovies(searchText);
    }

    function handleShortToggle(e) {
        setMoviesShortFilmToggle(e.currentTarget.checked)
    }

    return (
        <form name='searchform' className='searchform' onSubmit={handleSearch} >
            <div className='searchform__searchbar-section'>
                <input name='search-bar' type='text' className='searchform__bar' placeholder='Фильм' required value={searchText}
                    onChange={handleInputChange} />
                <button type='submit' className='searchform__button' />
            </div>

            <div className='searchform__short-movies-section'>
                <input type='checkbox' name='short-movies-checkbox' className='searchform__short-movies-checkbox' onChange={handleShortToggle} checked={moviesShortFilmToggle} />
                <p className='searchform__short-movies-checkbox-description'>Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm;

