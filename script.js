const buttonEl = document.getElementById("button");
const APIKey = "07904651b5df30da10dc311ab4c2d3ff";
let keyCount = 0;
let searchCity = document.getElementById("searchCity");
let weatherPic = document.getElementById("currentWeatherPic");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const UVindex = document.getElementById("uvindex");
let forcastEl = document.querySelectorAll("forcast");
let inputField = document.getElementById("#input");
let fiveDayDate = document.getElementById("h5");
const cardBody = document.getElementById(".card-body");
let cardTextTemp = document.querySelector(".cardTextTemp");
let cardTextWind = document.querySelector(".cardTextWind");
let cardTextHumidity = document.querySelector(".cardTextHumidity");


for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".previousSearch").addClass("list-group-item");
    var cityName = $(".previousSearch").addClass("a");
    cityName.append("<li>" + city + "</li>");
}

buttonEl.addEventListener("click", function() {

    var searchInput = $("#input").val();
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + APIKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + APIKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".previousSearch").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount++;
            var timeUTC = new Date(response.dt * 1000);
            let h3el = document.querySelector("h3");
            h3el.innerText = response.name + " " + timeUTC.toLocaleDateString("en-US");
            tempEl.innerText = "Temperature: " + response.main.temp;
            humidityEl.innerText = "Humidity: " + response.main.humidity;
            windEl.innerText = "Wind Speed: " + response.wind.speed;
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=07904651b5df30da10dc311ab4c2d3ff&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                UVindex.innerText = "UV Index: " + response.value;
            });

        });
        var fiveDayForecast = function(forecast) { 
            for (var i = 1; i < 6; i++) {
                let dateEl = document.querySelector("#date-" + i);
                dateEl.textContent = moment().add(i, 'days').format('M/D/YYYY');
                cardTextTemp.innerHTML = "Temperature: " + i, forecast.daily[i].temp.day;
                cardTextHumidity.innerHTML = "Humidity: " + i, forcast.daily[i].humidity + "%";
            }
        }
    }
})