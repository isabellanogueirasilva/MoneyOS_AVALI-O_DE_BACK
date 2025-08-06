
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");
const formTitle = document.getElementById("form-title");

const loginMessage = document.getElementById("login-message");
const signupMessage = document.getElementById("signup-message");

const tipoContaSelect = document.getElementById("tipo-conta");
const cpfInput = document.getElementById("cpf");
const cnpjInput = document.getElementById("cnpj");


tipoContaSelect.addEventListener("change", () => {
  if (tipoContaSelect.value === "fisica") {
    cpfInput.style.display = "block";
    cpfInput.required = true;
    cnpjInput.style.display = "none";
    cnpjInput.required = false;
  } else if (tipoContaSelect.value === "juridica") {
    cnpjInput.style.display = "block";
    cnpjInput.required = true;
    cpfInput.style.display = "none";
    cpfInput.required = false;
  } else {
    cpfInput.style.display = "none";
    cnpjInput.style.display = "none";
    cpfInput.required = false;
    cnpjInput.required = false;
  }
});


switchToSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "flex";
  formTitle.textContent = "Criar Conta no MoneyOS";
  clearMessages();
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "flex";
  formTitle.textContent = "Entrar no MoneyOS";
  clearMessages();
});

function clearMessages() {
  loginMessage.textContent = "";
  signupMessage.textContent = "";
  loginMessage.className = "message";
  signupMessage.className = "message";
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearMessages();

  const email = loginForm.querySelector('input[type="email"]').value.trim();
  const password = loginForm.querySelector('input[type="password"]').value.trim();

  if (!email.includes("@") || password.length < 6) {
    loginMessage.textContent = "Email inválido ou senha menor que 6 caracteres.";
    loginMessage.classList.add("error");
  } else {
    loginMessage.textContent = "Login realizado com sucesso! Redirecionando...";
    loginMessage.classList.add("success");
    setTimeout(() => {
      window.location.href = "pagehome.html";
    }, 1500);
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearMessages();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const tipoConta = tipoContaSelect.value;
  const cpf = cpfInput.value.trim();
  const cnpj = cnpjInput.value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (nome.length < 3) {
    signupMessage.textContent = "Nome deve ter ao menos 3 caracteres.";
    signupMessage.classList.add("error");
    return;
  }

  if (!email.includes("@")) {
    signupMessage.textContent = "Email inválido.";
    signupMessage.classList.add("error");
    return;
  }

  if (!/^\d{10,11}$/.test(telefone)) {
    signupMessage.textContent = "Telefone inválido. Digite somente números com DDD.";
    signupMessage.classList.add("error");
    return;
  }

  if (tipoConta === "") {
    signupMessage.textContent = "Selecione o tipo de conta.";
    signupMessage.classList.add("error");
    return;
  }

  if (tipoConta === "fisica" && !/^\d{11}$/.test(cpf)) {
    signupMessage.textContent = "CPF inválido. Deve conter 11 números.";
    signupMessage.classList.add("error");
    return;
  }

  if (tipoConta === "juridica" && !/^\d{14}$/.test(cnpj)) {
    signupMessage.textContent = "CNPJ inválido. Deve conter 14 números.";
    signupMessage.classList.add("error");
    return;
  }

  if (senha.length < 6) {
    signupMessage.textContent = "Senha deve ter ao menos 6 caracteres.";
    signupMessage.classList.add("error");
    return;
  }

  signupMessage.textContent = "Cadastro realizado com sucesso! Você pode entrar agora.";
  signupMessage.classList.add("success");

  setTimeout(() => {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
    formTitle.textContent = "Entrar no MoneyOS";
    clearMessages();
  }, 1500);
});

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }
});
