const navItems = document.getElementsByClassName('contact-button');

Array.from(navItems).forEach(navItem => {
    const anchor = navItem.querySelector('a'); // Get the <a> element

    // Event listener for mouseover
    anchor.addEventListener('mouseover', () => anchor.style.color = 'rgb(157, 199, 161)');

    // Event listener for mouseout
    anchor.addEventListener('mouseout', () => anchor.style.color = '');

    // Event listener for mousedown
    anchor.addEventListener('mousedown', () => anchor.style.color = 'rgb(133, 168, 136)');

    // Event listener for mouseup
    anchor.addEventListener('mouseup', () => anchor.style.color = '');
});


/* Weather App */

//take the various classes of the weather app and assign them to variables
const weatherForm = document.querySelector(".weatherForm"); //querySel. gets first class with that name
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "aa3cb3d6d71edd76a6589e6b9df2d38d";

weatherForm.addEventListener('submit', async event => {
event.preventDefault();

const city = cityInput.value;

if(city){
    try{
const weatherData = await getWeatherData(city);
displayWeatherInfo(weatherData);
    }
    catch(error){
        console.error(error);
        displayError(error);
    }
}
else{
    displayError("Please enter a city");
}



});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const  {name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.floor(temp - 273.15) * (9/5) + 32}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "⛈️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
        return "😶‍🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
const errorDisplay = document.createElement("p")
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");

card.textContent = "";
card.style.display = "flex";
card.appendChild(errorDisplay);
}