import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImage } from './js/pixabay-api';
import { makeImages } from './js/render-functions';
const litebox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'imageTitle',
});

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleImages);

function handleImages(event) {
  event.preventDefault();
  const value = event.target.elements.search.value.trim();
  console.log(value);
  gallery.innerHTML = '';
  loader.innerHTML = '';
  if (!value || value === ' ') {
    {
      iziToast.show({
        message: 'Please add request!',
        position: 'center',
        color: 'red',
      });
      gallery.innerHTML = ':(';
      return;
    }
  }

  loader.classList.remove('hidden');
  searchImage(value)
    .then(data => {
      console.log(data);
      if (!data.hits.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
          color: 'red',
        });
        loader.innerHTML = '<h1>Error..</h1>';
      } else {
        gallery.innerHTML = makeImages(data.hits);
        litebox.refresh();
      }
    })
    .catch(error => {
      console.log(error.message);
      iziToast.show({
        message: `${error.message}`,
        position: 'center',
        color: 'red',
      });
    })
    .finally(() => {
      event.target.elements.search.value = '';
      loader.classList.add('hidden');
    });
}
