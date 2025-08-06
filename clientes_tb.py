clientes = []

def cadastrar_cliente():
    print("\nCadastro de Cliente")

    nome = input("Nome completo: ")

    while True:
        email = input("Email: ")
        if "@" not in email or "." not in email:
            print("Email inválido. Tente novamente.")
        else:
            break

    while True:
        telefone = input("Telefone (10 ou 11 dígitos): ")
        if not telefone.isdigit() or len(telefone) not in [10, 11]:
            print("Telefone inválido. Deve conter 10 ou 11 números.")
        else:
            break

    while True:
        cpf = input("CPF (11 dígitos): ")
        if not cpf.isdigit() or len(cpf) != 11:
            print("CPF inválido. Deve conter exatamente 11 números.")
        else:
            break

    cliente = {
        "nome": nome,
        "email": email,
        "telefone": telefone,
        "cpf": cpf
    }

    clientes.append(cliente)
    print("\nCliente cadastrado com sucesso!\n")

def listar_clientes():
    print("\nLista de Clientes:")
    if not clientes:
        print("Nenhum cliente cadastrado.")
        return

    for i, cliente in enumerate(clientes, start=1):
        print(f"\nCliente {i}:")
        print(f"Nome: {cliente['nome']}")
        print(f"Email: {cliente['email']}")
        print(f"Telefone: {cliente['telefone']}")
        print(f"CPF: {cliente['cpf']}")

def menu():
    while True:
        print("\n Menu Cliente ")
        print("1. Cadastrar cliente")
        print("2. Listar clientes")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_cliente()
        elif opcao == "2":
            listar_clientes()
            break
        else:
            print("Opção inválida. Tente novamente.")

menu()
