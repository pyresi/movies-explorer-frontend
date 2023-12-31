import './SearchForm.css';
import './SearchForm__button.css';
import './SearchForm__bar.css';
import './SearchForm__searchbar-section.css';
import './SearchForm__short-movies-section.css';
import './SearchForm__short-movies-checkbox.css';
import './SearchForm__short-movies-checkbox-description.css';

function SearchForm() {
    return (
        <form id='searchform' className='searchform'>
            <div className='searchform__searchbar-section'>
                <input id='search-bar' className='searchform__bar' placeholder='Фильм' required></input>
                <button type='button' className='searchform__button'></button>
            </div>

            <div className='searchform__short-movies-section'>
                <input type='checkbox' id='short-movies-checkbox' className='searchform__short-movies-checkbox'></input>
                <p className='searchform__short-movies-checkbox-description'>Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm;

