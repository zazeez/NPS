'use strict';

//Github API url for User Repos
const apiKey = 'fAPddYpmq9sjqSW6aFMS5er8foWtWWp0zIli1VGG'
const searchURL = 'https://developer.nps.gov/api/v1/parks';
  
  function displayResults(responseJson) {
    console.log(responseJson);

    // if there are previous results, remove them
    $('#results-list').empty();

    // iterate through the data array, HAVING ISSUES AT THIS STEP, SAYS i IS UNDEFINED
    for (let i = 0; i < responseJson.data.length; i++){
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].states}</p>
        <a href = ${responseJson.data[i].url}>${responseJson.data[i].url}</a>
        <p>${responseJson.data[i].description}</p>
        </li>`
      )};
      //console.log(responseJson.items[i].data.fullName);

    //display the results section  
    $('#results').removeClass('hidden');
  };
  
  function getParks(query, maxResults=10) {
      let url = `https://developer.nps.gov/api/v1/parks?stateCode=${query}&api_key=fAPddYpmq9sjqSW6aFMS5er8foWtWWp0zIli1VGG&limit=${maxResults}`
  
  
    console.log(url);
  
    fetch(url)
      .then(response => {
          console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let searchTerm = $('#js-search-term').val();
      searchTerm = searchTerm.trim();
      const maxResults = $('#js-max-results').val();
      getParks(searchTerm, maxResults);
    });
  }
  
  $(watchForm);