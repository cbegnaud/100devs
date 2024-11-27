// Explicitly assign the button element ('#submitButton') to a submitButton variable
const submitButton = document.querySelector('#submitButton');

// Add eventListener on button
submitButton.addEventListener('click', getFetch);

// EventListener for a Enter keydown event
document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents default form submission    
    submitButton.click(); // Simulates a button click
  }
});

//Example fetch using DnD5eAPI - place subclasses in ul
function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase().split(' ').join('-');
  console.log(choice);
  const url = `https://www.dnd5eapi.co/api/spells/${choice}`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        document.querySelector('h2').innerText = data.name;
        
        let classStr = '';
        data.classes.forEach(element => (classStr += element.name + ', ')); // add each element using concatenation
        classStr = classStr.slice(0, -2);
        document.querySelector('h3').innerText = classStr;  
        let subClassStr = '';
        data.subclasses.forEach(element => (subClassStr += element.name + ', '));
        subClassStr = subClassStr.slice(0, -2);
        document.querySelector('h4').innerText = subClassStr; 
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}