//Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  // const choice = document.querySelector('input').value
  const url = 'https://api.nasa.gov/planetary/apod?api_key=7yc6xHESDJIGZGVbybS4jZ64IxaQ8WOnRyHbCe08&date=2024-11-21'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        document.querySelector('h2').innerText = data.title;
        document.querySelector('p').innerText = data.explanation;
        document.querySelector('img').src = data.url;
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

getFetch()