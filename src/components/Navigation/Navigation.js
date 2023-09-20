import './Navigation.css';
import './Navigation__list.css';
import './Navigation__list-movies.css';
import './Navigation__list-saved-movies.css';

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li><a href="#" className='navigation__list-movies'>Фильмы</a></li>
                <li><a className='navigation__list-movies' href="#">Сохранёные фильмы</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;