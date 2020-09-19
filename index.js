function getDogImages(desiredDogs) {
    // Uses Dog API to get x number of dog pictures
    fetch(`https://dog.ceo/api/breeds/image/random/${desiredDogs}`)
        //converts that data into JSON
        .then(response => response.json())
        //runs that JSON file through the function displayResults
        .then(responseJson => displayResults(responseJson))
        //if something goes wrong, throws an error message
        .catch(error => alert('Something went wrong. Try again later.'));
}

//puts results on webpage
function displayResults(responseJson) {
    //logs JSON data to the console
    console.log(responseJson);
    //removes all pictures of dogs, if they currently exist on the site, allowing for more
    $('.pup-pics').empty();
    //iterates through JSON data to find HTML image elements, and adds them to class pup-pics
    for (let i = 0; i < responseJson.message.length; i++) {
        $('.pup-pics').append(`<img src="${responseJson.message[i]}" class="results-img">`);
    }
    //removes class hidden so photos show up
    $('.results').removeClass('hidden');
}

function watchForm() {
    //when the submit button on form.many-dogs is clicked
    $('.many-dogs').submit(event => {
        event.preventDefault();
        console.log('`watchForm` ran');
        //find the input number and set it to a variable
        const desiredDogs = $('#number-of-doggos').val();
        console.log(`Finding ${desiredDogs} good pups...`)
        //run that variable through the getDogImages function
        getDogImages(desiredDogs);
        //$('#number-of-doggos').trigger("reset");
        $('#number-of-doggos').val('');
    })
}

function getDogByBreed(desiredBreed) {
    //Use the Dog API to find all of its images of a specific breed
    fetch(`https://dog.ceo/api/breed/${desiredBreed}/images`)
        .then(response => response.json())
        .then (responseJson => displayBreed(responseJson))
        .catch(error => alert (`Something went wrong. Try again later.`));
}

function getRandomInt(responseJson) {
    //gets random number between 0 and the length of the responseJson.message array
    let min = 0;
    let max = responseJson.message.length - 1;
    return Math.floor(Math.random() * (max - min) + min);
}

function listDogs(desiredBreed) {
    //uses the Dog API to list all available dog breeds
    fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(response => response.json())
    .then(responseJson => searchList(responseJson, desiredBreed))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function searchList(responseJson, desiredBreed) {
    //puts just the breed name keys into an array
    let allBreeds = Object.keys(responseJson.message);
    //iterates through the breeds, looking to match the input to one of the breed names
    for (let j = 0; j < allBreeds.length; j++) {
        if (allBreeds[j] === desiredBreed) {
            console.log(`Found a ${desiredBreed}!`)
            getDogByBreed(desiredBreed);
        } else {
            unhappyHTML(desiredBreed);
        }}
}

function unhappyHTML (desiredBreed) {
    $('.pup-pics').empty();
    $('.pup-pics').append(`<p>Sorry, we don't have a ${desiredBreed} in our yard!</p>`)
    $('.results').removeClass('hidden');
}

function displayBreed(responseJson) {
    //if there are dog pics already, remove them
    $('.pup-pics').empty();
    console.log(responseJson)
    //use getRandomInt function to choose a random dig pic
    let dogNum = getRandomInt(responseJson);
    //add that dog pic to pup-pics
    $('.pup-pics').append(`<img src="${responseJson.message[dogNum]}" class="results-img">`)
    //remove class hidden
    $('.results').removeClass('hidden');
}

function watchInput() {
    //when the form.breed-dog submit button is entered
    $('.breed-dog').submit(event => {
        event.preventDefault();
        console.log('`watchInput` ran');
        //lowercase the input value and set it equal to a variable
        const desiredBreed = $('#breed').val().toLowerCase();
        console.log(`Finding a ${desiredBreed} for you...`)
        listDogs(desiredBreed);
        $('#breed').val('');
    })
}

$(function() {
    console.log('App loaded! Waiting for submit.');
    watchForm();
    watchInput();
});