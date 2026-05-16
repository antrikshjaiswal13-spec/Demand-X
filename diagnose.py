#!/usr/bin/env python
"""
Diagnostic script to verify Demand-X prediction setup
Run this before testing predictions to ensure everything is configured correctly
"""

import os
import sys
import pickle
import json

def check_model_files():
    """Check if all required ML model files exist"""
    print("\n" + "="*50)
    print("🔍 CHECKING MODEL FILES")
    print("="*50)
    
    required_files = [
        'backend/ml_model/model.pkl',
        'backend/ml_model/encoders.pkl',
        'backend/ml_model/feature_names.pkl',
        'backend/ml_model/dataset.csv'
    ]
    
    all_exist = True
    for file_path in required_files:
        exists = os.path.exists(file_path)
        status = "✓" if exists else "✗"
        print(f"{status} {file_path}: {'Found' if exists else 'MISSING'}")
        if not exists:
            all_exist = False
    
    return all_exist

def check_encoders():
    """Verify encoders are properly saved and loadable"""
    print("\n" + "="*50)
    print("🔍 CHECKING ENCODERS")
    print("="*50)
    
    try:
        encoders = pickle.load(open('backend/ml_model/encoders.pkl', 'rb'))
        print(f"✓ Encoders loaded successfully!")
        print(f"\nAvailable encoders:")
        
        for col, encoder in encoders.items():
            classes = list(encoder.classes_)
            print(f"\n  {col}:")
            for cls in classes[:5]:  # Show first 5 classes
                print(f"    • {cls}")
            if len(classes) > 5:
                print(f"    ... and {len(classes) - 5} more")
        
        return True
    except Exception as e:
        print(f"✗ Error loading encoders: {e}")
        return False

def test_prediction_api():
    """Test the prediction API endpoint"""
    print("\n" + "="*50)
    print("🔍 TESTING PREDICTION API")
    print("="*50)
    
    try:
        import urllib.request
        import json
        
        payload = {
            'Item_Weight': 9.3,
            'Item_Fat_Content': 'Low Fat',
            'Item_Visibility': 0.016,
            'Item_Type': 'Dairy',
            'Item_MRP': 249.8,
            'Outlet_Identifier': 'OUT049',
            'Outlet_Establishment_Year': 1999,
            'Outlet_Size': 'Medium',
            'Outlet_Location_Type': 'Tier 2',
            'Outlet_Type': 'Supermarket Type1',
            'Profit': 11.5
        }
        
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            'http://127.0.0.1:5000/api/predict',
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            print(f"✓ API request successful!")
            print(f"\nPrediction Result:")
            print(f"  Predicted Sales: ₹{result['predicted_sales']}")
            print(f"  Timestamp: {result['timestamp']}")
            return True
    
    except ConnectionRefusedError:
        print(f"✗ Cannot connect to backend at http://127.0.0.1:5000")
        print(f"  Make sure to run: python backend/app.py")
        return False
    except Exception as e:
        print(f"✗ API test failed: {e}")
        return False

def main():
    print("\n")
    print("╔═══════════════════════════════════════════════════╗")
    print("║    DEMAND-X PREDICTION DIAGNOSTIC TOOL            ║")
    print("╚═══════════════════════════════════════════════════╝")
    
    # Change to project root
    if os.path.exists('backend'):
        pass  # Already in project root
    elif os.path.exists('../backend'):
        os.chdir('..')
    else:
        print("✗ Cannot find backend directory. Please run this script from the project root.")
        sys.exit(1)
    
    results = {
        'model_files': check_model_files(),
        'encoders': check_encoders(),
        'api': test_prediction_api()
    }
    
    # Summary
    print("\n" + "="*50)
    print("📋 DIAGNOSTIC SUMMARY")
    print("="*50)
    
    all_pass = all(results.values())
    
    if all_pass:
        print("✓ All checks passed! Your setup is ready.")
        print("\nYou can now:")
        print("  1. Run the frontend: npm run dev (from frontend/)")
        print("  2. Open http://localhost:5174/prediction")
        print("  3. Fill in the form and get predictions!")
    else:
        print("✗ Some checks failed. Please fix the issues above.")
        if not results['model_files']:
            print("\nTo fix missing files:")
            print("  python backend/ml_model/train_model.py")
        if not results['api']:
            print("\nTo start the backend:")
            print("  python backend/app.py")
    
    return 0 if all_pass else 1

if __name__ == '__main__':
    sys.exit(main())
