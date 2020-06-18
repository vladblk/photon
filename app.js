const auth = '563492ad6f917000010000017f4d29b69f194a7787c072439d164e23';
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let searchValue;

// EVENT LISTENERS

searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhoto(searchValue);
});

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

async function curatedPhotos(){
  fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
};
curatedPhotos();

async function searchPhoto(query){
  clear();
  fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`);
};

function updateInput(e){
  searchValue = e.target.value;
}

function clear(){
  gallery.innerHTML = '';
  searchInput.value = '';
  searchInput.focus();
}