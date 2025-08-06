acessos_anteriores = [
    "Login em 28/07/2025 às 14:32 - IP: 192.168.0.1 - Navegador: Chrome",
    "Mudança de senha em 20/07/2025 às 10:15 - IP: 201.45.67.89 - Navegador: Firefox",
    "Login em 19/07/2025 às 08:17 - IP: 186.220.10.10 - Navegador: Safari",
    "Cadastro de cliente em 15/07/2025 às 17:40 - IP: 200.189.45.77 - Navegador: Edge",
    "Atualização de perfil pessoal em 13/07/2025 às 12:03 - IP: 192.168.1.5 - Navegador: Opera",
    "Login em 10/07/2025 às 22:55 - IP: 172.16.0.3 - Navegador: Chrome",
    "Criação de conta empresarial em 08/07/2025 às 15:12 - IP: 201.90.33.121 - Navegador: Firefox",
    "Nova meta financeira definida em 05/07/2025 às 09:27 - IP: 187.12.45.9 - Navegador: Safari"
]

print("\nHISTÓRICO DE ACESSOS")
print(f"{'Atv.':<20} {'Data':<10} {'Hora':<6} {'IP':<15} {'Nav.'}")
print("-" * 60)

for entrada in acessos_anteriores:
    partes = entrada.split(" em ")
    atividade = partes[0][:20]   
    
    resto = partes[1].split(" - ")
    data_hora = resto[0].replace("às", "").strip().split()
    data = data_hora[0]
    hora = data_hora[1]
    
    ip = resto[1].replace("IP:", "").strip()
    navegador = resto[2].replace("Navegador:", "").strip()

    print(f"{atividade:<20} {data:<10} {hora:<6} {ip:<15} {navegador}")
