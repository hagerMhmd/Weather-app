// ========== Current Day Weather Variables ==============
let todayWeather = document.querySelector('#todayWeather'),
    searchInput = document.querySelector('#searchInput'),
    currentDay = document.querySelector('#currentDay'),
    currentMonth = document.querySelector('#currentMonth'),
    country = document.querySelector('#country'),
    currentDegree = document.querySelector('#currentDegree'),
    currentWeatherIcon = document.querySelector('#currentWeatherIcon'),
    currentWeatherCondition = document.querySelector("#currentWeatherCondition"),
    humidity = document.querySelector('#humidity'),
    windKph = document.querySelector('#windKph'),
    windDirection = document.querySelector('#windDirection'),
    days = ["Sunday", "Monday", "Tuesday", "Wednesday",  "Thursday", "Friday" , "Saturday"],
    months = ["jan", "Feb", "March", "April", "May", "june", "July", "Aug", "Spet", "Oct", "Nov", "Des"],
    apiResponse,
    finalResult;

// ========== Next Days Weather Variables ==============
let nextDay = document.querySelectorAll('.nextDay'),
    nextDayMaxTemp = document.querySelectorAll('.nextDayMaxTemp'),
    nextDayMinTemp = document.querySelectorAll('.nextDayMinTemp'),
    nextDayCondation = document.querySelectorAll('.nextDayCondation'),
    nextDayIcon = document.querySelectorAll('.nextDayIcon');

// =========== 
async function getWeather(cityName) {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f159473a0deb48ec99b114916220302&q=${cityName}&days=7`)
    finalResult = await apiResponse.json()
    currentWeather()
    displayNextDay()
}

getWeather('cairo')

searchInput.addEventListener("keyup", function () {
    let searchInputValue = searchInput.value
    weather(searchInputValue)
})
function currentWeather() {
    let date = new Date()
    currentDay.innerHTML = days[date.getDay()]
    currentMonth.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`
    country.innerHTML = finalResult.location.name
    currentDegree.innerHTML = `${finalResult.current.temp_c}${'<sup>o</sup>C'} `
    currentWeatherIcon.setAttribute('src', finalResult.current.condition.icon)
    currentWeatherCondition.innerHTML = finalResult.current.condition.text
    windKph.innerHTML = `${finalResult.current.wind_kph}${'km/h'}`
    humidity.innerHTML = `${finalResult.current.humidity}${'%'}`
    windDirection.innerHTML = finalResult.current.wind_dir
}
function displayNextDay() {
    let date = new Date();
    for (let i = 0; i < nextDay.length; i++) {
        let nextDayWeather = finalResult.forecast.forecastday[i].day;
        nextDay[i].innerHTML = days[new Date(finalResult.forecast.forecastday[i + 1].date).getDay()]
        nextDayIcon[i].setAttribute('src', nextDayWeather.condition.icon)
        nextDayMaxTemp[i].innerHTML = `${nextDayWeather.maxtemp_c}${'<sup>o</sup>C'}`
        nextDayMinTemp[i].innerHTML = `${nextDayWeather.mintemp_c}${'<sup>o</sup>'}`
        nextDayCondation[i].innerHTML = nextDayWeather.condition.text
    }
}
