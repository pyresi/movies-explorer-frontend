import './Navigation.css';
import './Navigation__paragrath.css';

function Navigation() {
    return (
        <div className='navigation'>
            <a className='navigation__paragrath'>Фильмы</a>
            <a className='navigation__paragrath'>Сохранёные фильмы</a>
        </div>
    );
}

export default Navigation;