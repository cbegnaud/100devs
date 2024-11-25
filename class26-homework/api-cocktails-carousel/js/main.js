// The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#inputField').addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents default form submission
    submitButton.click(); // Simulates a button click
  }
});

document.querySelector('#submitButton').addEventListener('click', cocktailInfo);

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
      document.querySelector('#instructions').innerText = '';
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
  document.querySelector('#instructions').innerText = carousel.drinks[position].strInstructions;
  document.querySelector('img').src = carousel.drinks[position].strDrinkThumb;
  // Generate the paragraph
  const ingredientsParagraph = getIngredientsParagraph(carousel.drinks[position]);
  console.log(ingredientsParagraph);
  // Insert into HTML (assuming an element with ID 'ingredients')
  document.querySelector('#ingredients').textContent = ingredientsParagraph;
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

function getIngredientsParagraph(apiObject) {
  // Collect non-null ingredients
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const key = `strIngredient${i}`;
    if (apiObject[key]) {
      ingredients.push(apiObject[key]);
    }
  }
  console.log(ingredients);
  return ingredients.join(", ");
}