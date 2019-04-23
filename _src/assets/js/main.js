'use strict';

const seriesListEl = document.querySelector('.series__list');
const inputEl = document.querySelector('.search');
const buttonEl = document.querySelector('.btn');
const favouriteListEl = document.querySelector('.favourites__list');
const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
let favouritesArray = savedFavourites || [];
const deleteButtonEl = document.querySelector('.btn__delete');
printFavourites();

function getUnique(arr, comp) {
    const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}

const printerSeries = data => {
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
        }
        else {
            const showImage = showImageGlobal.medium;
            showImageEl.src = showImage;
        }
        showImageEl.alt = 'Cartel de la serie ' + showName;
        showNameEl.classList.add('show-title');
        showLi.classList.add('show__element');
        showLi.classList.add('no-favourite');
        showNameEl.appendChild(showNameContent);
        showLi.appendChild(showImageEl);
        showLi.appendChild(showNameEl);
        seriesListEl.appendChild(showLi);
    }
}
function printFavourites() {
    for (let favourite of getUnique(favouritesArray, 'image')) {
        const favouriteName = favourite.name;
        const showLi = document.createElement('li');
        const showNameEl = document.createElement('h3');
        const showImageEl = document.createElement('div');
        const showNameContent = document.createTextNode(favouriteName);
        const favouriteImage = favourite.image;
        showLi.classList.add('favourite');
        showImageEl.classList.add('little-image');
        showNameEl.classList.add('little-name');
        showImageEl.setAttribute('style', `background-image:url("${favouriteImage}"`);
        showNameEl.appendChild(showNameContent);
        showLi.appendChild(showImageEl);
        showLi.appendChild(showNameEl);
        favouriteListEl.appendChild(showLi);
    }
}
const likeThisShow = event => {
    const showElement = event.currentTarget;
    const showImage = showElement.childNodes[0].src;
    const showName = showElement.childNodes[1].innerHTML;
    showElement.classList.toggle('like');
        let obj = {};
        obj["name"] = showName;
        obj["image"] = showImage;
        favouritesArray.push(obj);
        favouriteListEl.innerHTML = '';
        localStorage.setItem('favourites', JSON.stringify(getUnique(favouritesArray, 'image')));
        printFavourites();
        console.log(getUnique(favouritesArray, 'image'));
}
const likeShow = () => {
    const showList = document.querySelectorAll('.no-favourite');
    for (let show of showList)
        show.addEventListener('click', likeThisShow);
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
const removeFavourites = () => {
    localStorage.removeItem('favourites');
    favouriteListEl.innerHTML = '';
    favouritesArray = [];
    console.log(seriesListEl.children);
    const children = seriesListEl.children;
    for (let child of children) {
        if (child.classList.contains('no-favourite')) {
        }
        else {
            child.classList.add('no-favourite');
            child.classList.remove('like');
        }
    }
}
buttonEl.addEventListener('click', searchSeries);
deleteButtonEl.addEventListener('click', removeFavourites);

