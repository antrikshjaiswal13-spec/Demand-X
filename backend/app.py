from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import logging
from datetime import datetime
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load trained model
try:
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, 'ml_model/model.pkl')
    encoders_path = os.path.join(script_dir, 'ml_model/encoders.pkl')
    
    if os.path.exists(model_path):
        model = pickle.load(open(model_path, 'rb'))
        logger.info("Model loaded successfully")
    else:
        logger.warning(f"Model not found at {model_path}")
        model = None
    
    if os.path.exists(encoders_path):
        encoders = pickle.load(open(encoders_path, 'rb'))
        logger.info("Encoders loaded successfully")
    else:
        logger.warning(f"Encoders not found at {encoders_path}")
        encoders = {}
except Exception as e:
    logger.error(f"Error loading model/encoders: {e}")
    model = None
    encoders = {}

# Sample data for dashboard (replace with database later)
DASHBOARD_DATA = {
    "total_products": 1000,
    "monthly_sales": 250000,
    "predicted_demand": 275000,
    "warehouse_items": 5000,
    "trends": {
        "january": 200000,
        "february": 210000,
        "march": 220000
    }
}

@app.route('/')
def home():
    return jsonify({"message": "Demand-X Backend is working!", "status": "active"})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": model is not None
    })

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    """Get dashboard data"""
    try:
        return jsonify(DASHBOARD_DATA)
    except Exception as e:
        logger.error(f"Error fetching dashboard data: {e}")
        return jsonify({"error": "Failed to fetch dashboard data"}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """Make demand prediction"""
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        data = request.json
        
        # Validate required fields
        required_fields = [
            'Item_Weight', 'Item_Fat_Content', 'Item_Visibility', 'Item_Type',
            'Item_MRP', 'Outlet_Identifier', 'Outlet_Establishment_Year',
            'Outlet_Size', 'Outlet_Location_Type', 'Outlet_Type', 'Profit'
        ]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Get current date for temporal features
        from datetime import datetime
        today = datetime.now()
        month = today.month
        quarter = (today.month - 1) // 3 + 1
        day_of_week = today.weekday()
        
        # Encode categorical variables using the saved encoders
        item_fat_content_encoded = data['Item_Fat_Content']
        item_type_encoded = data['Item_Type']
        outlet_identifier_encoded = data['Outlet_Identifier']
        outlet_size_encoded = data['Outlet_Size']
        outlet_location_type_encoded = data['Outlet_Location_Type']
        outlet_type_encoded = data['Outlet_Type']
        
        # Use encoders if available
        if 'Item_Fat_Content' in encoders and isinstance(data['Item_Fat_Content'], str):
            try:
                item_fat_content_encoded = encoders['Item_Fat_Content'].transform([data['Item_Fat_Content']])[0]
            except ValueError as e:
                logger.error(f"Item_Fat_Content encoding error: {e}. Valid values: {list(encoders['Item_Fat_Content'].classes_)}")
                return jsonify({"error": f"Invalid Item_Fat_Content: {data['Item_Fat_Content']}"}), 400
            except:
                item_fat_content_encoded = float(data['Item_Fat_Content'])
        
        if 'Item_Type' in encoders and isinstance(data['Item_Type'], str):
            try:
                item_type_encoded = encoders['Item_Type'].transform([data['Item_Type']])[0]
            except ValueError as e:
                logger.error(f"Item_Type encoding error: {e}. Valid values: {list(encoders['Item_Type'].classes_)}")
                return jsonify({"error": f"Invalid Item_Type: {data['Item_Type']}"}), 400
            except:
                item_type_encoded = float(data['Item_Type'])
        
        if 'Outlet_Identifier' in encoders and isinstance(data['Outlet_Identifier'], str):
            try:
                outlet_identifier_encoded = encoders['Outlet_Identifier'].transform([data['Outlet_Identifier']])[0]
            except ValueError as e:
                logger.error(f"Outlet_Identifier encoding error: {e}")
                return jsonify({"error": f"Invalid Outlet_Identifier: {data['Outlet_Identifier']}"}), 400
            except:
                outlet_identifier_encoded = float(data['Outlet_Identifier'])
        
        if 'Outlet_Size' in encoders and isinstance(data['Outlet_Size'], str):
            try:
                outlet_size_encoded = encoders['Outlet_Size'].transform([data['Outlet_Size']])[0]
            except ValueError as e:
                logger.error(f"Outlet_Size encoding error: {e}")
                return jsonify({"error": f"Invalid Outlet_Size: {data['Outlet_Size']}"}), 400
            except:
                outlet_size_encoded = float(data['Outlet_Size'])
        
        if 'Outlet_Location_Type' in encoders and isinstance(data['Outlet_Location_Type'], str):
            try:
                outlet_location_type_encoded = encoders['Outlet_Location_Type'].transform([data['Outlet_Location_Type']])[0]
            except ValueError as e:
                logger.error(f"Outlet_Location_Type encoding error: {e}. Valid values: {list(encoders['Outlet_Location_Type'].classes_)}")
                return jsonify({"error": f"Invalid Outlet_Location_Type: {data['Outlet_Location_Type']}"}), 400
            except:
                outlet_location_type_encoded = float(data['Outlet_Location_Type'])
        
        if 'Outlet_Type' in encoders and isinstance(data['Outlet_Type'], str):
            try:
                outlet_type_encoded = encoders['Outlet_Type'].transform([data['Outlet_Type']])[0]
            except ValueError as e:
                logger.error(f"Outlet_Type encoding error: {e}")
                return jsonify({"error": f"Invalid Outlet_Type: {data['Outlet_Type']}"}), 400
            except:
                outlet_type_encoded = float(data['Outlet_Type'])
        
        features = np.array([[
            float(data['Item_Weight']),
            float(item_fat_content_encoded),
            float(data['Item_Visibility']),
            float(item_type_encoded),
            float(data['Item_MRP']),
            float(outlet_identifier_encoded),
            float(data['Outlet_Establishment_Year']),
            float(outlet_size_encoded),
            float(outlet_location_type_encoded),
            float(outlet_type_encoded),
            float(data['Profit']),
            month,           # Temporal feature
            quarter,         # Temporal feature
            day_of_week      # Temporal feature
        ]])
        
        prediction = model.predict(features)
        
        return jsonify({
            "predicted_sales": round(prediction[0], 2),
            "timestamp": datetime.now().isoformat()
        })
    
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    try:
        return jsonify({
            "monthly_data": DASHBOARD_DATA.get("trends", {}),
            "total_predictions": 150,
            "accuracy": 0.92
        })
    except Exception as e:
        logger.error(f"Error fetching analytics: {e}")
        return jsonify({"error": "Failed to fetch analytics"}), 500

@app.route('/api/production-plan', methods=['POST'])
def production_plan():
    """Production planning - aggregate predictions across all outlets for a product in a month"""
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        data = request.json
        
        # Validate required fields
        required_fields = ['Item_Weight', 'Item_Fat_Content', 'Item_Visibility', 'Item_Type',
                          'Item_MRP', 'Outlet_Establishment_Year', 'Outlet_Size', 
                          'Outlet_Location_Type', 'Outlet_Type', 'Profit', 'Month']
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Get month and year
        month = int(data['Month'])
        year = int(data.get('Year', 2026))
        quarter = (month - 1) // 3 + 1
        
        # Available outlets
        all_outlets = ['OUT010', 'OUT013', 'OUT017', 'OUT018', 'OUT019', 'OUT027', 'OUT035', 'OUT045', 'OUT046', 'OUT049']
        
        # Encode categorical variables
        item_fat_content_encoded = data['Item_Fat_Content']
        item_type_encoded = data['Item_Type']
        outlet_size_encoded = data['Outlet_Size']
        outlet_location_type_encoded = data['Outlet_Location_Type']
        outlet_type_encoded = data['Outlet_Type']
        
        # Encode using saved encoders
        if 'Item_Fat_Content' in encoders and isinstance(data['Item_Fat_Content'], str):
            try:
                item_fat_content_encoded = encoders['Item_Fat_Content'].transform([data['Item_Fat_Content']])[0]
            except:
                item_fat_content_encoded = float(data['Item_Fat_Content'])
        
        if 'Item_Type' in encoders and isinstance(data['Item_Type'], str):
            try:
                item_type_encoded = encoders['Item_Type'].transform([data['Item_Type']])[0]
            except:
                item_type_encoded = float(data['Item_Type'])
        
        if 'Outlet_Size' in encoders and isinstance(data['Outlet_Size'], str):
            try:
                outlet_size_encoded = encoders['Outlet_Size'].transform([data['Outlet_Size']])[0]
            except:
                outlet_size_encoded = float(data['Outlet_Size'])
        
        if 'Outlet_Location_Type' in encoders and isinstance(data['Outlet_Location_Type'], str):
            try:
                outlet_location_type_encoded = encoders['Outlet_Location_Type'].transform([data['Outlet_Location_Type']])[0]
            except:
                outlet_location_type_encoded = float(data['Outlet_Location_Type'])
        
        if 'Outlet_Type' in encoders and isinstance(data['Outlet_Type'], str):
            try:
                outlet_type_encoded = encoders['Outlet_Type'].transform([data['Outlet_Type']])[0]
            except:
                outlet_type_encoded = float(data['Outlet_Type'])
        
        # Store day of week for a typical day in the month
        day_of_week = 2  # Default to Wednesday (middle of the week)
        
        # Predict for each outlet
        outlet_predictions = []
        total_revenue = 0
        total_profit = 0
        
        for outlet_id in all_outlets:
            outlet_identifier_encoded = outlet_id
            
            # Encode outlet identifier if encoder available
            if 'Outlet_Identifier' in encoders and isinstance(outlet_id, str):
                try:
                    outlet_identifier_encoded = encoders['Outlet_Identifier'].transform([outlet_id])[0]
                except:
                    outlet_identifier_encoded = float(outlet_id[-3:]) if outlet_id.startswith('OUT') else float(outlet_id)
            
            features = np.array([[
                float(data['Item_Weight']),
                float(item_fat_content_encoded),
                float(data['Item_Visibility']),
                float(item_type_encoded),
                float(data['Item_MRP']),
                float(outlet_identifier_encoded),
                float(data['Outlet_Establishment_Year']),
                float(outlet_size_encoded),
                float(outlet_location_type_encoded),
                float(outlet_type_encoded),
                float(data['Profit']),
                month,
                quarter,
                day_of_week
            ]])
            
            # Make prediction
            predicted_sales = model.predict(features)[0]
            
            # Calculate units and profit
            price_per_unit = float(data['Item_MRP'])
            profit_per_unit = float(data['Profit'])
            units = round(predicted_sales / price_per_unit, 2)
            outlet_profit = units * profit_per_unit
            
            outlet_predictions.append({
                'outlet_id': outlet_id,
                'predicted_sales': round(predicted_sales, 2),
                'units_to_produce': max(0, int(units)),  # Don't go negative
                'profit': round(outlet_profit, 2)
            })
            
            total_revenue += predicted_sales
            total_profit += outlet_profit
        
        return jsonify({
            "month": month,
            "year": year,
            "month_name": ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'][month - 1],
            "product_info": {
                "type": data['Item_Type'],
                "weight": data['Item_Weight'],
                "mrp": data['Item_MRP'],
                "profit_per_unit": data['Profit']
            },
            "outlet_details": outlet_predictions,
            "aggregated": {
                "total_predicted_revenue": round(total_revenue, 2),
                "total_units_to_produce": sum(o['units_to_produce'] for o in outlet_predictions),
                "total_expected_profit": round(total_profit, 2),
                "average_profit_per_outlet": round(total_profit / len(all_outlets), 2)
            },
            "timestamp": datetime.now().isoformat()
        })
    
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        logger.error(f"Production plan error: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)