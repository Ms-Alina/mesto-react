import React from "react";

function Card(props) {
  const [liked, setLiked] = React.useState(false);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function likeClick() {
    setLiked(!liked);
  }

  return (
    <article className="element">
      <img  
        className="element__img" 
        src={props.card.link} 
        alt={`Фото ${props.card.name}`} 
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like-group">
          <div 
            role="button" 
            aria-label="Нравится" 
            className={`element__like ${liked && 'element__like_active'}`}
            onClick={likeClick}
          ></div>
          <p className="element__like-sum">{props.likeCounter}</p>
        </div>
      </div>
      <div role="button" aria-label="Удалить" className="element__button-trash"></div>
    </article>
  )
}

export default Card;