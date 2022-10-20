import { Notify } from "notiflix";
import PhotosApiService from './photos-servise';
import refs from './refs';
import { isButton, noButton, abledButton,  
    disabledButton,
     trimEnterValueToLowerCase,
      initPage,
     createCard, totalHits } from './functions';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
} );


const photosApiService = new PhotosApiService();

const btLdM = refs.buttonLoadMore;
const loadingAnim = refs.onLoadOverlay;

 let options = {
      root: null,
      rootMargin: '80px',
      threshold: 1.0
    }

    let callback = (entries, observer) => {
      entries.forEach(async entry => {
       if(entry.isIntersecting && entry.intersectionRect.bottom > 550){
        abledButton(btLdM);
        observer.unobserve(entry.target);
         btLdM.addEventListener('click' ,onLoadMore);

       }
      });
    };
    const observer = new IntersectionObserver(callback, options);


refs.form.addEventListener('input', (event) => {
    if(!trimEnterValueToLowerCase(event.target.value)) {
        noButton(refs.buttonSearch);
        return;       
} else if (!btLdM.classList.contains('is-hidden')) {
    noButton(btLdM);
}
isButton(refs.buttonSearch);
});

refs.form.addEventListener('submit', bundler);

async function bundler (e) {
    e.preventDefault();
    noButton(refs.buttonSearch);
    const dataValue = trimEnterValueToLowerCase(e.currentTarget.elements.searchQuery.value);
    photosApiService.query =  dataValue; 
    photosApiService.resetPage();
photosApiService.toggleOnLoadBackDrop(loadingAnim);
initPage(refs.gallery);
if(!dataValue) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
        position: 'center-center',
        width: '45vw',
        fontSize: '50px',
        fontFamily:'Verdana',
        failure: {
            background: '#000000dd',
          textColor: '#ff0000',
        }
 }); return
}
photosApiService.query =  dataValue; 
   
try {
    const dataApiJson = await photosApiService.fetchPhotos();
  const dataK = createCard(dataApiJson);
  totalHits(dataK);
    photosApiService.calculateTotalPages(dataK.totalHits);
  if(!photosApiService.isShowLoadMore){
    noButton(btLdM);
    disabledButton(btLdM);
    Notify.info("We're sorry, but you've reached the end of search results.", {
        position: 'left-top',
        width: '45vw',
        fontSize: '40px',
        fontFamily:'Verdana',
        info: {
            background: '#000000cc',
          textColor: '#ff0000',
        },
      });
    return
  }

  isButton(btLdM);
  disabledButton(btLdM);
  const target = document.querySelector('.photo-card:last-child');
  observer.observe(target);
  
} catch (err) {
  console.error(err.message);
} finally {
    lightBox.refresh();
    photosApiService.toggleOnLoadBackDrop(loadingAnim);

}

}

async function onLoadMore () {
    photosApiService.toggleOnLoadBackDrop(loadingAnim);
    disabledButton(btLdM)
    try {
        const data = await photosApiService.fetchPhotos();
        createCard(data);
        if(!photosApiService.isShowLoadMore){
            noButton(btLdM);
            disabledButton(btLdM);
            Notify.info("We're sorry, but you've reached the end of search results.", {
                position: 'left-top',
                width: '45vw',
                fontSize: '40px',
                fontFamily:'Verdana',
                info: {
                    background: '#000000cc',
                  textColor: '#ff0000',
                }
            });
            return;
        }
        const target = document.querySelector('.photo-card:last-child');
        console.log(target);
        observer.observe(target);
    } catch (err) {
          console.error(err.message);
    } finally {
     
        lightBox.refresh();
        photosApiService.toggleOnLoadBackDrop(loadingAnim);
        
    }
}