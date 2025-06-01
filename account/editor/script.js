const data = [
  document.getElementById("username"),
  document.getElementById("password"),
  document.getElementById("role"),
];
let editorData = JSON.parse(localStorage.getItem("editors")) || {};
data[0].textContent = editorData.username || "";
data[1].value = editorData.password || "";
data[2].textContent = editorData.role || "";

const button = [
  document.getElementById("reset"),
  document.getElementById("back"),
  document.getElementById("cancel"),
  document.getElementById("btnConfirm"),
];

button[2].style.display = "none";

let notification = document.getElementById("notif");
notification.style.display = "none";

const notifInformation = document.getElementById("notifInformation");

function formNotifAnimation() {
  notification.style.display = "flex";
  notification.style.opacity = 0;
  notification.style.transition = "opacity 0.2s ease-in-out";
  notification.style.transform = "translateY(0)";
  setTimeout(() => {
    notification.style.opacity = 1;
  }, 0);
}

function updatePassword(newPassword) {
  editorData.password = newPassword;
  localStorage.setItem("editors", JSON.stringify(editorData));
  formNotifAnimation();
  notifInformation.textContent = "Password berhasil diubah!!";
  button[3].addEventListener("click", () => {
    notification.style.display = "none";
    window.location.reload();
  });
}

button[1].addEventListener(
  "click",
  () => (window.location.href = "../../index.html")
);

button[0].addEventListener("click", () => {
  data[1].removeAttribute("disabled");
  let isChanging = false;

  if (button[0].clickedOnce) {
    isChanging = false;
    data[1].setAttribute("disabled", "true");
    button[0].clickedOnce = false;
    button[0].textContent = "Change";
    data[1].value = editorData.password;
    button[2].style.display = "none";
    data[1].style.boxShadow = "0px 0px 0px";
  } else {
    isChanging = true;
    button[0].clickedOnce = true;
    button[0].textContent = "cancel";
    data[1].style.boxShadow = "0px 0px 10px black";

    data[1].addEventListener("input", () => {
      button[2].style.display = "flex";
      button[2].addEventListener("click", () => {
        if (data[1].value === "") {
          formNotifAnimation();
          notifInformation.textContent = "Password tidak boleh kosong";
          button[3].addEventListener("click", () => {
            notification.style.display = "none";
            window.location.reload();
          });
        } else if (data[1].value.length < 7) {
          formNotifAnimation();
          notifInformation.innerHTML =
            "Password tidak boleh <p>kurang dari 8 karakter</p>";
          button[3].addEventListener("click", () => {
            notification.style.display = "none";
            window.location.reload();
          });
        } else {
          formNotifAnimation();
          notifInformation.innerHTML = `apakah anda ingin mengganti <p>password anda menjadi</p> <p>${data[1].value}</p>`;
          button[3].addEventListener("click", () => {
            updatePassword(data[1].value);
          });
        }
      });
    });
  }
});
