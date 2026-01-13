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
const authArea = document.getElementById("authArea");
const user = JSON.parse(localStorage.getItem("user"));
const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn && user) {
  authArea.innerHTML = `
    <span style="margin-right:10px;">Hi, ${user.name}</span>
    <button onclick="logout()" style="
      background:#ef4444;
      border:none;
      padding:8px 12px;
      color:white;
      border-radius:6px;
      cursor:pointer;
    ">Logout</button>
  `;
} else {
  authArea.innerHTML = `
    <a href="signup.html" style="
      background:#3bb6ff;
      padding:8px 14px;
      border-radius:6px;
      color:white;
      text-decoration:none;
    ">Get Started</a>
  `;
}
// TEXT FORMAT COMMANDS
function cmd(command, value = null) {
  document.execCommand(command, false, value);
}

// PUBLISH BLOG
function publish() {
  const title = document.getElementById("title").value.trim();
  const tags = document.getElementById("tags").value.trim();
  const content = document.getElementById("content").innerHTML.trim();

  if (!title || !content) {
    alert("Title aur content required hai!");
    return;
  }

  const blog = {
    id: Date.now(),
    title,
    tags,
    content,
    date: new Date().toLocaleDateString()
  };

  // OLD BLOGS LOAD KARO
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // NEW BLOG ADD KARO
  blogs.unshift(blog);

  // SAVE TO LOCALSTORAGE
  localStorage.setItem("blogs", JSON.stringify(blogs));

  alert("Blog published successfully ✅");

  // CLEAR EDITOR
  document.getElementById("title").value = "";
  document.getElementById("tags").value = "";
  document.getElementById("content").innerHTML = "";
}
