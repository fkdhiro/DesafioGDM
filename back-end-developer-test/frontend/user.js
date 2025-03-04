document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
      alert("Usuário não autenticado. Faça login.");
      window.location.href = "login.html";
      return;
  }

  // Preenche os campos do formulário com os dados do usuário
  document.getElementById("updateName").value = user.name;
  document.getElementById("updateEmail").value = user.email;
});
