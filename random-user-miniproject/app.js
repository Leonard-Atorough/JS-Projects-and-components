function fetchUser() {
  showSpinner();
  setTimeout(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => {
        hideSpinner();
        displayUser(data.results[0]);
      })
      .catch((error) => {
        hideSpinner();
        document.getElementById("user").innerHTML = `
        <p class="text-xl text-center text-red-500 mb=5">
          ${error}
        </p>`;
      });
  }, Math.random() * 3000 + 1000);
}

function displayUser(user) {
  const userEl = document.getElementById("user");

  userEl.innerHTML = `
        <div class="flex justify-between">
        <div class="flex">
            <img
            class="w-48 h-48 rounded-full mr-8"
            src="${user.picture.large}"
            />
            <div class="space-y-3">
            <p class="text-xl">
                <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
            </p>
            <p class="text-xl">
                <span class="font-bold">Email: </span> ${user.email}
            </p>
            <p class="text-xl">
                <span class="font-bold">Phone: </span> ${user.phone}
            </p>
            <p class="text-xl">
                <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
            </p>
            <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
            </div>
        </div>
        </div>
  `;
}

function showSpinner() {
  document.querySelector(".spinner")?.classList.remove("hidden");
}
function hideSpinner() {
  document.querySelector(".spinner")?.classList.add("hidden");
}

fetchUser();

document.getElementById("generate").addEventListener("click", fetchUser);
