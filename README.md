# IBM Datathon: AI-Powered PUE And Energy Consumption Forecast
This project is a full-stack web application designed for the IBM Datathon. It provides a platform to monitor, analyze, and optimize the energy consumption of data center infrastructure, focusing on Power Distribution Units (PDUs) and Chiller systems.

The application ingests real-time metrics, provides forecasting using machine learning models, and offers actionable recommendations to improve Power Usage Effectiveness (PUE) and reduce operational costs.

## Features
Real-time Metrics Dashboard: A responsive frontend to visualize key performance indicators from PDUs and Chillers.

Predictive Forecasting: Utilizes ML models to forecast future energy consumption and server load.

Optimization Engine: A service that provides recommendations for efficient resource allocation and cooling management.

Reporting: Generates reports on historical energy usage and savings.

Containerized Deployment: Fully containerized with Docker for consistent deployment across different environments, specifically targeting the IBM LinuxONE (s390x) architecture.

## Technology Stack
This project is a monorepo containing both the backend and frontend applications.

Backend (IBM_Backend/)
Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose

API: RESTful API for metrics, forecasts, and recommendations.

Logging: Winston

Frontend (IBM_frontend/)
Framework: React / Next.js

Data Fetching: SWR for real-time data synchronization.

Styling: Tailwind CSS

DevOps & Deployment
Containerization: Docker

Version Control: Git & GitHub

Deployment Target: IBM LinuxONE Community Cloud (s390x)

Data Analysis: JupyterLab

Getting Started
## Prerequisites
Node.js (v18 or later)

MongoDB

Git

Docker Desktop

## Installation
Clone the repository:
```
git clone [https://github.com/Tomfx03/IBM.git](https://github.com/Tomfx03/IBM.git)
cd IBM

Install Backend Dependencies:

cd IBM_Backend
npm install

Install Frontend Dependencies:

cd ../IBM_frontend
npm install
```

Running with Docker
This is the recommended method for running the application, as it mirrors the production environment.

Build the Backend Image
The project uses a multi-stage Dockerfile to create an optimized and lightweight image for the s390x architecture.

Navigate to the backend directory:
```
cd IBM_Backend
```
Build the image for IBM LinuxONE:
This command builds the image and pushes it directly to your Docker Hub repository.

# Replace 'tomfx' with your Docker Hub username
```
docker buildx build --platform linux/s390x -t tomfx/my-datathon-project:latest --push .
```
Deploy to IBM LinuxONE Server
Connect to your instance via SSH:
```
ssh -i /path/to/your/key.pem linux1@your-server-ip
```
Install Docker and Git on the server.
(Refer to the SUSE SLES 15 documentation for enabling the Containers and Development Tools modules if not present).

Pull the image from Docker Hub:
```
docker pull tomfx/my-datathon-project:latest
```
Run the container:
```
docker run -d -p 3000:3000 --name my-app tomfx/my-datathon-project:latest
```
Configure the Firewall:
Log in to the LinuxONE Community Cloud dashboard and add an Inbound Rule to your instance's Security Group to allow TCP traffic on port 3000 from source 0.0.0.0/0.

Your application backend will now be accessible at http://your-server-ip:3000.

Data Analysis with JupyterLab
A JupyterLab environment can be run on the server to interact with the project's data and models.

Run the JupyterLab container:

# Create a shared directory first
```
mkdir /home/linux1/shared

docker run -p 38888:8888 --name notebook -v /home/linux1/shared:/home/jovyan/shared \
  -d registry.linuxone.cloud.marist.edu/l1cc/jupyterlab-image-s390x:latest \
  jupyter lab --ServerApp.token='YourChosenPassword'
```
Clone your repository into the shared volume:
```
cd /home/linux1/shared
git clone [https://github.com/Tomfx03/IBM.git](https://github.com/Tomfx03/IBM.git)
```
Configure Firewall: Add a new Security Group rule to allow TCP traffic on port 38888.

You can now access your project files in JupyterLab at http://your-server-ip:38888.