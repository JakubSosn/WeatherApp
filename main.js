const dayAfterTomorrow = document.querySelector('.dayAfterTomorrow');
const btnSubmit = document.querySelector('.btnSubmit');
const city = document.querySelector('.showCity');
const header = document.querySelector('.header');
const h3Now = document.querySelector('.h3Now');
const h3Today = document.querySelector('.h3Today');
const h3Tomorrow = document.querySelector('.h3Tomorrow');
const h3DayAfterTomorrow = document.querySelector('.h3DayAfterTomorrow');
const inputField = document.getElementById('city');
const now = document.querySelector('.now');
const mainDiv = document.querySelector('.mainDiv');
const ulField = document.getElementById('result');
const update = document.querySelector('.showUpdate');
const today = document.querySelector('.today');
const tomorrow = document.querySelector('.tomorrow');
const res = document.getElementById('result');

const API = 'https://wowapi.pl/pogoda/prognoza?miasto=';
const searchCityApi = 'https://www.wowapi.pl/pogoda/miasta?szukaj='
const cityApi = 'https://www.wowapi.pl/pogoda/miasta';

let cities = [];
let forecastData;
let choosenCity = 'białystok';

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

const showMainWeather = (dane) => {
  const { temperatura, wiatrPrędkość, wiatrKierunek, wiatrKierunekSłownie, opis, ikonka, zachmurzenie, wschódSłońca, zachódSłońca } = dane;
  const div = document.createElement('div');
  div.className = 'mainWeather';
  div.innerHTML = `
    <div class='main1'>
      <div class='icotemp'>
      <div class='${ikonka}'></div>
      <div class='temp'>${temperatura} °C</div>
    </div>
    <div class='main2'>
      <div class='opis'>${opis}</div>
      <div>
        <div class='wind'>prędkość wiatru: ${wiatrPrędkość} km/h</div>
        <div class='windDir'>kierunek wiatru: ${wiatrKierunek}</div>
        <div class='windDirText'>kierunek wiatru Słownie: ${wiatrKierunekSłownie}</div>
      </div>
      <div class='cloaud'>zachmurzenie: ${zachmurzenie}%</div>
      <div class='sunrise'>wschód słońca: ${wschódSłońca}</div>
      <div class='sunset'>zachód słońca: ${zachódSłońca}</div>
    </div>
    `
  return div
}

const showMiniWeather = (dane) => {
  const { temperatura, ikonka, zachmurzenie} = dane;
  const div = document.createElement('div');
  div.innerHTML = `
    <div class='aside'>
      <div class='${ikonka}'></div>
      <div>Temperatura: ${temperatura} °C</div>
      <div>Zachmurzenie: ${zachmurzenie}%</div>
    </div>
  `

  return div
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
  city.innerHTML = `Miasto: ${forecastData.miasto}`;
  update.innerHTML = `Ostatnia aktualizacja: ${forecastData.aktualizacja}`;
  mainDiv.appendChild(showMainWeather(forecastData.teraz));
  now.appendChild(showMiniWeather(forecastData.teraz));
  today.appendChild(showMiniWeather(forecastData.prognoza.dziś));
  tomorrow.appendChild(showMiniWeather(forecastData.prognoza.jutro));
  dayAfterTomorrow.appendChild(showMiniWeather(forecastData.prognoza.pojutrze));
}, 700)
}

startShowingWeather()


const clearAllDivs = () => {
  city.innerHTML = '';
  update.innerHTML = '';
  header.innerHTML = '';
  mainDiv.innerHTML = '';
  now.innerHTML = '';
  today.innerHTML = '';
  tomorrow.innerHTML = '';
  dayAfterTomorrow.innerHTML = '';
}

inputField.addEventListener('input', changeAutoComplete);
ulField.addEventListener('click', selectItem)
btnSubmit.addEventListener('click', getChoosenCity)

h3Now.addEventListener('click', () => {
  header.innerHTML = 'Teraz';
  mainDiv.innerHTML = '';
  mainDiv.appendChild(showMainWeather(forecastData.teraz));
})

h3Today.addEventListener('click', () => {
  header.innerHTML = 'Dziś';
  mainDiv.innerHTML = '';
  mainDiv.appendChild(showMainWeather(forecastData.prognoza.dziś));
})

h3Tomorrow.addEventListener('click', () => {
  header.innerHTML = 'Jutro';
  mainDiv.innerHTML = '';
  mainDiv.appendChild(showMainWeather(forecastData.prognoza.jutro));
})

h3DayAfterTomorrow.addEventListener('click', () => {
  header.innerHTML = 'Pojutrze';
  mainDiv.innerHTML = '';
  mainDiv.appendChild(showMainWeather(forecastData.prognoza.pojutrze));
})




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