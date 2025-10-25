const button = document.getElementById("new-joke-btn");
const jokeContainer = document.getElementById("joke-display");
const imgContainer = document.getElementById("chuck-image");
const url = "https://api.chucknorris.io/jokes/random";

const getJoke = () => {
  const req = new XMLHttpRequest();
  req.open("GET", url);

  jokeContainer.innerHTML = "Loading...";
  button.disabled = true;

  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const response = JSON.parse(req.responseText);
      jokeContainer.innerHTML = response.value;
      imgContainer.innerHTML = `<img src="${response.icon_url}" alt="Chuck Norris">`;
      button.disabled = false;
    }
  };

  req.send();
};

button.addEventListener("click", getJoke);
document.addEventListener("DOMContentLoaded", getJoke);
