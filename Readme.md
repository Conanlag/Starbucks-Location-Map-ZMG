# Starbucks Location Map | Mexico (ZMG)

An interactive web application that visualizes Starbucks locations across the Guadalajara Metropolitan Area (ZMG). The project combines data collection using the Google Cloud Places API with an Angular frontend to display geographic information on an interactive map.

## Requirements

* Python 3.10+
* Angular 20 + 
* Docker & Docker Compose
* Google Cloud API Key with the **Places API** enabled

## Features

- Retrieve Starbucks locations using the **Google Cloud Places API**.
- Collect and process location data with a **Python** script.
- Display stores on an interactive map using the **Google Maps JavaScript API**.
- Explore the geographic distribution of Starbucks locations across the Guadalajara Metropolitan Area.

## Tech Stack

- **Frontend:** Angular
- **Backend/Data Collection:** Python
- **Cloud Services:** Google Cloud Places API
- **Maps:** Google Maps JavaScript API


## How It Works

1. A Python script queries the **Google Cloud Places API** to retrieve Starbucks locations in the Guadalajara Metropolitan Area.
2. The collected data is processed and exported into a JSON that can be consumed by the Angular application.
3. The Angular application loads the location data and renders each Starbucks location on an interactive Google Map.

## Project Structure

```text
.
├── api-code/
│   ├── main.py                 # Python script that retrieves Starbucks locations from the Google Places API
│   ├── Starbucks_zmg.json      # Exported location data in JSON format
│   ├── Starbucks_zmg.csv       # Exported location data in CSV format
│   └── ...
├── starbucks-map/
│   ├── src/                    # Angular source code
│   ├── public/                 # Static assets
│   ├── Dockerfile              # Frontend container configuration
│   └── ...
├── .env.example                # Example environment variables
├── docker-compose.yml          # Docker Compose configuration
└── README.md
```


## How to Run the Project

### 1. Configure the Environment Variables

Create a `.env` file from the provided example:

```bash
cp .env.example .env
```

Then, edit the `.env` file and add your Google Cloud API credentials and any other required configuration.

### 2. Retrieve Location Data

If you want to modify the search location or customize the search parameters used to identify Starbucks stores, navigate to the `api-code` directory and update the configuration in `main.py`.

Run the script:

```bash
cd api-code
python main.py
```

The script will generate the following files:

* `Starbucks_zmg.json` – Location data in JSON format.
* `Starbucks_zmg.csv` – Location data in CSV format.

### 3. Build and Run the Application

From the project's root directory, start the application with Docker Compose:

```bash
docker compose up --build
```

Once the containers are running, open your browser and navigate to the URL http://localhost:4200


## Future Improvements

- Support filtering by municipality or city.
- Display additional store information (hours, ratings, phone number).
- Implement clustering for better visualization.
- Allow searching for nearby stores based on the user's location.

## Purpose

This project was created to explore the integration of **Google Cloud APIs**, **geospatial data processing**, and **interactive web mapping** using Angular and Python.