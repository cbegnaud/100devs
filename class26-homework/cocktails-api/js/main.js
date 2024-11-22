//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#getCocktail').addEventListener('click', cocktailInfo);
let carousel = {};
let position = 0;

function cocktailInfo() {
  let cocktail = document.querySelector('input').value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    carousel = data;
    position = 0;
    placeInfo(position);
    if (carousel.drinks.length === 1) {
      document.querySelector('h4').innerText = `There is only one cocktail matching that description.`
    } else {
      document.querySelector('h4').innerText = `There are ${carousel.drinks.length} ${cocktail} cocktails matching that description.`;
    }
  })
  .catch(err => {
    if (carousel.drinks === null) {
      document.querySelector('h2').innerText = '';
      document.querySelector('p').innerText = '';
      document.querySelector('img').src = '';
      document.querySelector('h4').innerText = '';
      document.querySelector('input').value = '';
      alert(`There isn't a cocktail matching that description.`);
    } else 
    console.log(`error ${err}`)
  });
}

function placeInfo() {
  document.querySelector('h2').innerText = carousel.drinks[position].strDrink;
  document.querySelector('p').innerText = carousel.drinks[position].strInstructions;
  document.querySelector('img').src = carousel.drinks[position].strDrinkThumb;
}

document.querySelector('#nextButton').addEventListener('click', fwdCarousel)
document.querySelector('#prevButton').addEventListener('click', backCarousel)

function fwdCarousel() {
  if (position === carousel.drinks.length - 1) {
    position = 0;
    placeInfo();
  } else if (position >= 0) {
    position++;
    placeInfo();
  }
}

function backCarousel() {
  if (position === 0) {
    position = carousel.drinks.length - 1;
    placeInfo();
  } else if (position > 0) {
      position--;
      placeInfo();
    }
}



// send request with a space encoded with %20
// function cocktailInfo() {
//   let cocktail = document.querySelector('input').value;
//   console.log(cocktail);
//   cocktail = cocktail.split(' ').join('%20');
//   console.log(cocktail);
//   fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     console.log(data.drinks[0].strDrink);
//     document.querySelector('h2').innerText = data.drinks[0].strDrink;
//     document.querySelector('p').innerText = data.drinks[0].strInstructions;
//   })
//   .catch(err => {
//     console.log(`error ${err}`)
//   });
// }
