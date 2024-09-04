const form = document.querySelector("form");
const codeContainer = document.getElementById("qr-code");
const downloadBtn = document.getElementById("download-btn");

const generateQRCode = (URL) => {
  codeContainer.textContent = "";

  const QRcodeGen = new QRCode(codeContainer, {
    text: "",
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",

    correctLevel: QRCode.CorrectLevel.H,
  });

  document.getElementById("main-logo").classList.add("show");
  document.getElementById("main-logo").classList.remove("hidden");

  document.getElementById("qr-display").classList.remove("hidden");
  document.getElementById("qr-display").classList.add("main-content");

  form.classList.add("hidden");
  form.classList.remove("main-content");

  QRcodeGen.clear();
  QRcodeGen.makeCode(URL);
};

const init = () => {
  console.log("loaded");

  form.classList.remove("hidden");
  form.classList.add("main-content");

  document.getElementById("main-logo").classList.add("hidden");
  document.getElementById("main-logo").classList.remove("show");
  document.getElementById("qr-display").classList.add("hidden");
  document.getElementById("qr-display").classList.remove("main-content");
};

const handleDownload = () => {
  const canvas = codeContainer.querySelector("canvas");
  if (!canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  canvas.toBlob((blob) => {
    if (!blob) {
      alert("Failed to download QR code.");
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "QRcode.png";
    link.click();
  });
};

const handleShare = () => {
  const canvas = codeContainer.querySelector("canvas");
  if (!canvas) {
    alert("Please generate a QR code first.");
    return;
  }
  canvas.toBlob((blob) => {
    if (!blob) {
      alert("Failed to share QR code.");
      return;
    }
    const url = URL.createObjectURL(blob);
    navigator.share({
      title: "QR Code Generator",
      text: "Generate QR Codes with this free QR Code Generator",
      url,
    });
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const URL = event.target.URL.value;

  console.log(URL);

  generateQRCode(URL);
};

document.addEventListener("DOMContentLoaded", init);

form.addEventListener("submit", handleSubmit);

document.getElementById("main-logo").addEventListener("click", init);

downloadBtn.addEventListener("click", handleDownload);
