// const socket = io("http://localhost:3000");
const socket = io()
// Unlock audio playback by waiting for first user interaction
document.addEventListener("click", () => {
  const audio = document.getElementById("notification-sound");
  if (audio) {
    audio.play()
      .then(() => {
        // Pause only after play has started to avoid the AbortError
        audio.pause();
        audio.currentTime = 0;
      }).catch(() => {
        // Ignore errors here
      });
  }
}, { once: true }); // Run only once



let username;

while (!username) {
  username = prompt("Enter your chat name to join the chat:");
  if (!username || username.trim() === "") {
    alert("Username is required to enter chat.");
  }
}
const avatar = `https://robohash.org/${username}.png`; // or any avatar URL generator
document.getElementById("welcome-msg").innerHTML = `<span class="status-dot"></span>Welcome, ${username}!`;
const messageDiv = document.getElementById("messages");
const UserMessage = document.getElementById("message-input");
const sendBtn = document.getElementById("sendMessage");
const onlineCount = document.getElementById("online-count");
const olusers = document.getElementById("online-users");
const inputBox = document.getElementById("message-input")

// Emit join event to server
socket.emit("join", username);

// listen to joined event from server to display joined message
socket.on("joined", (data) => {
  const p = document.createElement("p");
  p.innerText = data;
  p.classList.add("system-message");
  messageDiv.appendChild(p);
});
// listen to event to update the online users
socket.on("update-users", (data) => {
  onlineCount.textContent = data.count;
  // Render full list of users
  olusers.innerHTML = "";
  data.users.forEach((user) => {
    const listEl = document.createElement("li");
    listEl.classList.add("online-user");
    listEl.innerHTML = `<span class="status-dot"></span> ${user}`
    olusers.appendChild(listEl);
  });
});

// Emit sendMessage when you sent message to other users
sendBtn.addEventListener("click", () => {
  const messageInput = UserMessage.value.trim();
  if (messageInput) {
    const message = {
      username,
      avatar,
      messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    socket.emit("sendMessage", message); // send to server
    // add message to the list
    addMessage(message, true); // Display to self
    UserMessage.value = "";
  }
});
//  Listen for broadcast message , and add it to the list.
socket.on("broadcast_message", (data) => {
  if (data.username !== username) {
    addMessage(data, false);
    // play notification sound
    const audio = document.getElementById("notification-sound");
    audio.currentTime = 0; // rewind to start
    audio.volume = 1;
    audio.muted = false;
    audio.play().catch((e) => {
      console.log("Auto-play blocked by browser:", e);
    });
  }
});
// Display previous messages on UI
socket.on("load_messages", (messages) => {
  messages.forEach((message) => {
    addMessage(message, false);
  })
})

// Emit typing... Indicator event..

inputBox.addEventListener("input", () => {
  if (inputBox.value.trim() != "") {
    socket.emit("typing");
  } else {
    socket.emit("stopTyping");
  }
});

//  When user focuses into the input box
inputBox.addEventListener("focus", () => {
  if (inputBox.value.trim() !== "") {
    socket.emit("typing");
  }
});
// stop typing on blur
inputBox.addEventListener("blur", () => {
  socket.emit("stopTyping");
})

// stop typing when user sends a message
sendBtn.addEventListener("click", () => {
  socket.emit("stopTyping");
})

// Listen to the typingUpdate Event from server

const typingIndicator = document.getElementById("typing")

socket.on("typingUpdate", (typingUsers) => {
  if (typingUsers.length == 0) {
    typingIndicator.textContent = ""
  }
  else if (typingUsers.length === 1) {
    typingIndicator.textContent = `${typingUsers[0]}  typing...`;
  }
  else if (typingUsers.length === 2) {
    typingIndicator.textContent = `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
  }
  else {
    typingIndicator.textContent = `${typingUsers.slice(0, 2).join(",")} and others are typing...`
  }
})


// logout functioning

const logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
  socket.emit("logout")
  window.location.href = "../../../frontend/login.html";
})
// Render message to the list

function addMessage(data, isSelf = false) {
  const container = document.createElement("div");
  container.classList.add(
    "message-container",
    isSelf ? "self-message" : "other-message"
  );
  container.innerHTML = `
    ${!isSelf ? `<img src="${data.avatar}" class="avatar">` : ""}
    <div class="message-content">
      <div class="message-head">
        <strong>${isSelf ? data.username : data.sender}</strong>
        <div class="meta">${data.time}</div>
      </div>
      <div class="content">${isSelf ? data.messageInput : data.message}</div>
    </div>
    ${isSelf ? `<img src="${data.avatar}" class="avatar">` : ""}
  `;

  messageDiv.appendChild(container);
  messageDiv.scrollTop = messageDiv.scrollHeight;
}
