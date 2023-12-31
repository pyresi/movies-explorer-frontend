import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import '../Register/Register.css';

function Login() {
    return (
        <div className="register">
            <div className='register__logo-wrapper'>
                <Logo />
            </div>
            <h1 className='register__header'>Рады видеть!</h1>
            <form id='register' className='register__form'>
                <div className="register__box">
                    <p className="register__box-title">E-mail</p>
                    <input className="register__box-input" id='register-email' required></input>
                    <p className='register__box-error'>Что-то пошло не так...</p>
                </div>
                <div className="register__box">
                    <p className="register__box-title">Пароль</p>
                    <input className="register__box-input" id='register-password' required></input>
                    <p className='register__box-error register__box-error_active'>Что-то пошло не так...</p>
                </div>
                <button type='button' className='register__button'>Войти</button>
                <div className='register__login-box'>
                    <p className='register__paragraph'>Еще не зарегестрированы?</p>
                    <Link className='register__link' to='/signup'>Регистрация</Link>
                </div>
            </form>
        </div>

    )
}

export default Login;