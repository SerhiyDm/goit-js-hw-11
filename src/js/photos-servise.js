import axios from "axios";
export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalPages = 1;
        this.cssClass = 'is--hidden';
        this.searchParams = {
            image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
    }
    }
       
       async fetchPhotos() {
        const searchParams = new URLSearchParams(this.searchParams);
        axios.defaults.baseURL = 'https://pixabay.com/api/';
        const API_KEY = '30681276-5df088d4e4761da157226470c';
       
        const { data } = await axios.get(`?key=${API_KEY}&q=${this.searchQuery}&${searchParams}&page=${this.page}`);
                return data;
            }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }


    toggleOnLoadBackDrop(el) {
        el.classList.toggle(`${this.cssClass}`);
    }

     calculateTotalPages(total) {
         this.totalPages = Math.ceil(total/this.searchParams.per_page);
      }


      
get isShowLoadMore() {
    return this.page < this.totalPages;
}

    get query() {
        return this.searchQuery;
        
    }
     set query(newData) {
this.searchQuery = newData;
     }
}
