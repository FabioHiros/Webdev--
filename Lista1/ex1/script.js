const form = document.getElementById('imc_form');


form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    
    const formData = new FormData(form);

    
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    
    const name = data.nome;         
    const altura_cm = parseFloat(data.altura);  
    const peso_kg = parseFloat(data.peso);      


    if (!isNaN(altura_cm) && !isNaN(peso_kg)) {
        const imc = peso_kg / ((altura_cm/100)**2);
        let classification = '';

        
        switch (true) {
            case (imc < 16):
                classification = 'Baixo peso muito grave';
                break;
            case (imc >= 16 && imc < 17):
                classification = 'Baixo peso grave';
                break;
            case (imc >= 17 && imc < 18.5):
                classification = 'Baixo peso';
                break;
            case (imc >= 18.5 && imc < 25):
                classification = 'Peso normal';
                break;
            case (imc >= 25 && imc < 30):
                classification = 'Sobrepeso';
                break;
            case (imc >= 30 && imc < 35):
                classification = 'Obesidade grau I';
                break;
            case (imc >= 35 && imc < 40):
                classification = 'Obesidade grau II';
                break;
            case (imc >= 40):
                classification = 'Obesidade grau III';
                break;
            default:
                classification = 'Classificação não disponível';
        }

       
        console.log(data)
        alert(`${name} possui um Índice de Massa Corporal igual a ${imc}, sendo classificado como: ${classification}`);
    } else {
        alert('Dados inválidos para altura ou peso.');
    }
});