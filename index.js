function getDogImages(desiredDogs) {
    fetch(`https://dog.ceo/api/breeds/image/random/${desiredDogs}`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    let crate = "";
    for (let i = 0; i < responseJson.message.length; i++) {
        crate = crate + `<img src="${responseJson.message[i]}" class="results-img">`;
    }
    console.log(crate)
    $('.results-img').replaceWith(crate);
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('`watchForm` ran');
        const desiredDogs = $('#number-of-doggos').val();
        console.log(`Finding ${desiredDogs} good pups...`)
        getDogImages(desiredDogs);
        $('#number-of-doggos').trigger("reset");
        $('#number-of-doggos').val('');
    })
}

$(function() {
    console.log('App loaded! Waiting for submit.');
    watchForm();
});