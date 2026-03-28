const button = document.querySelector("button");
let apiKey = `e3b1856643154a89b3e69429ca0dd306`;

button.addEventListener("click", () => {
    if (navigator.geolocation) {
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser not support";
    }
});

function onSuccess(position) {
    button.innerText = "Detecting your location...";
    let { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`).then(response => response.json()).then(result => {
        let allDetails = result.results[0].components;
        let { city, postcode, country } = allDetails;
        button.innerText = `${city} ${postcode}, ${country}`;
        console.table(allDetails);
    }).catch(() => {
        button.innerText = "Something went wrong";
    })
}

function onError(error) {
    if (error.code == 1) {
        button.innerText = "You denied the request";
    }
    else if (error.code == 2) {
        button.innerText = "Location not available";
    } else {
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}