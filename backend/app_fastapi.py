# This is a simple Python web application using FastAPI!
# FastAPI is a modern, fast web framework for building APIs with Python

# First, we need to import FastAPI and other tools
from fastapi import FastAPI, HTMLResponse
from datetime import datetime
import os

# Create a FastAPI application
# Think of this as creating your website (but more powerful than Flask!)
app = FastAPI(
    title="My First Python Web App with FastAPI!",
    description="A beginner-friendly web app that teaches Python basics",
    version="1.0.0"
)

# This is a "route" - it tells our app what to do when someone visits our website
@app.get("/", response_class=HTMLResponse)
async def home():
    """
    This function runs when someone visits the main page of our website.
    The 'async' keyword means this can handle multiple visitors at once!
    """
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # This is HTML - the language that makes web pages look nice
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>My First Python Web App with FastAPI!</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background-color: #f0f8ff;
            }}
            .container {{
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }}
            h1 {{
                color: #333;
                text-align: center;
            }}
            .info-box {{
                background-color: #e7f3ff;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                border-left: 4px solid #2196F3;
            }}
            .fastapi-box {{
                background-color: #e8f5e8;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                border-left: 4px solid #4CAF50;
            }}
            .time {{
                color: #666;
                font-style: italic;
                text-align: center;
                margin-top: 20px;
            }}
            .button {{
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin: 5px;
                display: inline-block;
            }}
            .button.blue {{
                background-color: #2196F3;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Welcome to Your First FastAPI Web App! 🚀</h1>
            
            <div class="fastapi-box">
                <h2>🎉 You're now using FastAPI!</h2>
                <p>FastAPI is a modern, fast web framework that's:</p>
                <ul>
                    <li><strong>Super Fast:</strong> One of the fastest Python frameworks available!</li>
                    <li><strong>Modern:</strong> Uses the latest Python features like async/await</li>
                    <li><strong>Automatic Docs:</strong> Creates beautiful API documentation automatically</li>
                    <li><strong>Type Safe:</strong> Catches errors before they happen</li>
                </ul>
            </div>
            
            <div class="info-box">
                <h2>What is Python?</h2>
                <p>Python is a programming language that's:</p>
                <ul>
                    <li><strong>Easy to read:</strong> Python code looks almost like English!</li>
                    <li><strong>Powerful:</strong> You can build websites, analyze data, create games, and much more</li>
                    <li><strong>Popular:</strong> Used by companies like Google, Netflix, and Instagram</li>
                </ul>
            </div>
            
            <div class="info-box">
                <h2>What's happening here?</h2>
                <p>This web page is being created by Python code running on a FastAPI server. When you visited this page:</p>
                <ol>
                    <li>Your browser sent a request to the server</li>
                    <li>FastAPI received it and ran this async function</li>
                    <li>Python code created this HTML page</li>
                    <li>The server sent this page back to your browser</li>
                    <li>Your browser displayed what you're seeing now!</li>
                </ol>
            </div>
            
            <div class="info-box">
                <h2>🚀 This app is running on Fly.io!</h2>
                <p>Fly.io is a platform that lets you run your applications on the internet so anyone can access them from anywhere in the world!</p>
            </div>
            
            <p class="time">Current server time: {current_time}</p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="/learn" class="button">Learn More About Python! →</a>
                <a href="/docs" class="button blue">📚 View API Docs</a>
                <a href="/api/hello" class="button blue">🔗 Try API Endpoint</a>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html_content

# Another route - this page teaches more about Python
@app.get("/learn", response_class=HTMLResponse)
async def learn():
    """
    This function runs when someone visits /learn on our website
    """
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Learn Python with FastAPI!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background-color: #f0f8ff;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                text-align: center;
            }
            .code-example {
                background-color: #f5f5f5;
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                border-left: 4px solid #4CAF50;
            }
            .tip {
                background-color: #fff3cd;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                border-left: 4px solid #ffc107;
            }
            .fastapi-feature {
                background-color: #e8f5e8;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                border-left: 4px solid #4CAF50;
            }
            .button {
                background-color: #2196F3;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🐍 Learn Python with FastAPI!</h1>
            
            <div class="fastapi-feature">
                <h2>🚀 FastAPI vs Flask</h2>
                <p><strong>FastAPI advantages:</strong></p>
                <ul>
                    <li><strong>Performance:</strong> Much faster than Flask</li>
                    <li><strong>Async support:</strong> Handle many requests simultaneously</li>
                    <li><strong>Auto documentation:</strong> Visit /docs to see interactive API docs!</li>
                    <li><strong>Type hints:</strong> Catches bugs before they happen</li>
                    <li><strong>Modern Python:</strong> Uses Python 3.6+ features</li>
                </ul>
            </div>
            
            <h2>1. Variables - Storing Information</h2>
            <p>In Python, you can store information in variables:</p>
            <div class="code-example">
name = "Alice"<br>
age = 25<br>
height = 5.6<br>
is_student = True
            </div>
            
            <h2>2. Async Functions - Modern Python</h2>
            <p>FastAPI uses async functions for better performance:</p>
            <div class="code-example">
@app.get("/")<br>
async def home():<br>
&nbsp;&nbsp;&nbsp;&nbsp;return {"message": "Hello World!"}<br>
<br>
# The 'async' keyword means this function can handle<br>
# multiple requests at the same time!
            </div>
            
            <h2>3. Type Hints - Catching Errors Early</h2>
            <p>FastAPI uses type hints to make your code safer:</p>
            <div class="code-example">
def greet(name: str) -> str:<br>
&nbsp;&nbsp;&nbsp;&nbsp;return f"Hello, {name}!"<br>
<br>
# This tells Python that 'name' should be text (str)<br>
# and the function returns text (str)
            </div>
            
            <h2>4. API Endpoints - Building APIs</h2>
            <p>FastAPI makes it easy to build APIs that apps can use:</p>
            <div class="code-example">
@app.get("/api/hello")<br>
async def hello_api():<br>
&nbsp;&nbsp;&nbsp;&nbsp;return {"message": "Hello from API!"}<br>
<br>
# This creates an API endpoint that returns JSON data
            </div>
            
            <div class="tip">
                <strong>💡 Tip:</strong> Visit <a href="/docs">/docs</a> to see FastAPI's automatically generated 
                API documentation. You can even test the APIs right in your browser!
            </div>
            
            <h2>🌟 What Can You Build with FastAPI?</h2>
            <ul>
                <li><strong>REST APIs:</strong> For mobile apps and web services</li>
                <li><strong>Microservices:</strong> Small, focused services that work together</li>
                <li><strong>Real-time Apps:</strong> Chat apps, live updates, etc.</li>
                <li><strong>Machine Learning APIs:</strong> Serve AI models over the web</li>
                <li><strong>Data Processing:</strong> Handle large amounts of data quickly</li>
            </ul>
            
            <p style="text-align: center; margin-top: 30px;">
                <a href="/" class="button">← Back to Home</a>
            </p>
        </div>
    </body>
    </html>
    """
    return html_content

# API endpoint - this demonstrates how to build APIs with FastAPI
@app.get("/api/hello")
async def hello_api():
    """
    This is a simple API endpoint that returns JSON data.
    APIs are used by mobile apps, other websites, and services to get data.
    """
    return {
        "message": "Hello from your FastAPI app!",
        "timestamp": datetime.now().isoformat(),
        "framework": "FastAPI",
        "language": "Python",
        "status": "success"
    }

# Another API endpoint with parameters
@app.get("/api/greet/{name}")
async def greet_api(name: str):
    """
    This API endpoint takes a name as a parameter and greets that person.
    Try visiting: /api/greet/YourName
    """
    return {
        "greeting": f"Hello, {name}!",
        "timestamp": datetime.now().isoformat(),
        "personalized": True
    }

# API endpoint with query parameters
@app.get("/api/calculate")
async def calculate_api(x: int = 10, y: int = 5, operation: str = "add"):
    """
    This API endpoint performs simple math operations.
    Try: /api/calculate?x=15&y=3&operation=multiply
    """
    if operation == "add":
        result = x + y
    elif operation == "subtract":
        result = x - y
    elif operation == "multiply":
        result = x * y
    elif operation == "divide":
        result = x / y if y != 0 else "Cannot divide by zero!"
    else:
        result = "Unknown operation"
    
    return {
        "x": x,
        "y": y,
        "operation": operation,
        "result": result,
        "timestamp": datetime.now().isoformat()
    }

# Health check endpoint (useful for deployment)
@app.get("/health")
async def health_check():
    """
    This endpoint is used to check if the application is running properly.
    Deployment platforms like fly.io can use this to monitor your app.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "framework": "FastAPI",
        "version": "1.0.0"
    }

# This runs the FastAPI application
if __name__ == "__main__":
    import uvicorn
    
    # Get the port from environment variable (this is how Fly.io tells us which port to use)
    port = int(os.environ.get("PORT", 8080))
    
    # Start the web server with uvicorn (FastAPI's recommended server)
    # host='0.0.0.0' means "accept connections from anywhere on the internet"
    # reload=True means "restart the server when code changes" (great for development!)
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True) 