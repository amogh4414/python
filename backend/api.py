import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from data_processor import DataProcessor
from urllib.parse import urlparse, parse_qs

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handles GET requests from the frontend."""
        parsed_path = urlparse(self.path)
        
        # Routing
        if parsed_path.path == '/api/valuation':
            # Extract query parameters (e.g., ?company=spacex)
            query_components = parse_qs(parsed_path.query)
            company_id = query_components.get('company', [''])[0]
            
            if company_id in ['spacex', 'openai', 'stripe']:
                # Call Data Processor
                processor = DataProcessor(company_id)
                try:
                    result = processor.get_full_analysis()
                    
                    # Return JSON Response
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    # Handle CORS for local dev
                    self.send_header('Access-Control-Allow-Origin', '*') 
                    self.end_headers()
                    self.wfile.write(json.dumps(result).encode('utf-8'))
                except Exception as e:
                    self.send_error(500, f"Server Error: {str(e)}")
            else:
                self.send_error(400, "Bad Request: Invalid or missing company ID. Choose from spacex, openai, stripe.")
        else:
            self.send_error(404, "Not Found")

def run(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"Starting lightweight API server on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()