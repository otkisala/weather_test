const BUTTONSEARCH = document.querySelector(".search")
const cityInput = document.querySelector(".inputCity")
const SERVERURL = 'http://api.openweathermap.org/data/2.5/weather';
const cityName = document.querySelector(".inputCity").value;
const APIKEY = '3136a63ccda334b76672d126751488cb';
const url = `${SERVERURL}?q=${document.querySelector(".inputCity").value}&appid=${APIKEY}`
const TEMPERATURE = document.querySelector(".temperature")
const CURRENTCITY = document.querySelector(".currentCity")
const CURRENTIMG = document.querySelector(".currentImg")
const CITIES = document.querySelector(".cities")
const HEART = document.querySelector(".heart")
const DELETEBUTTON = document.querySelector(".deletDiv")
const LIPARENT = document.querySelector(".cities")
const FEELSLIKE = document.querySelector(".feelsLike")
const SUNRISE = document.querySelector(".sunrise")
const SUNSET = document.querySelector(".sunset")
let favorit = []

function weather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${document.querySelector(".inputCity").value}&appid=3136a63ccda334b76672d126751488cb`)
        .then(response => {
            if (response.status === 404 || document.querySelector(".inputCity").value == "") {
                throw new Error("неправильно набран город")
            }
            return response.json()
        })
        .then(data => {
            SUNSET.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).getHours()}:${new Date(data.sys.sunrise).getMinutes()}`
            SUNRISE.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(data.sys.sunrise).getMinutes()}`
            FEELSLIKE.textContent = `Feels like: ${(Math.ceil((data.main.feels_like) - 273))}`
            TEMPERATURE.textContent = (Math.ceil((data.main.temp) - 273)) + `°`
            CURRENTCITY.textContent = document.querySelector(".inputCity").value.toLowerCase()
            CURRENTCITY.textContent = document.querySelector(".inputCity").value[0].toUpperCase() + document.querySelector(".inputCity").value.slice(1);
            if (data.weather[0].id === 800) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/01d@4x.png"
            } else if (data.weather[0].id === 801) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/02d@4x.png"
            } else if (data.weather[0].id === 803 || data.weather[0].id === 804) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/04d@4x.png"
            } else if (Math.floor(data.weather[0].id / 100) === 7) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/50d@4x.png"
            } else if (Math.floor(data.weather[0].id / 100) === 6 || data.weather[0].id === 511) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/13d@4x.png"
            } else if (data.weather[0].id >= 500 && data.weather[0].id <= 504) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/10d@4x.png"
            } else if (data.weather[0].id >= 520 && data.weather[0].id <= 531) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/09d@4x.png"
            } else if (Math.floor(data.weather[0].id / 100) === 3) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/09d@4x.png"
            } else if (Math.floor(data.weather[0].id / 100) === 2) {
                CURRENTIMG.src = "http://openweathermap.org/img/wn/11d@4x.png"
            }
        })
        .catch(error => console.error(error))
}

function test(e) {
    e.preventDefault();
    weather()
    redHeart()
    render()
}

function favorite() {
    try {
        if (!favorit.includes(CURRENTCITY.textContent)) {
            favorit.push(CURRENTCITY.textContent)
            render()
        } else {
            throw new Error("Данный город уже есть")
        }
    } catch (err) {
        console.error(err)

    }
}

function render() {
    while (CITIES.firstChild) {
        CITIES.removeChild(CITIES.firstChild)
    }
    for (i = 0; i < favorit.length; i++) {
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
}

function redHeart() {
    if (!favorit.includes(document.querySelector(".inputCity").value)) {
        HEART.src = "./icons/heart.png"
        return
    }
    HEART.src = "./icons/redheart.png"
    // if (favorit.includes(CURRENTCITY.textContent)) {
    //     HEART.src = "./icons/redheart.png"

    // }
}

function deleteTest(event) {
    let cityToDelet = event.target.parentNode.textContent.slice(0, -1)
    let IndexCityToDelet = favorit.indexOf(cityToDelet)
    favorit.splice(IndexCityToDelet, 1)
    redHeart()
    render()
}

function cityToFind(event) {
    let cityToFind = event.target.textContent.slice(0, -1)
    document.querySelector(".inputCity").value = cityToFind
    weather()
    redHeart()
    render()
}

BUTTONSEARCH.addEventListener("click", test)
BUTTONSEARCH.addEventListener("click", redHeart)
HEART.addEventListener("click", favorite)
HEART.addEventListener("click", redHeart)
DELETEBUTTON.addEventListener("click", deleteTest)
LIPARENT.addEventListener("click", cityToFind)