def atividades():
    print("\nAtividades")

    while True:
        renda_anual = input("Renda anual (R$): ")
        try:
            renda_anual = float(renda_anual)
            if renda_anual < 0:
                print("Renda anual não pode ser negativa.")
            else:
                break
        except ValueError:
            print("Digite um valor válido.")

    while True:
        renda_mensal = input("Renda mensal (R$): ")
        try:
            renda_mensal = float(renda_mensal)
            if renda_mensal < 0:
                print("Renda mensal não pode ser negativa.")
            else:
                break
        except ValueError:
            print("Digite um valor numérico válido.")

    relatorio = input("Relatório (descrição das atividades): ")

    anexos = []
    print("\nDigite os nomes dos anexos (digite 'fim' para encerrar):")
    while True:
        anexo = input("Anexo: ")
        if anexo.lower() == 'fim':
            break
        elif anexo.strip() == "":
            print("Nome de anexo inválido.")
        else:
            anexos.append(anexo)

    print("\nAtividades")
    print(f"Renda Anual: R$ {renda_anual:.2f}")
    print(f"Renda Mensal: R$ {renda_mensal:.2f}")
    print("Relatório:", relatorio)
    print("Anexos:", ", ".join(anexos) if anexos else "Nenhum anexo adicionado.")

atividades()
