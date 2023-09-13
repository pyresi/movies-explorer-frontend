import logo from '../../images/logo.svg';
import './Header.css';
import './Header__logo.css';
import './Header__button.css';
import Navigation from '../Navigation/Navigation';

function Header() {
    return (
        <div className='header'>
            <img src={logo} alt='Лого' className='header__logo' />
            <Navigation></Navigation>
            <button className='header__button'>Аккаунт</button>
        </div>
    );
}

export default Header;