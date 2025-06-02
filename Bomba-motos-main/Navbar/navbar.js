document.addEventListener("DOMContentLoaded", function () {
  fetch("Navbar/navbar.html") // Caminho atualizado
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      // Se quiser aplicar o CSS também dinamicamente:
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "Navbar/navbar.css";
      document.head.appendChild(link);
    })
    .catch(error => {
      console.error("Erro ao carregar o navbar:", error);
    });
});
