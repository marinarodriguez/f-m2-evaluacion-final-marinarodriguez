'use strict';

console.log('>> Ready :)');

// API http://api.tvmaze.com/search/shows?q=girls

//Recoger ul
//Recoger Input
//Recoger Button

const seriesListEl = document.querySelector('.series__list');
const inputEl = document.querySelector('.search');
const buttonEl = document.querySelector('.btn');
const favouriteListEl = document.querySelector('.favourites__list');

const savedFavourites =  JSON.parse(localStorage.getItem('favouritesArray'));
const favouritesArray = savedFavourites || []; 
printFavourites();

//Añadir listener de click a button
//En la función añadir el value del input a la URL de búsqueda.
//Recoger título e imagen de la info recibida.

function printerSeries(data) {
    for (let showEl of data) {
        const seriesEl = showEl.show;
        const showName = seriesEl.name;
        const showLi = document.createElement('li');
        const showNameEl = document.createElement('h3');
        const showImageEl = document.createElement('img');
        const showNameContent = document.createTextNode(showName);
        const showImageGlobal = seriesEl.image;

        if (!showImageGlobal) {
            showImageEl.src = "https://via.placeholder.com/210x295/444444/ffffff/?text=" + showName + "";
            showImageEl.alt = 'Cartel de la serie ' + showName;
        }
        else {
            const showImage = showImageGlobal.medium;
            showImageEl.src = showImage;
            showImageEl.alt = 'Cartel de la serie ' + showName;
        }
        showNameEl.classList.add('show-title');
        showLi.classList.add('show__element');
        showLi.classList.add('no-favourite');
        showNameEl.appendChild(showNameContent);
        showLi.appendChild(showImageEl);
        showLi.appendChild(showNameEl);
        seriesListEl.appendChild(showLi);
    }
}
function printFavourites(){
for (let favourite of favouritesArray) {
    const favouriteName = favourite.name;
    const showLi = document.createElement('li');
    const showNameEl = document.createElement('h3');
    const showImageEl = document.createElement('img');
    const showNameContent = document.createTextNode(favouriteName);
    const favouriteImage = favourite.image;
    showImageEl.src = favouriteImage;
    showNameEl.appendChild(showNameContent);
    showLi.appendChild(showImageEl);
    showLi.appendChild(showNameEl);
    favouriteListEl.appendChild(showLi);
}
}
function likeShow() {
    const showList = document.querySelectorAll('.no-favourite');
    for (let show of showList)
        show.addEventListener('click', likeThisShow);
    function likeThisShow(event) {
        const showElement = event.currentTarget;
        const showImage = showElement.childNodes[0].src;
        const showName = showElement.childNodes[1].innerHTML;
        showElement.classList.toggle('like');
       
        if (showElement.classList.contains('no-favourite')){
        let obj = {};
        obj["name"] = showName;
        obj["image"] = showImage;
        favouritesArray.push(obj);
        console.log(favouritesArray);
        favouriteListEl.innerHTML = '';
        showElement.classList.remove('no-favourite');
        }
        else {

        }
        printFavourites();
        localStorage.setItem('favouritesArray', JSON.stringify(favouritesArray));
    }

}


function searchSeries() {
    //clear past search
    seriesListEl.innerHTML = '';
    const inputValue = inputEl.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            printerSeries(data);
            likeShow();

        });
}
buttonEl.addEventListener('click', searchSeries);
