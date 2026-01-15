/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================
   HAMBURGER MENU
========================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* =========================
   AUTH STATE
========================= */
const authArea = document.getElementById("authArea");
const user = JSON.parse(localStorage.getItem("user"));
const loggedIn = localStorage.getItem("loggedIn");

if (authArea) {
  authArea.innerHTML = loggedIn && user
    ? `<span>Hi, ${user.name}</span>
       <button onclick="logout()">Logout</button>`
    : `<a href="signup.html">Get Started</a>`;
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

/* =========================
   EDITOR CORE
========================= */
let editingId = null;
let coverImage = null;

/* FORMAT COMMAND */
function cmd(command, value = null) {
  document.execCommand(command, false, value);
}

/* =========================
   IMAGE UPLOAD (INLINE)
========================= */
function uploadImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      document.execCommand("insertImage", false, reader.result);
    };
    reader.readAsDataURL(file);
  };

  input.click();
}

/* =========================
   COVER IMAGE UPLOAD
========================= */
function uploadCover(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    coverImage = reader.result;
  };
  reader.readAsDataURL(file);
}

/* =========================
   TEMPLATE SYSTEM
========================= */
function applyTemplate() {
  const select = document.getElementById("templateSelect");
  const editor = document.getElementById("content");
  if (!select || !editor) return;

  const templates = {
    seo: `
<h1>Main SEO Title (Primary Keyword)</h1>
<p><strong>Meta Description:</strong> 150–160 characters.</p>
<h2>Introduction</h2>
<p>Use keyword in first 100 words.</p>
<h2>FAQs</h2>
<p><strong>Q:</strong> Question?</p>
<p><strong>A:</strong> Answer.</p>
<h2>Conclusion</h2>
<p>CTA + trust.</p>`,

    blog: `
<h2>Introduction</h2>
<p>Intro...</p>
<h2>Main Content</h2>
<p>Details...</p>
<h2>Conclusion</h2>
<p>CTA.</p>`,

    tutorial: `
<h2>What You Will Learn</h2>
<ul><li>Step 1</li><li>Step 2</li></ul>
<h2>Final Result</h2>
<p>Outcome</p>`,

    news: `
<h2>Headline Summary</h2>
<p>Overview</p>
<h2>Why It Matters</h2>
<p>Impact</p>`,

    case: `
<h1>Case Study: Project Name</h1>
<h2>Problem</h2><p>Describe issue</p>
<h2>Solution</h2><p>Explain approach</p>
<h2>Results</h2><p>Metrics</p>`,

    review: `
<h1>Product Review</h1>
<p><strong>Rating:</strong> ⭐⭐⭐⭐☆</p>
<h2>Pros</h2><ul><li>Good</li></ul>
<h2>Cons</h2><ul><li>Bad</li></ul>
<h2>Verdict</h2><p>Who should buy</p>`,

    markdown: `
# Blog Title

## Introduction
Text here

## Code
\`\`\`js
console.log("Hello");
\`\`\`
`
  };

  if (select.value === "markdown") {
    editor.innerText = templates.markdown;
  } else {
    editor.innerHTML = templates[select.value] || "";
  }

  select.value = "";
}

/* =========================
   SEO CHECK (ONLY FOR SEO TEMPLATE)
========================= */
function seoCheck() {
  const title = document.getElementById("title").value;
  const text = document.getElementById("content").innerText;

  if (title.length < 40) {
    alert("SEO: Title must be at least 40 characters");
    return false;
  }

  if (text.split(" ").length < 300) {
    alert("SEO: Content must be 300+ words");
    return false;
  }

  return true;
}

/* =========================
   SAVE / UPDATE BLOG
========================= */
function publish() {
  const title = document.getElementById("title").value.trim();
  const tagsRaw = document.getElementById("tags").value.trim();
  const content = document.getElementById("content").innerHTML.trim();

  if (!title || !content) {
    alert("Title and content required");
    return;
  }

  const tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (editingId) {
    blogs = blogs.map(b =>
      b.id === editingId
        ? { ...b, title, tags, content, cover: coverImage }
        : b
    );
    editingId = null;
  } else {
    blogs.unshift({
      id: Date.now(),
      title,
      tags,
      content,
      cover: coverImage,
      date: new Date().toLocaleDateString()
    });
  }

  localStorage.setItem("blogs", JSON.stringify(blogs));
  window.location.href = "blogs.html";
}

/* =========================
   LOAD BLOG FOR EDIT
========================= */
(function loadEditMode() {
  const editId = localStorage.getItem("editId");
  if (!editId) return;

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs.find(b => b.id == editId);
  if (!blog) return;

  editingId = blog.id;
  document.getElementById("title").value = blog.title;
  document.getElementById("tags").value = blog.tags.join(", ");
  document.getElementById("content").innerHTML = blog.content;
  coverImage = blog.cover || null;

  localStorage.removeItem("editId");
})();
if (!localStorage.getItem("loggedIn")) {
  alert("Please login to access this page");
  window.location.href = "login.html";
} 
/* =========================
   COVER IMAGE PREVIEW
========================= */

const coverInput = document.getElementById("coverInput");
const coverPreview = document.getElementById("coverPreview");

if (coverInput) {
  coverInput.addEventListener("change", () => {
    const file = coverInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      coverImage = reader.result;
      coverPreview.src = coverImage;
      coverPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}
blogs.unshift({
  id: Date.now(),
  title,
  tags,
  content,
  cover: coverImage, // ✅ NEW
  date: new Date().toLocaleDateString()
});
{
localStorage.setItem("blogs", JSON.stringify(blogs));
window.location.href = "blogs.html";
<<<<<<< Updated upstream
=======
}
/* =========================
   LOAD BLOG FOR EDIT
========================= */
(function loadEditMode() {
  const editId = localStorage.getItem("editId");
  if (!editId) return;

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs.find(b => b.id == editId);
  if (!blog) return;

  editingId = blog.id;
  document.getElementById("title").value = blog.title;
  document.getElementById("tags").value = blog.tags.join(", ");
  document.getElementById("content").innerHTML = blog.content;
  coverImage = blog.cover || null;

  localStorage.removeItem("editId");
})();
/* =========================
   LOAD BLOG BY ID
========================= */
const params = new URLSearchParams(window.location.search);
const blogId = Number(params.get("id"));

const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
const blog = blogs.find(b => b.id === blogId);

const blogContainer = document.getElementById("blog");

if (!blog) {
  blogContainer.innerHTML = "<p>Blog not found.</p>";
} else {
  blogContainer.innerHTML = `
    ${blog.cover ? `<img src="${blog.cover}" alt="${blog.title}">` : ""}
    <h1>${blog.title}</h1>
    <div class="date">${blog.date}</div>
    <div class="content">${blog.content}</div>
  `;

  setSEO(blog);
}

/* =========================
   SEO + SOCIAL META
========================= */
function setSEO(blog) {
  document.title = blog.title + " | VYONIC";

  document
    .querySelector("#seo-description")
    .setAttribute(
      "content",
      blog.content.replace(/<[^>]+>/g, "").slice(0, 155)
    );

  document.querySelector("#og-title").content = blog.title;
  document.querySelector("#og-description").content =
    blog.content.replace(/<[^>]+>/g, "").slice(0, 160);
  document.querySelector("#og-url").content = window.location.href;

  if (blog.cover) {
    document.querySelector("#og-image").content = blog.cover;
  }

  document.querySelector("#twitter-title").content = blog.title;
  document.querySelector("#twitter-description").content =
    blog.content.replace(/<[^>]+>/g, "").slice(0, 160);
}

/* =========================
   DARK MODE
========================= */
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

// load theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* =========================
   MOBILE MENU
========================= */
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

/* =========================
   EXPORT PDF
========================= */
function exportPDF() {
  window.print();
>>>>>>> Stashed changes
}
/* =========================
   LOAD BLOG FOR EDIT
========================= */
(function loadEditMode() {
  const editId = localStorage.getItem("editId");
  if (!editId) return;

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs.find(b => b.id == editId);
  if (!blog) return;

  editingId = blog.id;
  document.getElementById("title").value = blog.title;
  document.getElementById("tags").value = blog.tags.join(", ");
  document.getElementById("content").innerHTML = blog.content;
  coverImage = blog.cover || null;

  localStorage.removeItem("editId");
})();
/* =========================
   LOAD BLOG BY ID
========================= */
const params = new URLSearchParams(window.location.search);
const blogId = Number(params.get("id"));

const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
const blog = blogs.find(b => b.id === blogId);

const blogContainer = document.getElementById("blog");

if (!blog) {
  blogContainer.innerHTML = "<p>Blog not found.</p>";
} else {
  blogContainer.innerHTML = `
    ${blog.cover ? `<img src="${blog.cover}" alt="${blog.title}">` : ""}
    <h1>${blog.title}</h1>
    <div class="date">${blog.date}</div>
    <div class="content">${blog.content}</div>
  `;

  setSEO(blog);
}

/* =========================
   SEO + SOCIAL META
========================= */
function setSEO(blog) {
  document.title = blog.title + " | VYONIC";

  document
    .querySelector("#seo-description")
    .setAttribute(
      "content",
      blog.content.replace(/<[^>]+>/g, "").slice(0, 155)
    );

  document.querySelector("#og-title").content = blog.title;
  document.querySelector("#og-description").content =
    blog.content.replace(/<[^>]+>/g, "").slice(0, 160);
  document.querySelector("#og-url").content = window.location.href;

  if (blog.cover) {
    document.querySelector("#og-image").content = blog.cover;
  }

  document.querySelector("#twitter-title").content = blog.title;
  document.querySelector("#twitter-description").content =
    blog.content.replace(/<[^>]+>/g, "").slice(0, 160);
}

/* =========================
   DARK MODE
========================= */
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

// load theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* =========================
   MOBILE MENU
========================= */
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

/* =========================
   EXPORT PDF
========================= */
function exportPDF() {
  window.print();
}