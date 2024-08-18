const form =document.getElementById('folhaForm'); 
form.addEventListener('submit', function(event) {
    event.preventDefault();
    calcularSalario();
});
let salario_total=0
function calcularSalario() {
    
    const codigoFuncionario = parseInt(document.getElementById('codigoFuncionario').value);
    const horasTrabalhadas = parseInt(document.getElementById('horasTrabalhadas').value);
    const turno = document.getElementById('turno').value;
    const categoria = document.getElementById('categoria').value;
    const salarioMinimo = parseFloat(document.getElementById('salarioMinimo').value);
    
    if (codigoFuncionario<0 || horasTrabalhadas<0 || salarioMinimo<0){
        alert('Os campos não aceitam nada além de NÚMEROS inteiros POSITIVOS')
        form.reset()
        return
        
    }


    
    let valorHora;
    if (categoria === 'F') { // Funcionário
        switch (turno) {
            case 'M': // Matutino
                valorHora = 0.1 * salarioMinimo;
                
                break;
            case 'V': // Vespertino
                valorHora = 0.12 * salarioMinimo;
                break;
            case 'N': // Noturno
                valorHora = 0.15 * salarioMinimo;
                break;
            default:
                alert('Turno inválido');
                return;
        }
    } else if (categoria === 'G') { // Gerente
        switch (turno) {
            case 'M': // Matutino
                valorHora = 0.2 * salarioMinimo;
                break;
            case 'V': // Vespertino
                valorHora = 0.25 * salarioMinimo;
                break;
            case 'N': // Noturno
                valorHora = 0.3 * salarioMinimo;
                break;
            default:
                alert('Turno inválido');
                return;
        }
    } else {
        alert('Categoria inválida');
        return;
    }

   
    const salarioInicial = valorHora * horasTrabalhadas;

    let auxilioAlimentacao;
    if (salarioInicial <= 800) {
        auxilioAlimentacao = 0.25 * salarioInicial;
    } else if (salarioInicial <= 1200) {
        auxilioAlimentacao = 0.20 * salarioInicial;
    } else {
        auxilioAlimentacao = 0.15 * salarioInicial;
    }

    const salarioFinal = salarioInicial + auxilioAlimentacao;
    salario_total+= salarioFinal
 
    document.getElementById('resultado').innerText += `Código do funcionário: ${codigoFuncionario}\n` +
        `Número de horas trabalhadas: ${horasTrabalhadas}\n` +
        `Valor da hora trabalhada: R$ ${valorHora.toFixed(2)}\n` +
        `Salário inicial: R$ ${salarioInicial.toFixed(2)}\n` +
        `Auxílio-alimentação: R$ ${auxilioAlimentacao.toFixed(2)}\n` +
        `Salário final: R$ ${salarioFinal.toFixed(2)}\n\n\n`;
}

function calcula_total_salarios(){

    document.getElementById('salarioTotal').innerText = `Total gasto com salário de pessoal: ${salario_total.toFixed(2)}` 

}