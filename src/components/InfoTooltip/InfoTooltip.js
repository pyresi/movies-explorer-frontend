import TickIcon from '../../images/tick.svg';
import CrossIcon from '../../images/cross.svg';
import './InfoTooltip.css';

function InfoTooltop({ isSuccess, isOpen, setIsOpened }) {

  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      handleCloseClick();
    }
  }

  function handleCloseClick() {
    setIsOpened(false);
  }

  return (
    <div
      className={`infotooltip ${isOpen ? 'infotooltip_opened' : ''}`}
      onClick={handleBackgroundClick}
    >
      <div className="infotooltip__container">
        <button
          className="infotooltip__button-close"
          type="button"
          onClick={handleCloseClick}
        />
        <img
          className="infotooltip__auth-icon"
          src={isSuccess ? TickIcon : CrossIcon}
          alt={'icon'}
        />
        {/* <h2 className="popup__auth-message">
          {isSuccess
            ? 'Вы успешно зарегестрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2> */}
      </div>
    </div>
  );
}

export default InfoTooltop;
