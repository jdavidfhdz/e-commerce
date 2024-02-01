# GAPSI E-COMMERCE

Back-end project for e-commerce app

## Requirements

List of necessary requirements or dependencies to run the project.

- Python 3.11.x

## Installation

Instructions for setting up the development environment.

1. Clone the repository:

   ```bash
   git clone https://github.com/jdavidfhdz/e-commerce.git

2. Navigate to the project directory:

   ```bash
   cd e-commerce\back\

3. Create and activate a virtual environment (recommended) and go to gapsi_ecommerce directory:

   ```bash
   python -m venv venv
   venv/bin/activate
   cd gapsi_ecommerce

4. Install dependencies from the requirements.txt file:
 
   ```bash
   pip install -r requirements.txt

5. Make migrations:

   ```bash
   python manage.py makemigrations
 
6. Apply database migrations:

    ```bash
    python manage.py migrate

## Usage

1. Run the server:

   ```bash
   python manage.py runserver 8100

## API Documentation

You can access the API documentation for this project using the following links:

- **Swagger UI:** [API Documentation (Swagger)](http://localhost:8000/swagger/)
  - Explore and interact with the API using Swagger's interactive interface.

- **ReDoc:** [API Documentation (ReDoc)](http://localhost:8000/redoc/)
  - View a clear and user-friendly documentation rendered by ReDoc.

Please make sure that your Django development server is running and replace `http://localhost:8000` with the appropriate URL of your development server.

Additionally, you can also access the API documentation in JSON format:
- **API JSON Documentation:** [JSON Documentation](http://localhost:8000/swagger.json)
  - This JSON documentation can be used by other tools and services.

Feel free to explore the API documentation to understand how to use the endpoints and interact with your project's API.

## Design Patterns

The project makes use of the following design patterns and concepts:

1. ORM (Object-Relational Mapping): Django uses an ORM for database interaction, allowing Python objects to be mapped to database tables.

2. Repository Pattern: The code exhibits a repository pattern by using the Storage class to abstract provider storage.

3. Serialization and Deserialization: The project applies the serialization and deserialization pattern to return data in the API.

## Code Style

I follow the PEP 8 style guidelines for Python code.

   ```bash
   flake8
   ```
