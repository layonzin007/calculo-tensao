<?php
// Conectar ao banco de dados MySQL
$servername = "localhost";
$username = "usuario";
$password = "senha";
$database = "calculo_tensao";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexão
if ($conn->connect_error) {
    die(json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]));
}

// Pegar dados JSON enviados pelo JavaScript
$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    die(json_encode(["erro" => "Nenhum dado recebido"]));
}

$corrente = $dados['corrente'];
$comprimento = $dados['comprimento'];
$raio = $dados['raio'];
$resistividade = $dados['resistividade'];
$quedaTensao = $dados['quedaDeTensao'];

// Inserir dados no banco de dados
$sql = "INSERT INTO resultados (corrente, comprimento, raio, resistividade, queda_tensao) 
        VALUES ('$corrente', '$comprimento', '$raio', '$resistividade', '$quedaTensao')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Dados salvos com sucesso!", "dadosRecebidos" => $dados]);
} else {
    echo json_encode(["erro" => "Erro ao salvar os dados: " . $conn->error]);
}

$conn->close();
?>
