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
req = urllib.request.Request('http://127.0.0.1:5000/api/predict', data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode())
        print("Success! Response:")
        print(json.dumps(result, indent=2))
except Exception as e:
    print(f"Error: {e}")
