from datetime import datetime

alertas = []

def enviar_alerta():
    print("\n Enviar Alerta")

    mensagem = input("Mensagem do alerta: ")

    while True:
        id_usuario = input("ID do usuário (ou IDs separados por vírgula): ")
        ids = [id.strip() for id in id_usuario.split(",") if id.strip()]
        if ids:
            break
        else:
            print("Informe ao menos um ID de usuário válido.")

    data_envio = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    for id_ in ids:
        alerta = {
            "mensagem": mensagem,
            "data_envio": data_envio,
            "id_usuario": id_,
            "lido": False
        }
        alertas.append(alerta)

    print("\nAlerta enviado com sucesso para os usuários:", ", ".join(ids))

def listar_alertas():
    print("\n Lista de Alertas ")
    if not alertas:
        print("Nenhum alerta enviado.")
        return

    for i, alerta in enumerate(alertas, start=1):
        print(f"\nAlerta {i}:")
        print(f"Mensagem: {alerta['mensagem']}")
        print(f"Data de Envio: {alerta['data_envio']}")
        print(f"ID Usuário: {alerta['id_usuario']}")
        print(f"Lido: {'Sim' if alerta['lido'] else 'Não'}")

def marcar_como_lido():
    print("\n--- Marcar Alerta como Lido ---")
    id_usuario = input("Digite seu ID de usuário: ")

    encontrados = False
    for alerta in alertas:
        if alerta["id_usuario"] == id_usuario and not alerta["lido"]:
            alerta["lido"] = True
            encontrados = True

    if encontrados:
        print("Alertas marcados como lidos com sucesso.")
    else:
        print("Nenhum alerta não lido encontrado para este usuário.")

def menu_alertas():
    while True:
        print("\nMenu de Alertas")
        print("1. Enviar alerta")
        print("2. Listar alertas")
        print("3. Marcar alerta como lido")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            enviar_alerta()
        elif opcao == "2":
            listar_alertas()
        elif opcao == "3":
            marcar_como_lido()
            break
        else:
            print("Opção inválida. Tente novamente.")

menu_alertas()
