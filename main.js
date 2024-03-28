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

// Assign the first element with the class name "weatherForm" to the variable weatherForm.
const weatherForm = document.querySelector(".weatherForm"); 
// Assign the first element with the class name "cityInput" to the variable cityInput.
const cityInput = document.querySelector(".cityInput");
// Assign the first element with the class name "card" to the variable card.
const card = document.querySelector(".card");
// Define the apiKey variable with your OpenWeatherMap API key.
const apiKey = "aa3cb3d6d71edd76a6589e6b9df2d38d";

// Add an event listener to the weatherForm for the submit event.
weatherForm.addEventListener('submit', async event => {
    // Prevent the form from submitting the traditional way.
    event.preventDefault(); 

    // Get the value entered in the cityInput field and assign it to the variable city.
    const city = cityInput.value;

    // Check if the city variable is not empty.
    if(city){
        try{
            // Try to fetch the weather data for the specified city.
            const weatherData = await getWeatherData(city);
            // If successful, display the weather information.
            displayWeatherInfo(weatherData);
        }
        catch(error){
            // If an error occurs, log the error to the console and display it to the user.
            console.error(error);
            displayError(error);
        }
    }
    else{
        // If no city was entered, display an error message to the user.
        displayError("Please enter a city");
    }
});

// Define an asynchronous function to fetch weather data for a specified city.
async function getWeatherData(city){
    // Construct the API URL with the city and API key.
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Fetch the weather data from the API.
    const response = await fetch(apiUrl);

    // Check if the response was successful (status code 200-299).
    if(!response.ok){
        // If not successful, throw an error.
        throw new Error("Could not fetch weather data");
    }

    // If successful, parse the JSON response and return it.
    return await response.json();
}

// Define a function to display weather information.
function displayWeatherInfo(data){
    // Destructure the necessary data from the response object.
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    // Clear the card's content and display it.
    card.textContent = "";
    card.style.display = "flex";

    // Create elements for displaying the city, temperature, humidity, description, and weather emoji.
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Set the content of the created elements.
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.floor(temp - 273.15) * (9/5) + 32}°F`; // Convert from Kelvin to Fahrenheit.
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add classes to the created elements for styling.
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append the created elements to the card element.
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Define a function to select a weather emoji based on the weather condition id.
function getWeatherEmoji(weatherId){
    
    // Use a switch statement to select the appropriate emoji.
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "⛈️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️"; // Atmosphere
        case (weatherId === 800):
            return '☀️';
        case (weatherId > 800 && weatherId < 805):
            return "☁️";
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