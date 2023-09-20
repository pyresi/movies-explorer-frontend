import logo from '../../images/logo.svg';
import './Header.css';
import './Header__logo.css';
import './Header__button.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import './Header_type_white.css';
import './Header_type_disabled.css';


function Header() {
    const location = useLocation();

    let headerClass = 'header_type_disabled';
    if (location.pathname === '/') {
        headerClass = 'header';
    } else if (location.pathname === '/profile' || location.pathname === '/sign-in' || location.pathname === '/sign-up') {
        headerClass = 'header header_type_white'
    }

    return (
        <div className={headerClass}>
            <img src={logo} alt='Лого' className='header__logo' />
            <Navigation></Navigation>
            <Link className='header__button' to='/profile'>Аккаунт</Link>
        </div>
    );
}

export default Header;