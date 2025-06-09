-- 1. Cria o banco de dados se ele ainda não existir.
CREATE DATABASE IF NOT EXISTS bomba_motos;
-- 2. Seleciona o banco de dados para uso.
USE bomba_motos;
-- 3. Cria a tabela 'clientes'.
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20)
);
-- 4. Cria a tabela 'veiculos'.
CREATE TABLE IF NOT EXISTS veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
-- 5. Cria a tabela 'servicos'.
CREATE TABLE IF NOT EXISTS servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_id INT,
    data_entrada DATE NOT NULL,
    descricao TEXT,
    valor DECIMAL(10, 2) NOT NULL,
    data_saida DATE,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);
-- 6. Cria a tabela 'usuarios' (para autenticação).
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Armazene senhas HASHED (criptografadas)!
    email VARCHAR(255) UNIQUE
);
SHOW TABLES;
DESCRIBE clientes;
DESCRIBE veiculos;
DESCRIBE servicos;
DESCRIBE usuarios; -- Se você a criou