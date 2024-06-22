const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide')

document.querySelector('.search-box button').addEventListener('click', () => {
    const APIKey = 'bd0fc879757a9c6a00db15941afe929c'; 
    const city = document.querySelector('.search-box input').value;

    if (city === '')
         return;

 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                document.querySelector('.city-hide').textContent = city;
                document.querySelector('.container').style.height = '400px';
                document.querySelector('.weather-box').classList.remove('active');
                document.querySelector('.weather-details').classList.remove('active');
                document.querySelector('.not-found').classList.add('active');
                return;
            }

            document.querySelector('.city-hide').textContent = city;
            document.querySelector('.container').style.height = '555px';
            document.querySelector('.weather-box').classList.add('active');
            document.querySelector('.weather-details').classList.add('active');
            document.querySelector('.not-found').classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/ClearImage.png';
                    break;
                case 'Rain':
                    image.src = 'images/rainimages.webp';
                    break;
                case 'Snow':
                    image.src = 'images/SnowImage.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloudImage.webp';
                    break;
                case 'Mist':'';
                break;
                case 'Haze':
                    image.src = 'images/file (2).png';
                    break;
                default:
                    image.src = 'images/cloudImage.webp';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        });
});











