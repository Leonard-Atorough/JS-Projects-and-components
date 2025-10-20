const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

const getCelcius = (f) => {
  return ((f - 32) * 5) / 9;
};
console.log(getCelcius(32));

const minMax = (arr) => {
  console.log(Math.min(...arr));
  console.log(Math.max(...arr));
};

minMax([1, 2, 3, 4, 5, 25, 0]);

((w, l) => {
  console.log(
    `The area of a rectangle with a width of ${w} and a length of ${l} is ${
      w * l
    }`
  );
})(10, 20);
