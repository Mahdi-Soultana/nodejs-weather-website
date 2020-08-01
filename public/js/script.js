console.log("Hi from Javascript");



const input = document.querySelector('input');
const form = document.querySelector('form');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = input.value;
    message1.innerHTML = "Loading ....";
    fetch("/weather?address=" + search)
        .then((response) => {
            response.json().then(({ error, location, dataWeather } = {}) => {
                if (error) {
 
                    message1.innerHTML = "";
                    message3.innerHTML = "";
                    message2.innerHTML = error;
                }     
 
                else {
                    message1.innerHTML = "";
                    message2.innerHTML = location;
                    message3.innerHTML = dataWeather;
                }
            })
        })
    input.value = "";
})