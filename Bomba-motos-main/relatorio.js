function calcularResumo() {
    let listaServicos = JSON.parse(localStorage.getItem("servicos")) || [];

    let totalArrecadado = 0;
    let totalMotos = new Set();
    let totalServicos = listaServicos.length;

    let hoje = new Date().toISOString().split("T")[0];
    let dataAtual = new Date();
    let inicioSemana = new Date(dataAtual.setDate(dataAtual.getDate() - dataAtual.getDay()));
    let inicioMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);

    let arrecadacaoDiaria = 0;
    let arrecadacaoSemanal = 0;
    let arrecadacaoMensal = 0;

    listaServicos.forEach(servico => {
        let valor = parseFloat(servico.valor) || 0;
        totalArrecadado += valor;
        totalMotos.add(servico.modelo);

        let dataServico = new Date(servico.dataEntrada);

        if (servico.dataEntrada === hoje) {
            arrecadacaoDiaria += valor;
        }

        if (dataServico >= inicioSemana) {
            arrecadacaoSemanal += valor;
        }

        if (dataServico >= inicioMes) {
            arrecadacaoMensal += valor;
        }
    });

    document.getElementById("totalArrecadado").innerText = `R$ ${totalArrecadado.toFixed(2)}`;
    document.getElementById("totalMotos").innerText = totalMotos.size;
    document.getElementById("totalServicos").innerText = totalServicos;
    document.getElementById("arrecadacaoDiaria").innerText = `R$ ${arrecadacaoDiaria.toFixed(2)}`;
    document.getElementById("arrecadacaoSemanal").innerText = `R$ ${arrecadacaoSemanal.toFixed(2)}`;
    document.getElementById("arrecadacaoMensal").innerText = `R$ ${arrecadacaoMensal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", calcularResumo);
