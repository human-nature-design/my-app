# This is a simple Python script to help you learn the basics!
# Run this by typing: python3 learn_python.py

print("🐍 Welcome to Python!")
print("=" * 40)

# 1. Variables - storing information
print("\n1. VARIABLES - Storing Information")
print("-" * 35)

name = "Alice"
age = 25
height = 5.6
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")

# 2. Math operations
print("\n2. MATH OPERATIONS")
print("-" * 20)

x = 10
y = 3

print(f"{x} + {y} = {x + y}")
print(f"{x} - {y} = {x - y}")
print(f"{x} * {y} = {x * y}")
print(f"{x} / {y} = {x / y}")

# 3. Lists - storing multiple items
print("\n3. LISTS - Multiple Items")
print("-" * 28)

fruits = ["apple", "banana", "orange", "grape"]
print(f"My fruits: {fruits}")
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")

# Add a new fruit
fruits.append("strawberry")
print(f"After adding strawberry: {fruits}")

# 4. Loops - doing things multiple times
print("\n4. LOOPS - Repeating Actions")
print("-" * 30)

print("Counting from 1 to 5:")
for i in range(1, 6):
    print(f"  Number: {i}")

print("\nGoing through my fruits:")
for fruit in fruits:
    print(f"  I like {fruit}")

# 5. Functions - reusable code
print("\n5. FUNCTIONS - Reusable Code")
print("-" * 32)

def greet(name):
    """This function greets someone"""
    return f"Hello, {name}! Nice to meet you!"

def calculate_area(length, width):
    """This function calculates the area of a rectangle"""
    return length * width

# Using our functions
greeting = greet("Bob")
print(greeting)

area = calculate_area(5, 3)
print(f"A rectangle with length 5 and width 3 has area: {area}")

# 6. Conditionals - making decisions
print("\n6. CONDITIONALS - Making Decisions")
print("-" * 38)

temperature = 75

if temperature > 80:
    print("It's hot outside! 🌞")
elif temperature > 60:
    print("Nice weather! 😊")
else:
    print("It's cold! 🥶")

# 7. User input (commented out for now)
print("\n7. USER INPUT")
print("-" * 15)
print("(Uncomment the lines below to try interactive input)")

# user_name = input("What's your name? ")
# print(f"Nice to meet you, {user_name}!")

# age_input = input("How old are you? ")
# age_number = int(age_input)  # Convert text to number
# print(f"You are {age_number} years old!")

print("\n🎉 Congratulations!")
print("You've learned the basics of Python!")
print("Now try running the web app with: python app.py") 