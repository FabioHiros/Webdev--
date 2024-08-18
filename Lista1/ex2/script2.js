let resultados = [];


function classificar() {
    const nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    console.log(typeof(idade))
  
    if (isNaN(idade) || idade <= 0 || !Number.isInteger(Number(idade))) {
        alert("Idade inválida. Por favor, insira um número inteiro positivo.");
        return;
    }

    
    idade = parseInt(idade);

   
    const faixasEtarias = [
        { min: 0, max: 14, classificacao: 'Criança' },
        { min: 15, max: 29, classificacao: 'Jovem' },
        { min: 30, max: 59, classificacao: 'Adulto' },
        { min: 60, max: Infinity, classificacao: 'Idoso' }
    ];

    
    const faixa = faixasEtarias.find(faixa => idade >= faixa.min && idade <= faixa.max);

   
    const resultado = `${nome} tem ${idade} anos e é classificado como: ${faixa.classificacao}`;
    resultados.push(resultado);

    
    exibirResultados();
}


function exibirResultados() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpar os resultados anteriores

    resultados.forEach((resultado) => {
        const p = document.createElement('p');
        p.textContent = resultado;
        resultadosDiv.appendChild(p);
    });
}


function encerrar() {
    if (confirm("Tem certeza de que deseja encerrar a aplicação?")) {
        document.getElementById('formulario').style.display = 'none';
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML += "<p><strong>Aplicação encerrada.</strong></p>";
    }
}
