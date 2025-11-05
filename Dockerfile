# Step 1: Use a base image
FROM python:3.10

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy your project files into container
COPY . /app

# Step 4: Install dependencies
RUN pip install flask mysql-connector-python

# Step 5: Define the default command to run the app
CMD ["python", "app.py"]

# Step 6: Expose the port Flask runs on
EXPOSE 5000
