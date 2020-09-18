function getDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/3')
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results-img').replaceWith(
       `<img src="${responseJson.message[0]}" class="results-img">
       <img src="${responseJson.message[1]}" class="results-img">
       <img src="${responseJson.message[2]}" class="results-img">`
    )
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('`watchForm` ran');
        const desiredDogs = $('#number-of-doggos').val();
        console.log(`Finding ${desiredDogs} good pups...`)
        getDogImages();
    })
}

$(function() {
    console.log('App loaded! Waiting for submit.');
    watchForm();
});