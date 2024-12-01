import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import "../pages/index.css";
import Api from "../utils/Api.js";

// AvatarImg
import AvatarSrc from "../images/avatar.jpg";
const avatarImg = document.getElementById("profile-avatar-img");
avatarImg.src = AvatarSrc;

// AvatarBtnImg
import AvatarBtnSrc from "../images/LightPencil.png";
const avatarBtnImg = document.getElementById("profile-avatar-btn-img-id");
avatarBtnImg.src = AvatarBtnSrc;

// HeaderImg
import headerSrc from "../images/logo.svg";
const headerImg = document.getElementById("header-img");
headerImg.src = headerSrc;

// SettingsImg
import settingsSrc from "../images/profile__settings-icon.svg";
const settingsImg = document.getElementById("settings-img");
settingsImg.src = settingsSrc;

// ProfilePostImg
import profileSrc from "../images/PlusIcon.svg";
const profileImg = document.getElementById("profile-post-img");
profileImg.src = profileSrc;

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-karsten-winegeart-from-unsplash.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e6097546-c7a6-457b-8e22-b29ba00b8274",
    "Content-Type": "application/json",
  },
});

api.getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardList.prepend(cardElement);
    });
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((error) => {
    console.error(error);
  });

// Profile Elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// Modal Input Elements
const editModalNameInput = document.querySelector("#profile-name-input");
const editModalDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const postModalLinkInput = document.querySelector("#image-input");
const postModalNameInput = document.querySelector("#caption-input");
const editAvatarInput = document.querySelector("#avatar-input");

// Form and Modal Elements
const editFormElement = document.querySelector("#edit-modal-form");
const postFormElement = document.querySelector("#post-modal-form");
const editAvatarFormElement = document.querySelector("#avatar-modal-form");
const editModal = document.querySelector("#edit-modal");
const postModal = document.querySelector("#post-modal");
const viewImageModal = document.querySelector("#view-image-modal");
const modalImage = viewImageModal?.querySelector(".modal__image");
const modalCaption = viewImageModal?.querySelector(".modal__caption");
const editAvatarModal = document.querySelector("#edit-avatar");
const deleteImageModal = document.querySelector("#delete-image");

// Button Elements
const postButton = document.querySelector(".profile__post-btn");
const settingsButton = document.querySelector(".profile__settings");
const editAvatarButton = document.querySelector(".profile__avatar-btn");
const editModalExitButton = document.querySelector("#edit-modal-close-btn");
const postModalExitButton = document.querySelector("#post-modal-close-btn");
const viewImageModalCloseButton = document.querySelector(
  "#view-image-modal-close-btn"
);
const postSubmitBtn = postModal.querySelector(".modal__submit-btn");
const editAvatarExitButton = document.querySelector("#edit-avatar-close-btn");
const deleteImageExitButton = document.querySelector(
  "#close-btn-modal-close-btn"
);
const deleteImageDeleteButton = document.querySelector("#confirm-delete-btn");
const deleteImageCancelButton = document.querySelector("#cancel-delete-btn");
const editProfileSubmitButton = document.querySelector(
  "#edit-profile-submit-btn"
);
const editAvatarSubmitButton = document.querySelector("#edit-avatar-submit-btn");

// Card Template and List Elements
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

// Event Listeners
if (settingsButton) {
  settingsButton.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    resetValidation(
      editFormElement,
      [editModalNameInput, editModalDescriptionInput],
      settings
    );
    openModal(editModal);
  });
}
if (editModalExitButton) {
  editModalExitButton.addEventListener("click", () => {
    closeModal(editModal);
  });
}
if (editFormElement) {
  editFormElement.addEventListener("submit", (evt) =>
    editProfile(evt, settings)
  );
}
if (postButton) {
  postButton.addEventListener("click", () => {
    openModal(postModal);
  });
}
if (editAvatarFormElement) {
  editAvatarFormElement.addEventListener("submit", (evt) => {
    editAvatar(evt);
  });
}
if (editAvatarButton) {
  editAvatarButton.addEventListener("click", () => {
    openModal(editAvatarModal);
  });
}
if (editAvatarExitButton) {
  editAvatarExitButton.addEventListener("click", () => {
    closeModal(editAvatarModal);
  });
}
if (postModalExitButton) {
  postModalExitButton.addEventListener("click", () => {
    closeModal(postModal);
  });
}
if (postFormElement) {
  postFormElement.addEventListener("submit", (evt) => postCard(evt, settings));
}
if (viewImageModalCloseButton) {
  viewImageModalCloseButton.addEventListener("click", () => {
    closeModal(viewImageModal);
  });
}
if (deleteImageExitButton) {
  deleteImageExitButton.addEventListener("click", () => {
    closeModal(deleteImageModal);
  });
}

// Functions
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function editProfile(evt) {
  evt.preventDefault();

  editProfileSubmitButton.textContent = "Saving...";

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      editProfileSubmitButton.textContent = "Submit";
    });
}

function editAvatar(evt) {
  evt.preventDefault();

  editAvatarSubmitButton.textContent = "Saving...";

  api
    .editUserAvatar({
      avatar: editAvatarInput.value,
    })
    .then((data) => {
      avatarImg.src = data.avatar;
      editAvatarInput.value = "";
      disableButton(editAvatarSubmitButton, settings);
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      editAvatarSubmitButton.textContent = "Save";
    });
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  // Set the initial liked status
  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_liked");
  }

  cardImageEl.addEventListener("click", () => {
    openModal(viewImageModal);
    if (modalImage && modalCaption) {
      modalImage.src = data.link;
      modalImage.alt = data.name;
      modalCaption.textContent = data.name;
    }
  });

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-btn_liked")) {
      api
        .unlikeCard(data._id)
        .then(() => {
          likeButton.classList.remove("card__like-btn_liked");
          data.isLiked = false;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .likeCard(data._id)
        .then(() => {
          likeButton.classList.add("card__like-btn_liked");
          data.isLiked = true;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const deleteButton = cardElement.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", () => {
    const cardToDelete = cardElement;

    openModal(deleteImageModal);

    deleteImageDeleteButton.onclick = () => {
      deleteImageDeleteButton.textContent = "Deleting...";

      api
        .deleteCard(data._id)
        .then(() => {
          cardToDelete.remove();
          closeModal(deleteImageModal);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          deleteImageDeleteButton.textContent = "Delete";
        });
    };
  });

  return cardElement;
}

deleteImageCancelButton.onclick = () => {
  closeModal(deleteImageModal);
};

function postCard(evt, settings) {
  evt.preventDefault();

  const newCardData = {
    name: postModalNameInput.value,
    link: postModalLinkInput.value,
  };

  postSubmitBtn.textContent = "Saving...";

  api
    .uploadCard(newCardData)
    .then((data) => {
      const cardElement = getCardElement(data);
      cardList.prepend(cardElement);
      evt.target.reset();
      disableButton(postSubmitBtn, settings);
      closeModal(postModal);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      postSubmitBtn.textContent = "Submit";
    });
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
