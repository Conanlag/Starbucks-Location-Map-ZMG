import requests
import pandas as pd
import json
import os
import time
from dotenv import load_dotenv


load_dotenv("../.env")

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")


url = "https://places.googleapis.com/v1/places:searchText"


headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.location"
}



def generar_grid():

    puntos = []

    # límites aproximados de la Zona Metropolitana de Guadalajara
    lat_min = 20.50
    lat_max = 20.80

    lng_min = -103.55
    lng_max = -103.15


    # ~2 km entre puntos
    paso = 0.02


    lat = lat_min

    while lat <= lat_max:

        lng = lng_min

        while lng <= lng_max:

            puntos.append(
                (lat, lng)
            )

            lng += paso

        lat += paso


    return puntos




def buscar_starbucks(lat, lng):

    body = {

        "textQuery": "Starbucks",

        "maxResultCount": 20,

        "locationBias": {

            "circle": {

                "center": {

                    "latitude": lat,

                    "longitude": lng

                },

                "radius": 5000

            }

        }

    }


    r = requests.post(
        url,
        headers=headers,
        json=body
    )


    if r.status_code != 200:

        print("ERROR:")
        print(r.text)

        return []


    data = r.json()


    resultados = []


    for p in data.get("places", []):

        nombre = p["displayName"]["text"]


        # filtro Starbucks
        if "Starbucks" in nombre:

            resultados.append({

                "id": p["id"],

                "name": nombre,

                "address": p.get(
                    "formattedAddress",
                    ""
                ),

                "lat": p["location"]["latitude"],

                "lng": p["location"]["longitude"]

            })


    return resultados




# EJECUCIÓN


grid = generar_grid()


print(
    "Puntos generados:",
    len(grid)
)



todos = []



for i, (lat, lng) in enumerate(grid):

    print(
        f"Buscando {i+1}/{len(grid)} -> {lat},{lng}"
    )


    resultados = buscar_starbucks(
        lat,
        lng
    )


    todos.extend(resultados)


    # evitar demasiadas solicitudes seguidas
    time.sleep(0.1)




# QUITAR DUPLICADOS

unicos = {

    p["id"]: p

    for p in todos

}


starbucks = list(
    unicos.values()
)



print(
    "\nStarbucks encontrados:",
    len(starbucks)
)



# ==========================
# EXPORTAR
# ==========================


with open(
    "starbucks_zmg.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        starbucks,
        f,
        indent=4,
        ensure_ascii=False
    )



pd.DataFrame(
    starbucks
).to_csv(
    "starbucks_zmg.csv",
    index=False,
    encoding="utf-8-sig"
)



print("Archivos generados:")
print("- starbucks_zmg.json")
print("- starbucks_zmg.csv")