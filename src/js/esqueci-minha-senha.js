/**
 * Script.js - Lógica da Página de Recuperação de Senha
 *
 * Funcionalidades:
 * - Validação de email
 * - Simulação de envio de email
 * - Exibição de tela de sucesso
 * - Reset do formulário
 */

// Elementos do DOM
const recoveryForm = document.getElementById("recoveryForm");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const formContainer = document.getElementById("formContainer");
const formContent = document.querySelector(".form-content");
const successContent = document.getElementById("successContent");
const emailDisplay = document.getElementById("emailDisplay");
const btnText = document.querySelector(".btn-text");
const spinner = document.querySelector(".spinner");

/**
 * Valida o formato do email
 * @param {string} email - Email a validar
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Mostra o spinner de carregamento
 */
function showSpinner() {
  btnText.classList.add("hidden");
  spinner.classList.remove("hidden");
  submitBtn.disabled = true;
  emailInput.disabled = true;
}

/**
 * Esconde o spinner de carregamento
 */
function hideSpinner() {
  btnText.classList.remove("hidden");
  spinner.classList.add("hidden");
  submitBtn.disabled = false;
  emailInput.disabled = false;
}

/**
 * Exibe a tela de sucesso
 * @param {string} email - Email para exibir na mensagem
 */
function showSuccessScreen(email) {
  emailDisplay.textContent = email;
  formContent.classList.add("hidden");
  successContent.classList.remove("hidden");
}

/**
 * Reseta o formulário e volta para a tela inicial
 */
function resetForm() {
  emailInput.value = "";
  formContent.classList.remove("hidden");
  successContent.classList.add("hidden");
  hideSpinner();
  emailInput.focus();
}

/**
 * Manipula o envio do formulário
 */
recoveryForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  // Validação do email
  if (!email) {
    alert("Por favor, digite seu email");
    return;
  }

  if (!validateEmail(email)) {
    alert("Por favor, digite um email válido");
    emailInput.focus();
    return;
  }

  // Mostra spinner
  showSpinner();

  // Simula o envio do email (1.5 segundos de delay)
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Sucesso: exibe tela de confirmação
    showSuccessScreen(email);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    alert("Erro ao enviar email. Tente novamente.");
    hideSpinner();
  }
});

/**
 * Validação em tempo real do email
 */
emailInput.addEventListener("input", (e) => {
  const email = e.target.value.trim();

  // Remove mensagens de erro anteriores (se houver)
  const existingError =
    emailInput.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Validação visual (opcional)
  if (email && !validateEmail(email)) {
    emailInput.style.borderColor = "#E74C3C";
  } else {
    emailInput.style.borderColor = "#E0E0E0";
  }
});

/**
 * Foca no campo de email ao carregar a página
 */
window.addEventListener("load", () => {
  emailInput.focus();
});

/**
 * Suporte a tecla Enter para enviar o formulário
 */
emailInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    recoveryForm.dispatchEvent(new Event("submit"));
  }
});

/**
 * Previne comportamento padrão de links internos
 */
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

console.log("Script de recuperação de senha carregado com sucesso!");
