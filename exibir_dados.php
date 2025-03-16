<?php
// Conectar ao banco de dados MySQL
$servername = "localhost";
$username = "usuario";
$password = "senha";
$database = "calculo_tensao";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Buscar os dados do banco
$sql = "SELECT * FROM resultados ORDER BY data_calculo DESC";
$result = $conn->query($sql);

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados Salvos</title>
</head>
<body>
    <h1>Resultados Salvos</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Corrente (A)</th>
            <th>Comprimento (m)</th>
            <th>Raio (m)</th>
            <th>Resistividade (Ω.m)</th>
            <th>Queda de Tensão (V)</th>
            <th>Data do Cálculo</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['corrente']; ?></td>
                <td><?php echo $row['comprimento']; ?></td>
                <td><?php echo $row['raio']; ?></td>
                <td><?php echo $row['resistividade']; ?></td>
                <td><?php echo $row['queda_tensao']; ?></td>
                <td><?php echo $row['data_calculo']; ?></td>
            </tr>
        <?php } ?>
    </table>
</body>
</html>
<?php
$conn->close();
?>
