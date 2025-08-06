usuarios = {} 

def cadastrar_usuario():
    print("\n Cadastro de Usuário")
    
    while True:
        usuario = input("Escolha um nome de usuário (mínimo 4 letras): ")
        if len(usuario) < 4:
            print("O nome de usuário deve ter no mínimo 4 letras.")
        elif usuario in usuarios:
            print("Usuário já existe! Tente outro.")
        else:
            break

    while True:
        senha = input("Digite uma senha (mínimo 6 caracteres): ")
        if len(senha) < 6:
            print("A senha deve ter no mínimo 6 caracteres.")
        else:
            break

    print("\nEscolha o tipo de perfil:")
    print("1. Perfil Pessoal")
    print("2. Perfil Empresário")

    while True:
        perfil_opcao = input("Digite 1 ou 2: ")
        if perfil_opcao == "1":
            perfil = "Pessoal"
            print("\n Dados do Perfil Pessoal:")
            
            while True:
                email = input("Email: ")
                if "@" not in email or "." not in email:
                    print("Email inválido. Tente novamente.")
                else:
                    break

            while True:
                cpf = input("CPF (11 dígitos): ")
                if not cpf.isdigit() or len(cpf) != 11:
                    print("CPF inválido. Deve conter exatamente 11 números.")
                else:
                    break

            while True:
                telefone = input("Telefone (10 ou 11 dígitos): ")
                if not telefone.isdigit() or len(telefone) not in [10, 11]:
                    print("Telefone inválido. Deve conter 10 ou 11 dígitos numéricos.")
                else:
                    break

            dados = {
                "email": email,
                "cpf": cpf,
                "telefone": telefone
            }
            break

        elif perfil_opcao == "2":
            perfil = "Empresário"
            print("\nDados do Perfil Empresário:")

            while True:
                email = input("Email: ")
                if "@" not in email or "." not in email:
                    print("Email inválido. Tente novamente.")
                else:
                    break

            while True:
                cnpj = input("CNPJ (14 dígitos): ")
                if not cnpj.isdigit() or len(cnpj) != 14:
                    print("CNPJ inválido. Deve conter exatamente 14 números.")
                else:
                    break

            while True:
                telefone = input("Telefone (10 ou 11 dígitos): ")
                if not telefone.isdigit() or len(telefone) not in [10, 11]:
                    print("Telefone inválido. Deve conter 10 ou 11 dígitos numéricos.")
                else:
                    break

            while True:
                cpf = input("CPF do responsável (11 dígitos): ")
                if not cpf.isdigit() or len(cpf) != 11:
                    print("CPF inválido. Deve conter exatamente 11 números.")
                else:
                    break

            dados = {
                "email": email,
                "cnpj": cnpj,
                "telefone": telefone,
                "cpf": cpf
            }
            break
        else:
            print("Opção inválida! Tente novamente.")

    usuarios[usuario] = {"senha": senha, "perfil": perfil, "dados": dados}
    print(f"Cadastro realizado com sucesso como perfil '{perfil}'!\n")

def fazer_login():
    print("\nLogin")
    usuario = input("Usuário: ")
    senha = input("Senha: ")

    user = usuarios.get(usuario)

    if user and user["senha"] == senha:
        perfil = user["perfil"]
        dados = user["dados"]
        print(f"\nLogin bem-sucedido! Bem-vindo, {usuario}!")
        print(f"Perfil: {perfil}")
        print(" Dados do usuário:")
        print(f"Email: {dados.get('email')}")
        print(f"CPF: {dados.get('cpf')}")
        print(f" Telefone: {dados.get('telefone')}")
        if perfil == "Empresário":
            print(f" CNPJ: {dados.get('cnpj')}")
        print()
    else:
        print("Usuário ou senha incorretos.\n")

def menu():
    while True:
        print("1. Cadastrar novo usuário")
        print("2. Fazer login")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_usuario()
        elif opcao == "2":
            fazer_login()
        else:
            print("Opção inválida!\n")

menu()
