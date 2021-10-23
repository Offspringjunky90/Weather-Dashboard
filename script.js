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

    let city = localStorage.getItem(i);
    let cityName = $(".previousSearch").addClass("list-group-item");
    // let cityName = $(".previousSearch").addClass("a");
    cityName.append("<li>" + city + "</li>");
}

buttonEl.addEventListener("click", function() {

    let searchInput = $("#input").val();
    const urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + APIKey + "&units=imperial";
    const urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + APIKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            let cityName = $(".previousSearch").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            let local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount++;
            let timeUTC = new Date(response.dt * 1000);
            let h3el = document.querySelector("h3");
            h3el.innerText = response.name + " " + timeUTC.toLocaleDateString("en-US");
            tempEl.innerText = "Temperature: " + response.main.temp;
            humidityEl.innerText = "Humidity: " + response.main.humidity;
            windEl.innerText = "Wind Speed: " + response.wind.speed;
            const urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=07904651b5df30da10dc311ab4c2d3ff&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                UVindex.innerText = "UV Index: " + response.value;
            });

        });
        fetch(urlFiveDay)
        .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    let dateEl = document.querySelector("#date-" + i);
                    dateEl.textContent = response.list[7].dt_txt;
                    cardTextTemp.textContent = "Temperature: " + response.list[7].main.temp;
                    cardTextHumidity.textContent = "Humidity: " + response.list[7].main.humidity + "%";
            }})
        }
});