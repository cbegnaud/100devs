// The user will enter an artist and song title. Get the lyrics and place them in the DOM
document.querySelector('#song').addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents default form submission
    submitButton.click(); // Simulates a button click
  }
});

document.querySelector('#submitButton').addEventListener('click', getLyrics)

function getLyrics(){
  let artist = document.querySelector('#artist').value;
  artist = artist.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');  
  console.log(artist);
  let song = document.querySelector('#song').value;
  song = song.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');  

  console.log(song);
  const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        document.querySelector('h2').innerText = `${artist} - ${song}`;
        if (data.lyrics) {
          document.querySelector('p').innerText = data.lyrics;
        } else {
          document.querySelector('p').innerText = data.error;   
        }; 
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
}