document.addEventListener('DOMContentLoaded', function () {
    // Função para calcular a resistência do fio
    function calcularResistencia(comprimento, raio, resistividade) {
        // Área da seção transversal do fio (A = π * r^2)
        const area = Math.PI * Math.pow(raio, 2);
        
        // Resistência (R = ρ * L / A)
        const resistencia = resistividade * comprimento / area;
        
        return resistencia;
    }

    // Função para calcular a queda de tensão
    function calcularQuedaDeTensao() {
        // Obter os valores dos campos de entrada
        const corrente = parseFloat(document.getElementById('corrente').value);
        const comprimento = parseFloat(document.getElementById('comprimento').value);
        const raio = parseFloat(document.getElementById('raio').value);
        const materialSelecionado = document.getElementById('material').value;

        // Resistividade dos materiais em ohm metro
        const resistividades = {
            cobre: 1.68e-8,    // Resistividade do cobre
            aluminio: 2.65e-8, // Resistividade do alumínio
            ferro: 1.0e-7,     // Resistividade do ferro
            aco: 1.5e-7       // Resistividade do aço
        };

        // Verificar se os campos foram preenchidos corretamente
        if (isNaN(corrente) || isNaN(comprimento) || isNaN(raio) || corrente <= 0 || comprimento <= 0 || raio <= 0) {
            document.getElementById('erro').style.display = 'block'; // Exibir mensagem de erro
            document.getElementById('resultado').innerText = ''; // Limpar resultado anterior
            return;
        } else {
            document.getElementById('erro').style.display = 'none'; // Esconder a mensagem de erro
        }

        // Atribuir a resistividade com base no material selecionado
        const resistividade = resistividades[materialSelecionado];
        
        // Calcular a resistência do fio
        const resistencia = calcularResistencia(comprimento, raio, resistividade);
        
        // Calcular a queda de tensão (ΔV = I * R)
        const quedaDeTensao = corrente * resistencia;

        // Limitar o número de casas decimais
        const quedaDeTensaoArredondada = quedaDeTensao.toFixed(4); // Limita a 4 casas decimais

        // Exibir o resultado
        document.getElementById('resultado').innerText = `A queda de tensão é: ${quedaDeTensaoArredondada} volts.`;

        // Enviar os dados para o servidor via XMLHttpRequest
        enviarDadosParaServidor(corrente, comprimento, raio, resistividade, quedaDeTensao);
    }

    // Função para enviar os dados para o servidor usando XMLHttpRequest
    function enviarDadosParaServidor(corrente, comprimento, raio, resistividade, quedaDeTensao) {
        // Criação de uma instância do XMLHttpRequest
        const xhr = new XMLHttpRequest();
        
        // Abrir a requisição (POST para o servidor local)
        xhr.open("POST", "http://localhost/calculo-tensao/processar_dados.php", true); // Caminho correto para o PHP
        
        // Definir o tipo de resposta (JSON)
        xhr.setRequestHeader("Content-Type", "application/json");
        
        // Função que será executada quando a requisição for completada
        xhr.onload = function () {
            if (xhr.status === 200) {
                const resposta = JSON.parse(xhr.responseText); // Supondo que a resposta seja em JSON
                console.log("Resposta do servidor:", resposta);
                
                // Exibir os dados recebidos na página
                const dadosRecebidos = resposta.dadosRecebidos;
                let respostaText = 'Dados recebidos do servidor: <br>';
                respostaText += `Corrente: ${dadosRecebidos.corrente} A <br>`;
                respostaText += `Comprimento: ${dadosRecebidos.comprimento} m <br>`;
                respostaText += `Raio: ${dadosRecebidos.raio} m <br>`;
                respostaText += `Resistividade: ${dadosRecebidos.resistividade} Ω.m <br>`;
                respostaText += `Queda de Tensão: ${dadosRecebidos.quedaDeTensao} V <br>`;
                
                // Exibir a resposta do servidor no campo de resultado
                document.getElementById('resultado').innerHTML += `<br><br>${respostaText}`;
            } else {
                console.error("Erro ao enviar dados para o servidor:", xhr.status);
            }
        };

        // Função que será executada caso haja erro na requisição
        xhr.onerror = function () {
            console.error("Erro na requisição XMLHttpRequest.");
        };

        // Dados a serem enviados para o servidor
        const dados = {
            corrente: corrente,
            comprimento: comprimento,
            raio: raio,
            resistividade: resistividade,
            quedaDeTensao: quedaDeTensao
        };

        // Enviar os dados como JSON
        xhr.send(JSON.stringify(dados));
    }

    // Adicionar evento de clique ao botão para calcular a queda de tensão
    document.getElementById('calcular').addEventListener('click', calcularQuedaDeTensao);
});
