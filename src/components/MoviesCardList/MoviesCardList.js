import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect } from 'react';

function MoviesCardList({ moviesToShow }) {
    useEffect(function () {
        console.log('effect');
        console.log(moviesToShow);
    }, [moviesToShow])

    console.log(moviesToShow);
    return (
        <>
            <section className='moviescardlist'>
                {moviesToShow !== undefined ? moviesToShow.map((x, idx) => {
                    return <MoviesCard key={idx} name={x.nameRU} duration={x.duration} thumbnailURL={' https://api.nomoreparties.co/' + x.image.url} trailerLink={x.trailerLink} />
                }) : <></>}

                {/* <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard> */}
            </section>
            <button className='movies__more-btn'>Ещё</button>
        </>
    )
}

export default MoviesCardList;