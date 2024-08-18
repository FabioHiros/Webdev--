let form =document.getElementById('freteForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    calcularFrete();
});

function calcularFrete() {
   
    const numeroPecas = parseInt(document.getElementById('numeroPecas').value);
    const rastreamento = document.querySelector('input[name="rastreamento"]:checked').value;
    const regiao = parseInt(document.getElementById('regiao').value);
    const distancia = parseInt(document.getElementById('distancia').value);

    if (numeroPecas <=0){
        alert('Número Inválido de Peças!')
        form.reset()
        return
    }

   
    let valorPeca, desconto, valorDesconto;
    let taxaRastreamento = 0;
    
  
    switch (regiao) {
        case 1: // Sudeste
            valorPeca = 1.20;
            desconto = 0.12;
            break;
        case 2: // Sul
            valorPeca = 1.10;
            desconto = 0.10;
            break;
        case 3: // Centro-Oeste
            valorPeca = 1.15;
            desconto = 0.08;
            break;
        default:
            alert('Região inválida!');
            return;
    }
    
  
    if (rastreamento === 'S') {
        taxaRastreamento = 200.00;
    }

    
    let valorFretePecas;
    if (numeroPecas <= 1000) {
        valorFretePecas = numeroPecas * valorPeca;
    } else {
        let valorFreteIniciais = 1000 * valorPeca;
        valorDesconto = valorPeca * (1 - desconto);
        let valorFreteExcedente = (numeroPecas - 1000) * valorDesconto;
        valorFretePecas = valorFreteIniciais + valorFreteExcedente;
    }

   
    const valorCombustivel = distancia; // 1 litro por km

    
    const valorTotal = rastreamento ==='S' ? valorFretePecas + taxaRastreamento: valorFretePecas ;

   
    document.getElementById('resultado').innerText += `O valor total do frete é de R$ ${valorTotal.toFixed(2)}, incluindo  ${valorCombustivel.toFixed(2)} litros de combustível ${ rastreamento === 'S' ? `e R$ ${taxaRastreamento.toFixed(2)} pela taxa de rastreamento`:''}\n`;
}
