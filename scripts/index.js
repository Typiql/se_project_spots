const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-karsten-winegeart-from-unsplash.jpg"
  }
];

const profileName = document.querySelector(".profile__name");
const editModalNameInput = document.querySelector("#profile-name-input");
const profileDescription = document.querySelector(`.profile__description`);
const editModalDescriptionInput = document.querySelector('#profile-description-input');
const editFormElement = document.querySelector(".modal__form");

const editModal = document.querySelector("#edit-modal");
const settingsButton = document.querySelector(`.profile__settings`);
const exitButton = document.querySelector('.modal__close-btn');

settingsButton.addEventListener('click', openModal);
exitButton.addEventListener('click', closeModal);
editFormElement.addEventListener('submit', editProfile);

function closeModal () {
  editModal.classList.remove(`modal_opened`);
}

const cardTemplate = document.querySelector(`#card-template`);
const cardList = document.querySelector(`.cards__list`);

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(`.card`).cloneNode(true);

  const cardNameEl = cardElement.querySelector(`.card__title`);
  const cardImageEl = cardElement.querySelector(`.card__image`)

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}

function openModal () {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add(`modal_opened`);
}

function editProfile (evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal();
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardList.prepend(cardElement);
}