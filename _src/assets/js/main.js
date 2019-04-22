'use strict';

console.log('>> Ready :)');

// API http://api.tvmaze.com/search/shows?q=girls

//Recoger ul
//Recoger Input
//Recoger Button

const seriesListEl = document.querySelector('.series__list');
const inputEl = document.querySelector('.search');
const buttonEl = document.querySelector('.btn');

//Añadir listener de click a button
//En la función añadir el value del input a la URL de búsqueda.
//Recoger título e imagen de la info recibida.

function searchSeries() {
    //clear past search
    seriesListEl.innerHTML = '';
    const inputValue = inputEl.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let showEl of data) {
                const seriesEl = showEl.show;
                const showName = seriesEl.name;
                const showLi = document.createElement('li');
                const showNameEl = document.createElement('h2');
                const showImageEl = document.createElement('img');
                const showNameContent = document.createTextNode(showName);
                const showImageGlobal = seriesEl.image;

                if (!showImageGlobal) {
                    showImageEl.src = "https://via.placeholder.com/210x295/444444/ffffff/?text=" + showName + "";
                    showImageEl.alt = 'Cartel de la serie' + showName;
                }
                else {
                    const showImage = showImageGlobal.medium;
                    showImageEl.src = showImage;
                    showImageEl.alt = 'Cartel de la serie' + showName;
                }
                showNameEl.classList.add('show-title');
                showLi.classList.add('show__element');
                showNameEl.appendChild(showNameContent);
                showLi.appendChild(showImageEl);
                showLi.appendChild(showNameEl);
                seriesListEl.appendChild(showLi);
            }
        });
}
buttonEl.addEventListener('click', searchSeries);
