# 🐍 My First Python Web App!

Welcome to your first Python web application! This project includes **two versions** to help you learn:
- **Flask version** (simpler, great for beginners)
- **FastAPI version** (modern, faster, more features)

## 🤔 What is Python?

Python is a programming language that's:
- **Easy to read**: Python code looks almost like English!
- **Powerful**: You can build websites, analyze data, create games, and much more
- **Popular**: Used by companies like Google, Netflix, and Instagram

## 📁 What's in this project?

### Flask Version (Beginner-friendly)
- **`app.py`** - Simple Flask web application
- **`requirements.txt`** - Flask dependencies
- **`Dockerfile`** - For deploying Flask version

### FastAPI Version (Modern & Powerful)
- **`app_fastapi.py`** - Modern FastAPI web application with APIs
- **`requirements_fastapi.txt`** - FastAPI dependencies  
- **`Dockerfile.fastapi`** - For deploying FastAPI version

### Learning Materials
- **`learn_python.py`** - Interactive Python basics script
- **`fly.toml`** - Fly.io configuration
- **`README.md`** - This file you're reading now!

## 🆚 Flask vs FastAPI - Which should you choose?

### Flask (Great for beginners)
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World!"
```

**Pros:**
- Simpler syntax
- Easier to understand initially
- Less boilerplate code
- Great learning resource

### FastAPI (Better for real projects)
```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
async def home():
    return {"message": "Hello World!"}
```

**Pros:**
- Much faster performance
- Automatic API documentation
- Type safety (catches errors early)
- Modern async/await support
- Better for building APIs

## 🚀 How to run locally

### Option 1: Flask Version (Simpler)
```bash
# Install dependencies
pip install Flask

# Run the app
python app.py

# Visit: http://localhost:8080
```

### Option 2: FastAPI Version (Recommended)
```bash
# Install dependencies
pip install fastapi uvicorn

# Run the app
python app_fastapi.py

# Visit: http://localhost:8080
# API docs: http://localhost:8080/docs
```

### Option 3: Learn Python Basics First
```bash
# Run the learning script
python learn_python.py
```

## 🌐 How to deploy to fly.io

### Deploy Flask Version:
```bash
# Use the regular Dockerfile
fly deploy
```

### Deploy FastAPI Version:
```bash
# Use the FastAPI-specific Dockerfile
fly deploy --dockerfile Dockerfile.fastapi
```

## 🎓 What you'll learn

### Basic Python Concepts (both versions)
- **Variables** - Storing information
- **Functions** - Reusable code
- **Web Routes** - Different pages on your website
- **HTML Templates** - Making web pages look nice

### Advanced with FastAPI
- **Async programming** - Handle multiple requests simultaneously
- **Type hints** - Catch errors before they happen
- **API development** - Build services other apps can use
- **Automatic documentation** - Get interactive API docs for free

## 🔧 FastAPI Special Features

The FastAPI version includes several API endpoints you can try:

- **`/docs`** - Interactive API documentation (Swagger UI)
- **`/api/hello`** - Simple API that returns JSON
- **`/api/greet/YourName`** - Personalized greeting API
- **`/api/calculate?x=10&y=5&operation=add`** - Math calculator API
- **`/health`** - Health check for monitoring

## 🎯 Next steps to learn more

### After Flask:
1. Add forms for user input
2. Connect to a database
3. Add user authentication
4. Learn CSS for better styling

### After FastAPI:
1. Build a REST API for a mobile app
2. Add database integration with SQLAlchemy
3. Implement user authentication with JWT tokens
4. Add real-time features with WebSockets
5. Deploy microservices

## 🆘 Need help?

- **Python Tutorial**: https://python.org/tutorial/
- **Flask Tutorial**: https://flask.palletsprojects.com/tutorial/
- **FastAPI Tutorial**: https://fastapi.tiangolo.com/tutorial/
- **Fly.io Docs**: https://fly.io/docs/

## 🎉 Congratulations!

You now have both simple and modern Python web applications! 

- **Start with Flask** if you're completely new to web development
- **Jump to FastAPI** if you want to learn modern, production-ready development

Both will teach you Python and web development fundamentals. FastAPI will prepare you better for real-world applications.

Happy coding! 🚀 