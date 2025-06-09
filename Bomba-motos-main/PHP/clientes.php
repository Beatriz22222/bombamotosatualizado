<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("db_connect.php");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query("SELECT * FROM clientes");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $data['nome'] ?? null;
        $telefone = $data['telefone'] ?? null;

        if ($nome) {
            $stmt = $pdo->prepare("INSERT INTO clientes (nome, telefone) VALUES (?, ?)");
            $stmt->execute([$nome, $telefone]);
            echo json_encode(["mensagem" => "Cliente cadastrado com sucesso."]);
        } else {
            http_response_code(400);
            echo json_encode(["erro" => "Nome é obrigatório."]);
        }
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
