// Inisialisasi EmailJS dengan format yang benar untuk SDK v4
(function() {
  emailjs.init({
    publicKey: "eHJBJjDP01-l34gKE"
  });
})();

function kirimEmail() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Silakan masukkan email terlebih dahulu.");
    return;
  }

  // Tampilkan indikator loading jika diperlukan
  // document.getElementById("loading").style.display = "block";

  emailjs.send("service_u6rv06k", "template_b53qf9v", {
    to_email: email,
    // Pastikan nama parameter sesuai dengan template di EmailJS
    // Jika template Anda memiliki parameter lain, tambahkan di sini
  }).then(function(response) {
    // document.getElementById("loading").style.display = "none";
    alert("Terima kasih! Informasi workshop telah dikirim ke email kamu.");
    document.getElementById("email").value = ""; // Bersihkan form
  }, function(error) {
    // document.getElementById("loading").style.display = "none";
    console.error("Email gagal dikirim", error);
    alert("Maaf, terjadi kesalahan. Coba lagi nanti.");
  });
}