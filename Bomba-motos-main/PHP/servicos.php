<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("db_connect.php");

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $placa = $data['placa'] ?? null;
        $modelo = $data['modelo'] ?? null;
        $descricao = $data['descricao'] ?? null;
        $dataEntrada = $data['dataEntrada'] ?? null;
        $valor = $data['valor'] ?? 0;
        $cliente_id = $data['cliente_id'] ?? null; // novo campo opcional

        if (!$placa || !$modelo || !$descricao || !$dataEntrada) {
            http_response_code(400);
            echo json_encode(["erro" => "Campos obrigatórios estão faltando."]);
            exit;
        }

        $stmt = $pdo->prepare("SELECT id FROM veiculos WHERE placa = ?");
        $stmt->execute([$placa]);
        $veiculo = $stmt->fetch();

        if ($veiculo) {
            $veiculo_id = $veiculo['id'];
        } else {
            $stmt = $pdo->prepare("INSERT INTO veiculos (modelo, placa, cliente_id) VALUES (?, ?, ?)");
            $stmt->execute([$modelo, $placa, $cliente_id]);
            $veiculo_id = $pdo->lastInsertId();
        }

        $sql = "INSERT INTO servicos (veiculo_id, data_entrada, descricao, valor) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$veiculo_id, $dataEntrada, $descricao, $valor]);

        echo json_encode(["mensagem" => "Serviço cadastrado com sucesso."]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query("
            SELECT s.*, v.modelo, v.placa, c.nome AS cliente
            FROM servicos s
            JOIN veiculos v ON s.veiculo_id = v.id
            LEFT JOIN clientes c ON v.cliente_id = c.id
        ");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>

