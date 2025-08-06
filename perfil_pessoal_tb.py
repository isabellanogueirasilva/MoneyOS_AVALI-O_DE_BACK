def perfil_pessoal():
    print("\nPerfil Pessoal ")

    ocupacao = input("Ocupação (ex: estudante, engenheiro, etc.): ")

    while True:
        idade = input("Idade: ")
        if not idade.isdigit() or int(idade) <= 0:
            print("Idade inválida. Digite um número.")
        else:
            idade = int(idade)
            break

    print("\nEstado Civil:")
    print("1. Solteiro(a)")
    print("2. Casado(a)")
    print("3. Divorciado(a)")
    print("4. Viúvo(a)")

    estado_civil_opcoes = {
        "1": "Solteiro(a)",
        "2": "Casado(a)",
        "3": "Divorciado(a)",
        "4": "Viúvo(a)"
    }

    while True:
        estado_civil_input = input("Escolha uma opção (1 a 4): ")
        if estado_civil_input in estado_civil_opcoes:
            estado_civil = estado_civil_opcoes[estado_civil_input]
            break
        else:
            print("Opção inválida. Tente novamente.")

    objetivo = input("Objetivo pessoal (ex: comprar uma casa, viajar, etc.): ")

    conta = input("Tipo ou nome da conta (ex: Conta Corrente, Poupança, etc.): ")

    print("\n--- Dados do Perfil Pessoal ---")
    print(f"Ocupação: {ocupacao}")
    print(f"Idade: {idade}")
    print(f"Estado Civil: {estado_civil}")
    print(f"Objetivo: {objetivo}")
    print(f"Conta: {conta}")

perfil_pessoal()
