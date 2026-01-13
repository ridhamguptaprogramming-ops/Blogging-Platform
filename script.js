document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
[
  { id: 1, title: "Post title", content: "Post content" },
  { id: 2, title: "Another post", content: "Text..." }
]
document.getElementById("getStartedBtn").addEventListener("click", () => {
  alert("Welcome! Let's get started 🚀");
});

// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// GET STARTED SCROLL
document.getElementById("getStartedBtn").addEventListener("click", () => {
  document.getElementById("vision").scrollIntoView({
    behavior: "smooth"
  });
  navLinks.classList.remove("active");
});
