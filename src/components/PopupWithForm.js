import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className={`popup__container ${props.typeContainer}`}>
        <h2 className="popup__heading">{props.title}</h2>
        <form className="popup__form" name={props.formName} noValidate>
          <>{props.children}</>
          <button className="popup__button-submit" type="submit">{props.btnName || 'Сохранить'}</button>
        </form>
        <div role="button" onClick={props.onClose} className="popup__close-icon" aria-label="Закрыть окно"></div>
      </div>
    </div>
  )
}

export default PopupWithForm;