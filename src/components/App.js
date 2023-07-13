import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';

import { api } from '../utils/Api.js';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import DeleteProvePopup from './DeleteProvePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isProfilePopupOpened, setIsProfilePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // новое
  const [selectedCardDeleteProve, setSelectedCardDeleteProve] = useState({isOpen: false, card: {}});
  const[renderSaving, setRenderSaving] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      }).catch((err) => {
        console.error(err);
      });
    }, []);

  useEffect(() => {
    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isProfilePopupOpened || selectedCard) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isProfilePopupOpened, selectedCard]);

  function handleUpdateUser(data) {
    setRenderSaving(true);
    api.saveUserChanges(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      }).catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
    }

  function handleAddPlaceSubmit(data) {
    setRenderSaving(true);
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
    }

  function handleAvatarUpdate(data) {
    setRenderSaving(true);
    api.changedAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
    }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.likedCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        }).catch((err) => {
          console.error(err);
        });
    } else {
      api.dislikedCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        }).catch((err) => {
          console.error(err);
        });
      }
  }

  function handleCardDelete(card) {
    setRenderSaving(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
    }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImagePopupOpen(card) {
    setSelectedCard(card);
  }

  // новое
  function handleDeleteProve(card) {
    setSelectedCardDeleteProve({...setSelectedCardDeleteProve, isOpen: true, card: card});
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsProfilePopupOpened(false);
    // новое
    setSelectedCardDeleteProve({...setSelectedCardDeleteProve, isOpen: false });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleImagePopupOpen} 
          cards={cards} 
          onCardLike={handleCardLike} 
          // onCardDelete={handleCardDelete}
          onDeleteProve={handleDeleteProve}
           />
        <Footer />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick} 
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onCloseClick={handlePopupCloseClick} 
          onSubmit={handleUpdateUser}
          isRender={renderSaving}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onCloseClick={handlePopupCloseClick} 
          onSubmit={handleAddPlaceSubmit}
          isRender={renderSaving}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onCloseClick={handlePopupCloseClick} 
          onSubmit={handleAvatarUpdate}
          isRender={renderSaving}
        />

        <DeleteProvePopup 
          //card={selectedCardDeleteProve}
          deleteCard={selectedCardDeleteProve}
          onClose={closeAllPopups} 
          onCloseClick={handlePopupCloseClick} 
          onDeleteCard={handleCardDelete}
          isRender={renderSaving}
        />

        {/* <PopupWithForm 
          title='Вы уверены?' 
          name='prove' 
          formName='formProve' 
          btnName='Да'
          typeContainer='popup__container_type_prove'></PopupWithForm> */}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
