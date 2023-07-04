import {useState} from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
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

      <PopupWithForm 
        title='Вы уверены?' 
        name='prove' 
        formName='formProve' 
        btnName='Да'
        typeContainer='popup__container_type_prove'></PopupWithForm>

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

    </div>
  );
}

export default App;
