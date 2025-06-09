<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("db_connect.php");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query("
            SELECT v.*, c.nome AS cliente_nome
            FROM veiculos v
            LEFT JOIN clientes c ON v.cliente_id = c.id
        ");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $modelo = $data['modelo'] ?? null;
        $placa = $data['placa'] ?? null;
        $cliente_id = $data['cliente_id'] ?? null;

        if (!$modelo || !$placa) {
            http_response_code(400);
            echo json_encode(["erro" => "Modelo e placa são obrigatórios."]);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO veiculos (modelo, placa, cliente_id) VALUES (?, ?, ?)");
        $stmt->execute([$modelo, $placa, $cliente_id]);

        echo json_encode(["mensagem" => "Veículo cadastrado com sucesso."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
