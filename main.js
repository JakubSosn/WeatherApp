const dayAfterTomorrow = document.querySelector('.dayAfterTomorrow');
const city = document.querySelector('.city');
const update = document.querySelector('.update');
const today = document.querySelector('.today');
const tomorrow = document.querySelector('.tomorrow');
const weatherNow = document.querySelector('.weatherNow');

const API = 'https://wowapi.pl/pogoda/prognoza?miasto=bia%C5%82ystok';

let forecastData;

const getData = () => {
  fetch(API)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw response
    })
    .then(data => {
      console.log(data);
      forecastData = data;
    })
    .catch(error => {
      console.error('Error fetching data', error)
    })
}


getData();

setTimeout(function() {
  city.innerHTML = `Miasto: ${forecastData.miasto}, `;
  update.innerHTML = ` Ostatnia aktualizacja: ${forecastData.aktualizacja}`;
  
  const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.teraz;

  getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, weatherNow);
}, 700)

setTimeout(function() {
  const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.prognoza.dziś;

  getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, today);
}, 2000)

setTimeout(function() {
  const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.prognoza.jutro;

  getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, tomorrow);
}, 3000)

setTimeout(function() {
  const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.prognoza.pojutrze;

  getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, dayAfterTomorrow);
}, 4000)



const getWeather = (
  temp, windSpeed, windDirection, windDirectionText, description, cloudy, sunrise, sunset, parent
  ) => {
  const div = document.createElement('div');
  div.innerHTML = `
    <p>Temperatura: ${temp} °C</p>
    <p>Prędkość wiatru: ${windSpeed} km/h</p>
    <p>Kierunek wiatru: ${windDirection}</p>
    <p>Kierunek wiatru Słownie: ${windDirectionText}</p>
    <p>Prognoza: ${description}</p>
    <p>Zachmurzenie: ${cloudy}%</p>
    <p>Wschód słońca: ${sunrise}</p>
    <p>Zachód słońca: ${sunset}</p>
  `
  if(parent) {
    parent.appendChild(div)
  }

  return div
}

// weatherNow.innerHTML = Object.entries(forecastData.teraz).map(([key, value]) => {
//   return ` ${key} : ${value} `
// }); 

// async function getData() {
//   try {
//     const response = await fetch(API)
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`)
//     }
//     const json = await response.json();
//     return json;
//   }

//   catch(error) {
//     console.error(`Error fetching data ${error}`);
//   }
// }

// const data = getData();
// data.then(json => (forecastData = json));

// setTimeout(function() {
//   city.innerHTML = `Miasto: ${forecastData.miasto}, `;
//   update.innerHTML = ` Ostatnia aktualizacja: ${forecastData.aktualizacja}`;
  
//   const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.teraz;

//   getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, weatherNow);

//   setTimeout(function() {
//     const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.prognoza.dziś;

//     getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, today);
//   }, 1000)

//   setTimeout(function() {
//     const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.prognoza.jutro;

//     getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, tomorrow);
//   }, 2000)

//   setTimeout(function() {
//     const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = forecastData.prognoza.pojutrze;

//     getWeather(temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca, dayAfterTomorrow);
//   }, 3000)

// }, 700)