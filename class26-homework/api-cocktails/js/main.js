//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#submitButton').addEventListener('click', cocktailInfo);

// send request with a space encoded with %20
function cocktailInfo() {
  let cocktail = document.querySelector('input').value;
  console.log(cocktail);
  cocktail = cocktail.split(' ').join('%20');
  console.log(cocktail);
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data.drinks[0].strDrink);
    document.querySelector('h2').innerText = data.drinks[0].strDrink;
    document.querySelector('p').innerText = data.drinks[0].strInstructions;
    document.querySelector('img').src = data.drinks[0].strDrinkThumb;

  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}