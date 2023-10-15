import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import '../Register/Register.css';
import { validateEmail, validateForm, validatePassword } from "../../utils/utils";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import SubmitButton from "../SubmitButton/SubmitButton";

function Login({ onLoginClick, loginErrorMessage }) {

    function validate(name, value) {
        switch (name) {
            case 'login-email':
                if (value.length === 0) {
                    return 'Это поле должно быть заполненно';
                } else if (!validateEmail(value)) {
                    return 'Некорректрный email';
                } else {
                    return '';
                }

            case 'login-password':
                if (value.length === 0) {
                    return 'Это поле должно быть заполненно';
                } else if (!validatePassword(value)) {
                    return 'Пароль должно состоять как минимум из 8-ми симоволов и содержать только прописные/строчные латинские символы и цифры';
                } else {
                    return '';
                }
            default:
                break;
        }
    }

    const numberOfInputs = 2;
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(validate, numberOfInputs);

    function onSubmit(e) {
        e.preventDefault()

        onLoginClick(values['login-email'], values['login-password']);
    }
    return (
        <div className="register">
            <div className='register__logo-wrapper'>
                <Logo />
            </div>
            <h1 className='register__header'>Рады видеть!</h1>
            <form name='login-form' className='register__form' onSubmit={onSubmit}>
                <div className="register__box">
                    <p className="register__box-title">E-mail</p>
                    <input className="register__box-input" name='login-email' required onChange={handleChange} value={values['login-email'] || ''} />
                    <p className={'register__box-error' + (errors['login-email'] ? ' register__box-error_active' : '')}>{errors['login-email']}</p>
                </div>
                <div className="register__box">
                    <p className="register__box-title">Пароль</p>
                    <input className="register__box-input" name='login-password' required onChange={handleChange} value={values['login-password'] || ''} />
                    <p className={'register__box-error' + (errors['login-password'] ? ' register__box-error_active' : '')}>{errors['login-email']}</p>
                </div>
                <div className="register__buttons-box">
                    <SubmitButton errorMsg={loginErrorMessage} buttonText={'Войти'} isValid={isValid} />
                    <div className='register__login-box'>
                        <p className='register__paragraph'>Еще не зарегестрированы?</p>
                        <Link className='register__link' to='/signup'>Регистрация</Link>
                    </div>
                </div>

            </form>
        </div>

    )
}

export default Login;