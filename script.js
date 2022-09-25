//u htmlu na button ikona sa react icons,ctrl+shift+p

document.addEventListener('DOMContentLoaded', () => {

let status = 0;

//objekt
let weather = {
    apiKey: "API_KEY_HERE",
    
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            +"&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())//pribacujem u json format
        //.then((data) => console.log(data));
        .then((data) => this.displayWeather(data));
    },

    unknownWeather: function(){
        //ako je nepostojeci grad ne moze se uc u details
        document.querySelector(".details").style.visibility = "hidden";
        document.querySelector(".card").style.height = "200px";

        document.querySelector(".city").innerHTML = "City not found.";
        document.querySelector(".icon").src = "https://img.icons8.com/stickers/344/error-cloud.png"; 
        document.querySelector(".description").innerHTML = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        
        document.body.style.backgroundImage = "url(https://source.unsplash.com/random/1600×900/?landcsape)";

        document.querySelector(".weather").classList.remove("loading");//kad se ucita mice se invisibility, html ima 2 klase: weather i loading
    },

    displayWeather: function(data){
        const {cod} = data;
        console.log(cod)
        if(cod === "404")
        {
            //ako je nepostojeci grad ne moze se uc u details
            this.unknownWeather();
        }
        else
        {
        document.querySelector(".details").style.visibility = "visible";
        document.querySelector(".card").style.height = "300px";

        const {name} = data;//vadi iz objekta data element sa nazivom name, drugi nacinˇˇ
        //const name = data.name 
        const {icon, description} = data.weather[0];//jer je data.weather niz od 1 elementa, drugi nacinˇˇ
        //const icon = data.weather[0].icon;
        //const description = data.weather[0].description;
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        //console.log(name,icon,description,temp,humidity,speed);

        const {feels_like, temp_min, temp_max, pressure} = data.main;

        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon +".png"; //link sa open weather icons
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + " km/h";

        document.querySelector(".feels_like").innerHTML = "Feels like: "+ feels_like +"°C";
        document.querySelector(".temp_min").innerHTML = "Temp min: " + temp_min + "°C";
        document.querySelector(".temp_max").innerHTML = "Temp max: " +  temp_max + "°C";
        document.querySelector(".pressure").innerHTML = "Pressure: " + pressure + "hPa";

        //backgroundImage da bude trazeni grad
        const without_spaces = name.replaceAll(' ','');//da moze trazit sliku
        //console.log(without_spaces);
        document.body.style.backgroundImage = "url(https://source.unsplash.com/random/1600×900/?" + without_spaces + ")";

        document.querySelector(".weather").classList.remove("loading");//kad se ucita mice se invisibility
        }
    },

    search : function(){
        //ako su otvoreni details pa se searcha da ce automatski zatvore
        document.querySelector(".details_block").style.visibility = "hidden";
        document.querySelector(".card").style.height = "300px";
        status = 0;

        //ako nije nista napisano u search-bar
        if(document.querySelector(".search-bar").value == ""){
            this.unknownWeather();
        }

        else{
        this.fetchWeather(document.querySelector(".search-bar").value);
        }

    },

    open_details : function(){//status=0 oznacava da su details zatvoreni, a status=1 da su otvoreni
        if(status == 0){//na isti button se otvara i zatvara
            document.querySelector(".details_block").style.visibility = "visible";
            document.querySelector(".card").style.height = "450px";
            status = 1;
        }
        else{
            document.querySelector(".details_block").style.visibility = "hidden";
            document.querySelector(".card").style.height = "300px";
            status = 0;
        }
    }
};


document.querySelector(".search_button").addEventListener("click", function(){
    weather.search();
});

//da mogu search na enter
document.addEventListener("keyup", function(e){
    if (e.key == "Enter") {
        weather.search();
    }
})

document.querySelector(".details").addEventListener("click", function(){
    weather.open_details();
})

weather.fetchWeather("Split");//neka je automatski namisteno na Split

})
//DOMContentLoaded se pali kad se ucita stranica