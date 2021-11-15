var search = function() {
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=&lon=&exclude=current,minutely,hourly&appid=9f61e2c64b7d7564d396645992b24749"
    getWeatherText(url);
}


var gotPosition = function(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    getForecast(lat,long);
}

var getForecast = function(lat, long) {
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly&appid=9f61e2c64b7d7564d396645992b24749"
    getWeatherText(url);
}

async function getWeatherText(url) {
    var weatherObject = await fetch(url);
    var weatherText = await weatherObject.text();
    parseWeather(weatherText);
}

var parseWeather = function(weatherText) {
    var weatherJSON = JSON.parse(weatherText);
    var dailyForecast = weatherJSON.daily;
    for (x = 0; x < dailyForecast.length; x++) {
        var day = dailyForecast[x];
        var today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }
        var dayOfWeek = getDayOfWeek(today);
        var description = day.weather[0].description;
        var icon = day.weather[0].icon;
        var sunrise = timestampToTime(day.sunrise);
        var sunset = timestampToTime(day.sunset);
        var highTemp = kToF(day.temp.max);
        var lowTemp = kToF(day.temp.min);
        var windSpeed = day.wind_speed;
        var humidity = day.humidity;
        displayWeatherDay(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, windSpeed, humidity)
    }
}

var displayWeatherDay = function(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity) {
    var out = "<div class='dayBox'><img src='http://openweathermap.org/img/wn/" + icon + ".png'/>";
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>Sunrise:" + sunrise + "</p>";
    out += "<p>Sunset:" + sunset + "</p>";
    out += "<p>Humidity: " + humidity + "</p>";
    out += "<p>Windspeed: " + Math.round(wind_speed) + "</p></div>";
    document.getElementById("forecast").innerHTML += out;
}

var getDayOfWeek = function(dayNum) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return (weekday[dayNum]);
}

var kToF = function(kelvinTemp) {
    const celsius = kelvinTemp - 273;
    const fahrenheit = Match.floor(celsius * (9 / 5) + 32);
    return fahrenheit
}

var timestampToTime = function(timeStamp) {
    var date = new Date(timeStamp * 1000);
    var hours = date.getHours();
    var minutes = "";
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }
    return hours + ":" + minutes;
    }
    
navigator.geolocation.getCurrentPosition(gotPosition);