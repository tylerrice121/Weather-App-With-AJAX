// Constants and Variables

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = '5399e573d4f01678f22282986382317e';
let weatherData;
let tempF;
let feelsLikeF;

// grab elements
const $cityLc = $('#city:last-child')
const $city = $('#city');
const $temp = $('#temp');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');
const $input = $('input[type=text]');
const $form = $('form')

// on click submit, run getData function

$form.on('submit', getData)

// get Data prevents window from refreshing, then stores the input in a variable and passes that into the .ajax key.  
// we then establish weatherData as the data we just grabbed from the API
// we then run the render function

function getData(event) {
    
    event.preventDefault();

    const cityInput = $input.val()
    $input.val('')

    $.ajax(`${BASE_URL}?q=${cityInput}&appid=${API_KEY}`).then(function (data) {
        weatherData = data;

        console.log(weatherData)
        tempF = Math.ceil((weatherData.main.temp - 273.15) * 1.8 + 32)
        feelsLikeF = Math.ceil((weatherData.main.feels_like - 273.15) * 1.8 + 32)
        console.log(tempF)
        console.log(feelsLikeF)
        

        render();
    })
}

// render creates new html that is seen in the dom

const render = function () { 
    $city.text(`  ${weatherData.name}`)
    $temp.text(`  ${tempF}°`)
    $feelsLike.text(`  ${feelsLikeF}°`)
    $weather.text(`  ${weatherData.weather[0].description}`)
}
