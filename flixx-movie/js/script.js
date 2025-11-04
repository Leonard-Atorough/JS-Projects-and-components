const global = {
  currentPage: window.location.pathname,
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "461d298c033d3bb1cd18d215ae26abdc",
  requestHeaders: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjFkMjk4YzAzM2QzYmIxY2QxOGQyMTVhZTI2YWJkYyIsIm5iZiI6MTc2MTUwNTUwNS4yNjgsInN1YiI6IjY4ZmU3MGUxNzdhMDliYjcxMGZiNmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihSVmja_QMKylFCLTJdhtKf7XZv5FxU_xsF9qVi7l0k",
  },
};

function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  if (global.currentPage === "/flixx-movie/") navLinks[0].classList.add("active");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

async function displayPopularMovies() {
  const container = document.getElementById("popular-movies");
  container.innerHTML = "";

  const endpoint = "/movie/popular";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjFkMjk4YzAzM2QzYmIxY2QxOGQyMTVhZTI2YWJkYyIsIm5iZiI6MTc2MTUwNTUwNS4yNjgsInN1YiI6IjY4ZmU3MGUxNzdhMDliYjcxMGZiNmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihSVmja_QMKylFCLTJdhtKf7XZv5FxU_xsF9qVi7l0k",
    },
  };

  try {
    const data = await fetchApiData(endpoint, options);

    data.results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
                : `<img
                     src="./images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
      document.getElementById("popular-movies").appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
  hideSpinner();
}

async function displayPopularTvShows() {
  const endpoint = "/tv/popular";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjFkMjk4YzAzM2QzYmIxY2QxOGQyMTVhZTI2YWJkYyIsIm5iZiI6MTc2MTUwNTUwNS4yNjgsInN1YiI6IjY4ZmU3MGUxNzdhMDliYjcxMGZiNmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihSVmja_QMKylFCLTJdhtKf7XZv5FxU_xsF9qVi7l0k",
    },
  };
  const container = document.getElementById("popular-shows");
  container.innerHTML = "";

  try {
    const data = await fetchApiData(endpoint, options);
    data.results.forEach((show) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;

      document.querySelector("#popular-shows").appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
  hideSpinner();
}

async function displayMoviePage() {
  const container = document.getElementById("movie-details");
  const id = window.location.search.split("=")[1];
  console.log(id);

  const endpoint = `/movie/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjFkMjk4YzAzM2QzYmIxY2QxOGQyMTVhZTI2YWJkYyIsIm5iZiI6MTc2MTUwNTUwNS4yNjgsInN1YiI6IjY4ZmU3MGUxNzdhMDliYjcxMGZiNmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihSVmja_QMKylFCLTJdhtKf7XZv5FxU_xsF9qVi7l0k",
    },
  };

  try {
    const movie = await fetchApiData(endpoint, options);

    container.innerHTML = "";

    displayBackgroundImage("movie", movie.backdrop_path);

    const div = document.createElement("div");
    div.innerHTML = `
  <div class="details-top">
      <div>
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
      }
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
          ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> ${formatNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> ${formatNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(", ")}
      </div>
    </div>
  `;
    hideSpinner();
    container.appendChild(div);
  } catch (error) {
    console.error(error);
  }
}

async function displayShowPage() {
  const container = document.getElementById("show-details");
  const id = window.location.search.split("=")[1];
  console.log(id);

  const endpoint = `/tv/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjFkMjk4YzAzM2QzYmIxY2QxOGQyMTVhZTI2YWJkYyIsIm5iZiI6MTc2MTUwNTUwNS4yNjgsInN1YiI6IjY4ZmU3MGUxNzdhMDliYjcxMGZiNmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihSVmja_QMKylFCLTJdhtKf7XZv5FxU_xsF9qVi7l0k",
    },
  };

  try {
    const show = await fetchApiData(endpoint, options);

    container.innerHTML = "";

    displayBackgroundImage("show", show.backdrop_path);

    const div = document.createElement("div");
    div.innerHTML = `
  <div class="details-top">
      <div>
      ${
        show.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
      }
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Last Aired: ${show.last_air_date}</p>
        <p>
          ${show.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number of Episodes:</span> ${
          show.number_of_episodes ?? 0
        }</li>
        <li><span class="text-secondary">Last Aired Episode:</span> ${
          show.last_episode_to_air.name
        }</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${show.production_companies.map((company) => `<span>${company.name}</span>`).join(", ")}
      </div>
    </div>
  `;
    hideSpinner();
    container.appendChild(div);
  } catch (error) {
    console.error(error);
  }
}

function displayBackgroundImage(type, path) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else if (type === "show") {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

async function displaySlider() {
  const container = document.querySelector(".swiper-wrapper");
  container.innerHTML = "";
  const endpoint = "/movie/now_playing";
  const options = {
    method: "GET",
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjFkMjk4YzAzM2QzYmIxY2QxOGQyMTVhZTI2YWJkYyIsIm5iZiI6MTc2MTUwNTUwNS4yNjgsInN1YiI6IjY4ZmU3MGUxNzdhMDliYjcxMGZiNmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihSVmja_QMKylFCLTJdhtKf7XZv5FxU_xsF9qVi7l0k",
  };

  try {
    const data = await fetchApiData(endpoint, options);
    data.results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");
      div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
                    : `<img
                    src="./images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                }
            </a>
                <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
        `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
  initSwiper();
  hideSpinner();
}

async function fetchApiData(endpoint, options) {
  showSpinner();

  const url = `${global.baseUrl}${endpoint}?api_key=${global.apiKey}`;
  const res = await fetch(url, options);

  if (res.status !== 200) {
    throw new Error(`Failed to fetch resource at ${url}. See response: ${await res.json()}`);
  }
  return await res.json();
}

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};
const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};
const formatNumber = (number) => {
  console.log(number);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
};
const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

function initApp() {
  if (global.apiKey.length <= 0) console.error("get your api key");
  switch (global.currentPage) {
    case "/flixx-movie/":
    case "/flixx-movie/index.html":
      displayPopularMovies();
      displaySlider();
      console.log("home");
      break;
    case "/flixx-movie/shows.html":
      displayPopularTvShows();
      console.log("shows");
      break;
    case "/flixx-movie/movie-details.html":
      displayMoviePage();
      console.log("move-details");
      break;
    case "/flixx-movie/tv-details.html":
      displayShowPage();
      console.log("tv-details");
      break;
    default:
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", initApp);
