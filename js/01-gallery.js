import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryItemsMarkup(items) {
    return galleryItems.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>`;
    }).join('');
    
}

function onGalleryContainerClick(e) {
    e.preventDefault();

    const isGalleryImageEl = e.target.classList.contains('gallery__image');

    if (!isGalleryImageEl) {
        return;
    }

    const srcImage = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${srcImage}" width="800" height="600">
    `)

    instance.show(() => window.addEventListener('keydown', onEscKeyPress));

    function onEscKeyPress(e) {    
    if (e.code === 'Escape') {
        window.removeEventListener('keydown', onEscKeyPress);
        instance.close();
        }
    }
}

