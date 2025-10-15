(() => {
  const _dayCards = document.querySelector(".weeks");

  const showDayDropdown = (e) => {
    if (e.target.closest(".dropdown")) {
      const btn = e.target.closest(".dropdown");
      const targetedId = btn.getAttribute("aria-controls");

      const list = targetedId ? document.getElementById(targetedId) : btn.nextElementSibling;
      console.log(list);

      if (!list) return;

      const isOpen = list.classList.toggle("active");
      btn.setAttribute("aria-expanded", isOpen);
    }
  };

  _dayCards.addEventListener("click", showDayDropdown);

  _dayCards.addEventListener("click", (e) => {
    console.log(e.target.closest(".dropdown"));
    console.log(e.currentTarget);
  });
})();
