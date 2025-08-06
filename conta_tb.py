from datetime import datetime

def conta():
    print("\n Conta Bancária")

    while True:
        nome = input("Nome do titular da conta: ")
        if nome.replace(" ", "").isalpha():
            break
        else:
            print("Nome inválido. Digite apenas letras e espaços.")

    print("\nTipo de conta:")
    print("1. Pessoal")
    print("2. Empresarial")

    while True:
        tipo_opcao = input("Escolha 1 ou 2: ")
        if tipo_opcao == "1":
            tipo_conta = "Pessoal"
            break
        elif tipo_opcao == "2":
            tipo_conta = "Empresarial"
            break
        else:
            print("Opção inválida. Tente novamente.")

    while True:
        saldo_input = input("Saldo inicial (apenas números): R$ ")
        if saldo_input.replace('.', '', 1).isdigit():
            saldo_inicial = float(saldo_input)
            break
        else:
            print("Valor inválido. Digite apenas números (use ponto para decimais, se necessário).")

    data_criacao = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    transacoes = []
    print("\nDigite as transações (digite 'fim' para encerrar):")
    while True:
        transacao = input("Transação: ")
        if transacao.lower() == 'fim':
            break
        elif transacao.strip() == "":
            print("Transação vazia. Tente novamente.")
        else:
            transacoes.append(transacao)

    metas = []
    print("\nDigite suas metas financeiras (digite 'fim' para encerrar):")
    while True:
        meta = input("Meta: ")
        if meta.lower() == 'fim':
            break
        elif meta.strip() == "":
            print("Meta vazia. Tente novamente.")
        else:
            metas.append(meta)

    print("\n--- Conta Criada com Sucesso ---")
    print(f"Nome do titular: {nome}")
    print(f"Tipo de conta: {tipo_conta}")
    print(f"Saldo inicial: R$ {saldo_inicial:.2f}")
    print(f"Criada em: {data_criacao}")
    print("Transações:")
    for t in transacoes:
        print(f"- {t}")
    print("Metas:")
    for m in metas:
        print(f"- {m}")

conta()
