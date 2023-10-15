import './Profile.css';
import './Profile__header.css';
import './Profile__box.css';
import './Profile__box-key.css';
import './Profile__box-value.css';
import './Profile__edit-btn.css';
import './Profile__exit-btn.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/UseFormWithValidation';
import SubmitButton from '../SubmitButton/SubmitButton';
import { validateEmail, validateName } from '../../utils/utils';


function Profile({
    onLogOut,
    isEditing,
    setIsEditing,
    editProfile, errorMsg }) {
    const { currentUser } = useContext(UserContext);


    function validate(name, value) {
        if ((currentUser.email === values['profile-email']) && (currentUser.name === values['profile-name'])) {
            return 'Ничего не поменялось';
        }

        switch (name) {
            case 'profile-name':
                if (!validateName(value)) {
                    return 'Неверное имя';
                }
                else {
                    return '';
                }
            case 'profile-email':
                if (!validateEmail(value)) {
                    return 'Некорректный email';
                }
                else {
                    return '';
                }
            default:
                break;
        }

    }

    const numberOfInputs = 2;
    const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation(validate, numberOfInputs);



    useEffect(() => {
        setValues({ ...values, ...{ 'profile-name': currentUser.name, 'profile-email': currentUser.email } })
    }, [currentUser]);

    useEffect(() => {
        console.log(values);
        console.log(isValid);
    }, [values])

    function onSubmit(e) {
        e.preventDefault();
        console.log('Submitting: ', values);
        console.log('--------------')
        editProfile(values['profile-name'], values['profile-email']);
    }

    function handleEditClick(e) {
        setIsEditing(true);
    }

    return (
        <div className="profile">
            <h1 className="profile__header">Привет, {currentUser.name}!</h1>
            <form className='profile__form' name='profile-form' onSubmit={onSubmit}>
                <div className='profile__inputs'>
                    <div className='profile__box'>
                        <p className="profile__box-key">Имя</p>
                        <input className="profile__box-value" disabled={!isEditing} name='profile-name' onChange={handleChange} value={values['profile-name'] || ''} />
                    </div>

                    <div className="profile__box">
                        <p className="profile__box-key">E-mail</p>
                        <input className="profile__box-value" disabled={!isEditing} name='profile-email' onChange={handleChange} value={values['profile-email'] || ''} />
                    </div>

                </div>

                {isEditing
                    ? <SubmitButton buttonText={'Сохранить'} isValid={isValid} errorMsg={errorMsg} />
                    : <>
                        <button type='button' className='profile__edit-btn' onClick={handleEditClick}>Редактировать</button>
                        <button type='button' className='profile__exit-btn' onClick={onLogOut}>Выйти из аккаунта</button>
                    </>
                }
            </form >

        </div >
    )
}

export default Profile;