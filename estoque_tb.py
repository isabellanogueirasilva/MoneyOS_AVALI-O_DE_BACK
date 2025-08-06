from datetime import datetime

estoque = []

def cadastrar_item_estoque():
    print("\n Item no Estoque ")

    nome = input("Nome do produto: ")

    descricao = input("Descrição do produto: ")

    while True:
        try:
            quantidade = int(input("Quantidade em estoque: "))
            if quantidade < 0:
                print("A quantidade não pode ser negativa.")
            else:
                break
        except ValueError:
            print("Digite um número inteiro válido.")

    while True:
        try:
            preco_unitario = float(input("Preço unitário (R$): "))
            if preco_unitario <= 0:
                print("O preço deve ser maior que zero.")
            else:
                break
        except ValueError:
            print("Digite um valor numérico válido.")

    data_atualizacao = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    item = {
        "nome": nome,
        "descricao": descricao,
        "quantidade": quantidade,
        "preco_unitario": preco_unitario,
        "data_atualizacao": data_atualizacao
    }

    estoque.append(item)
    print("\nItem cadastrado com sucesso!")

def listar_estoque():
    print("\nEstoque Atual ")
    if not estoque:
        print("Nenhum item no estoque.")
        return

    for i, item in enumerate(estoque, start=1):
        print(f"\nItem {i}:")
        print(f"Nome: {item['nome']}")
        print(f"Descrição: {item['descricao']}")
        print(f"Quantidade: {item['quantidade']}")
        print(f"Preço Unitário: R$ {item['preco_unitario']:.2f}")
        print(f"Última Atualização: {item['data_atualizacao']}")

def menu_estoque():
    while True:
        print("\n Menu de Estoque")
        print("1. Cadastrar item")
        print("2. Listar estoque")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_item_estoque()
        elif opcao == "2":
            listar_estoque()
            break
        else:
            print("Opção inválida. Tente novamente.")

menu_estoque()
