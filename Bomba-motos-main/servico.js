const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

const veiculoSelect = document.getElementById("veiculo");
const form = document.getElementById("formServico");

function carregarVeiculos() {
  veiculos.forEach((v, index) => {
    const nomeCliente = clientes[v.clienteIndex]?.nome || "Desconhecido";
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = `${v.modelo} - ${v.placa} (${nomeCliente})`;
    veiculoSelect.appendChild(opt);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputData = document.getElementById("data").value;

  // Verifica se a data é válida
  if (!inputData) {
    alert("Por favor, selecione uma data.");
    return;
  }

  let dataFormatada;
  try {
    dataFormatada = new Date(inputData).toISOString().split("T")[0];
  } catch (error) {
    alert("Data inválida. Tente novamente.");
    return;
  }

  const servico = {
    veiculoIndex: parseInt(veiculoSelect.value),
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    data: dataFormatada
  };

  servicos.push(servico);
  localStorage.setItem("servicos", JSON.stringify(servicos));

  alert("Serviço cadastrado com sucesso!");
  form.reset();
});

carregarVeiculos();
