document.querySelector('#submitButton').addEventListener('click', getEmoji);

function getEmoji() {
  // Clear previous emoji
  document.querySelector('p').innerHTML = "";

  fetch('https://emojihub.yurace.pro/api/random')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
    // Set emoji name
    document.querySelector('h2').innerText = data.name;
    
    // Convert Unicode values to proper emoji HTML entities
    const unicodeArray = data.unicode;
    const htmlEntities = unicodeArray.map(unicode => unicode.replace('U+', '&#x') + ';')
    console.log(htmlEntities);

    // Create a combined emoji sequence (if needed)
    const combinedEmoji = htmlEntities.join(''); // Join all entities into one sequence
    console.log('Combined Emoji: ', combinedEmoji);

    // Append the emoji to the paragraph
    document.querySelector('p').innerHTML = combinedEmoji;
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}