import './SearchForm.css';
import './SearchForm__button.css';
import './SearchForm__bar.css';

function SearchForm() {
    return (
        <div className='searchform'>
            <form id='searchform' className='searchform'>
                <input id='search-bar' className='searchform__bar' defaultValue='Фильм'></input>
                <button type='button' className='searchform__button'></button>
                <input type='checkbox' id='short-movies-checkbox'></input>
            </form>
        </div>

    )
}

export default SearchForm;

