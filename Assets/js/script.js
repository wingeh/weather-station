// Weather Stations Javascript


const searchHistory = document.getElementById("searchHistory");

// Listen for search click
document.getElementById("searchBtn").addEventListener("click", function() {

    const city = document.getElementById("search-city").value;
  
    //if empty
    if (!city) {
      return;
    } else {
    callAPI(city);
    };

    
});

// Open Weather API ---------------------------------------------------

 const apiKey = "d68b8d92b710c4a2fcb1275ab4feb85e";

 // Build API URL

 function callAPI(city) {
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    return weatherUrl;
  };
  

