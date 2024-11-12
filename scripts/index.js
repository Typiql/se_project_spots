const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-karsten-winegeart-from-unsplash.jpg",
  },
];

// Profile Elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Modal Input Elements
const editModalNameInput = document.querySelector("#profile-name-input");
const editModalDescriptionInput = document.querySelector("#profile-description-input");
const postModalLinkInput = document.querySelector("#image-input");
const postModalNameInput = document.querySelector("#caption-input");

// Form and Modal Elements
const editFormElement = document.querySelector("#edit-modal-form");
const postFormElement = document.querySelector("#post-modal-form");
const editModal = document.querySelector("#edit-modal");
const postModal = document.querySelector("#post-modal");
const viewImageModal = document.querySelector("#view-image-modal");
const modalImage = viewImageModal?.querySelector(".modal__image");
const modalCaption = viewImageModal?.querySelector(".modal__caption");

// Button Elements
const postButton = document.querySelector(".profile__post-btn");
const settingsButton = document.querySelector(".profile__settings");
const editModalExitButton = document.querySelector("#edit-modal-close-btn");
const postModalExitButton = document.querySelector("#post-modal-close-btn");
const viewImageModalCloseButton = document.querySelector("#view-image-modal-close-btn");

// Card Template and List Elements
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

// Event Listeners
if (settingsButton) {
  settingsButton.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    openModal(editModal);
  });
}
if (editModalExitButton) {
  editModalExitButton.addEventListener("click", () => {
    closeModal(editModal);
  });
}
if (editFormElement) {
  editFormElement.addEventListener("submit", editProfile);
}
if (postButton) {
  postButton.addEventListener("click", () => {
    openModal(postModal);
  });
}
if (postModalExitButton) {
  postModalExitButton.addEventListener("click", () => {
    closeModal(postModal);
  });
}
if (postFormElement) {
  postFormElement.addEventListener("submit", (evt) => {
    postCard(evt);
  });
}
if (viewImageModalCloseButton) {
  viewImageModalCloseButton.addEventListener("click", () => {
    closeModal(viewImageModal);
  });
}

// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
  };

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    openModal(viewImageModal);
    if (modalImage && modalCaption) {
      modalImage.src = data.link;
      modalImage.alt = data.name;
      modalCaption.textContent = data.name;
    }
  });

  const likeButton = cardElement.querySelector(".card__like-btn");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn_liked");
  });

  const deleteButton = cardElement.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

viewImageModal?.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(viewImageModal);
  }
});

function postCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: postModalNameInput.value,
    link: postModalLinkInput.value,
  };

  const cardElement = getCardElement(newCardData);

  cardList.prepend(cardElement);

  postModalNameInput.value = "";
  postModalLinkInput.value = "";
  closeModal(postModal);
}

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal.modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});


// Initialize Cards
initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardList.prepend(cardElement);
});

