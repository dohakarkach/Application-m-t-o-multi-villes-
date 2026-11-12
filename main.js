
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

formRecherche.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (ville.value.trim() === "") {
        message.textContent = "Veuillez entrer une ville.";
        return;
    }

    let nomVille = ville.value.trim();

    message.textContent = "";
    resultats.replaceChildren();
    chargement.hidden = false;

    try {
        
        let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomVille)}&count=1&language=fr&format=json`;

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erreur de recherche de ville");
        }

        let data = await response.json();

        if (!data.results || data.results.length === 0) {
            message.textContent = "Ville introuvable.";
            return;
        }

       
        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;


        let url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;

        let response2 = await fetch(url2);

        if (!response2.ok) {
            throw new Error("Erreur de récupération météo");
        }

        let meteoData = await response2.json();

       
        let current = meteoData.current;

        let temperature = current.temperature_2m;
        let humidity = current.relative_humidity_2m;
        let speed = current.wind_speed_10m;

        let weather = current.weather_code;
        let desc = WEATHER_CODES[weather] ;
        if( desc === undefined){
              desc = {
        label: "Conditions inconnues",
        icon: "❔"
    }
        }
        
      

        let carte = document.createElement("div");

        let titre = document.createElement("h2");
        titre.textContent = nomVille;
        carte.appendChild(titre);

        let icon = document.createElement("p");
        icon.textContent = desc.icon;
        carte.appendChild(icon);

        let description = document.createElement("p");
        description.textContent = desc.label;
        carte.appendChild(description);

        let temp = document.createElement("p");
temp.textContent = "Température : " +
    (temperature != null ? temperature + "°C" : "Donnée indisponible");
        carte.appendChild(temp);

        let humd = document.createElement("p");
humd.textContent = "Humidité : " +
    (humidity != null ? humidity + "%" : "Donnée indisponible");


        carte.appendChild(humd);

        let wind = document.createElement("p");
wind.textContent = "Vitesse du vent : " +
    (speed != null ? speed + " km/h" : "Donnée indisponible");
        carte.appendChild(wind);

        resultats.appendChild(carte);


        let daily = meteoData.daily;

        daily.time.forEach((date, index) => {
            // console.log("date :",date);
            // console.log("index :",index);
            
            
            let maxTemp = daily.temperature_2m_max[index];
            let minTemp = daily.temperature_2m_min[index];

            let forecastCode = daily.weather_code[index];
            let forecastDesc = WEATHER_CODES[forecastCode] || {
                label: "Conditions inconnues",
                icon: "❔"
            };

            let carteJour = document.createElement("div");

            let titreJour = document.createElement("h2");
           let dateFormatee = new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
});

titreJour.textContent = dateFormatee;
            carteJour.appendChild(titreJour);

            let iconJour = document.createElement("p");
            iconJour.textContent = forecastDesc.icon;
            carteJour.appendChild(iconJour);

            let descriptionJour = document.createElement("p");
            descriptionJour.textContent = forecastDesc.label;
            carteJour.appendChild(descriptionJour);

            let max = document.createElement("p");
            let min = document.createElement("p");
max.textContent = "Température maximale : " +
    (maxTemp != null ? maxTemp + "°C" : "Donnée indisponible");
            carteJour.appendChild(max);

min.textContent = "Température minimale : " +
    (minTemp != null ? minTemp + "°C" : "Donnée indisponible");
            carteJour.appendChild(min);

            resultats.appendChild(carteJour);
        });

    } catch (error) {
        message.textContent = "Impossible de récupérer les données météo.";
        console.log(error);

    } finally {
        chargement.hidden = true;
    }
});
