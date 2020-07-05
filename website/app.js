/* Global Variables */
const apiUrl =  'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=9cb55236664cff4c6154676ed5bd9310';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Click Generate event listner
document.querySelector("#generate").addEventListener("click", generateRequest);

function generateRequest($event) {
    $event.preventDefault();
    const zip = document.querySelector("#zip").value;
    const content = document.querySelector("#feelings").value;
    getWeatherData(apiUrl, zip, apiKey)
    .then(function (newData) {
        console.log('getWeatherData', newData);
        postNewData("/postData", {
            date: newDate,
            temp: newData.main.temp,
            content,
        })
        .then(function (data) {
            updateUI();
        });
    });
  }

async function getWeatherData(apiUrl, zip, apiKey) {
    const res = await fetch(apiUrl + zip + apiKey);
    try {
      const newData = await res.json();
      return newData;
    } catch (error) {
      console.log("Error", error);
    }
  }
  
async function postNewData(url, data) {
    console.log('post ehis data', data);
    
    const request = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },  
        body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content,
        }),
    });

    try {
        const res = await request.json();
        JSON.parse(JSON.stringify(res));
        return res;
    } catch (error) {
        console.log("Error", error);
    }
}
  
async function updateUI() {
    const res = await fetch("/getData");
    try {
        const allData = await res.json();
        document.querySelector("#date").innerHTML = allData.date;
        document.querySelector("#temp").innerHTML = allData.temp;
        document.querySelector("#content").innerHTML = allData.content;
    } catch (error) {
        console.log("Error", error);
    }
}