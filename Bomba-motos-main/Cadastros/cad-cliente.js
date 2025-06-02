const form = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");

const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");

// Máscara CPF: 999.999.999-99
cpfInput.addEventListener("input", () => {
  let value = cpfInput.value.replace(/\D/g, "").slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = value;
});

// Máscara Telefone: (99) 99999-9999
telefoneInput.addEventListener("input", () => {
  let value = telefoneInput.value.replace(/\D/g, "").slice(0, 11);
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  telefoneInput.value = value;
});

// Validação de CPF real
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let dig1 = (soma * 10) % 11;
  if (dig1 === 10 || dig1 === 11) dig1 = 0;
  if (dig1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  let dig2 = (soma * 10) % 11;
  if (dig2 === 10 || dig2 === 11) dig2 = 0;
  return dig2 === parseInt(cpf.charAt(10));
}

function carregarClientes() {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  listaClientes.innerHTML = "";

  clientes.forEach((cliente, index) => {
    const div = document.createElement("div");
    div.classList.add("cliente-item");
    div.innerHTML = `
      <strong>${cliente.nome}</strong><br>
      Telefone: ${cliente.telefone}<br>
      CPF: ${cliente.cpf || 'Não informado'}<br>
      Endereço: ${cliente.endereco || 'Não informado'}
    `;
    listaClientes.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = telefoneInput.value.trim();
  const cpf = cpfInput.value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  if (nome === "" || telefone === "" || endereco === "") {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (cpf && !validarCPF(cpf)) {
    alert("CPF inválido. Por favor, digite um CPF válido.");
    return;
  }

  const novoCliente = { nome, telefone, cpf, endereco };
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  clientes.push(novoCliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));

  form.reset();
  carregarClientes();
});

// Inicializa ao abrir a página
carregarClientes();
