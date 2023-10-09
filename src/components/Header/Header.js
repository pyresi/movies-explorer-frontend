import './Header.css';
import './Header__logo.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import './Header_type_white.css';
import './Header_type_disabled.css';

function Header() {
    const location = useLocation();

    let headerClass = 'header_type_disabled';
    if (location.pathname === '/') {
        headerClass = 'header';
    } else if (['/profile', '/movies', '/saved-movies'].includes(location.pathname)) {
        headerClass = 'header header_type_white';
    }

    return (
        <header className={headerClass}>
            <div className='header__container'>
                <Navigation />
            </div>
        </header>
    );
}

export default Header;