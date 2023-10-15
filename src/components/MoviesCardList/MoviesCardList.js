import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

function MoviesCardList({
    savedMovies,
    isLoading,
    isSaved = false,
    moviesToShow,
    handleLikeClick,
    maxMoviesToShow,
    setMoreBtnClickTimes,
    moreBtnClickTimes,
    totalMoviesToShow
}) {

    useEffect(() => {
        console.log('cardlist', maxMoviesToShow, totalMoviesToShow, moviesToShow);
    }, [moviesToShow, maxMoviesToShow, totalMoviesToShow])
    let component = <></>;

    function handleMoreBtnClick(e) {
        setMoreBtnClickTimes(moreBtnClickTimes + 1);
    }

    if (isLoading) {
        component = <Preloader />
    }
    else if (moviesToShow.length === 0) {
        component = <p className='moviescardlist__empty-message'>Ничего не найдено</p>
    }
    else {
        component = <section className='moviescardlist__box'>
            <section className='moviescardlist'>
                {moviesToShow.map((x) => {
                    return <MoviesCard
                        key={x.id}
                        movieData={x}
                        handleLikeClick={handleLikeClick}
                        isSavedCard={isSaved}
                        savedMovies={savedMovies}
                    />
                })}
            </section>
            {maxMoviesToShow >= totalMoviesToShow
                ? <></>
                : <button className='moviescardlist__more-btn' onClick={handleMoreBtnClick}>Ещё</button>}
        </section>
    }

    return (
        <>{component}</>
    )
}

export default MoviesCardList;