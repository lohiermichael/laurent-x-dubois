import { elementsToChangeOpen } from './header.js';

// Hide these elements on menu-open
elementsToChangeOpen.push(
    document.querySelector('.gallery-container'),
    document.querySelector('.background-video'),
)

const galleryContainer = document.querySelector('.gallery-container');

// Center gallery-container only when it is small enough to be entirely on the
// screen
// Wait before everything is loaded
window.onload = () => {
  const lastImage = galleryContainer.querySelector('img:last-child');
  const lastImageRectangle = lastImage.getBoundingClientRect();
  if (
    lastImageRectangle.left > 0 &&
    lastImageRectangle.right < (
      window.innerWidth || document.documentElement.clientWidth
    )
  ) {
    galleryContainer.style.justifyContent = 'center';
  }
}

// Make horizontal scrolling on vertical scrolling from tablet view: 768px
galleryContainer.addEventListener('wheel', (scrollingEvent) => {
  if (window.innerWidth >= 992) {
    scrollingEvent.preventDefault();
    galleryContainer.scrollLeft += scrollingEvent.deltaY + scrollingEvent.deltaX;
  }
});

const galleryImages = galleryContainer.querySelectorAll('img');

// When scrolling revealing images that appear
galleryContainer.addEventListener('wheel', () => {
  galleryImages.forEach(image => {
    const imageVisible = isImageVisible(image);
    if (!(image.classList.contains('reveal')) & imageVisible) {
      if (image.style.animationName == 'revealAnimation') {
        image.style.removeProperty('animation')
      }
      image.classList.add('reveal');
    }
    else if ((image.classList.contains('reveal')) & !imageVisible) {
      image.classList.remove('reveal');
    }
  })
});

function isImageVisible(image) {
  const imageBounding = image.getBoundingClientRect();
  return (
      imageBounding.top < window.innerHeight &
      imageBounding.bottom > 0 &
      imageBounding.right > 0 &
      imageBounding.left < window.innerWidth
    );
}

// Prevent right click for downloading images
document.addEventListener('contextmenu', event => event.preventDefault());
