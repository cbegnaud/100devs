//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value;
  const url = `https://api.humorapi.com/memes/random?api-key=0497e4b248694827ada1a341ba4a497d&number=1&keywords=${choice}`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        document.querySelector('p').innerText = data.description;
        document.querySelector('img').src = data.url;   
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}

