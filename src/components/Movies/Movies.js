import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import './Movies__more-btn.css';

function Movies() {
    return (
        <div className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
            <button className='movies__more-btn'>
                Ещё
            </button>
        </div>
    )
}

export default Movies;