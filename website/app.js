// Base URL and API key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=4949022eea8bdeddf3177bc44a5476a7&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getContent);

/* Function called by event listener */
function getContent(event) {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getData(baseURL, zip, apiKey)
    .then(function(data) {
        postData('/add', {temp: data.main.temp, date: newDate, content: content});
        updateUI();
    });
}

/* Function to GET Web API Data */
const getData = async(baseURL, zip, apiKey) => {
    const response = await fetch(baseURL + zip + apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

/* Function to GET project data and update UI */
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        // update new entry values
        document.getElementById('date').innerHTML = "Date: " + allData.date;
        document.getElementById('temp').innerHTML = "Temperature: " + allData.temp + " &degF";
        document.getElementById('content').innerHTML = "Feelings: " +allData.content;
    }
    catch(error) {
        console.log('error', error);
    }
};