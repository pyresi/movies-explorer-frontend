import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
    const navigate = useNavigate();

    function navigateToMain() {
        navigate('/');
    }

    return (<img src={logo} alt='Лого' className='logo' onClick={navigateToMain} />);
}

export default Logo;