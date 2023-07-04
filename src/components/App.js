import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleImagePopupOpen(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleImagePopupOpen} />
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <PopupWithForm 
        title='Редактировать профиль' 
        name='edit-profile' 
        formName='formEditProfile' 
        isOpen={isEditProfilePopupOpen} 
        btnName='Сохранить' 
        onClose={closeAllPopups}
        typeContainer=''
      >
        <input 
          id="nameProfile-input" 
          type="text" 
          name="name" 
          autoComplete="off" 
          placeholder="Имя" 
          required 
          minLength="2" 
          maxLength="40" 
          className="popup__input popup__input_info_name" 
        />
        <span className="popup__input-error popup__input-error-place nameProfile-input-error"></span>
        <input 
          id="callingProfile-input" 
          type="text" 
          name="about" 
          autoComplete="off" 
          placeholder="Род деятельности" 
          required 
          minLength="2" 
          maxLength="200" 
          className="popup__input popup__input_info_calling" 
        />
        <span className="popup__input-error popup__input-error-place callingProfile-input-error"></span>
      </PopupWithForm>

      {/* <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <h2 className="popup__heading">Редактировать профиль</h2>
          <form name="formEditProfile" className="popup__form" novalidate>
            <input id="nameProfile-input" type="text" name="name" autocomplete="off" placeholder="Имя" required minLength="2" maxLength="40" className="popup__input popup__input_info_name" />
            <span className="popup__input-error popup__input-error-place nameProfile-input-error"></span>
            <input id="callingProfile-input" type="text" name="about" autocomplete="off" placeholder="Род деятельности" required minLength="2" maxLength="200" className="popup__input popup__input_info_calling" />
            <span className="popup__input-error popup__input-error-place callingProfile-input-error"></span>
            <button type="submit" className="popup__button-submit" disabled>Сохранить</button>
          </form>
          <div role="button" aria-label="Закрыть окно" className="popup__close-icon"></div>
        </div>
      </div> */}

      <PopupWithForm 
        title='Новое место' 
        name='add-card' 
        formName='formAddCards' 
        isOpen={isAddPlacePopupOpen} 
        btnName='Создать' 
        onClose={closeAllPopups}
        typeContainer=''
      >
        <input 
          id="nameCard-input" 
          type="text" 
          name="name" 
          autoComplete="off" 
          placeholder="Название" 
          required 
          minLength="2" 
          maxLength="30" 
          className="popup__input popup__input_info_heading-card" 
        />
        <span className="popup__input-error popup__input-error-place nameCard-input-error"></span>
        <input 
          id="callingCard-input" 
          type="url" 
          name="link" 
          autoComplete="off" 
          placeholder="Ссылка на картинку" 
          required 
          className="popup__input popup__input_info_url-img" 
        />
        <span className="popup__input-error popup__input-error-place callingCard-input-error"></span>
      </PopupWithForm>

      {/* <div className="popup popup_type_add-card">
        <div className="popup__container">
          <h2 className="popup__heading">Новое место</h2>
          <form name="formAddCards" className="popup__form" novalidate>
            <input id="nameCard-input" type="text" name="name" autocomplete="off" placeholder="Название" required minLength="2" maxLength="30" className="popup__input popup__input_info_heading-card" />
            <span className="popup__input-error popup__input-error-place nameCard-input-error"></span>
            <input id="callingCard-input" type="url" name="link" autocomplete="off" placeholder="Ссылка на картинку" required className="popup__input popup__input_info_url-img" />
            <span className="popup__input-error popup__input-error-place callingCard-input-error"></span>
            <button type="submit" className="popup__button-submit" disabled>Создать</button>
          </form>
          <div role="button" aria-label="Закрыть окно" className="popup__close-icon"></div>
        </div>
      </div> */}

      <PopupWithForm 
        title='Вы уверены?' 
        name='prove' 
        formName='formProve' 
        btnName='Да'
        typeContainer='popup__container_type_prove'></PopupWithForm>

      {/* <div className="popup popup_type_prove">
        <div className="popup__container popup__container_type_prove">
          <h2 className="popup__heading">Вы уверены?</h2>
          <form name="formProve" className="popup__form" novalidate>
            <button type="submit" aria-label="Подтвердить удаление" className="popup__button-submit popup__button-submit_type_prove">Да</button>
          </form>
          <div role="button" aria-label="Закрыть окно" className="popup__close-icon"></div>
        </div>
      </div> */}

      <PopupWithForm 
        title='Обновить аватар' 
        name='change-avatar' 
        formName='formChangeAvatar' 
        isOpen={isEditAvatarPopupOpen} 
        btnName='Сохранить' 
        onClose={closeAllPopups}
        typeContainer='popup__container_type_change-avatar'
      >
        <input 
          id="changeAvatar-input" 
          type="url" 
          name="link" 
          autoComplete="off" 
          placeholder="Ссылка на картинку" 
          required 
          className="popup__input popup__input_change-avatar_url-img" 
        />
        <span className="popup__input-error popup__input-error-place changeAvatar-input-error"></span>
      </PopupWithForm>

      {/* <div className="popup popup_type_change-avatar">
        <div className="popup__container popup__container_type_change-avatar">
          <h2 className="popup__heading">Обновить аватар</h2>
          <form name="formChangeAvatar" className="popup__form" novalidate>
            <input id="changeAvatar-input" type="url" name="link" autocomplete="off" placeholder="Ссылка на картинку" required className="popup__input popup__input_change-avatar_url-img" />
            <span className="popup__input-error popup__input-error-place changeAvatar-input-error"></span>
            <button type="submit" className="popup__button-submit" disabled>Сохранить</button>
          </form>
          <div role="button" aria-label="Закрыть окно" className="popup__close-icon"></div>
        </div>
      </div> */}

      {/* <template id="template-element">
        <article className="element">
          <img src="#" alt="" className="element__img" />
          <div className="element__description">
            <h2 className="element__heading"></h2>
            <div className="element__like-group">
              <div role="button" aria-label="Нравится" className="element__like"></div>
              <p className="element__like-sum">0</p>
            </div>
          </div>
          <div role="button" aria-label="Удалить" className="element__button-trash"></div>
        </article>
      </template> */}
      
      {/* <div className="popup popup_type_big-img">
        <div className="popup__wrapper-img">
          <div role="button" aria-label="Закрыть окно" className="popup__close-icon"></div>
          <img src="#" alt="" className="popup__img" />
          <h2 className="popup__heading-img"></h2>
        </div>
      </div> */}
    </div>
  );
}

export default App;
