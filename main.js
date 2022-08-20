const input = document.querySelector("input");

const qr = document.querySelector(".qr");
const qrbox = document.querySelector("#qrbox");
const status = document.querySelector(".status");

const buttons = document.querySelector(".buttons");

function generateQRCode(text) {
  const qrcode = new QRCode("qrbox", {
    text: text,
    width: 300,
    height: 300,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

function download(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function submitHandler() {
  if (input.value.length > 0) {
    deleteHandler();
    
    qr.style.display = "block";
    status.style.display = "block";

    setTimeout(() => {

      if (screen.width < 532) {
        document.querySelector('.footer').style.position = 'relative'
      } else if (screen.width > 532) {
        document.querySelector('.footer').style.position = 'absolute'
      }

      status.style.display = "none";

      generateQRCode(input.value);

      const image = qrbox.querySelector("img");
      document.querySelector(".download").onclick = () => {
        download(image.src);
      };

      qrbox.style.display = "block";
      buttons.style.display = "flex";
    }, 1000);
  } else {
    alert("Input field is empty!");
  }
}

function deleteHandler() {
  if (screen.width < 532) {
    document.querySelector('.footer').style.position = 'absolute'
  } else if (screen.width > 532) {
    document.querySelector('.footer').style.position = 'absolute'
  }

  qrbox.innerHTML = "";
  buttons.style.display = "none";
  qr.style.display = "none";
}
