function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successful!");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No user found. Please sign up.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  alert("Logged out successfully");
  window.location.href = "login.html";
}
// SIGNUP
function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("All fields required");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  window.location.href = "index.html";
}

// LOGIN
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== email || user.password !== password) {
    alert("Invalid login");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  window.location.href = "index.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.reload();
}
