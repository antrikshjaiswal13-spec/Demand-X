import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score
import pickle
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load dataset
try:
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(script_dir, "dataset.csv")
    data = pd.read_csv(dataset_path)
    logger.info(f"Dataset loaded: {data.shape}")
except Exception as e:
    logger.error(f"Error loading dataset: {e}")
    exit(1)

# Fill missing values
data.ffill(inplace=True)

# Encode text columns
encoders = {}
categorical_columns = [
    'Item_Identifier',
    'Item_Fat_Content',
    'Item_Type',
    'Outlet_Identifier',
    'Outlet_Size',
    'Outlet_Location_Type',
    'Outlet_Type'
]

for col in categorical_columns:
    if col in data.columns:
        encoders[col] = LabelEncoder()
        data[col] = encoders[col].fit_transform(data[col])

# Feature engineering - Add temporal features if date column exists
if 'Date' in data.columns:
    data['Date'] = pd.to_datetime(data['Date'])
    data['Month'] = data['Date'].dt.month
    data['Quarter'] = data['Date'].dt.quarter
    data['DayOfWeek'] = data['Date'].dt.dayofweek
else:
    logger.warning("No Date column found. Using default temporal features.")
    data['Month'] = np.random.randint(1, 13, len(data))
    data['Quarter'] = np.random.randint(1, 5, len(data))
    data['DayOfWeek'] = np.random.randint(0, 7, len(data))

# Features for model
feature_columns = [
    'Item_Weight',
    'Item_Fat_Content',
    'Item_Visibility',
    'Item_Type',
    'Item_MRP',
    'Outlet_Identifier',
    'Outlet_Establishment_Year',
    'Outlet_Size',
    'Outlet_Location_Type',
    'Outlet_Type',
    'Profit',
    'Month',
    'Quarter',
    'DayOfWeek'
]

# Remove columns that don't exist
feature_columns = [col for col in feature_columns if col in data.columns]

X = data[feature_columns]
y = data['Item_Outlet_Sales'] if 'Item_Outlet_Sales' in data.columns else data.iloc[:, -1]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

logger.info(f"Training set size: {X_train.shape}")
logger.info(f"Test set size: {X_test.shape}")

# Train model - Using Gradient Boosting for better performance
model = GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.1,
    max_depth=5,
    min_samples_split=5,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

logger.info(f"Model RMSE: {rmse:.2f}")
logger.info(f"Model R² Score: {r2:.4f}")

# Save model
model_path = os.path.join(script_dir, "model.pkl")
feature_path = os.path.join(script_dir, "feature_names.pkl")
encoders_path = os.path.join(script_dir, "encoders.pkl")

pickle.dump(model, open(model_path, "wb"))
logger.info(f"Model saved to {model_path}")

# Save feature names for later use
pickle.dump(feature_columns, open(feature_path, "wb"))
logger.info(f"Feature names saved to {feature_path}")

# Save encoders for later use
pickle.dump(encoders, open(encoders_path, "wb"))
logger.info(f"Encoders saved to {encoders_path}")