import { BUTTON_SEARCH, CURRENT_CITY, CITIES, HEART, DELETE_BUTTON, LI_PARENT, } from "./config.js";
import { weather } from "./temperatureFetch.js";

let favorite = [];

function setFavoriteCity() {
    favorite = getFavoriteCities();
    saveFavoriteCities(favorite);
    render();
}

function getFavoriteCities() {
    let cities = localStorage.getItem('favorit');
    if (cities) {
        return JSON.parse(cities);
    } else {
        return [];
    }
}

function saveFavoriteCities(cities) {
    localStorage.setItem('favorit', JSON.stringify(cities));
}

function selectCity() {
    setTimeout(function () {
        let currentCityName = CURRENT_CITY.textContent;
        localStorage.setItem('selectedCity', currentCityName);
    }, 400)
}

function test(e) {
    e.preventDefault();
    weather();
    render();
    selectCity()
    cookiesCurrentCity()
}

function addFavoriteCity() {
    try {
        if (!favorite.includes(CURRENT_CITY.textContent)) {
            favorite.push(CURRENT_CITY.textContent);
            saveFavoriteCities(favorite);
            render();
        } else {
            throw new Error("Данный город уже есть");
        }
    } catch (err) {
        console.error(err);
    }
}


function cookiesCurrentCity() {
    setTimeout(() => {
        let currentCityName = CURRENT_CITY.textContent;
        console.log(currentCityName)
        setTimeout(() => {
            document.cookie = `currentCity = ${currentCityName};`
        }, 400);
        document.querySelector(".inputCity").value = currentCityName;
        weather();
        render();
    }, 450);

}

function getCookie() {
        return document.cookie.split('; ').reduce((acc, item) => {
            const [name, value] = item.split('=')
            acc[name] = value
            return acc
        }, {})
}

const cookie = getCookie()

// function render() {
//     while (CITIES.firstChild) {
//         CITIES.removeChild(CITIES.firstChild);
//     }
//     for (let i = 0; i < favorite.length; i++) {
//         const newLi = document.createElement('li');
//         const deletBut = document.createElement('button');
//         newLi.textContent = favorite[i];
//         CITIES.appendChild(newLi);
//         newLi.appendChild(deletBut);
//         deletBut.addEventListener("click", deleteTest);
//         deletBut.innerHTML = "&#10060;";
//         deletBut.className = "deletDiv";
//         deletBut.setAttribute('data-city', favorite[i]);
//     }
//     redHeart();
// };

function render() {
    if (CITIES.firstChild) {
        CITIES.removeChild(CITIES.firstChild);
        render();
    } else {
        for (let i = 0; i < favorite.length; i++) {
            const newLi = document.createElement('li');
            const deletBut = document.createElement('button');
            newLi.textContent = favorite[i];
            CITIES.appendChild(newLi);
            newLi.appendChild(deletBut);
            deletBut.addEventListener("click", deleteTest);
            deletBut.innerHTML = "&#10060;";
            deletBut.className = "deletDiv";
            deletBut.setAttribute('data-city', favorite[i]);

        }
    }
    redHeart();
}

function redHeart() {
    if (!favorite.includes(document.querySelector(".inputCity").value)) {
        HEART.src = new URL("/icons/heart.png", import.meta.url);
    } else {
        HEART.src = new URL("/icons/redheart.png", import.meta.url);
    }
    setTimeout(function () {
        if (favorite.includes(CURRENT_CITY.textContent)) {
            HEART.src = new URL("/icons/redheart.png", import.meta.url);
        }
    }, 300);
}


function deleteTest(event) {
    let cityToDelet = event.target.getAttribute('data-city');
    let indexCityToDelet = favorite.indexOf(cityToDelet);
    if (indexCityToDelet !== -1) {
        favorite.splice(indexCityToDelet, 1);
        saveFavoriteCities(favorite);
        render();
    }
    cookiesCurrentCity();
}
function cityToFind(event) {
    let cityToFind = event.target.textContent.slice(0, -1);
    document.querySelector(".inputCity").value = cityToFind;
    redHeart();
    weather();
    render();
    cookiesCurrentCity();
}
BUTTON_SEARCH.addEventListener("click", test);
HEART.addEventListener("click", addFavoriteCity);
DELETE_BUTTON.addEventListener("click", deleteTest);
LI_PARENT.addEventListener("click", cityToFind);
document.addEventListener('DOMContentLoaded', setFavoriteCity);
// document.addEventListener('DOMContentLoaded', function () {
//     let selectedCity = localStorage.getItem('selectedCity');
//     if (selectedCity) {
//         document.querySelector(".inputCity").value = selectedCity;
//         weather();
//         render();
//     }
// });
document.addEventListener('DOMContentLoaded', function () {
    let selectedCity = cookie.currentCity

    if (selectedCity) {
        document.querySelector(".inputCity").value = selectedCity;
        weather();
        render();
    }
});