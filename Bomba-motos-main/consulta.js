const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
      const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
      const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

      const listaClientes = document.getElementById("listaClientes");
      const listaVeiculos = document.getElementById("listaVeiculos");
      const listaServicos = document.getElementById("listaServicos");

      function renderClientes(filtro = "") {
        listaClientes.innerHTML = "";
        clientes
          .filter((c) => c.nome.toLowerCase().includes(filtro.toLowerCase()))
          .forEach((c) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Nome:</strong> ${c.nome}<br><strong>Telefone:</strong> ${c.telefone}`;
            listaClientes.appendChild(li);
          });
      }

      function renderVeiculos(filtro = "") {
        listaVeiculos.innerHTML = "";
        veiculos
          .filter(
            (v) =>
              v.placa.toLowerCase().includes(filtro.toLowerCase()) ||
              v.modelo.toLowerCase().includes(filtro.toLowerCase())
          )
          .forEach((v, i) => {
            const cliente = clientes[v.clienteIndex]?.nome || "Desconhecido";
            const li = document.createElement("li");
            li.innerHTML = `<strong>Modelo:</strong> ${v.modelo} <br><strong>Placa:</strong> ${v.placa} <br><strong>Dono:</strong> ${cliente}`;
            listaVeiculos.appendChild(li);
          });
      }

      function renderServicos(filtro = "") {
        listaServicos.innerHTML = "";

        servicos
          .filter((s) => {
            const dataOriginal = s.data;
            const dataFormatada = dataOriginal.includes("-")
              ? dataOriginal
              : dataOriginal.split("/").reverse().join("-"); // converte dd/mm/yyyy para yyyy-mm-dd

            return dataFormatada.includes(filtro);
          })
          .forEach((s) => {
            const veiculo = veiculos[s.veiculoIndex];
            const cliente =
              clientes[veiculo?.clienteIndex]?.nome || "Desconhecido";
            const li = document.createElement("li");
            li.innerHTML = `
        <strong>Data:</strong> ${s.data}<br>
        <strong>Veículo:</strong> ${veiculo?.modelo || "?"} (${
              veiculo?.placa || "?"
            })<br>
        <strong>Cliente:</strong> ${cliente}<br>
        <strong>Descrição:</strong> ${s.descricao}<br>
        <strong>Valor:</strong> R$ ${s.valor.toFixed(2)}
      `;
            listaServicos.appendChild(li);
          });
      }

      document
        .getElementById("filtroCliente")
        .addEventListener("input", (e) => renderClientes(e.target.value));
      document
        .getElementById("filtroVeiculo")
        .addEventListener("input", (e) => renderVeiculos(e.target.value));
      document
        .getElementById("filtroServico")
        .addEventListener("input", (e) => renderServicos(e.target.value));

      renderClientes();
      renderVeiculos();
      renderServicos();
    