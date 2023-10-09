import './Profile.css';
import './Profile__header.css';
import './Profile__box.css';
import './Profile__box-key.css';
import './Profile__box-value.css';
import './Profile__edit-btn.css';
import './Profile__exit-btn.css';

function Profile() {
    return (
        <div className="profile">
            <h1 className="profile__header">Привет, Анастасия!</h1>
            <div className="profile__box">
                <p className="profile__box-key">Имя</p>
                <p className="profile__box-value">Анастасия</p>
            </div>
            <div className="profile__box">
                <p className="profile__box-key">E-mail</p>
                <p className="profile__box-value">pyresi@yandex.ru</p>
            </div>
            <button type='button' className='profile__edit-btn'>Редактировать</button>
            <button type='button' className='profile__exit-btn'>Выйти из аккаунта</button>
        </div>
    )
}

export default Profile;