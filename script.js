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
                    let dateEl = document.getElementById("date-1")
                    dateEl.textContent = data.list[7].dt_txt;
                    cardTextTemp.textContent = "Temperature: " + data.list[7].main.temp;
                    cardTextHumidity.textContent = "Humidity: " + data.list[7].main.humidity + "%";
                })
        fetch(urlFiveDay)
        .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                console.log(data)
                    let dateElTwo = document.getElementById("date-2")
                    dateElTwo.textContent = data.list[12].dt_txt;
                    let cardTextHumidity2 = document.querySelector(".cardTextHumidity2");
                    let cardTextTemp2 = document.querySelector(".cardTextTemp2");
                    cardTextTemp2.textContent = "Temperature: " + data.list[12].main.temp;
                    cardTextHumidity2.textContent = "Humidity: " + data.list[12].main.humidity + "%";
            })
            fetch(urlFiveDay)
            .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                    console.log(data)
                        let dateElThree = document.getElementById("date-3")
                        dateElThree.textContent = data.list[20].dt_txt;
                        let cardTextHumidity3 = document.querySelector(".cardTextHumidity3");
                        let cardTextTemp3 = document.querySelector(".cardTextTemp3");
                        cardTextTemp3.textContent = "Temperature: " + data.list[20].main.temp;
                        cardTextHumidity3.textContent = "Humidity: " + data.list[20].main.humidity + "%";
                })
                fetch(urlFiveDay)
                .then(function (response) {
                    return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                            let dateElFour = document.getElementById("date-4")
                            dateElFour.textContent = data.list[28].dt_txt;
                            let cardTextHumidity4 = document.querySelector(".cardTextHumidity4");
                            let cardTextTemp4 = document.querySelector(".cardTextTemp4");
                            cardTextTemp4.textContent = "Temperature: " + data.list[28].main.temp;
                            cardTextHumidity4.textContent = "Humidity: " + data.list[28].main.humidity + "%";
                    })
                    fetch(urlFiveDay)
                    .then(function (response) {
                        return response.json();
                        })
                        .then(function (data) {
                            console.log(data)
                                let dateElFive = document.getElementById("date-5")
                                dateElFive.textContent = data.list[36].dt_txt;
                                let cardTextHumidity5 = document.querySelector(".cardTextHumidity5");
                                let cardTextTemp5 = document.querySelector(".cardTextTemp5");
                                cardTextTemp5.textContent = "Temperature: " + data.list[36].main.temp;
                                cardTextHumidity5.textContent = "Humidity: " + data.list[36].main.humidity + "%";
                        })
}})


