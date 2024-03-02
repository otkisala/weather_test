import { BUTTON_SEARCH, CURRENT_CITY, CITIES, HEART, DELETE_BUTTON, LI_PARENT, favorit, } from "./config.js"
import { weather } from "./temperatureFetch.js"

function test(e) {
    e.preventDefault();
    weather()
    render()
};

function favorite() {
    try {
        if (!favorit.includes(CURRENT_CITY.textContent)) {
            favorit.push(CURRENT_CITY.textContent)
            render()
        } else {
            throw new Error("Данный город уже есть")
        }
    } catch (err) {
        console.error(err)
    }
};

function render() {
    while (CITIES.firstChild) {
        CITIES.removeChild(CITIES.firstChild)
    }
    for (let i = 0; i < favorit.length; i++) {
        const newLi = document.createElement('li')
        const deletBut = document.createElement('button')
        newLi.textContent = favorit[i]
        CITIES.appendChild(newLi)
        newLi.appendChild(deletBut)
        deletBut.addEventListener("click", deleteTest)
        deletBut.innerHTML = "&#10060;"
        deletBut.className = "deletDiv"
    }
    redHeart()
};

function redHeart() {
    if (!favorit.includes(document.querySelector(".inputCity").value)) {
        HEART.src = "./icons/heart.png"
    } else {
        HEART.src = "./icons/redheart.png"
    }
    setTimeout(function () {
    if (favorit.includes(CURRENT_CITY.textContent)) {
        HEART.src = "./icons/redheart.png"
    }
    }, 1000)
}

function deleteTest(event) {
    let cityToDelet = event.target.parentNode.textContent.slice(0, -1)
    let IndexCityToDelet = favorit.indexOf(cityToDelet)
    favorit.splice(IndexCityToDelet, 1)
    render()
};

function cityToFind(event) {
    let cityToFind = event.target.textContent.slice(0, -1)
    document.querySelector(".inputCity").value = cityToFind
    weather()
    render()
};

BUTTON_SEARCH.addEventListener("click", test)
HEART.addEventListener("click", favorite)
DELETE_BUTTON.addEventListener("click", deleteTest)
LI_PARENT.addEventListener("click", cityToFind)