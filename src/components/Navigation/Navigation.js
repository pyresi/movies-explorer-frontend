import './Navigation.css';
import './Navigation__list.css';
import './Navigation__list-element.css';
import './Navigation__menu.css';
import './Navigation__menu_white.css';
import './Navigation__register-block.css';
import './Navigation__register-btn.css';
import './Navigation__login-btn.css';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../contexts/CurrentAppContext';
import Logo from '../Logo/Logo';
import { UserContext } from '../../contexts/CurrentUserContext';
import AccountButton from '../AccountButton/AccountButton';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

function Navigation() {
    const [showBurger, setShowBurger] = useState(false);
    const location = useLocation();
    const { isLoggedIn } = useContext(UserContext)

    const [windowSize, setWindowSize] = useState(getWindowSize());

    const { setIsSideMenuActive } = useContext(AppContext);

    function openSideMenu() {
        setIsSideMenuActive(true);
    }

    let isBlueBackground = false;
    if (['/'].includes(location.pathname)) {
        isBlueBackground = true;
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // let showNav = false;
    // if (['/', '/profile', '/movies', '/saved-movies'].includes(location.pathname)) {
    //     showNav = true;
    // }

    // let showBurger = false;
    // console.log(isLoggedIn);
    useEffect(() => {
        if (isLoggedIn && windowSize.innerWidth <= 768) {
            setShowBurger(true);
        }
        else {
            setShowBurger(false);
        }
    }, [windowSize, isLoggedIn])

    let registerClass = 'navigation__regiser-btn';
    if (['/profile', '/movies', '/saved-movies'].includes(location.pathname)) {
        registerClass += ' header__regiser-btn_black';
    }

    const nav = showBurger ?
        <div className={'navigation__menu' + (isBlueBackground ? ' navigation__menu_white' : '')} onClick={openSideMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div> : <><ul className="navigation__list">
            <li><Link to="/movies" className={'navigation__list-element' + (isBlueBackground ? '' : ' navigation__list-element_black') + (location.pathname === '/movies' ? ' navigation__list-element_active' : '')}>Фильмы</Link></li>
            <li><Link to="/saved-movies" className={'navigation__list-element' + (isBlueBackground ? '' : ' navigation__list-element_black') + (location.pathname === '/saved-movies' ? ' navigation__list-element_active' : '')}>Сохранёные фильмы</Link></li>
        </ul><AccountButton /></>;

    const element = isLoggedIn
        ? nav
        : <div className='navigation__register-block'>
            <Link className={registerClass} to='/signup'>Регистрация</Link>
            <Link className='navigation__login-btn' to='/signin'>Войти</Link>
        </div>
    return (
        <nav className="navigation">
            <Logo />
            {element}
        </nav>

    );
}

export default Navigation;