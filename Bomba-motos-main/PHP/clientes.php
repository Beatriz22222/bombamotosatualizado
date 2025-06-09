<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once("db_connect.php");

$stmt = $pdo->query("SELECT * FROM clientes");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
