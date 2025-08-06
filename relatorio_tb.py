from datetime import datetime

def relatorio():
    print("\n Relatório ")

    while True:
        id_usuario = input("ID do usuário: ")
        if id_usuario.strip() == "":
            print("ID do usuário não pode ser vazio.")
        else:
            break

    tipo = input("Tipo de relatório (ex: financeiro, atividades, etc.): ")

    filtro_aplicado = input("Filtro aplicado (ex: data=2025, tipo=entrada): ")

    gerado_em = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    print("\n Dados do Relatório")
    print(f"ID do Usuário: {id_usuario}")
    print(f"Tipo: {tipo}")
    print(f"Filtro Aplicado: {filtro_aplicado}")
    print(f"Gerado em: {gerado_em}")

relatorio()
