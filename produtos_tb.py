produtos = []

def cadastrar_produto():
    print("\n Produto")

    nome = input("Nome do produto: ")

    while True:
        try:
            preco = float(input("Preço (R$): "))
            if preco <= 0:
                print("O preço deve ser maior que zero.")
            else:
                break
        except ValueError:
            print("Digite um valor numérico válido.")

    while True:
        try:
            estoque = int(input("Quantidade em estoque: "))
            if estoque < 0:
                print("O estoque não pode ser negativo.")
            else:
                break
        except ValueError:
            print("Digite um número inteiro válido.")

    produto = {
        "nome": nome,
        "preco": preco,
        "estoque": estoque
    }

    produtos.append(produto)
    print("\nProduto cadastrado com sucesso!")

def listar_produtos():
    print("\n Lista de Produtos ")
    if not produtos:
        print("Nenhum produto cadastrado.")
        return

    for i, produto in enumerate(produtos, start=1):
        print(f"\nProduto {i}:")
        print(f"Nome: {produto['nome']}")
        print(f"Preço: R$ {produto['preco']:.2f}")
        print(f"Estoque: {produto['estoque']} unidades")

def menu():
    while True:
        print("\nMenu Produtos")
        print("1. Cadastrar produto")
        print("2. Listar produtos")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_produto()
        elif opcao == "2":
            listar_produtos()
            break
        else:
            print("Opção inválida. Tente novamente.")

menu()
