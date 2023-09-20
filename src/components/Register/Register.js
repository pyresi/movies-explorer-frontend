import './Register.css';
import './Register__form.css';
import './Register__header.css';
import './Register__box.css';
import './Register__box-title.css';
import './Register__box-input.css';
import './Register__box-error.css';
import './Register__box-error_active.css';
import './Register__button.css';
import './Register__link.css';
import './Register__paragraph.css';
import './Register__login-box.css';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="register">
            <h1 className='register__header'>Добро пожаловать!</h1>
            <form id='register' className='register__form'>
                <div className="register__box">
                    <p className="register__box-title">Имя</p>
                    <input className="register__box-input" id='register-name'></input>
                    <p className='register__box-error'>Что-то пошло не так...</p>
                </div>
                <div className="register__box">
                    <p className="register__box-title">E-mail</p>
                    <input className="register__box-input" id='register-email'></input>
                    <p className='register__box-error'>Что-то пошло не так...</p>
                </div>
                <div className="register__box">
                    <p className="register__box-title">Пароль</p>
                    <input className="register__box-input" id='register-password'></input>
                    <p className='register__box-error register__box-error_active'>Что-то пошло не так...</p>
                </div>
                <button type='button' className='register__button'>Зарегистрироваться</button>
                <div className='register__login-box'>
                    <p className='register__paragraph'>Уже зарегестрированы?</p>
                    <Link className='register__link' to='/sign-in'>Войти</Link>
                </div>
            </form>
        </div>

    )
}

export default Register;