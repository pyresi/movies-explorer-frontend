import './Register.css';
import './Register__form.css';
import './Register__header.css';
import './Register__box.css';
import './Register__box-title.css';
import './Register__box-input.css';
import './Register__box-error.css';
import './Register__box-error_active.css';
import './Register__link.css';
import './Register__paragraph.css';
import './Register__login-box.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useEffect } from 'react';
import { useFormWithValidation } from '../../utils/UseFormWithValidation';
import { validateEmail, validateName, validatePassword } from '../../utils/utils';
import SubmitButton from '../SubmitButton/SubmitButton';


function Register({ onRegisterClick, registerErrorMessage }) {

    function validate(name, value) {
        switch (name) {
            case 'register-name':
                if (value.length === 0) {
                    return 'Это поле должно быть заполненно';
                }
                else if (!validateName(value)) {
                    return 'Поле должно содержать только латиницу, кириллицу, пробел или дефис.'
                }
                else {
                    return '';
                }

            case 'register-email':
                if (value.length === 0) {
                    return 'Это поле должно быть заполненно';
                } else if (!validateEmail(value)) {
                    return 'Некорректрный email';
                } else {
                    return '';
                }

            case 'register-password':
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

    const numberOfInputs = 3;
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(validate, numberOfInputs);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    function onSubmit(e) {
        e.preventDefault();

        onRegisterClick(values['register-name'], values['register-email'], values['register-password']);
        resetForm();
    }

    return (
        <div className="register">
            <div className='register__logo-wrapper'>
                <Logo />
            </div>

            <h1 className='register__header'>Добро пожаловать!</h1>
            <form id='register' className='register__form' onSubmit={onSubmit}>
                <div className="register__box">
                    <p className="register__box-title">Имя</p>
                    <input className="register__box-input" name='register-name' onChange={handleChange} required value={values['register-name']} />
                    <p className={'register__box-error' + (errors['register-name'] ? ' register__box-error_active' : '')}>{errors['register-name']}</p>
                </div>
                <div className="register__box">
                    <p className="register__box-title">E-mail</p>
                    <input className="register__box-input" name='register-email' onChange={handleChange} required value={values['register-email']} />
                    <p className={'register__box-error' + (errors['register-email'] ? ' register__box-error_active' : '')}>{errors['register-email']}</p>
                </div>
                <div className="register__box">
                    <p className="register__box-title">Пароль</p>
                    <input className="register__box-input" name='register-password' onChange={handleChange} required value={values['register-password']} />
                    <p className={'register__box-error' + (errors['register-password'] ? ' register__box-error_active' : '')}>{errors['register-password']}</p>
                </div>

                <div className='register__buttons-box'>
                    <SubmitButton errorMsg={registerErrorMessage} isValid={isValid} buttonText={'Зарегестрироваться'} />

                    <div className='register__login-box'>
                        <p className='register__paragraph'>Уже зарегестрированы?</p>
                        <Link className='register__link' to='/signin'>Войти</Link>
                    </div>
                </div>


            </form >
        </div >

    )
}

export default Register;