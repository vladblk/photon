const auth = '563492ad6f917000010000017f4d29b69f194a7787c072439d164e23';
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let searchValue;

// EVENT LISTENERS

searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('click', (e) => {
  e.preventDefault();
  searchPhoto(searchValue);
});

// FUNCTIONS
async function curatedPhotos(){
  const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1", {
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
      <img src=${photo.src.large}></img>
      <p>${photo.photographer}</p>
    `
    gallery.appendChild(galleryImg);
    // const galleryImg = `
    //   <div class="gallery-img">
    //     <img src="${photo.src.large}"></img>
    //     <p>${photo.photographer}</p>
    //   </div>
    // `
    // gallery.insertAdjacentHTML('beforeend', galleryImg);
  });
};
curatedPhotos();

async function searchPhoto(query){
  const dataFetch = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`, {
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
      <img src=${photo.src.large}></img>
      <p>${photo.photographer}</p>
    `
    gallery.appendChild(galleryImg);
    // const galleryImg = `
    //   <div class="gallery-img">
    //     <img src="${photo.src.large}"></img>
    //     <p>${photo.photographer}</p>
    //   </div>
    // `
    // gallery.insertAdjacentHTML('beforeend', galleryImg);
  });
};


function updateInput(e){
  searchValue = e.target.value;
}