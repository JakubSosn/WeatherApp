const dayAfterTomorrow = document.querySelector('.dayAfterTomorrow');
const btnSubmit = document.querySelector('.btnSubmit');
const city = document.querySelector('.city');
const inputField = document.getElementById('city');
const ulField = document.getElementById('result');
const update = document.querySelector('.update');
const today = document.querySelector('.today');
const tomorrow = document.querySelector('.tomorrow');
const res = document.getElementById('result');
const weatherNow = document.querySelector('.weatherNow');

const API = 'https://wowapi.pl/pogoda/prognoza?miasto=';
const searchCityApi = 'https://www.wowapi.pl/pogoda/miasta?szukaj='
const cityApi = 'https://www.wowapi.pl/pogoda/miasta';

let cities = [];
let forecastData;
let choosenCity;

const getCities = () => {
  fetch(cityApi)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw response
    })
    .then(data => {
      data.forEach(item => {
        cities.push(item.nazwa);
      })
    })
    .catch(error => {
      console.error('Something went wrong.', error)
    })
}
getCities()

const getChoosenCity = (e) => {
  e.preventDefault();
  clearAllDivs();
  choosenCity = inputField.value.toLowerCase();
  inputField.value = '';
  startShowingWeather();
}

const changeAutoComplete = ({ target }) => {

  let data = target.value;
  ulField.innerHTML = '';
  if (data.length) {
    let autoCompleteValues = autoComplete(data);
    autoCompleteValues.forEach(value => { addItem(value); })
  }
}

const autoComplete = (inputValue) => {
  return cities.filter(
    value => value.toLowerCase().includes(inputValue.toLowerCase())
  );
}

const addItem = (value) => {
  ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`;
}

const selectItem = ({ target }) => {
  if (target.tagName === "LI") {
    inputField.value = target.textContent;
    ulField.innerHTML = '';
  }
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

const startShowingWeather = () => {

  const getData = () => {
    fetch(API + choosenCity)
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
  getData();

setTimeout(() => {
  city.innerHTML = `Miasto: ${forecastData.miasto}, `;
  update.innerHTML = ` Ostatnia aktualizacja: ${forecastData.aktualizacja}`;
  weatherNow.appendChild(getWeather(forecastData.teraz))
}, 700)

setTimeout(() => { today.appendChild(getWeather(forecastData.prognoza.dziś));
}, 1000)

setTimeout(() => { tomorrow.appendChild(getWeather(forecastData.prognoza.jutro));
}, 1300)

setTimeout(() => { dayAfterTomorrow.appendChild(getWeather(forecastData.prognoza.pojutrze));
}, 1600)
}

const clearAllDivs = () => {
  city.innerHTML = '';
  update.innerHTML = '';
  weatherNow.innerHTML = '';
  today.innerHTML = '';
  tomorrow.innerHTML = '';
  dayAfterTomorrow.innerHTML = '';
}

inputField.addEventListener('input', changeAutoComplete);
ulField.addEventListener('click', selectItem)
btnSubmit.addEventListener('click', getChoosenCity)



// const showResultsOfCitys = ({ target }) => {

//   const res = document.getElementById('result');
//   res.innerHTML = '';
//   if ( target.value === '') {
//     return;
//   }
//   let listOfCitys = '';
//   fetch(`${searchCityApi}${target.value}`)
//     .then(response => {
//       if(response.ok) {
//         return response.json()
//       }
//       throw response
//     })
//     .then(data => {
//       data.forEach(item => {
//         listOfCitys += `<li>${item.nazwa}</li>`;
//       })
//       res.innerHTML = `<ul class='cityList'>${listOfCitys}</ul>`;
//       return true;
//     })
//     .catch(error => {
//       console.error('Something went wrong.', error);
//       return false;
//     })

    
// }

// inputField.addEventListener('input', showResultsOfCitys)



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