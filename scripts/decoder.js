const button = document.querySelector(".decode-btn");
const form = document.getElementById("qrcode");
const preview = document.querySelector(".qr-preview");
const status = document.querySelector(".status");
const decoded = document.querySelector("#decoded");
const decodedText = document.querySelector("#decoded-text");

const fetchRequest = (formData) => {
  fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;

      status.style.display = "none";
      decoded.style.display = "block";

      if (result === null) {
        decodedText.innerHTML = "Not a valid QR Code!";
      } else {
        decodedText.innerHTML = result;
      }

      button.classList.remove("disabled");
    });
};

form.onchange = function (e) {
  decoded.style.display = "none";
  button.style.display = "block";

  const [file] = form.files;
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
};

const submitHandler = () => {
  decoded.style.display = "none";
  
  if (form.files.length < 1) {
    alert("No files selected!");
  } else {
    button.classList.add("disabled");
    status.style.display = "block";

    const [file] = form.files;
    const formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData);
  }
};
