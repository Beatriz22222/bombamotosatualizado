<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once("db_connect.php");

$stmt = $pdo->query("
    SELECT v.*, c.nome AS cliente_nome
    FROM veiculos v
    LEFT JOIN clientes c ON v.cliente_id = c.id
");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
