faixas_etarias = [
    { 'min': 0, 'max': 14, 'classificacao': 'Criança' },
    { 'min': 15, 'max': 29, 'classificacao': 'Jovem' },
    { 'min': 30, 'max': 59, 'classificacao': 'Adulto' },
    { 'min': 60, 'max': float('inf'), 'classificacao': 'Idoso' }
]

idade = 25
faixa = next((faixa for faixa in faixas_etarias if faixa['min'] <= idade <= faixa['max']), None)

if faixa:
    print(faixa['classificacao'])  # Output: Jovem
else:
    print("Faixa etária não encontrada")