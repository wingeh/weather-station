// Weather Stations Javascript


const searchHistory = document.getElementById("searchHistory");
const searchBtn = document.getElementById("searchBtn")

const fiveDay = document.getElementById("fiveDay")

// Listen for search click
searchBtn.addEventListener("click", function() {
console.log ("button clicked")
    const city = document.getElementById("search-city").value;
  
    //if empty
    if (!city) {
      return;
    } else {
    callAPI(city);
    document.getElementById("fiveDay").style.visibility = "visible";
    document.getElementById("weatherToday").style.visibility = "visible";
    document.getElementById("searchHistory").style.visibility = "visible";
    };
   
    
});

// Open Weather API ---------------------------------------------------

 const apiKey = "d68b8d92b710c4a2fcb1275ab4feb85e";

 // Build API URL

 function callAPI(city) {
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    return weatherUrl;
  };
  

