// Existing contact form code (if any) remains unchanged
document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const doneButton = document.querySelector(".done-btn");

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      window.history.back();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      const nextPage = this.getAttribute("data-next");
      if (nextPage) {
        window.location.href = nextPage;
      }
    });
  }

  if (doneButton) {
    doneButton.addEventListener("click", function () {
      window.location.href = "../csharp-lesson.html";
    });
  }
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('formResponse').innerText = 'Thank you for your message!';
      contactForm.reset();
    });
  }
});

// Toggle function for dropdown
function toggleDropdown(header) {
  console.log("Dropdown toggle triggered"); // Debug log
  const dropdown = header.nextElementSibling;
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
    header.querySelector('.dropdown-arrow').innerHTML = "&#9650;";
  } else {
    dropdown.style.display = "none";
    header.querySelector('.dropdown-arrow').innerHTML = "&#9660;";
  }
}
