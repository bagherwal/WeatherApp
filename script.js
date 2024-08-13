const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
    
search.addEventListener('click', () => {
      const APIKey = 'b6c1928c549565495f66ec09df8d9adf';
      const city = document.querySelector('.search-box input').value;
    
      if (city === '') return;
    
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
          if (json.cod === '404') {
            alert('City not found');
            return;
          }

          const image = document.querySelector('.weather-box img');
          const temperature = document.querySelector('.weather-box .temperature');
          const description = document.querySelector('.weather-box .description');
          const humidity = document.querySelector('.weather-details .humidity span');
          const wind = document.querySelector('.weather-details .wind span');
    
          if (json.weather && json.weather.length > 0) {
            switch (json.weather[0].main) {
              case 'Clear':
                image.src = 'imgs/clear.png';
                break;
              case 'Rain':
                image.src = 'imgs/rain.png';    
                break;  
              case 'Snow':
                image.src = 'imgs/snow.png';        
                break;         
              case 'Clouds':
                image.src = 'imgs/cloud.png';    
                break;
              case 'Mist':
                image.src = 'imgs/mist.png';    
                break;
              case 'Haze':
                image.src = 'imgs/mist.png';    
                break;
              default:
                image.src = 'imgs/cloud.png'; 
            }
            
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
          } else {
            console.error('Weather data not available');
          }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    });