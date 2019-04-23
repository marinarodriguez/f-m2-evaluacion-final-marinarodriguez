'use strict';

const seriesListEl = document.querySelector('.series__list');
const inputEl = document.querySelector('.search');
const buttonEl = document.querySelector('.btn');
const favouriteListEl = document.querySelector('.favourites__list');
const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
let favouritesArray = savedFavourites || [];
const deleteButtonEl = document.querySelector('.btn__delete');
printFavourites();

function printFavourites() {
    for (let favourite of favouritesArray) {
        const favouriteName = favourite.name;
        const showLi = document.createElement('li');
        const showNameEl = document.createElement('h3');
        const showImageEl = document.createElement('div');
        const showNameContent = document.createTextNode(favouriteName);
        const favouriteImage = favourite.image;
        const favouriteId = favourite.id;
        showLi.classList.add('favourite');
        showImageEl.classList.add('little-image');
        showNameEl.classList.add('little-name');
        showImageEl.setAttribute('style', `background-image:url("${favouriteImage}"`);
        showNameEl.appendChild(showNameContent);
        showLi.appendChild(showImageEl);
        showLi.appendChild(showNameEl);
        showLi.setAttribute("id", favouriteId);
        favouriteListEl.appendChild(showLi);
    }
}
const printerSeries = data => {
    for (let showEl of data) {
        const seriesEl = showEl.show;
        const showName = seriesEl.name;
        const showId = seriesEl.id;
        const showLi = document.createElement('li');
        const showNameEl = document.createElement('h3');
        const showImageEl = document.createElement('img');
        const showNameContent = document.createTextNode(showName);
        const showImageGlobal = seriesEl.image;
        showNameEl.classList.add('show-title');
        showLi.classList.add('show__element');
        showLi.classList.add('no-favourite');
        showLi.setAttribute("id", showId);
        showNameEl.appendChild(showNameContent);
        showLi.appendChild(showImageEl);
        showLi.appendChild(showNameEl);
        seriesListEl.appendChild(showLi);
        showImageEl.alt = 'Cartel de la serie ' + showName;
        if (!showImageGlobal) {
            showImageEl.src = "https://via.placeholder.com/210x295/444444/ffffff/?text=" + showName + "";
        }
        else {
            const showImage = showImageGlobal.medium;
            showImageEl.src = showImage;
        }
    }
};
const containsObject = (obj, array) => {
    for (let i = 0; i < array.length; i++) {
        if (obj.id === array[i].id) {
            return true;
        }
    }
};
const likeThisShow = event => {
    const showElement = event.currentTarget;
    const showImage = showElement.childNodes[0].src;
    const showName = showElement.childNodes[1].innerHTML;
    const showId = showElement.getAttribute("id");
    showElement.classList.add('like');
    let obj = {};
    obj["name"] = showName;
    obj["image"] = showImage;
    obj["id"] = showId;
    if (containsObject(obj, favouritesArray)) {
    }
    else {
        favouritesArray.push(obj);
        favouriteListEl.innerHTML = '';
        localStorage.setItem('favourites', JSON.stringify(favouritesArray));
        printFavourites();
    }
};
const likeShow = () => {
    const showList = document.querySelectorAll('.no-favourite');
    for (let show of showList)
        show.addEventListener('click', likeThisShow);
};
const searchSeries = () => {
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
};
const removeAllFavourites = () => {
    localStorage.removeItem('favourites');
    favouriteListEl.innerHTML = '';
    favouritesArray = [];
    const children = seriesListEl.children;
    for (let child of children) {
        child.classList.remove('like');
    }
};
buttonEl.addEventListener('click', searchSeries);
deleteButtonEl.addEventListener('click', removeAllFavourites);

