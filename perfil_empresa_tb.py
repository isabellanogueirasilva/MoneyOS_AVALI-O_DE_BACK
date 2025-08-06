def perfil_empresarial():
    print("\nPerfil Empresarial")
    razao_social = input("Razão Social: ")

    while True:
        cnpj = input("CNPJ (14 dígitos): ")
        if not cnpj.isdigit() or len(cnpj) != 14:
            print("CNPJ inválido. Deve conter exatamente 14 números.")
        else:
            break

    segmento = input("Segmento da empresa: ")

    while True:
        qtd_funcionarios = input("Quantidade de funcionários: ")
        if not qtd_funcionarios.isdigit() or int(qtd_funcionarios) < 0:
            print("Quantidade inválida. Digite um número.")
        else:
            break

    clientes = []
    print("\nDigite o nome dos clientes (digite 'fim' para parar):")
    while True:
        cliente = input("Cliente: ")
        if cliente.lower() == 'fim':
            break
        elif cliente.strip() == "":
            print("Nome de cliente inválido. Tente novamente.")
        else:
            clientes.append(cliente)

    print("\nDados do Perfil Empresarial")
    print(f"Razão Social: {razao_social}")
    print(f"CNPJ: {cnpj}")
    print(f"Segmento: {segmento}")
    print(f"Quantidade de Funcionários: {qtd_funcionarios}")
    print("Clientes:", ", ".join(clientes))

perfil_empresarial()
