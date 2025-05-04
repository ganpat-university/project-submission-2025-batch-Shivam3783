# app.py
from flask import Flask, request, jsonify
import redis
import json
import urllib.parse
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf
import pandas as pd
import pytz
from dotenv import load_dotenv
import os



import redis

app = Flask(__name__)
CORS(app) 
CORS(app, origins="http://localhost:8080")
CORS(app,origins="https://application-ab.1tn0cmf82ds0.au-syd.codeengine.appdomain.cloud")
CORS(app,origins="https://application-front.1tn0cmf82ds0.au-syd.codeengine.appdomain.cloud")
CORS(app,origins="https://application-frontend.1tn0cmf82ds0.au-syd.codeengine.appdomain.cloud")



url = urllib.parse.urlparse(redis_url)

# Configure Redis connection using the parsed URI
redis_client = redis.StrictRedis(
    host=url.hostname,
    port=url.port,
    password=url.password,
    ssl=False,  # Enabling SSL for secure connection
    # decode_responses=True
)

@app.route('/')
def home():
    return "Welcome to the Flask Redis API!"

@app.route('/wishlist/<user_id>', methods=['GET', 'POST'])
def wishlist(user_id):
    if request.method == 'GET':
        wishlist = redis_client.get(f'wishlist:{user_id}')
        if wishlist:
            return jsonify(json.loads(wishlist)), 200
        else:
            return jsonify({"message": "Wishlist not found"}), 404
    
    elif request.method == 'POST':
        data = request.json
        redis_client.set(f'wishlist:{user_id}', json.dumps(data['wishlist']))
        return jsonify({"message": "Wishlist saved successfully!"}), 201


from flask import render_template
from functools import wraps

load_dotenv()

CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

# ADMIN_USER_ID = "user_2vKuVuCtr64QbBIJnmVa71SwaVh"
ALLOWED_USER_IDS = [
    "user_2vKuVuCtr64QbBIJnmVa71SwaVh",  # your user id
    "user_2sRMtFIWMnQEulpPi82H04CCLPa",  # your friend's user id
    "user_2t497lCaXPnGwJldGyULcCc1H9S",
    "user_2ujK4aGw3bJ1pzd2XjqlPHOFPn3",
]

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = request.headers.get('X-User-Id')
        # if not user_id or user_id != ADMIN_USER_ID:
        if not user_id or user_id not in ALLOWED_USER_IDS:

            return jsonify({"error": "Unauthorized access"}), 403
        return f(*args, **kwargs)
    return decorated_function

@app.route('/clerk/user-activity')
@admin_required
def get_clerk_user_activity():
    try:
        headers = {
            "Authorization": f"Bearer {CLERK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        print("Fetching users from Clerk...")
        response = requests.get("https://api.clerk.dev/v1/users", headers=headers)
        print(f"Status: {response.status_code}")

        if response.status_code != 200:
            print("Clerk API error:", response.text)
            return jsonify({"error": "Clerk API failed", "details": response.text}), 500

        users = response.json()
        print(f"Users fetched: {len(users)} users")

        ist = pytz.timezone('Asia/Kolkata') 
        activity_logs = []

        for user in users:
            user_id = user.get("id", "N/A")
            email = user.get("email_addresses", [{}])[0].get("email_address", "N/A")
            created_at_ms = user.get("created_at", 0)
            created_at_dt = datetime.fromtimestamp(created_at_ms / 1000, tz=pytz.utc).astimezone(ist)
            formatted_time = created_at_dt.strftime("%Y-%m-%d %H:%M:%S %Z")

            # Wishlist
            wishlist_data = redis_client.get(f'wishlist:{user_id}')
            wishlist = json.loads(wishlist_data) if wishlist_data else []

            activity_logs.append({
                "user_id": user_id,
                "email": email,
                "event": "User Created",
                "timestamp": formatted_time,
                "wishlist": wishlist
            })

        # Fallback dummy data if no users
        if not activity_logs:
            print("No users found, sending dummy data.")
            activity_logs = [
                {
                    "user_id": "dummy_user_123",
                    "email": "dummy@example.com",
                    "event": "User Created",
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "wishlist": [
                        { "name": "Apple Inc.", "symbol": "AAPL" },
                        { "name": "Microsoft Corporation", "symbol": "MSFT" }
                    ]
                }
            ]

        return jsonify(activity_logs)

    except Exception as e:
        print("Error in /clerk/user-activity:", str(e))
        return jsonify({"error": str(e)}), 500




# List of top companies
TOP_COMPANIES = [
    { "symbol": "AAPL", "name": "Apple Inc." },
    { "symbol": "MSFT", "name": "Microsoft Corporation" },
    { "symbol": "GOOGL", "name": "Alphabet Inc." },
    { "symbol": "AMZN", "name": "Amazon.com Inc." },
    { "symbol": "NVDA", "name": "NVIDIA Corporation" }
]



def fetch_stock_data_from_api(symbol):
    """Fetch full stock data from Alpha Vantage via RapidAPI."""
    response = requests.get(
        RAPIDAPI_URL,
        headers=RAPIDAPI_HEADERS,
        params={
            'function': 'TIME_SERIES_DAILY',
            'symbol': symbol,
            'outputsize': 'full',
            'datatype': 'json',
        }
    )
    
    data = response.json()
    # print(f"API Response for {symbol}: ", json.dumps(data, indent=2))
    return data

def get_midnight_expiry():
    """Get the Unix timestamp for 12:00 AM of the next day."""
    now = datetime.now()
    midnight = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
    return int(midnight.timestamp())


# def get_stock_data(symbol):
#     """Fetch stock data from Redis or Alpha Vantage."""
#     stock_data = redis_client.get(f'stock_data:{symbol}')
    
#     if stock_data:
#         print(f"Fetching {symbol} data from Redis cache")
#         return json.loads(stock_data)  # Return cached data
    
#     print(f"Fetching fresh data for {symbol} from RapidAPI")
#     data = fetch_stock_data_from_api(symbol)
    
#     time_series = data.get('Time Series (Daily)', {})
#     # if time_series:
#     #     # Store the entire time series in Redis
#     #     redis_client.setex(f'stock_data:{symbol}', 86400, json.dumps(time_series))  # Cache for 1 hour
#     #     return time_series
#     if time_series:
#         # Store the entire time series in Redis
#         redis_client.set(f'stock_data:{symbol}', json.dumps(time_series))  # Store data
#         expiry_timestamp = get_midnight_expiry()  # Get expiry timestamp for 12:00 AM
#         redis_client.expireat(f'stock_data:{symbol}', expiry_timestamp)  # Set expiry
#         return time_series

#     return {}

def get_stock_data(symbol):
    """Fetch stock data from Redis or Alpha Vantage."""
    stock_data = redis_client.get(f'stock_data:{symbol}')
    
    if stock_data:
        print(f"Fetching {symbol} data from Redis cache")
        return json.loads(stock_data)  # Return cached data
    
    print(f"Fetching fresh data for {symbol} from RapidAPI")
    data = fetch_stock_data_from_api(symbol)
    
    time_series = data.get('Time Series (Daily)', {})
    
    if time_series:
        # Sort the time_series keys (dates) in descending order so that the latest date comes first
        sorted_dates = sorted(time_series.keys(), reverse=True)

        # Create a new dictionary with sorted dates
        sorted_time_series = {date: time_series[date] for date in sorted_dates}
        
        # Store the entire sorted time series in Redis
        redis_client.set(f'stock_data:{symbol}', json.dumps(sorted_time_series))  # Store data
        
        # Set the expiration time for the Redis cache at midnight
        expiry_timestamp = get_midnight_expiry()  # Get expiry timestamp for 12:00 AM
        redis_client.expireat(f'stock_data:{symbol}', expiry_timestamp)  # Set expiry time for cache
        
        return sorted_time_series

    return {}


@app.route('/stocks/<symbol>/all', methods=['GET'])
def stock_all(symbol):
    """Fetch all available stock data for a given symbol."""
    stock_data = get_stock_data(symbol.upper())
    
    if not stock_data:
        return jsonify({"message": "Stock data not available"}), 404

    return jsonify(stock_data)

@app.route('/stocks/<symbol>/twodays', methods=['GET'])
def stock_two_days(symbol):
    """Fetch only the latest two days of stock data from cached response."""
    stock_data = get_stock_data(symbol.upper())

    stock_data = redis_client.get(f'stock_data:{symbol.upper()}')
    
    if not stock_data:
        print(f"Fetching {symbol} twodays data from Redis cache")
        return jsonify({"message": "Stock data not available"}), 404
    
    stock_data = get_stock_data(symbol.upper())

    # stock_data = json.loads(stock_data)
    
    # Extract the latest 2 days
    sorted_dates = sorted(stock_data.keys(), reverse=True)[:2]
    latest_two = {date: stock_data[date] for date in sorted_dates}

    return jsonify(latest_two)



def filter_stock_data_for_time_range(stock_data, time_range):
    sorted_dates = sorted(stock_data.keys(), reverse=True)
    
    if time_range == '1W':
        time_limit = datetime.now() - timedelta(days=10)
    elif time_range == '1M':
        time_limit = datetime.now() - timedelta(days=39)
    elif time_range == '3M':
        time_limit = datetime.now() - timedelta(days=90)
    elif time_range == '1Y':
        time_limit = datetime.now() - timedelta(days=365)
    else:
        return {}

    filtered_data = {}
    for date_str in sorted_dates:
        date = datetime.strptime(date_str, '%Y-%m-%d')
        if date >= time_limit:
            filtered_data[date_str] = stock_data[date_str]
        else:
            break
    
    return filtered_data

@app.route('/stocks/<symbol>/historical/<time_range>', methods=['GET'])
def stock_historical(symbol, time_range):
    """Fetch historical stock data for a specified time range from the cache."""
    stock_data = get_stock_data(symbol.upper())
    
    if not stock_data:
        print(f"Fetching {symbol} historical data from Redis cache")
        return jsonify({"message": "Stock data not available"}), 404
    
    # Check the type of stock_data to handle it properly
    if isinstance(stock_data, bytes):
        # If stock_data is a byte string, we need to decode it first and then parse it
        stock_data = stock_data.decode('utf-8')
        stock_data = json.loads(stock_data)  # Parse it as JSON

    # Filter data based on the time range
    filtered_data = filter_stock_data_for_time_range(stock_data, time_range)

    return jsonify(filtered_data)


def get_stock_profile(symbol):
    """Fetch stock profile data from Redis or Financial Modeling Prep API."""
    stock_profile = redis_client.get(f'stock_profile:{symbol}')
    
    if stock_profile:
        print(f"Fetching {symbol} profile data from Redis cache")
        return json.loads(stock_profile)  # Return cached data
    

     # Determine the appropriate API endpoint
    if symbol.endswith('.BSE') or symbol.endswith('.NS'):
        modified_symbol = symbol.replace('.BSE', '.NS') if symbol.endswith('.BSE') else symbol
    else:
    
    print(f"Fetching fresh profile data for {symbol} from {url}")

    # print(f"Fetching fresh profile data for {symbol} from Financial Modeling Prep API")
    # symbol = symbol.replace('.BSE', '.BO') if symbol.endswith('.BSE') else symbol    
    
    # Make the API request
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        
        if data:
            # Store the profile data in Redis
            redis_client.set(f'stock_profile:{symbol}', json.dumps(data))  # Store data
            
            return data
    
    return {}


@app.route('/get-stock-profile/<symbol>', methods=['GET'])
def get_stock_profile_endpoint(symbol):
    """API endpoint to get stock profile."""
        
    modified_symbol = symbol.replace('.BSE', '.NS') if symbol.endswith('.BSE') else symbol    

    data = get_stock_profile(modified_symbol)  # Use modified symbol
    
    # data = get_stock_profile(symbol)
    
    if data:
        return jsonify(data), 200
    else:
        return jsonify({"error": "Data not found or API error"}), 404



# Load the trained LSTM model
model = tf.keras.models.load_model('lstm_stock_prediction_model.h5')


def preprocess_data(ticker, start_date, end_date):
    ticker = ticker.replace('.BSE', '.BO') if ticker.endswith('.BSE') else ticker    
    data = yf.download(ticker, start=start_date, end=end_date)
    # Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data['Close'].values.reshape(-1, 1))

    # Prepare x_test
    x_test = scaled_data[-150:]  # Assuming 60 days of past data
    x_test = np.reshape(x_test, (1, x_test.shape[0], 1))

    return x_test, scaler, scaled_data


@app.route('/predict', methods=['POST'])
def predict():
    # Get the ticker symbol and prediction days from the request
    data = request.json
    ticker = data['ticker']
    start_date = data['start_date']
    end_date = data['end_date']
    days_to_predict = data.get('days', 1)

    # Convert end_date to a datetime object
    end_date_dt = datetime.strptime(end_date, "%Y-%m-%d")

    # Preprocess the data
    x_test, scaler, scaled_data = preprocess_data(ticker, start_date, end_date)

    predictions = []
    prediction_dates = []

    for i in range(days_to_predict):
        # Predict the next day
        pred = model.predict(x_test)

        pred_actual = scaler.inverse_transform(pred)
        predicted_price = float(pred_actual.flatten()[0])
        predictions.append(predicted_price)

        # Get the next date
        next_date = end_date_dt + timedelta(days=i + 1)
        prediction_dates.append(next_date.strftime("%Y-%m-%d"))

        # Update x_test with the new prediction
        new_input = pred.flatten()[0]
        x_test = np.append(x_test[:, 1:, :], [[[new_input]]], axis=1)

    # Return predictions with dates
    return jsonify({'predictions': [{'date': d, 'price': p} for d, p in zip(prediction_dates, predictions)]})

if __name__ == '__main__':
    app.run(debug=True)












