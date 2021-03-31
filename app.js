window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone"); 
    let degreeSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span")

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=d58f301132b6396584b7bf2cb70b1669`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const {description} = data.weather[0];
                    const {icon} = data.weather[0];
                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temp;
                                       
                    let desc = description.split(" ");
                    let caps = desc.map(item => {
                        return item.charAt(0).toUpperCase() + item.slice(1);
                    });
                    caps = caps.join(" ");
                    temperatureDescription.textContent = caps;

                    locationTimezone.textContent = data.name + "/" + data.sys.country;
                    // Set Icon
                    // setIcons(icon, document.querySelector(".icon"));
                    document.querySelector('img').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    // FORMULA FOR CELSIUS
                    let celsius = (temp - 32) * (5 / 9);
                    

                    // Change temperature to Celsius/Farenheit
                    degreeSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = celsius;
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temp;
                        }
                    });
                });
        });

    } else {
        h1.textContent = "hey dis is not working bec of reasons";
    }

    // asdasdasd
   /* function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        skycons.play();
        return skycons.set(iconID, Skycons[icon]);
    }*/
});