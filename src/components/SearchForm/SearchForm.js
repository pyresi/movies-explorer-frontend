import './SearchForm.css';
import './SearchForm__button.css';
import './SearchForm__bar.css';
import './SearchForm__searchbar-section.css';
import './SearchForm__short-movies-section.css';
import './SearchForm__short-movies-checkbox.css';
import './SearchForm__short-movies-checkbox-description.css';

function SearchForm({
    moviesShortFilmToggle,
    setMoviesShortFilmToggle,
    queryMovies,
    moviesQuery,
    setMoviesQuery,
}) {

    // const [searchText, setSearchText] = useState('')

    function handleInputChange(e) {
        setMoviesQuery(e.target.value);
        // console.log(searchText);
    }

    function handleSearch(e) {
        e.preventDefault();
        queryMovies(moviesQuery);
    }

    function handleShortToggle(e) {
        setMoviesShortFilmToggle(e.currentTarget.checked)
    }

    return (
        <form name='searchform' className='searchform' onSubmit={handleSearch} >
            <div className='searchform__searchbar-section'>
                <input name='search-bar' type='text' className='searchform__bar' placeholder='Фильм' required value={moviesQuery}
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

