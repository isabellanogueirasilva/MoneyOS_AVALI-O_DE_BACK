from datetime import datetime

transacoes = []

def cadastrar_transacao():
    print("\nCadastro de Transação")

    while True:
        try:
            valor = float(input("Valor da transação (R$): "))
            if valor <= 0:
                print("O valor deve ser maior que zero.")
            else:
                break
        except ValueError:
            print("Digite um valor válido.")

    while True:
        data = input("Data da transação (formato DD/MM/AAAA): ")
        try:
            datetime.strptime(data, "%d/%m/%Y")
            break
        except ValueError:
            print("Data inválida. Use o formato DD/MM/AAAA.")

    descricao = input("Descrição da transação: ")

    conta_origem = input("Conta de origem: ")
    conta_destino = input("Conta de destino: ")

    alertas = []

    if conta_origem == conta_destino:
        alertas.append("Conta de origem e destino são iguais.")

    if valor >= 10000:
        alertas.append("Valor alto! Transação acima de R$ 10.000.")

    transacao = {
        "valor": valor,
        "data": data,
        "descricao": descricao,
        "conta_origem": conta_origem,
        "conta_destino": conta_destino,
        "alertas": alertas
    }

    transacoes.append(transacao)
    print("\nTransação cadastrada com sucesso!")

    if alertas:
        print("\n⚠️ Alertas gerados:")
        for alerta in alertas:
            print(f"- {alerta}")

def listar_transacoes():
    print("\n Lista de Transações")
    if not transacoes:
        print("Nenhuma transação cadastrada.")
        return

    for i, t in enumerate(transacoes, start=1):
        print(f"\nTransação {i}:")
        print(f"Valor: R$ {t['valor']:.2f}")
        print(f"Data: {t['data']}")
        print(f"Descrição: {t['descricao']}")
        print(f"Conta Origem: {t['conta_origem']}")
        print(f"Conta Destino: {t['conta_destino']}")
        if t['alertas']:
            print("Alertas:")
            for alerta in t['alertas']:
                print(f"- {alerta}")
        else:
            print("Alertas: Nenhum")

def menu_transacoes():
    while True:
        print("\n Menu de Transações")
        print("1. Cadastrar transação")
        print("2. Listar transações")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_transacao()
        elif opcao == "2":
            listar_transacoes()
            break
        else:
            print("Opção inválida. Tente novamente.")

menu_transacoes()
