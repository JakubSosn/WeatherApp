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
      forecastData = data;
    })
    .catch(error => {
      console.error('Error fetching data', error)
    })
}

const getWeather = (dane) => {
  const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, zachmurzenie, wschódSłońca, zachódSłońca } = dane;
  const div = document.createElement('div');
  div.innerHTML = `
    <p>Temperatura: ${temperatura} °C</p>
    <p>Prędkość wiatru: ${wiatrPrędkość} km/h</p>
    <p>Kierunek wiatru: ${wiatrKierunek}</p>
    <p>Kierunek wiatru Słownie: ${wiatrKierunekSłownie}</p>
    <p>Prognoza: ${opis}</p>
    <p>Zachmurzenie: ${zachmurzenie}%</p>
    <p>Wschód słońca: ${wschódSłońca}</p>
    <p>Zachód słońca: ${zachódSłońca}</p>
  `

  return div
}

getData();

setTimeout(() => {
  city.innerHTML = `Miasto: ${forecastData.miasto}, `;
  update.innerHTML = ` Ostatnia aktualizacja: ${forecastData.aktualizacja}`;

  weatherNow.appendChild(getWeather(forecastData.teraz))

}, 700)

setTimeout(() => { today.appendChild(getWeather(forecastData.prognoza.dziś));
}, 2000)

setTimeout(() => { tomorrow.appendChild(getWeather(forecastData.prognoza.jutro));
}, 3000)

setTimeout(() => { dayAfterTomorrow.appendChild(getWeather(forecastData.prognoza.pojutrze));
}, 4000)





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