<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("db_connect.php");

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $acao = $_GET['acao'] ?? '';

    if ($acao === 'registrar') {
        $nome = $data['nome'] ?? null;
        $email = $data['email'] ?? null;
        $senha = $data['senha'] ?? null;

        if (!$nome || !$email || !$senha) {
            http_response_code(400);
            echo json_encode(["erro" => "Nome, email e senha são obrigatórios."]);
            exit;
        }

        $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
        $stmt->execute([$nome, $email, $senha_hash]);

        echo json_encode(["mensagem" => "Usuário registrado com sucesso."]);
        exit;
    }

    if ($acao === 'login') {
        $email = $data['email'] ?? null;
        $senha = $data['senha'] ?? null;

        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch();

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            echo json_encode([
                "mensagem" => "Login bem-sucedido",
                "usuario" => [
                    "id" => $usuario['id'],
                    "nome" => $usuario['nome'],
                    "email" => $usuario['email']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["erro" => "Email ou senha inválidos."]);
        }
        exit;
    }

    http_response_code(400);
    echo json_encode(["erro" => "Ação inválida. Use ?acao=registrar ou ?acao=login"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
