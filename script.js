// Ambil semua elemen input form
const inputElement = [
  document.getElementById("inputUser"),
  document.getElementById("inputPass"),
  document.getElementById("confirmPass"),
  document.getElementById("userRole"),
];

const form = document.getElementById("formInput");
const notification = document.getElementById("notif");
const notifBtn = document.getElementById("btnConfirm");
const notifInformation = document.getElementById("information");
const charNotifUser = document.getElementById("charNotifUser");

notification.style.display = "none";

notifBtn.addEventListener("click", () => {
  notification.style.display = "none";
});

function showNotification(message) {
  notifInformation.innerHTML = message;
  notification.style.display = "flex";
  notification.style.opacity = 0;
  notification.style.transition = "opacity 0.2s ease-in-out";
  notification.style.transform = "translateY(0)";
  setTimeout(() => {
    notification.style.opacity = 1;
  }, 0);
}

function charInfo() {
  const maxLength = inputElement[0].maxLength;
  const textInput = inputElement[0].value.length;
  const calculations = maxLength - textInput;
  const charDisplay = document.getElementById("charInfoUser");
  if (calculations === 0) {
    charDisplay.style.color = "red";
    charDisplay.textContent = "Maksimal karakter tercapai!!";
  } else {
    charDisplay.style.color = "black";
    charDisplay.innerHTML = `USERNAME <p>Karakter tersisa ${calculations}</p>`;
  }
}

function charInputUserAnimation() {
  inputElement[0].addEventListener("focus", () => {
    setTimeout(() => {
      charNotifUser.style.transform = "translateY(0)";
      charNotifUser.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[0].addEventListener("blur", () => {
    setTimeout(() => {
      charNotifUser.style.transform = "translateY(-300px)";
      charNotifUser.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[0].addEventListener("input", charInfo);
}

function charInputPassAnimation() {
  const charNotifPass = document.getElementById("charNotifPass");
  inputElement[1].addEventListener("focus", () => {
    setTimeout(() => {
      charNotifPass.style.transform = "translateY(0)";
      charNotifPass.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[1].addEventListener("blur", () => {
    setTimeout(() => {
      charNotifPass.style.transform = "translateY(-300px)";
      charNotifPass.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[1].addEventListener("input", () => {
    const charInfoPass = document.getElementById("charInfoPass");
    charInfoPass.innerHTML = `PASSWORD <p>"${inputElement[1].value}"</p>`;
  });
}

function saveUserToStorage(key, userData) {
  localStorage.setItem(key, JSON.stringify(userData));
}

function reloadPage() {
  window.location.reload();
}

function handleAdmin(inputValue) {
  if (inputValue[0] === "" && inputValue[1] === "") {
    showNotification("Mohon dilengkapi.");
    return;
  }
  if (inputValue[1] === "") {
    showNotification("Password masih kosong <p>mohon di isi</p>");
    return;
  }
  if (inputElement[1].value.length < 8) {
    showNotification("Password minimal <p>8 karakter </p>");
    return;
  }
  if (inputElement[2].value === "") {
    showNotification("Ketik ulang password anda");
    return;
  }
  if (inputElement[2].value !== inputElement[1].value) {
    showNotification(
      "Password tidak sama, periksa <p>kembali password anda</p>"
    );
    return;
  }
  if (inputValue[0] === "") {
    showNotification("Mohon isi username <p>terlebih dahulu</p>");
    return;
  }
  if (!!localStorage.getItem("admin")) {
    showNotification(
      "Admin sudah ada, silahkan <p>mendaftar sebagai editor</p>"
    );
    notifBtn.onclick = reloadPage;
    return;
  }
  // Notifikasi peringatan kedua kali
  showNotification(
    "Admin hanya diizinkan ada satu <p>maka dari itu mohon diingat</p> <p>info login yang sudah dibuat</p>"
  );
  notifBtn.onclick = () => {
    showNotification(
      `Username: ${inputValue[0]} <p>Password: ${inputValue[1]}</p> <p>Role: ${inputElement[3].value}</p>`
    );
    notifBtn.onclick = () => {
      saveUserToStorage("admin", {
        username: inputValue[0],
        password: inputValue[1],
        role: inputValue[2],
      });
      reloadPage();
    };
  };
}

function handleEditor(inputValue) {
  if (inputValue[0] === "" && inputValue[1] === "") {
    showNotification("Mohon dilengkapi.");
    return;
  }
  if (inputValue[1] === "") {
    showNotification("Password masih kosong <p>mohon di isi</p>");
    return;
  }
  if (inputValue[1].length < 8) {
    showNotification("Password minimal <p>8 karakter </p>");
    return;
  }
  if (inputElement[2].value === "") {
    showNotification("Ketik ulang password anda");
    return;
  }
  if (inputValue[0] === "") {
    showNotification("Mohon isi username <p>terlebih dahulu</p>");
    return;
  }
  if (!!localStorage.getItem("editors")) {
    showNotification(
      "Editor sudah ada, silahkan <p>mendaftar sebagai admin atau login</p>"
    );
    notifBtn.onclick = reloadPage;
    return;
  }
  showNotification(
    `Hanya boleh ada satu editor <p>maka dari itu ingat</p> <p>informasi login anda</p>`
  );

  notifBtn.onclick = () => {
    showNotification(
      `Username: ${inputValue[0]} <p>Password: ${inputValue[1]}</p>`
    );
    notifBtn.onclick = () => {
      saveUserToStorage("editors", {
        username: inputValue[0],
        password: inputValue[1],
        role: inputValue[2],
      });
      reloadPage();
    };
  };
}

document.addEventListener("DOMContentLoaded", () => {
  charInputUserAnimation();
  charInputPassAnimation();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = [
      inputElement[0].value,
      inputElement[1].value,
      inputElement[3].value,
    ];
    const role = inputElement[3].value;
    if (role === "admin") {
      handleAdmin(inputValue);
    } else if (role === "editor") {
      handleEditor(inputValue);
    } else {
      showNotification("Silakan pilih role yang valid.");
    }
  });

  const btnSignIn = document.getElementById("signInBtn");
  btnSignIn.addEventListener("click", () => {
    if (localStorage.length < 2) {
      showNotification(
        "Data role belum lengkap, silahkan <p>daftarkan role admin dan editor</p>"
      );
    } else {
      window.location.href = "Sign-In/index.html";
    }
  });

  const showDataBtn = document.getElementById("checkData");
  showDataBtn.addEventListener("click", () => {
    function checkingData() {
      if (localStorage.getItem("admin")) {
        return "editor";
      } else {
        return "admin";
      }
    }
    if (localStorage.length <= 0) {
      showNotification(
        "Data kosong, silahkan daftarkan <p>admin dan editor untuk cek data</p> "
      );
    } else if (localStorage.length <= 1) {
      showNotification(
        `${localStorage.key(
          0
        )} sudah ada, silahkan <p>daftar sebagai ${checkingData()} <p>untuk cek data</p></p>`
      );
    } else {
      const adminData = JSON.parse(localStorage.getItem("admin"));
      const editorData = JSON.parse(localStorage.getItem("editors"));
      showNotification(` 
        <table>
          <thead>
            <tr>
              <h2>Admin</h2>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${adminData.username}</td>
              <td>${adminData.password}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <h2>Editor</h2>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${editorData.username}</td>
              <td>${editorData.password}</td>
            </tr>
          </tbody>
        </table>`);
      document.getElementById("warning").textContent = "";
    }
  });
});
