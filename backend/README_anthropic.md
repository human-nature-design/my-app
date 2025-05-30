# Anthropic API Setup

This directory contains boilerplate code for connecting to Anthropic's Claude API.

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This will install:
- `anthropic==0.52.1` - Official Anthropic Python SDK
- `python-dotenv==1.0.0` - For loading environment variables from .env files

### 2. Get Your API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an account or log in
3. Navigate to API Keys
4. Create a new API key

### 3. Set Environment Variable

#### Recommended: Use .env file (already set up!)
The `.env` file is already created in the backend directory. Just edit it:

```bash
# Edit the .env file
nano .env
# or
code .env
```

Replace `your-api-key-here` with your actual API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

The Python applications (`app.py` and `app_fastapi.py`) are already configured to automatically load this .env file using `python-dotenv`.

#### Alternative: Export in terminal (temporary)
```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

### 4. Test Your Setup

Run the test script to verify everything is working:

```bash
python anthropic_example.py
```

## Usage

### Basic Example
```python
import os
from dotenv import load_dotenv
from anthropic import Anthropic

# Load environment variables from .env file
load_dotenv()

# Initialize client with API key from environment
client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# Send a message
response = client.messages.create(
    model="claude-3-5-sonnet-latest",
    max_tokens=100,
    messages=[{"role": "user", "content": "Hello, Claude!"}]
)

print(response.content[0].text)
```

## Available Models

- `claude-3-5-sonnet-latest` (recommended)
- `claude-3-5-haiku-latest`
- `claude-opus-4-20250514`

## Security Notes

- ✅ The `.env` file is already added to `.gitignore` - your API key won't be committed to version control
- ✅ Use `.env` files for local development
- ✅ Use environment variables or secure secret management for production
- ❌ Never commit API keys to version control
- ❌ Never hardcode API keys in your source code

## API Documentation

- [Anthropic API Docs](https://docs.anthropic.com/en/docs/get-started)
- [Python SDK on PyPI](https://pypi.org/project/anthropic/)
- [API Reference](https://docs.anthropic.com/en/api/overview#python) 