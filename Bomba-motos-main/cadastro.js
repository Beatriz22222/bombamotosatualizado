document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    let modelo = document.getElementById("modelo").value;
    let servico = document.getElementById("servico").value;
    let dataEntrada = document.getElementById("dataEntrada").value;
    let dataSaida = document.getElementById("dataSaida").value;
    let valor = document.getElementById("valor").value;

    let servicoCadastrado = {
        modelo,
        servico,
        dataEntrada,
        dataSaida,
        valor
    };

    let listaServicos = JSON.parse(localStorage.getItem("servicos")) || [];
    listaServicos.push(servicoCadastrado);
    localStorage.setItem("servicos", JSON.stringify(listaServicos));

    document.getElementById("formCadastro").reset();

    alert("Serviço cadastrado com sucesso!");
});
