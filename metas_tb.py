from datetime import datetime

def cadastrar_meta():
    print("\nCadastro de Meta")

    nome = input("Nome da meta: ")

    while True:
        try:
            valor_objetivo = float(input("Valor objetivo (R$): "))
            if valor_objetivo <= 0:
                print("O valor objetivo deve ser maior que zero.")
            else:
                break
        except ValueError:
            print("Digite um valor numérico válido.")

    while True:
        try:
            valor_atual = float(input("Valor atual (R$): "))
            if valor_atual < 0:
                print("O valor atual não pode ser negativo.")
            elif valor_atual > valor_objetivo:
                print("O valor atual não pode ser maior que o objetivo.")
            else:
                break
        except ValueError:
            print("Digite um valor numérico válido.")

    while True:
        data_limite = input("Data limite (formato DD/MM/AAAA): ")
        try:
            datetime.strptime(data_limite, "%d/%m/%Y")
            break
        except ValueError:
            print("Formato de data inválido. Use DD/MM/AAAA.")

    produtos = []
    print("\nDigite os produtos relacionados à meta (digite 'fim' para parar):")
    while True:
        produto = input("Produto: ")
        if produto.lower() == "fim":
            break
        elif produto.strip() == "":
            print("Nome do produto inválido.")
        else:
            produtos.append(produto)

    while True:
        try:
            vendas = int(input("Quantidade de vendas realizadas: "))
            if vendas < 0:
                print("A quantidade de vendas não pode ser negativa.")
            else:
                break
        except ValueError:
            print("Digite um número inteiro válido.")

    print("\nDados da Meta")
    print(f"Nome: {nome}")
    print(f"Valor Objetivo: R$ {valor_objetivo:.2f}")
    print(f"Valor Atual: R$ {valor_atual:.2f}")
    print(f"Data Limite: {data_limite}")
    print("Produtos:", ", ".join(produtos) if produtos else "Nenhum")
    print(f"Vendas Realizadas: {vendas}")

cadastrar_meta()
