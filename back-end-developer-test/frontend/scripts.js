const apiUrl = "https://desafiogdm-production.up.railway.app"; // Ajuste para a URL da sua API

// Função de Cadastro
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
        alert("Cadastro realizado! Faça login.");
        window.location.href = "index.html";
    } else {
        alert("Erro ao cadastrar.");
    }
});

// Função de Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
        const token = data.token;
        const user = data.user;
        console.log("🚀 ~ document.getElementById ~ user:", user)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "user.html";
    } else {
        alert("Falha no login.");
    }
});

// Função de Atualizar Dados do Usuário
document.getElementById("updateForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const name = document.getElementById("updateName").value;
    const email = document.getElementById("updateEmail").value;
    const password = document.getElementById("updatePassword").value;

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(`${apiUrl}/user/${user._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
        alert("Dados atualizados!");
    } else {
        alert("Erro ao atualizar.");
    }
});

// Função de Deletar Conta
document.getElementById("deleteAccount")?.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("🚀 ~ document.getElementById ~ user:", user)

    const response = await fetch(`${apiUrl}/user/${user._id}`, {
        method: "DELETE",
        headers: { Authorization: `${token}` },
    });

    if (response.ok) {
        alert("Conta deletada!");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    } else {
        alert("Erro ao deletar conta.");
    }
});

// Função de Logout
document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "index.html";
});
