import { TEMPERATURE, CURRENT_CITY, CURRENT_IMG, FEELS_LIKE, SUNRISE, SUNSET, MORNING_IMG, DAY_IMG, NIGHT_IMG, MORNING_TEMP, MORNING_FEELS, DAY_TEMP, DAY_FEELS, NIGHT_TEMP, NIGHT_FEELS, FAHRENHEIT_TO_CELSIUS_OFFSET } from "./config.js"
import { obj } from "./weatherVisuals.js";

export async function predictions() {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${document.querySelector(".inputCity").value}&appid=3136a63ccda334b76672d126751488cb`)
        const data = await response.json()
        MORNING_TEMP.textContent = `Temperature: ${(Math.ceil((data.list[0].main.temp) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        MORNING_FEELS.textContent = `Feels like:: ${(Math.ceil((data.list[0].main.feels_like) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        DAY_TEMP.textContent = `Temperature: ${(Math.ceil((data.list[1].main.temp) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        DAY_FEELS.textContent = `Feels like:: ${(Math.ceil((data.list[1].main.feels_like) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        NIGHT_TEMP.textContent = `Temperature: ${(Math.ceil((data.list[2].main.temp) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        NIGHT_FEELS.textContent = `Feels like:: ${(Math.ceil((data.list[2].main.feels_like) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        MORNING_IMG.src = obj[data.list[0].weather[0].id]
        DAY_IMG.src = obj[data.list[1].weather[0].id]
        NIGHT_IMG.src = obj[data.list[2].weather[0].id]
    } catch (error) {
        console.error(error)
    }
}
export async function weather() {
    if (document.querySelector(".inputCity").value == "") {
        throw new Error("Пустая строка")
    } try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${document.querySelector(".inputCity").value}&appid=3136a63ccda334b76672d126751488cb`)
        const data = await response.json()
        SUNSET.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).getHours()}:${new Date(data.sys.sunrise).getMinutes()}`
        SUNRISE.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(data.sys.sunrise).getMinutes()}`
        FEELS_LIKE.textContent = `Feels like: ${(Math.ceil((data.main.feels_like) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        TEMPERATURE.textContent = `${(Math.ceil((data.main.temp) - FAHRENHEIT_TO_CELSIUS_OFFSET))}`
        CURRENT_CITY.textContent = document.querySelector(".inputCity").value.toLowerCase()
        CURRENT_CITY.textContent = document.querySelector(".inputCity").value[0].toUpperCase() + document.querySelector(".inputCity").value.slice(1);
        CURRENT_IMG.src = obj[data.weather[0].id]
    } catch (error){
        console.error(error)
    }
    predictions()
};