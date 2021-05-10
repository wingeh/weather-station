// Weather Stations Javascript
const history = document.getElementById("history");
const searchHistory = document.getElementById("searchHistory");
const searchBtn = document.getElementById("searchBtn");
const clearHistory = document.getElementById("clearAll");
//const ul = document.getElementById("searchHistory")
let city = document.getElementById("item");
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
  $(li).attr("class", "historyItem")
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

// Clear localStorage ------------------------------------------------
button.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
});

// Make History Clickable ---------------------------------------------

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement; 
}


ul.onclick = function(event) {
    var target = getEventTarget(event);
    const cityClick = target.innerHTML;

  clickAPI(cityClick);
};

// Open Weather API ---------------------------------------------------

 const apiKey = "d68b8d92b710c4a2fcb1275ab4feb85e";

 // Build API URL

 function clickAPI (cityClick){
   let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityClick + '&appid=' + apiKey;
   currentWeather(weatherUrl);
    return;
 }

 function callAPI(city) {
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&appid=' + apiKey;
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
        const iconTodayUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
  
  console.log (iconTodayUrl);
        $('#cityName').text(data.name + " " + "(" + currentDate + ")");
        $('#weatherIconToday').attr('src', iconTodayUrl);
  
  
        const tempToday = (data.main.temp - 273.15);
  
        $('#temperature').text(tempToday.toFixed(0));
  
  
        $('#humidity').text(data.main.humidity);
  
  
        $('#windSpeed').text(data.wind.speed.toFixed(1));
  
  
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        
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
      fiveDayForecast(city);

      $("#history").attr("style", "visibility:visible");
      $("#forecast-window").attr("style", "visibility:visible");
      
      };
      
      return;
  });

  // 5 Day Forcast ---------------------------------------------------

function fiveDayForecast(city) {
  const fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&units=metric&appid=' + apiKey;

  fetch(fiveDayUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < 5; i++) {
        const date = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
        const futureIcon = data.list[((i + 1) * 8) - 1].weather[0].icon;
        const futureIconUrl = 'https://openweathermap.org/img/wn/' + futureIcon + '.png';
        const futureTemp = data.list[((i + 1) * 8) - 1].main.temp.toFixed(0);
        const futureHumidity = data.list[((i + 1) * 8) - 1].main.humidity;

        $("#date" + i).text(date);
        $("#icon" + i).attr("src", futureIconUrl);
        $("#temp" + i).text(futureTemp);
        $("#humidity" + i).text(futureHumidity);

      }
    })
}
