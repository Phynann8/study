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
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let arrows = [];
let balloons = [];
let isShooting = false;

// Arrow class
class Arrow {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 10;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, -2, 20, 4); // Arrow body
    ctx.restore();
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }
}

// Balloon class
class Balloon {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
      this.x = Math.random() * canvas.width;
    }
  }
}

// Initialize balloons
function createBalloons() {
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height + Math.random() * 200;
    const radius = 20;
    const speed = Math.random() * 2 + 1;
    balloons.push(new Balloon(x, y, radius, speed));
  }
}

// Handle shooting
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const angle = Math.atan2(mouseY - canvas.height, mouseX - canvas.width / 2);
  arrows.push(new Arrow(canvas.width / 2, canvas.height, angle));
});

// Check collision
function checkCollision(arrow, balloon) {
  const dx = arrow.x - balloon.x;
  const dy = arrow.y - balloon.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < balloon.radius;
}

// Update game
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update arrows
  arrows.forEach((arrow, arrowIndex) => {
    arrow.draw();
    arrow.update();

    // Remove arrows that go off-screen
    if (arrow.x < 0 || arrow.x > canvas.width || arrow.y < 0 || arrow.y > canvas.height) {
      arrows.splice(arrowIndex, 1);
    }

    // Check collision with balloons
    balloons.forEach((balloon, balloonIndex) => {
      if (checkCollision(arrow, balloon)) {
        balloons.splice(balloonIndex, 1);
        arrows.splice(arrowIndex, 1);
        score++;
        document.getElementById('score').textContent = score;

        // Add a new balloon
        const x = Math.random() * canvas.width;
        const y = canvas.height + Math.random() * 200;
        const radius = Math.max(10, 20 - Math.floor(score / 5)); // Balloons get smaller
        const speed = Math.random() * 2 + 1 + score / 10; // Balloons get faster
        balloons.push(new Balloon(x, y, radius, speed));
      }
    });
  });

  // Draw and update balloons
  balloons.forEach((balloon) => {
    balloon.draw();
    balloon.update();
  });

  requestAnimationFrame(updateGame);
}
// Dynamically resize the canvas
function resizeCanvas() {
  const maxWidth = 800; // Maximum width for desktop
  const maxHeight = 600; // Maximum height for desktop

  // Set canvas size based on screen size
  canvas.width = Math.min(window.innerWidth * 0.9, maxWidth);
  canvas.height = Math.min(window.innerHeight * 0.7, maxHeight);
}

// Call resizeCanvas on page load and window resize
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);  
// Start the game
createBalloons();
updateGame();
//Scroll‑Triggered Reveal Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal');
      observer.unobserve(e.target);
    }
  });
});
document.querySelectorAll('.reveal-on-scroll').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
// 4) Dark‑Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === 'dark' ? '' : 'dark';
});

// 5) Custom Cursor Movement
const cursor = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

/* ───────────────────────────── */
/* 6) Lottie Initialization      */
/* ───────────────────────────── */
lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  // Point this at your actual JSON file in public/reuse/animations/
  path: '/reuse/animations/pulsing-circle.json'
});
