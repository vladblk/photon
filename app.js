const auth = '563492ad6f917000010000017f4d29b69f194a7787c072439d164e23';
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more-btn');

let searchValue;
let pageCount = 1;
let fetchLink;
let currentSearch;

// EVENT LISTENERS

searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhoto(searchValue);

  currentSearch = searchValue;
});
moreBtn.addEventListener('click', loadMore);

// FUNCTIONS
async function fetchApi(url){
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth
    }
  });

  const data = await dataFetch.json();
  
  return data;
}

async function curatedPhotos(){
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
};
curatedPhotos();

async function searchPhoto(query){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
};

async function loadMore(){
  pageCount++;

  if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${pageCount}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${pageCount}`;
  }

  const data = await fetchApi(fetchLink);

  generatePhotos(data);
}

function generatePhotos(data){
  data.photos.forEach( (photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
      <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">Download</a>
      </div>
      <img src=${photo.src.large}>
    `
    gallery.appendChild(galleryImg);
  });
}

function updateInput(e){
  searchValue = e.target.value;
}

function clear(){
  gallery.innerHTML = '';
  searchInput.value = '';
  searchInput.focus();
}