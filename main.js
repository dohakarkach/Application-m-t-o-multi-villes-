
const WEATHER_CODES = {
  0:  { label: "Ciel dégagé",            icon: "☀️" },
  1:  { label: "Plutôt dégagé",          icon: "🌤️" },
  2:  { label: "Partiellement nuageux",  icon: "⛅" },
  3:  { label: "Couvert",                icon: "☁️" },
  45: { label: "Brouillard",             icon: "🌫️" },
  48: { label: "Brouillard givrant",     icon: "🌫️" },
  51: { label: "Bruine légère",          icon: "🌦️" },
  53: { label: "Bruine",                 icon: "🌦️" },
  55: { label: "Bruine forte",           icon: "🌦️" },
  56: { label: "Bruine verglaçante",     icon: "🌧️" },
  57: { label: "Bruine verglaçante",     icon: "🌧️" },
  61: { label: "Pluie légère",           icon: "🌧️" },
  63: { label: "Pluie",                  icon: "🌧️" },
  65: { label: "Pluie forte",            icon: "🌧️" },
  66: { label: "Pluie verglaçante",      icon: "🌧️" },
  67: { label: "Pluie verglaçante",      icon: "🌧️" },
  71: { label: "Neige légère",           icon: "🌨️" },
  73: { label: "Neige",                  icon: "🌨️" },
  75: { label: "Neige forte",            icon: "❄️" },
  77: { label: "Grains de neige",        icon: "🌨️" },
  80: { label: "Averses légères",        icon: "🌦️" },
  81: { label: "Averses",                icon: "🌧️" },
  82: { label: "Averses violentes",      icon: "⛈️" },
  85: { label: "Averses de neige",       icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage",                  icon: "⛈️" },
  96: { label: "Orage avec grêle",       icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};



let formRecherche = document.getElementById("form-recherche");
let message = document.getElementById("message");
let resultats = document.getElementById("resultats");
let ville = document.getElementById("ville");
let chargement = document.getElementById("chargement");
formRecherche.addEventListener("submit",(event)=>{
event.preventDefault();
if(ville.value.trim() === ""){
    message.textContent ="Veuillez entrer une ville.";
return;
}
let nomVille = ville.value.trim();
let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomVille)}&count=1&language=fr&format=json`;
chargement.hidden = false; //visible
fetch (url,{
    method:"GET"
})
.then (response=>{
    // console.log(Response);
    return response.json();
})
.then(data =>{

    let latitude = data.results[0].latitude;
    let longitude = data.results[0].longitude

    console.log(data.results[0].longitude);
      console.log(data.results[0].latitude);
    let url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
     return fetch(url2,{
        method : "GET"
    })
    .then(  (response) => {
        return response.json();
        
         
    })
    .then(meteoData=>{
        let daily = meteoData.daily;
      daily.time.forEach ((date,index)=>{ 
        let maxTemp = daily.temperature_2m_max[index];
        let minTemp = daily.temperature_2m_min[index];
        let forecastCode = daily.weather_code[index];
        let forecastDesc = WEATHER_CODES[forecastCode];
    let carte = document.createElement("div");
    let titre = document.createElement("h1")
    titre.textContent = date;
    carte.appendChild(titre);
  let icon = document.createElement("p");
        icon.textContent = forecastDesc.icon;
        carte.appendChild(icon);

        let description = document.createElement("p");
        description.textContent = forecastDesc.label;
        carte.appendChild(description);

        let max = document.createElement("p");
        max.textContent = "Température maximale : " + maxTemp + "°C";
        carte.appendChild(max);

        let min = document.createElement("p");
        min.textContent = "Température minimale : " + minTemp + "°C";
        carte.appendChild(min);

        resultats.appendChild(carte);

    });
        
      })
        let maxTemp = daily.temperature_2m_max[index];
        let minTemp = daily.temperature_2m_min[index];
        let forecastCode = daily.weather_code[index];
        let forecastDesc = WEATHER_CODES[forecastCode];
       let  weather = meteoData. current.weather_code;
       let desc =  WEATHER_CODES[weather];
        let temperature = meteoData.current.temperature_2m;
        let humidity  = meteoData.current.relative_humidity_2m;
        let speed = meteoData .current.wind_speed_10m;
        console.log(temperature);
       let carte = document.createElement("div");
       let titre = document.createElement("h1");
       titre.textContent = nomVille ;
       carte.appendChild(titre);
    let temp = document.createElement("p");
temp.textContent = "temperature :" + temperature + "°C" ;
carte.appendChild(temp);
let humd = document.createElement("p");
humd.textContent = "Humidité :" + humidity + "%";
carte.appendChild(humd);
let wind = document.createElement("p");
wind.textContent = "Vitesse du vent :" + speed + "km/h";
carte.appendChild(wind)
let description = document.createElement("p");
description.textContent = desc.label;
let icon = document.createElement("p");
icon.textContent = desc.icon;
carte.appendChild(icon);
carte.appendChild(description);
let max = document.createElement("p");
max.textContent = "Température maximale : " + maxTemp + "°C";
carte.appendChild(max);

let min = document.createElement("p");
min.textContent = "Température minimale : " + minTemp + "°C";
carte.appendChild(min);
let prevision = document.createElement("p");
prevision.textContent = "Prévision : " + forecastDesc.label;
carte.appendChild(prevision);
    resultats.replaceChildren(carte);

    })
})
.catch(error => {
    message.textContent = "Impossible de récupérer les données météo.";
    console.log( error);
})

.finally(() => {
    chargement.hidden = true; //invisible
});

