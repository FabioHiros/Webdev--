let form = document.getElementById('formulario');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const dados_formulario = new FormData(form);
    const notas = {};

    let soma_das_notas_com_peso = 0;
    let soma_dos_pesos = 0;

    
    for (let i = 1; i <= 3; i++) {
        const nota = parseFloat(dados_formulario.get(`grade${i}`));
        const peso = parseInt(dados_formulario.get(`weight${i}`), 10);
        
        if (isNaN(nota) || nota < 0 || nota > 10 || isNaN(peso) || peso <= 0 || !Number.isInteger(peso)) {
            alert('As notas devem ser números positivos entre 0(zero) até 10(dez) e os pesos números inteiros positivos!');
            form.reset();
            return;
        }

        notas[`Nota${i}`] = [nota, peso];
        soma_das_notas_com_peso += nota * peso;
        soma_dos_pesos += peso;
    }

    const media_ponderada = soma_das_notas_com_peso / soma_dos_pesos;
    const classificacao=[
        {min:9.001,max:10, classificacao_aluno:'A'},
         {min:8.001, max:9, classificacao_aluno:'B'},
         {min:7.001, max:8, classificacao_aluno:'C'},
         {min:6.001, max:7, classificacao_aluno:'E'},
         {min:5.001, max:6, classificacao_aluno:'D'},
         {min:0, max:5, classificacao_aluno:'F'}
    ];

    const nota_aluno = classificacao.find(nota => media_ponderada>= nota.min && nota.max <= nota.max)
    
 
    const div_resultados = document.getElementById('resultado');
    div_resultados.innerText += `A média ponderada do aluno é ${media_ponderada.toFixed(2)}, sendo classificada como ${nota_aluno.classificacao_aluno}\n`;

   
    form.reset();
});
