'use-strict';
/* Global Variables */
//api vars
const apiKey = '&appid=a0d6a7d2b9137b97d2c5c9dc27705e40';
const units = '&units=metric';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//document elements vars
const country = document.getElementById('country');
const myDate = document.getElementById('date');
const myTemp = document.getElementById('temp');
const mycontent = document.getElementById('content');
const genBtn = document.getElementById('generate');

//reset all felds when trying to add a new entry
document.getElementById('zip').addEventListener('focus', () => {
  document.getElementById('zip').value = '';
  document.getElementById('feelings').value = '';
  country.innerHTML = '';
  myDate.innerHTML = '';
  myTemp.innerHTML = '';
  mycontent.innerHTML = '';
});

//Add Event listener to the generate button
genBtn.addEventListener('click', fetchApi);

function fetchApi(e) {
  let d = new Date();
  let newDate =
    d.getMonth() + 1 + ' / ' + d.getDate() + ' / ' + d.getFullYear();
  const zipcode = document.getElementById('zip').value;
  const mycontent = document.getElementById('feelings').value;
  if (zipcode == '' || mycontent == '') {
    alert('Please enter a Zip code and how you feel');
    return;
  }
  getApiData(apiURL, zipcode, apiKey, units)
    .then(function (data) {
      //posting the data returned from the getApiData
      postData('/postData', {
        date: newDate,
        temp: data.main.temp,
        state: data.sys.country,
        country: data.name,
        feeling: mycontent,
      });
    })
    .then(updateAppUI);
}
const getApiData = async (url, code, key, unit) => {
  const returnedData = await fetch(url + code + key + unit);
  if (returnedData.status !== 200) {
    alert('Please provide a valid Zip');
    return;
  }
  try {
    const data = await returnedData.json();
    return data;
    //console.log(data);
  } catch (error) {
    console.log('error', error);
  }
};
//Post data
const postData = async (url = '', data = {}) => {
  const response = fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const apiData = await response.json();
    return apiData;
  } catch (error) {
    console.log('error', error);
  }
};
//Update the UI Elements with data
const updateAppUI = async () => {
  const request = await fetch('/updateUI');
  try {
    const ProjectData = await request.json();
    country.innerHTML = `State/Country: ${ProjectData.country} / ${ProjectData.state}`;
    myDate.innerHTML = `Date: ${ProjectData.date}`;
    myTemp.innerHTML = `Temperature: ${ProjectData.temp} °C`;
    mycontent.innerHTML = `Feeling : ${ProjectData.feeling}`;
  } catch (error) {
    console.log('error', error);
  }
};
