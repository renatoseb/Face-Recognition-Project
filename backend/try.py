import api_functions

api_functions.load_encodings()

res = api_functions.search("./images/query/foto-perfil.jpeg", 10, "sequential")
print(res)