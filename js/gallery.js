import images from '../gallery-items.js';

const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const overlayModalRef = document.querySelector('.lightbox__overlay');
const btnCloseModalRef = document.querySelector('button[data-action="close-lightbox"]');

const btnSlideLeftRef  = document.querySelector('button[data-action="left-arrow"]');
const btnSlideRightRef = document.querySelector('button[data-action="right-arrow"]');

const galleryContainerRef = document.querySelector('.js-gallery');

let currentIndex = 0;

const cardsMarkup = createGalleryCardsMarkup(images);

function createGalleryCardsMarkup(images) {
  return images.map(({ preview, original, description }, i) => {
      return `<li class="gallery__item">
                <a
                  class="gallery__link"
                  href="${original}"
                >
                  <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                    data-index="${i}"
                    data-source="${original}"
                  />
                </a>
              </li>`;
    }).join('');
}

galleryContainerRef.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainerRef.addEventListener('click', onGalleryContainerClick);
btnCloseModalRef.addEventListener('click', onBtnCloseModalClick);
overlayModalRef.addEventListener('click', onOverlayModalClick);

function onRightSliderClick() {
  currentIndex += 1;
  if (currentIndex === images.length) {
    currentIndex = 0;
  }
  modalImageRef.src = images[currentIndex].original;
}

function onLeftSliderClick() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  modalImageRef.src = images[currentIndex].original;
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  currentIndex = Number(event.target.getAttribute('data-index'));

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onRightPress);
  window.addEventListener('keydown', onLeftPress);
  btnSlideLeftRef.addEventListener('click', onLeftSliderClick);
  btnSlideRightRef.addEventListener('click', onRightSliderClick);

  modalRef.classList.add('is-open');

  modalImageRef.src = event.target.dataset.source;
}

function remover() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onRightPress);
  window.removeEventListener('keydown', onLeftPress);
  btnSlideLeftRef.removeEventListener('click', onLeftSliderClick);
  btnSlideRightRef.removeEventListener('click', onRightSliderClick);

  modalRef.classList.remove('is-open');

  modalImageRef.src = '';
}

function onBtnCloseModalClick() {
  remover();
}

function onOverlayModalClick() {
  remover();
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    remover();
  }
}

function onRightPress(event) {
  if (event.code === 'ArrowRight') {
    onRightSliderClick();
  }
}

function onLeftPress(event) {
  if (event.code === 'ArrowLeft') {
    onLeftSliderClick();
  }
}
