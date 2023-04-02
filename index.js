
/*Needs
Convert a 'var' to a 'const' or 'let'(converted all)

convert a promise based ('.then') to 'asynch' or 'await'

convert a 'function' to an 'arrow function' (set final function of displayData to an arrow function)

convert string concatenation into template literals and string interpolation (template literals done no idea what a string interpolation is)

convert some 'object-related code' into 'ES6 destructuring' (did a couple surrounding data: name, country, lat, lon, weather, main, dt)
*/
// Global Constants
const API = "2df62c30dae6653493ac68c2bd19af8b"
const weather = document.getElementById('weather')
const form = document.querySelector('form')
const search = document.getElementById('weather-search')

//main function
form.onsubmit = function (e) { //turn asynch??
    e.preventDefault()
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="
    let city = this.search.value.trim()
    const usedURL = `${URL}${city}&units=imperial&appid=${API}`
    //if no input given, clear form
    if ((!city) || (search.value = "")){
        city = ''
        weather.innerHTML = ''
        search.value = ''
    }
     return fetch(usedURL)
//location not found
        .then(function (res) {
            if (res.status !== 200) 
            throw new Error('Location not Found')
            return res.json()
        })
        //display location information
        .then(displayData)
        //catch errors
        .catch(function (err) {
            weather.innerHTML = err.message
        })
}

//turn a function (displayData) into an arrow function
const displayData = (data) => {
    city = ""
    weather.innerHTML = ""
    search.value = ''
//show city
const location = document.createElement('h2')
const {
    name, 
    sys: {country}, 
    coord: {lat,lon},
    weather: [
        {icon},
        {description}
    ],
    main: {temp, feels_like},
    dt
} = data
weather.appendChild(location)
location.textContent = `${name}, ${country}`

//show map link
const mapLink = document.createElement('a')
const googleMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
weather.appendChild(mapLink)
mapLink.textContent = "Click to View Map"
mapLink.href = googleMap
mapLink.target = "_BLANK"

//show weather condition icon
const iconEl = document.createElement('img')
const iconCode = icon
const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
iconEl.src = iconURL
iconEl.alt = data.name
weather.appendChild(iconEl)

//show weather condition
const condition = document.createElement('p')
condition.setAttribute('style', 'text-transform: capitalize')
condition.textContent = description
weather.appendChild(condition)
//show current temperature
const temperature = document.createElement('p')
const temperatureNumber = temp
temperature.textContent = `Current: ${temperatureNumber}° F`
weather.appendChild(temperature)

//show feels like temperature
const feelsLike = document.createElement('p')
const feelsLikeTemp = feels_like
feelsLike.textContent = `Feels like: ${feelsLikeTemp}° F`
weather.appendChild(feelsLike)

//show time updated
const dateTime = document.createElement('p')
const date = new Date((dt) * 1000)
const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric', 
    minute: '2-digit'
})
dateTime.textContent = `Last Updated: ${time}`
weather.appendChild(dateTime)
}