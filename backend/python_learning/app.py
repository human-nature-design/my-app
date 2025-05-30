# This is a simple Python web application!
# Python is a programming language that's easy to read and write.

# First, we need to import Flask - this is a tool that helps us build web apps
from flask import Flask, render_template_string
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create a Flask application
# Think of this as creating your website
app = Flask(__name__)

# This is a "route" - it tells our app what to do when someone visits our website
@app.route('/')
def home():
    """
    This function runs when someone visits the main page of our website.
    The @app.route('/') part means "when someone goes to the home page, run this function"
    """
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # This is HTML - the language that makes web pages look nice
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>My First Python Web App!</title>
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
            .info-box {
                background-color: #e7f3ff;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                border-left: 4px solid #2196F3;
            }
            .time {
                color: #666;
                font-style: italic;
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎉 Welcome to Your First Python Web App! 🎉</h1>
            
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
                <p>This web page is being created by Python code running on a server. When you visited this page:</p>
                <ol>
                    <li>Your browser sent a request to the server</li>
                    <li>Python code ran and created this HTML page</li>
                    <li>The server sent this page back to your browser</li>
                    <li>Your browser displayed what you're seeing now!</li>
                </ol>
            </div>
            
            <div class="info-box">
                <h2>🚀 This app is running on Fly.io!</h2>
                <p>Fly.io is a platform that lets you run your applications on the internet so anyone can access them from anywhere in the world!</p>
            </div>
            
            <p class="time">Current server time: {{ current_time }}</p>
            
            <p style="text-align: center; margin-top: 30px;">
                <a href="/learn" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;">
                    Learn More About Python! →
                </a>
                <a href="/examples" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;">
                    See Code Examples! 🐍
                </a>
            </p>
        </div>
    </body>
    </html>
    """
    
    # This returns the HTML page with the current time filled in
    return render_template_string(html_template, current_time=current_time)

# Another route - this page teaches more about Python
@app.route('/learn')
def learn():
    """
    This function runs when someone visits /learn on our website
    """
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Learn Python!</title>
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
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🐍 Learn Python Basics!</h1>
            
            <h2>1. Variables - Storing Information</h2>
            <p>In Python, you can store information in variables:</p>
            <div class="code-example">
name = "Alice"<br>
age = 25<br>
height = 5.6<br>
is_student = True
            </div>
            
            <h2>2. Printing - Showing Information</h2>
            <p>Use print() to display information:</p>
            <div class="code-example">
print("Hello, World!")<br>
print("My name is", name)<br>
print("I am", age, "years old")
            </div>
            
            <h2>3. Functions - Reusable Code</h2>
            <p>Functions let you write code once and use it many times:</p>
            <div class="code-example">
def greet(name):<br>
&nbsp;&nbsp;&nbsp;&nbsp;return "Hello, " + name + "!"<br>
<br>
message = greet("Bob")<br>
print(message)  # This will print: Hello, Bob!
            </div>
            
            <h2>4. Lists - Storing Multiple Items</h2>
            <p>Lists can hold multiple pieces of information:</p>
            <div class="code-example">
fruits = ["apple", "banana", "orange"]<br>
print(fruits[0])  # Prints: apple<br>
fruits.append("grape")  # Adds grape to the list
            </div>
            
            <div class="tip">
                <strong>💡 Tip:</strong> Python uses indentation (spaces) to group code together. 
                Notice how the code inside functions is indented!
            </div>
            
            <h2>🌟 What Can You Build with Python?</h2>
            <ul>
                <li><strong>Web Apps:</strong> Like this one you're looking at!</li>
                <li><strong>Data Analysis:</strong> Analyze spreadsheets and find patterns</li>
                <li><strong>Games:</strong> Create simple games and animations</li>
                <li><strong>Automation:</strong> Make your computer do repetitive tasks</li>
                <li><strong>AI & Machine Learning:</strong> Build smart applications</li>
            </ul>
            
            <p style="text-align: center; margin-top: 30px;">
                <a href="/" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    ← Back to Home
                </a>
            </p>
        </div>
    </body>
    </html>
    """
    return render_template_string(html_template)

# Interactive Python Examples route
@app.route('/examples')
def examples():
    """
    This function displays interactive Python examples from learn_python.py
    """
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Python Examples</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 900px;
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
            .example-section {
                margin: 30px 0;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #007bff;
            }
            .code-output-container {
                display: flex;
                gap: 20px;
                margin: 15px 0;
                align-items: flex-start;
            }
            .code-column {
                flex: 1;
            }
            .output-column {
                flex: 1;
            }
            .code-block {
                background-color: #2d3748;
                color: #e2e8f0;
                padding: 20px;
                border-radius: 8px;
                font-family: 'Courier New', Monaco, monospace;
                overflow-x: auto;
                line-height: 1.4;
                margin: 0;
            }
            .output {
                background-color: #1a202c;
                color: #4fd1c7;
                padding: 20px;
                border-radius: 8px;
                font-family: 'Courier New', Monaco, monospace;
                border-left: 4px solid #4fd1c7;
                margin: 0;
                min-height: fit-content;
            }
            .section-header {
                margin-bottom: 10px;
            }
            @media (max-width: 768px) {
                .code-output-container {
                    flex-direction: column;
                }
            }
            .navigation {
                text-align: center;
                margin: 30px 0;
            }
            .nav-button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin: 0 10px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🐍 Interactive Python Examples</h1>
            <p style="text-align: center; color: #666;">
                These examples are from our learn_python.py script, formatted for the web!
            </p>
            
            <div class="example-section">
                <h2>1. Variables - Storing Information</h2>
                <p>Variables let you store and reuse information:</p>
                <div class="code-output-container">
                    <div class="code-column">
                        <div class="code-block">
name = "Alice"
age = 25
height = 5.6
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")
                        </div>
                    </div>
                    <div class="output-column">
                        <div class="output">
Name: Alice<br>
Age: 25<br>
Height: 5.6 feet<br>
Is student: True
                        </div>
                    </div>
                </div>
            </div>

            <div class="example-section">
                <h2>2. Math Operations</h2>
                <p>Python can perform calculations easily:</p>
                <div class="code-output-container">
                    <div class="code-column">
                        <div class="code-block">
x = 10
y = 3

print(f"{x} + {y} = {x + y}")
print(f"{x} - {y} = {x - y}")
print(f"{x} * {y} = {x * y}")
print(f"{x} / {y} = {x / y}")
                        </div>
                    </div>
                    <div class="output-column">
                        <div class="output">
10 + 3 = 13<br>
10 - 3 = 7<br>
10 * 3 = 30<br>
10 / 3 = 3.3333333333333335
                        </div>
                    </div>
                </div>
            </div>

            <div class="example-section">
                <h2>3. Lists - Multiple Items</h2>
                <p>Lists can store multiple values in order:</p>
                <div class="code-output-container">
                    <div class="code-column">
                        <div class="code-block">
fruits = ["apple", "banana", "orange", "grape"]
print(f"My fruits: {fruits}")
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")

# Add a new fruit
fruits.append("strawberry")
print(f"After adding strawberry: {fruits}")
                        </div>
                    </div>
                    <div class="output-column">
                        <div class="output">
My fruits: ['apple', 'banana', 'orange', 'grape']<br>
First fruit: apple<br>
Last fruit: grape<br>
After adding strawberry: ['apple', 'banana', 'orange', 'grape', 'strawberry']
                        </div>
                    </div>
                </div>
            </div>

            <div class="example-section">
                <h2>4. Loops - Repeating Actions</h2>
                <p>Loops let you repeat code multiple times:</p>
                <div class="code-output-container">
                    <div class="code-column">
                        <div class="code-block">
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(f"  Number: {i}")

print("\\nGoing through my fruits:")
for fruit in fruits:
    print(f"  I like {fruit}")
                        </div>
                    </div>
                    <div class="output-column">
                        <div class="output">
Counting from 1 to 5:<br>
&nbsp;&nbsp;Number: 1<br>
&nbsp;&nbsp;Number: 2<br>
&nbsp;&nbsp;Number: 3<br>
&nbsp;&nbsp;Number: 4<br>
&nbsp;&nbsp;Number: 5<br>
<br>
Going through my fruits:<br>
&nbsp;&nbsp;I like apple<br>
&nbsp;&nbsp;I like banana<br>
&nbsp;&nbsp;I like orange<br>
&nbsp;&nbsp;I like grape<br>
&nbsp;&nbsp;I like strawberry
                        </div>
                    </div>
                </div>
            </div>

            <div class="example-section">
                <h2>5. Functions - Reusable Code</h2>
                <p>Functions let you organize code into reusable blocks:</p>
                <div class="code-output-container">
                    <div class="code-column">
                        <div class="code-block">
def greet(name):
    \"\"\"This function greets someone\"\"\"
    return f"Hello, {name}! Nice to meet you!"

def calculate_area(length, width):
    \"\"\"This function calculates the area of a rectangle\"\"\"
    return length * width

# Using our functions
greeting = greet("Bob")
print(greeting)

area = calculate_area(5, 3)
print(f"A rectangle with length 5 and width 3 has area: {area}")
                        </div>
                    </div>
                    <div class="output-column">
                        <div class="output">
Hello, Bob! Nice to meet you!<br>
A rectangle with length 5 and width 3 has area: 15
                        </div>
                    </div>
                </div>
            </div>

            <div class="example-section">
                <h2>6. Conditionals - Making Decisions</h2>
                <p>Conditionals let your code make decisions:</p>
                <div class="code-output-container">
                    <div class="code-column">
                        <div class="code-block">
temperature = 75

if temperature > 80:
    print("It's hot outside! 🌞")
elif temperature > 60:
    print("Nice weather! 😊")
else:
    print("It's cold! 🥶")
                        </div>
                    </div>
                    <div class="output-column">
                        <div class="output">
Nice weather! 😊
                        </div>
                    </div>
                </div>
            </div>

            <div class="navigation">
                <a href="/" class="nav-button">🏠 Home</a>
                <a href="/learn" class="nav-button">📚 Learn Python</a>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
                💡 Want to run these examples yourself? Check out learn_python.py in the project folder!
            </div>
        </div>
    </body>
    </html>
    """
    return render_template_string(html_template)

# This is what runs our web application
if __name__ == '__main__':
    # Get the port from environment variable (this is how Fly.io tells us which port to use)
    port = int(os.environ.get('PORT', 8080))
    
    # Start the web server
    # host='0.0.0.0' means "accept connections from anywhere on the internet"
    # debug=True means "show helpful error messages if something goes wrong"
    app.run(host='0.0.0.0', port=port, debug=True) 