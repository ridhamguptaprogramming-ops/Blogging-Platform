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

