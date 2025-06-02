<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once("db.php");

$stmt = $pdo->query("
    SELECT s.*, v.modelo 
    FROM servicos s
    JOIN veiculos v ON s.veiculo_id = v.id
");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
