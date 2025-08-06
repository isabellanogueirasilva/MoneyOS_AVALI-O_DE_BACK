def anexo():
    print("\nAnexo")

    while True:
        nome_arquivo = input("Nome do arquivo: ")
        if nome_arquivo.strip() == "":
            print("Nome do arquivo não pode ser vazio.")
        else:
            break

    while True:
        url_arquivo = input("URL do arquivo: ")
        if not url_arquivo.startswith("http"):
            print("URL inválida. Deve começar com 'http' ou 'https'.")
        else:
            break

    while True:
        id_usuario = input("ID do usuário: ")
        if id_usuario.strip() == "":
            print("ID do usuário não pode ser vazio.")
        else:
            break

    tipo_transacao = input("Tipo de transação (opcional): ")

    print("\n Dados do Anexo")
    print(f"Nome do Arquivo: {nome_arquivo}")
    print(f"URL do Arquivo: {url_arquivo}")
    print(f"ID do Usuário: {id_usuario}")
    print(f"Tipo de Transação: {tipo_transacao if tipo_transacao else 'Não especificado'}")

anexo()
