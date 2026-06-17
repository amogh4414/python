import json
import os
from data_processor import DataProcessor

def export_all():
    companies = ['spacex', 'openai', 'stripe']
    all_metrics = {}
    
    for c in companies:
        processor = DataProcessor(c)
        all_metrics[c] = processor.get_full_analysis()
        
    frontend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'frontend', 'src', 'lib')
    os.makedirs(frontend_dir, exist_ok=True)
    out_path = os.path.join(frontend_dir, 'metrics.json')
    
    with open(out_path, 'w') as f:
        json.dump(all_metrics, f, indent=2)
        
    print(f"Successfully exported metrics to {out_path}")

if __name__ == '__main__':
    export_all()
