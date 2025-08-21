import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv
import json
import time
from datetime import datetime

# Carregar variáveis de ambiente (suas chaves de API) de um arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# --- CONFIGURAÇÃO DAS CHAVES DE API ---
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not OPENWEATHER_API_KEY or not GEMINI_API_KEY:
    raise ValueError("As chaves de API OPENWEATHER_API_KEY e GEMINI_API_KEY devem ser definidas no arquivo .env")

genai.configure(api_key=GEMINI_API_KEY)

# --- CONFIGURAÇÕES DE DIRETÓRIO ---
DATA_DIR = 'inmet_data' 

# --- CIDADES VIZINHAS DE INTERESSE ---
# Dicionário com cidades próximas para análise de contexto regional.
NEARBY_LOCATIONS = {
    "Osasco": {"lat": -23.5325, "lon": -46.7917},
    "Carapicuíba": {"lat": -23.5222, "lon": -46.8358},
    "São Paulo (Centro)": {"lat": -23.5505, "lon": -46.6333},
    "Santo André": {"lat": -23.6644, "lon": -46.5381}
}

# --- LIMIARES DE RISCO DE PRECIPITAÇÃO (EM MM) ---
# Estes valores definem o nível de alerta. Podem ser ajustados conforme necessário.
# Baseado em referências da Defesa Civil e centros de meteorologia.
PRECIPITATION_THRESHOLDS = {
    "level_1_yellow": 20.0,  # Acumulado de chuva em 24h para Risco Moderado
    "level_2_orange": 50.0,  # Acumulado de chuva em 24h para Risco Alto
    "level_3_red": 80.0     # Acumulado de chuva em 24h para Risco Muito Alto
}

def get_weather_forecast_24h(lat, lon):
    """Busca a previsão do tempo para as próximas 24 horas (em intervalos de 3h)."""
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric&lang=pt_br"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Processar dados para as próximas 24h (8 registros de 3h)
        forecast_data = {
            "city_name": data['city']['name'],
            "entries": [],
            "total_rain_24h": 0.0
        }
        
        # Pega os 8 primeiros registros (24h)
        for item in data['list'][:8]:
            rain_3h = item.get('rain', {}).get('3h', 0.0)
            forecast_data['total_rain_24h'] += rain_3h
            forecast_data['entries'].append({
                "datetime_utc": datetime.utcfromtimestamp(item['dt']).strftime('%Y-%m-%d %H:%M:%S'),
                "temp": item['main']['temp'],
                "description": item['weather'][0]['description'],
                "rain_3h": rain_3h,
                "pop": item.get('pop', 0) # Probabilidade de Precipitação
            })
            
        return forecast_data
    except requests.exceptions.RequestException as e:
        print(f"Erro ao chamar a API do OpenWeather (Forecast): {e}")
        return None

def get_nearby_forecasts_summary():
    """Busca a previsão atual para as cidades vizinhas e cria um resumo."""
    summaries = []
    for city, coords in NEARBY_LOCATIONS.items():
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={coords['lat']}&lon={coords['lon']}&appid={OPENWEATHER_API_KEY}&units=metric&lang=pt_br"
        try:
            response = requests.get(url)
            response.raise_for_status()
            forecast = response.json()

            if forecast and 'weather' in forecast:
                description = forecast['weather'][0]['description']
                summaries.append(f"{city}: {description}")
            else:
                summaries.append(f"{city}: dados indisponíveis")
            time.sleep(0.1) # Pequena pausa para não sobrecarregar a API
        except requests.exceptions.RequestException as e:
            print(f"Erro ao buscar previsão para {city}: {e}")
            summaries.append(f"{city}: erro na consulta")
    return summaries

def determine_alert_level(total_rain_24h):
    """Determina o nível de alerta e a mensagem com base na precipitação acumulada."""
    if total_rain_24h >= PRECIPITATION_THRESHOLDS["level_3_red"]:
        return 3, "Alerta Máximo", "Risco muito alto de alagamentos e deslizamentos. Evite áreas de risco."
    elif total_rain_24h >= PRECIPITATION_THRESHOLDS["level_2_orange"]:
        return 2, "Alerta", "Risco alto de alagamentos. Fique atento e prepare-se para evacuar se necessário."
    elif total_rain_24h >= PRECIPITATION_THRESHOLDS["level_1_yellow"]:
        return 1, "Atenção", "Risco moderado de alagamentos. Tenha cuidado ao se deslocar."
    else:
        return 0, "Sem Risco", "Condições normais. Baixa probabilidade de chuva."

def analyze_with_gemini(forecast_data, alert_details, nearby_forecasts):
    """Envia os dados para o Gemini para gerar uma análise textual rica."""
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    nearby_forecasts_str = "\n- ".join(nearby_forecasts)
    
    # Prepara um resumo da previsão principal para o prompt
    forecast_summary = []
    for entry in forecast_data['entries']:
        dt = datetime.strptime(entry['datetime_utc'], '%Y-%m-%d %H:%M:%S')
        forecast_summary.append(f"  - {dt.strftime('%H:%M')}: {entry['description']}, chuva prevista: {entry['rain_3h']:.1f}mm")
    forecast_summary_str = "\n".join(forecast_summary)

    prompt = f"""
    Você é um especialista em meteorologia e hidrologia da Defesa Civil. Sua tarefa é gerar um relatório detalhado e recomendações com base em uma análise de risco de enchente que já foi pré-calculada.

    **Análise de Risco Pré-Calculada:**

    1. **Local da Análise:** {forecast_data['city_name']}
    2. **Nível de Alerta Definido:** {alert_details['level_name']} (Nível {alert_details['level']})
    3. **Mensagem Principal:** "{alert_details['message']}"
    4. **Precipitação Total Prevista para as Próximas 24h:** {forecast_data['total_rain_24h']:.1f} mm

    **Dados de Previsão Detalhada para {forecast_data['city_name']}:**
{forecast_summary_str}

    **Previsão para Cidades Vizinhas:**
- {nearby_forecasts_str}

    **Sua Tarefa:**
    Com base em TODOS os dados acima, gere um relatório em JSON. O nível de alerta já está decidido, sua função é fornecer a análise e as recomendações que o justifiquem.
    
    Responda em formato JSON, seguindo estritamente esta estrutura, sem adicionar nenhuma explicação fora do JSON:
    {{
      "location_name": "{forecast_data['city_name']}",
      "alert": {{
        "level": {alert_details['level']},
        "level_name": "{alert_details['level_name']}",
        "message": "{alert_details['message']}"
      }},
      "analysis": {{
        "summary": "<string - Elabore um resumo técnico explicando por que o nível de alerta foi acionado, mencionando o volume de chuva esperado e as condições do tempo.>",
        "recommendations": "<string - Forneça uma lista de recomendações práticas para a população, adequadas ao nível de alerta. Ex: 'Evite áreas de risco conhecidas...', 'Monitore o nível dos rios...', 'Tenha um kit de emergência...', etc.>"
      }},
      "nearby_forecasts": {json.dumps(nearby_forecasts)}
    }}
    """
    try:
        response = model.generate_content(prompt)
        # Limpeza robusta para garantir que apenas o JSON seja processado
        cleaned_response = response.text.strip()
        json_start = cleaned_response.find('{')
        json_end = cleaned_response.rfind('}') + 1
        if json_start != -1 and json_end != -1:
            json_str = cleaned_response[json_start:json_end]
            return jsonify(json.loads(json_str))
        else:
            raise ValueError("Resposta da API Gemini não continha um JSON válido.")

    except Exception as e:
        print(f"Erro ao chamar ou processar a resposta da API do Gemini: {e}")
        # Fallback: se o Gemini falhar, retorna a análise básica
        fallback_response = {
            "location_name": forecast_data['city_name'],
            "alert": alert_details,
            "analysis": {
                "summary": "Não foi possível gerar a análise detalhada por IA. A previsão indica um acumulado de chuva de {:.1f} mm nas próximas 24 horas.".format(forecast_data['total_rain_24h']),
                "recommendations": "Siga as orientações da Defesa Civil local. Em caso de emergência, ligue para 199."
            },
            "nearby_forecasts": nearby_forecasts
        }
        return jsonify(fallback_response)


@app.route('/predict', methods=['GET'])
def predict():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Os parâmetros 'lat' e 'lon' são obrigatórios."}), 400

    # 1. Busca a previsão do tempo para as próximas 24h
    forecast_data = get_weather_forecast_24h(lat, lon)
    if not forecast_data:
        return jsonify({"error": "Não foi possível obter a previsão do tempo para a sua localização."}), 500

    # 2. Determina o nível de alerta com base na precipitação prevista
    total_rain_24h = forecast_data['total_rain_24h']
    level, level_name, message = determine_alert_level(total_rain_24h)
    
    alert_details = {
        "level": level,
        "level_name": level_name,
        "message": message
    }

    # 3. Busca a previsão para as cidades vizinhas
    nearby_forecasts = get_nearby_forecasts_summary()
    
    # 4. Envia para o Gemini para gerar a análise textual
    return analyze_with_gemini(forecast_data, alert_details, nearby_forecasts)

if __name__ == '__main__':
    # O ideal é usar um servidor de produção como Gunicorn ou Waitress em vez do servidor de desenvolvimento da Flask
    app.run(host='0.0.0.0', port=5000, debug=True)