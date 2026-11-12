# API Endpoints utilisés
## 1. Geocoding API

- **URL :** `https://geocoding-api.open-meteo.com/v1/search`
- **Méthode HTTP :** GET
### Paramètres

| Paramètre | Description |
|---|---|
| `name` | Nom de la ville recherchée. |
| `count` | Nombre de résultats souhaités. |
| `language` | Langue des résultats (`fr`). |
| `format` | Format des données retournées (`json`). |
## 2. Forecast API

- **URL :** `https://api.open-meteo.com/v1/forecast`
- **Méthode HTTP :** GET

### Paramètres

| Paramètre | Description |
|---|---|
| `latitude` | Latitude de la ville recherchée. |
| `longitude` | Longitude de la ville recherchée. |
| `current` | Données météorologiques actuelles. |
| `daily` | Prévisions météorologiques quotidiennes. |
| `timezone` | Fuseau horaire (`auto`). |
### Détails des paramètres

**Paramètre `current` :**
- `temperature_2m` : température actuelle.
- `relative_humidity_2m` : humidité relative.
- `wind_speed_10m` : vitesse du vent.
- `weather_code` : code décrivant les conditions météorologiques.

**Paramètre `daily` :**
- `temperature_2m_max` : température maximale quotidienne.
- `temperature_2m_min` : température minimale quotidienne.
- `weather_code` : code météo journalier.