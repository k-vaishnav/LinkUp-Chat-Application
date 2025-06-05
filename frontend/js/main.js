const form = document.getElementById("auth-form");
const alertContainer = document.getElementById("alert-container");

// Alert function to show Alerts to the users on success or Failures
function showAlert(message, type = "danger") {
    alertContainer.innerHTML = `
  <div class="alert alert-${type}">${message}</div>
  `;
  }

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  try {
    // fetch("http://localhost:3000/api/auth/login")
    const res = await fetch("/api/auth/login", { // to pass data to the server
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      showAlert(data.msg || "Login Failed, Please Try Again", "danger"); // Alert danger if login fails
    } else {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = "public/chat.html";
      } else {
        showAlert(data.msg || "Login Failed, Please Try Again", "danger"); // Alert danget if login fail
      }
    }
  } catch (err) {
    showAlert(err.msg || "Login Failed, Please Try Again", "danger"); // Alert danger if login fail
    console.error(err);
  }
});
