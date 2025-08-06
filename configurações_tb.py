def configuracoes():
    print("\n Configurações")

    while True:
        print("\nEscolha o tema:")
        print("1. Claro")
        print("2. Escuro")
        tema_opcao = input("Digite 1 ou 2: ")
        if tema_opcao == "1":
            tema = "Claro"
            break
        elif tema_opcao == "2":
            tema = "Escuro"
            break
        else:
            print("Opção inválida. Tente novamente.")

    while True:
        print("\nNotificações:")
        print("1. Ativadas")
        print("2. Desativadas")
        noti_opcao = input("Digite 1 ou 2: ")
        if noti_opcao == "1":
            notificacoes = "Ativadas"
            break
        elif noti_opcao == "2":
            notificacoes = "Desativadas"
            break
        else:
            print("Opção inválida. Tente novamente.")

    print("\nIdiomas disponíveis:")
    idiomas_disponiveis = ["Português", "Inglês", "Espanhol", "Francês"]
    for i, idioma in enumerate(idiomas_disponiveis, start=1):
        print(f"{i}. {idioma}")

    while True:
        idioma_opcao = input("Escolha o número do idioma: ")
        if idioma_opcao.isdigit() and 1 <= int(idioma_opcao) <= len(idiomas_disponiveis):
            linguagem = idiomas_disponiveis[int(idioma_opcao) - 1]
            break
        else:
            print("Opção inválida. Tente novamente.")

    acessos_anteriores = [
        "Login em 28/07/2025 às 14:32",
        "Mudança de senha em 20/07/2025",
        "Login em 19/07/2025 às 08:17"
    ]

    atividades = [
        "Criou uma nova conta bancária",
        "Atualizou o perfil pessoal",
    ]

    print("\n--- Suas Configurações ---")
    print(f"Tema: {tema}")
    print(f"Notificações: {notificacoes}")
    print(f"Idioma: {linguagem}")

    print("\n--- Acessos Anteriores ---")
    for acesso in acessos_anteriores:
        print(f"- {acesso}")

    print("\n--- Atividades Recentes ---")
    for atividade in atividades:
        print(f"- {atividade}")

configuracoes()
