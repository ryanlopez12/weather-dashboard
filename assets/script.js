function search() {
    var searchcity = document.getElementById("searchcity").innerText;
    console.log(searchcity);
    let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchcity + "&appid=9f61e2c64b7d7564d396645992b24749"
    getWeatherText(url);
    console.log(getWeatherText);
}



//function getForecast(lat, long) {
//    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly&appid=9f61e2c64b7d7564d396645992b24749"
//    getWeatherText(url);
//}


