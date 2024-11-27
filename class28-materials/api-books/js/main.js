//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${choice}&jscmd=data&format=json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data); 
        data = data[`ISBN:${choice}`];
        console.log(data);
        console.log(data.title);
        
        document.querySelector('h2').innerText = data.title
        document.querySelector('img').src = data.cover.large
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}