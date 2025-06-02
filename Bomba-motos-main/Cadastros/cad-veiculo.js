const selectCliente = document.getElementById("cliente");
    const form = document.getElementById("formVeiculo");
    const listaVeiculos = document.getElementById("listaVeiculos");

    function carregarClientes() {
      const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
      selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';
      clientes.forEach((cliente, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = cliente.nome;
        selectCliente.appendChild(option);
      });
    }

    function carregarVeiculos() {
      const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
      const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
      listaVeiculos.innerHTML = "";

      veiculos.forEach(veiculo => {
        const clienteNome = clientes[veiculo.clienteIndex]?.nome || "Desconhecido";
        const div = document.createElement("div");
        div.classList.add("veiculo-item");
        div.innerHTML = `
          <strong>${veiculo.modelo}</strong><br>
          Placa: ${veiculo.placa}<br>
          Cor: ${veiculo.cor || "Não informada"}<br>
          Cliente: ${clienteNome}
        `;
        listaVeiculos.appendChild(div);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const clienteIndex = selectCliente.value;
      const modelo = document.getElementById("modelo").value.trim();
      const placa = document.getElementById("placa").value.trim();
      const cor = document.getElementById("cor").value.trim();

      if (clienteIndex === "" || modelo === "" || placa === "") return;

      const novoVeiculo = { clienteIndex, modelo, placa, cor };
      const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
      veiculos.push(novoVeiculo);
      localStorage.setItem("veiculos", JSON.stringify(veiculos));

      form.reset();
      carregarVeiculos();
    });

    carregarClientes();
    carregarVeiculos();