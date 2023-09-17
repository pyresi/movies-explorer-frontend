import Scene from '../../images/scene.svg';
import './MoviesCard.css';
import './MoviesCard__description.css';
import './MoviesCard__description-paragraph.css';
import './MoviesCard__description-like.css';
import './MoviesCard__description-like_type_active.css';
// import './MoviesCard__description-like_type_delete.css';
import './MoviesCard__description-duration.css';

function MoviesCard() {
    return (
        <div className='moviescard'>
            <img src={Scene} alt='Сцена из фильма'></img>
            <div className='moviescard__description'>
                <p className='moviescard__description-paragraph'>33 слова о дизайне</p>
                <p className='moviescard__description-duration'>1ч42м</p>
                <div className='moviescard__description-like moviescard__description-like_type_active'></div>
            </div>

        </div>
    )
}

export default MoviesCard;