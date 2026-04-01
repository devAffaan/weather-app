var apiKey = "663bebc13eb55e2467fc42ae43286361";
// GRABBING HTML ELEMENTS//
var searchBtn = document.getElementById("searchBtn");
var cityInput = document.getElementById("cityInput");
var result = document.getElementById("result");
var errorMsg = document.getElementById("errorMsg");
// WHEN THE SEARCH BUTTON IS CLICKED RUN GET WEATHER FUNCTION// 
searchBtn.onclick = function(){
    getWeather();
};
// IF ENTER IS PRESSED THAN GET WEATHER//
cityInput.onkeydown = function(event){
    if(event.key === "Enter"){
        getWeather();
    }
};
// CHECK WHAT USER TYPED//
function getWeather(){
    var city = cityInput.value;
    if(city === "") return;

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        if(data.cod === "404"){
            result.innerHTML = "";
            errorMsg.textContent = "City not found";
            return; 
        }
        errorMsg.textContent = "";

        result.innerHTML = 
        "<p>🌍" + data.name + ", " + data.sys.country +"</p>" +
        "<p>🌡️" + Math.round(data.main.temp) +"°C</p>" +
        "<p>☁️" + data.weather[0].description + "</p>" +
        "<p>💧 Humidity:" + data.main.humidity + "%</p>" +
        "<p>💨 Wind:" + Math.round(data.wind.speed) +"km/h</p>";
    });

}