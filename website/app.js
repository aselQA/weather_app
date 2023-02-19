/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&APPID=f3f899a832ee34cc33282b3ca793840f&units=imperial';

// Event listener to add function to existing HTML DOM element
const performAction = (e) => {
  let zipcode = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;

  getWeather(`${baseUrl}${zipcode}${apiKey}`).then(function (data) {
    console.log(data);
    postData('http://localhost:8008/add', {
      temp: data.main.temp,
      content: feelings,
      date: newDate,
    }).then(updateUI);
  });
};

/* Function called by event listener */
const start = document
  .getElementById('generate')
  .addEventListener('click', performAction);

/* Function to GET Web API Data*/
const getWeather = async (url) => {
  let response = await fetch(url);
  try {
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
let postData = async (url = '', data = {}) => {
  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  try {
    let newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  let request = await fetch('http://localhost:8008/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML =
      Math.round(allData.temp) + 'F ' + 'degrees';
    //Math.round(((allData.temp - 273.15) * 9) / 5 + 32) + 'F ' + 'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
  }
};
