import { Notify } from 'notiflix';

import refs from './refs';




 export const trimEnterValueToLowerCase = (el) => {
    return el.trim().toLowerCase();
  };



export const totalHits = ({totalHits}) => {
  if (totalHits > 0) {
Notify.success(`Hooray! We found ${totalHits} images.`, {
  position: 'right-top',
  width: '25vw',
  fontSize: '40px',
  fontFamily:'Verdana',
  success: {
      background: '#000000aa',
    textColor: '#ffff00',
  },
});
  }
}

export const isButton = (el) => {
  el.classList.remove('is-hidden');
  }
  

export const noButton = (el) => {
  el.classList.add('is-hidden');
}


export const disabledButton = (el) => {
   if(!el.disabled) {
    el.disabled = true;
   }
   el.classList.add('disabled');
   el.classList.remove('load-more');
}
export const abledButton = (el) => {
  el.classList.remove('disabled');
  el.classList.add('load-more');
  el.disabled = false;
}


export const createMarkup = ({ comments, tags, downloads, views, likes, webformatURL, largeImageURL }) => {
refs.gallery.insertAdjacentHTML('beforeend', `<div class="photo-card">
<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
<div class="info">
  <p class="info-item">
  ${likes}
    <b>Likes</b>
  </p>
  <p class="info-item">
  ${views}
    <b>Views</b>
  </p>
  <p class="info-item">
  ${comments}
    <b>Comments</b>
  </p>
  <p class="info-item">
  ${downloads}
    <b>Downloads</b>
  </p>
</div>
</div>`);

}


export function createCard(dataApiJson) {
  const dataPhotos = dataApiJson.hits;
  if(dataPhotos.length === 0) {
     Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
         position: 'center-center',
         width: '45vw',
         fontSize: '50px',
         fontFamily:'Verdana',
         failure: {
             background: '#000000dd',
           textColor: '#ff0000',
         }
  });
     return;
 }
 dataPhotos.map(createMarkup);
 return dataApiJson;
}
  


export const initPage = (el) => {
  el.innerHTML = '';
}
