import React from 'react';
import Card from './Card.js';
import { api } from '../utils/Api.js';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  // React.useEffect(() => {
  //   api.getUserData()
  //     .then((data) => {
  //       setUserName(data.name);
  //       setUserDescription(data.about);
  //       setUserAvatar(data.avatar);
  //     })
  // }, []);

  // React.useEffect(() => {
  //   api.getInitialCards()
  //   .then((data) => {
  //     const ourCards = data.map((item) => (
  //       <Card key={item['_id']} card={item} />
  //       )
  //     )
  //     setCard(ourCards);
  //   })
  // }, []);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((result) => {
        const [userData, cardList] = result;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__description">
          <div className="profile__img-place">
            <img src={userAvatar} alt="Персональная фотография" className="profile__ava" />
            <button 
              className="profile__change-button" 
              type="button" 
              aria-label="Изменить аватар"
              onClick={props.onEditAvatar}
              min-height='auto'
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <div 
              role="button" 
              aria-label="Редактировать профиль" 
              className="profile__button-edit"
              onClick={props.onEditProfile}
            ></div>
            <p className="profile__calling">{userDescription}</p>
          </div>
        </div>
        <div 
          role="button" 
          aria-label="Добавить" 
          className="profile__button-add"
          onClick={props.onAddPlace}
        ></div>
      </section>

      <section className="elements">
        {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              likeCounter={card.likes.length}
              onCardClick={props.onCardClick}
            />
          ))}
      </section>
    </main>
  )
}

export default Main;