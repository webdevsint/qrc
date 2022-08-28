document.getElementById('qrcode').onchange = function () {
  const fileName = this.value.replace(/C:\\fakepath\\/g, '')
  alert(this.value);
};