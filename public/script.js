window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch('/weather-by-coords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lon })
  })
    .then(res => res.json())
    .then(data => dgetWeather(data));
}
function dgetWeather(data){
   const resultDiv = document.getElementById('result');
resultDiv.innerHTML = `
    <div class="d-flex justify-content-center" >
  <img src="${data.icon}" alt="Weather Icon" style="width: 100px;" />
  <h2 class="pt-4">${data.city}</h2>
  </div>
  <p>${data.main}</p>
  <p><b>Temperature: </b>${data.temperature}°C</p>
  <p><b>Feels Like: </b>${data.feelsLike}</p>
  <div class="d-flex justify-content-center">
  <p class="mr-2"><b>Min Temp: </b>${data.minTemp}°C     </p>
  <p><b>Max Temp: </b>${data.maxTemp}°C</p>
  </div>
  <p><b>Description:</b> ${data.description}</p>
`;
}
function error() {
  alert("Location access denied. Please enter city manually.");
}

async function getWeather() {
  const city = document.getElementById('cityInput').value;

  const res = await fetch('/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city })
  });

  const data = await res.json();
  const resultDiv = document.getElementById('result');
  if (data.error) {
    resultDiv.innerHTML = `<p style="font-weight:bold; color:red;">Invalid City</p>`;
  } else {
    resultDiv.innerHTML = `
    <div class="d-flex justify-content-center" >
  <img src="${data.icon}" alt="Weather Icon" style="width: 100px;" />
  <h2 class="pt-4">${data.city}</h2>
  </div>
  <p>${data.main}</p>
  <p><b>Temperature: </b>${data.temperature}°C</p>
  <p><b>Feels Like: </b>${data.feelsLike}</p>
  <div class="d-flex justify-content-center">
  <p class="mr-2"><b>Min Temp: </b>${data.minTemp}°C     </p>
  <p><b>Max Temp: </b>${data.maxTemp}°C</p>
  </div>
  <p><b>Description:</b> ${data.description}</p>
`;

  }
}
