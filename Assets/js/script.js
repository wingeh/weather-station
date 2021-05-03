// Weather Stations Javascript
const history = document.getElementById("history");
const searchHistory = document.getElementById("searchHistory");
const searchBtn = document.getElementById("searchBtn");
const clearHistory = document.getElementById("clearAll");
//const ul = document.getElementById("searchHistory")
const city = document.getElementById("item");
//const searchHistory = document.getElementById("searchHistory")

const fiveDay = document.getElementById("fiveDay");

// Search History -----------------------------------------------------

const form = document.querySelector('form');
const ul = document.getElementById('searchHistory');
const button = document.getElementById('clearAll');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  liMaker(input.value);
  input.value = "";
});

data.forEach(item => {
  liMaker(item);
});

// Clear localStorage
button.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
});

// Open Weather API ---------------------------------------------------

 const apiKey = "d68b8d92b710c4a2fcb1275ab4feb85e";

 // Build API URL

 function callAPI(city) {
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&appid=' + apiKey;
    currentWeather(weatherUrl);
    return;
  };

  // Call API
  function currentWeather(weatherUrl) {

    fetch(weatherUrl, {
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
  
        var currentDate = moment().format('L');
  
        // Return Weather Icon
        const weatherIcon = data.weather[0].icon;
        const iconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
  
  console.log (iconUrl);
        $('#cityName').text(data.name + " " + "(" + currentDate + ")");
        $('#weatherIconToday').attr('src', iconUrl);
  
  
        const temp = (data.main.temp - 273.15);
  
        $('#temperature').text(temp.toFixed(0));
  
  
        $('#humidity').text(data.main.humidity);
  
  
        $('#windSpeed').text(data.wind.speed.toFixed(1));
  
  
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        
      }
      )
    };

// Listen for search click --------------------------------------------

searchBtn.addEventListener("click", function() {
  console.log ("button clicked")  
    
      //Verify the user has put in a city name before proceeding
      if (!city) {
        console.log("No City Input")
        return;
      } else {
      console.log("City : " + city.value)
      callAPI(city);
      document.getElementById("fiveDay").style.visibility = "visible";
      document.getElementById("weatherToday").style.visibility = "visible";
      document.getElementById("history").style.visibility = "visible";
      };
      
      return;
  });

