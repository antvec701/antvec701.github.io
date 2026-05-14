'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Only initialize the testimonials modal when the modal markup exists.
// The modal markup is currently commented out in index.html, so unconditional
// event listeners here would throw an error and prevent page navigation from loading.
if (modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);

}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

if (select && selectValue) {

  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const targetPage = this.textContent.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      const pageName = pages[j].dataset.page.trim().toLowerCase();
      pages[j].classList.toggle("active", targetPage === pageName);
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.toggle("active", navigationLinks[j] === this);
    }

    window.scrollTo(0, 0);

  });
}


// collapsible research paper details
const paperToggles = document.querySelectorAll("[data-paper-toggle]");

for (let i = 0; i < paperToggles.length; i++) {
  paperToggles[i].addEventListener("click", function () {
    const paperItem = this.closest(".paper-item");
    const paperDetails = paperItem.querySelector("[data-paper-details]");

    if (!paperDetails) return;

    const isOpen = paperDetails.classList.toggle("active");
    this.classList.toggle("active", isOpen);
    this.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}


// National Parks tile overlay
const parkTiles = document.querySelectorAll("[data-park-tile]");
const parkOverlay = document.querySelector("[data-park-overlay]");
const parkOverlayClose = document.querySelector("[data-park-overlay-close]");
const parkOverlayImg = document.querySelector("[data-park-overlay-img]");
const parkOverlayTitle = document.querySelector("[data-park-overlay-title]");
const parkOverlayRating = document.querySelector("[data-park-overlay-rating]");
const parkOverlayFill = document.querySelector("[data-park-overlay-fill]");
const parkOverlayText = document.querySelector("[data-park-overlay-text]");

const closeParkOverlay = function () {
  if (!parkOverlay) return;
  parkOverlay.classList.remove("active");
  document.body.classList.remove("park-overlay-open");
};

if (parkOverlay && parkOverlayImg && parkOverlayTitle && parkOverlayRating && parkOverlayFill && parkOverlayText) {

  for (let i = 0; i < parkTiles.length; i++) {
    parkTiles[i].addEventListener("click", function () {
      const img = this.querySelector("[data-park-img]");
      const title = this.querySelector("[data-park-title]");
      const text = this.querySelector("[data-park-text]");
      const ratingRaw = Number(this.dataset.parkRating || 0);
      const rating = Math.max(0, Math.min(10, ratingRaw));

      if (img) {
        parkOverlayImg.src = img.src;
        parkOverlayImg.alt = img.alt || "";
      }

      parkOverlayTitle.innerHTML = title ? title.innerHTML : "";
      parkOverlayRating.textContent = rating === 10 ? "10/10" : rating.toFixed(3) + "/10";
      parkOverlayFill.style.width = (rating * 10) + "%";
      parkOverlayText.innerHTML = text ? text.innerHTML : "";

      parkOverlay.classList.add("active");
      document.body.classList.add("park-overlay-open");
    });
  }

  if (parkOverlayClose) {
    parkOverlayClose.addEventListener("click", closeParkOverlay);
  }

  parkOverlay.addEventListener("click", function (event) {
    if (event.target === parkOverlay) closeParkOverlay();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeParkOverlay();
  });

}
