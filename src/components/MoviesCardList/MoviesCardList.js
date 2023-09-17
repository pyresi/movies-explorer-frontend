import './MoviesCardList.css';
// import './MoviesCardList__grid.css';
// import './MoviesCardList__more-btn.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className='moviescardlist'>
            {/* <div className='moviescardlist__grid'> */}
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            {/* </div> */}

        </section>
    )
}

export default MoviesCardList;