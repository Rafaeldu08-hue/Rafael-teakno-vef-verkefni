// Modal management
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 300;
let visibleModal = null;

// Toggle modal
const toggleModal = (event) => {
  event.preventDefault();
  const modal = document.getElementById(event.currentTarget.dataset.target);
  if (!modal) return;
  modal.open ? closeModal(modal) : openModal(modal);
};

// Open modal
const openModal = (modal) => {
  const html = document.documentElement;
  html.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    html.classList.remove(openingClass);
  }, animationDuration);
  modal.showModal();
};

// Close modal
const closeModal = (modal) => {
  visibleModal = null;
  const html = document.documentElement;
  html.classList.add(closingClass);
  setTimeout(() => {
    html.classList.remove(closingClass, isOpenClass);
    modal.close();
  }, animationDuration);
};

// Close login modal
const closeLogin = () => {
  const loginModal = document.getElementById("login-modal");
  if (loginModal) closeModal(loginModal);
};

// Click outside modal to close
document.addEventListener("click", (event) => {
  if (visibleModal === null) return;
  const modalContent = visibleModal.querySelector("article");
  const isClickInside = modalContent?.contains(event.target);
  if (!isClickInside) closeModal(visibleModal);
});

// Escape key closes modal
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && visibleModal !== null) {
    closeModal(visibleModal);
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navContent = document.querySelector(".nav-content");
  
  if (navToggle && navContent) {
    navToggle.addEventListener("click", () => {
      navContent.classList.toggle("active");
    });
    
    // Close nav when clicking links
    const navLinks = document.querySelectorAll(".nav-content a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navContent.classList.remove("active");
      });
    });
  }
  
  // Hide loader
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.display = "none";
    });
    setTimeout(() => {
      loader.style.display = "none";
    }, 2000);
  }
  
  // Continue button opens login
  const continueBtn = document.getElementById("continueBtn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const openDialog = document.querySelector("dialog[open]");
      if (openDialog) openDialog.close();
      const loginModal = document.getElementById("login-modal");
      if (loginModal) loginModal.showModal();
    });
  }
});
