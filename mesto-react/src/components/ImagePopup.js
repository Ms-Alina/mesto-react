function ImagePopup(props) {
  return (
    <div className={`popup popup_type_big-img ${props.card.link && 'popup_opened'}`}>
      <div className="popup__wrapper-img">
        <div 
          role="button" 
          aria-label="Закрыть окно" 
          className="popup__close-icon"
          onClick={props.onClose}
        ></div>
        <img 
          className="popup__img" 
          src={`${props.card.link}`} 
          alt={props.card.name} 
        />
        <h2 className="popup__heading-img">{props.card.name}</h2>
      </div>
    </div>
  )
}

  export default ImagePopup;