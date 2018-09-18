// Create the app
const app = document.getElementById('root');

// Create the app container
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Append to the app
app.appendChild(container);

/** API - Request - Fetch */
// Create a request variable and assign the XMLHttpRequest to it
const request = new XMLHttpRequest();

// Open the new connection with the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function() {
  var data = JSON.parse(this.response);

  if (this.status >= 200 && this.status < 400) {
    data.forEach(movie => {
      // Create a card element for each movie
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      // Create a p and set the text content to the film's description
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300); // Limit to 300 chars
      p.textContent = `${movie.description}...`; // End with an ellipses

      // Append the cards to the container element
      container.appendChild(card);

      // Each card will contain an h1 and a p
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.setAttribute('class', 'error');
    errorMessage.textContent = 'Failed to fetch the API';
    container.appendChild(errorMessage);
  }
  
}

// Send the request
request.send();