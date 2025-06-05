const form = document.getElementById('auth-form');
const alertContainer = document.getElementById('alert-container');

// to show success or danger alerts to user
function showAlert(message,type='danger') { 
  alertContainer.innerHTML =`
  <div class="alert alert-${type}">${message}</div>
  `}

  // to listen to  register(when user registers first time) Event 
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  const email = form.email.value;
  const API_BASE = window.location.hostname.includes('localhost') || window.location.port === "5500"
  ? 'http://localhost:3000'
  : '';

  try {
    // fetch('http://localhost:3000/api/auth/register') 
    
    const res = await fetch(`${API_BASE}/api/auth/register`, { // to pass data to the server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password ,email })
    });

    const data = await res.json();
    console.log(data)
    if(!res.ok){
      showAlert(data.msg || data.errors?.join('<br>') || 'Registration failed');
    }
    else {
      showAlert(data.msg || 'Registered!','success')
      setTimeout(()=>{window.location.href = "./login.html"},500) // to display success alert and after 5 ms redirect to login page
      form.reset()
    }

  } catch (err) {
    showAlert("Error during registration. Please try again.",'danger');
    console.error(err);
  }
});
