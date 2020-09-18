function getDogImages(desiredDogs) {
    fetch(`https://dog.ceo/api/breeds/image/random/${desiredDogs}`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.pup-pics').empty();
    for (let i = 0; i < responseJson.message.length; i++) {
        $('.pup-pics').append(`<img src="${responseJson.message[i]}" class="results-img">`);
    }
    console.log(responseJson.message)
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('.many-dogs').submit(event => {
        event.preventDefault();
        console.log('`watchForm` ran');
        const desiredDogs = $('#number-of-doggos').val();
        console.log(`Finding ${desiredDogs} good pups...`)
        getDogImages(desiredDogs);
        $('#number-of-doggos').trigger("reset");
        $('#number-of-doggos').val('');
    })
}

function getDogByBreed(desiredBreed) {
    fetch(`https://dog.ceo/api/breed/${desiredBreed}/images`)
        .then(response => response.json())
        .then (responseJson => displayBreed(responseJson))
        .catch(error => alert (`Something went wrong. Try again later.`));
}

function getRandomInt(responseJson) {
    let min = 0;
    let max = responseJson.message.length - 1;
    return Math.floor(Math.random() * (max - min) + min);
}

function listDogs(desiredBreed) {
    fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(response => response.json())
    .then(responseJson => searchList(responseJson, desiredBreed))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function searchList(responseJson, desiredBreed) {
    let allBreeds = Object.keys(responseJson.message);
    for (let j = 0; j < allBreeds.length; j++) {
        if (allBreeds[j] === desiredBreed) {
            console.log('we did it')
        } else {
            console.log('we did it a different way')
        }}
}

function displayBreed(responseJson) {
    $('.pup-pics').empty();
    console.log(responseJson)
    let dogNum = getRandomInt(responseJson);
    $('.pup-pics').append(`<img src="${responseJson.message[dogNum]}" class="results-img">`)
    $('.results').removeClass('hidden');
}

function watchInput() {
    $('.breed-dog').submit(event => {
        event.preventDefault();
        console.log('`watchInput` ran');
        const desiredBreed = $('#breed').val().toLowerCase();
        console.log(`Finding a ${desiredBreed} for you...`)
        listDogs(desiredBreed);
        // $('#number-of-doggos').trigger("reset");
        // $('#number-of-doggos').val('');
    })
}

$(function() {
    console.log('App loaded! Waiting for submit.');
    watchForm();
    watchInput();
});