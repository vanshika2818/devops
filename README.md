DevOps Tool Comparison Dashboard
🟢 Live Deployment: https://devops-dashboard-vanshika.onrender.com

🚀 Project Overview
The DevOps Tool Comparison Dashboard is a web application that provides a dynamic catalog of DevOps tools. Users can browse, search, and filter tools by category and pricing type to find the right DevOps solutions for their needs. This project also serves as a complete DevOps lifecycle implementation, featuring containerization, automated CI/CD pipelines, cloud hosting, and active system monitoring.

🛠️ Tech Stack Used
Backend: Node.js with Express.js, Axios (for live GitHub API data)

Frontend: Vanilla JavaScript (ES6+), Bootstrap 5, FontAwesome

Data: CSV parsing with csv-parser

Containerization: Docker & Docker Hub

Configuration Management: Puppet

CI/CD Pipeline: Jenkins (Declarative Pipeline)

Cloud Hosting: Render (Container Deployment)

Monitoring: Prometheus (prom-client)

📋 Prerequisites
Node.js (version 14 or higher)

npm (comes with Node.js)

Docker (for containerization features)

💻 Local Setup & Installation Instructions
Clone or download the project:

Bash
git clone https://github.com/vanshika2818/devops.git
cd devops
Install dependencies:

Bash
npm install
Run CI Tests:

Bash
npm test
Start the development server:

Bash
npm start
Open your browser and navigate to http://localhost:3000

The application will automatically load the DevOps tools data from the CSV file, fetch live GitHub star counts via API, and display them in an interactive dashboard.

🌐 API Documentation
GET /api/tools
Returns a JSON array of all DevOps tools with their details, enriched with live GitHub data.

Response Format:

JSON
[
  {
    "Category": "Version Control",
    "Tool Name": "GitHub",
    "Pricing Type": "Freemium",
    "Features": "Repository hosting, issue tracking... <br><strong>Live GitHub Stars:</strong> 100,000",
    "Pricing Details": "Free for public repositories...",
    "Community Support": "Extensive community, Stack Overflow"
  }
]
GET /metrics
Exposes real-time Node.js system metrics (memory usage, CPU time, event loop lag) formatted for Prometheus scraping.

🐳 Docker Support
This application is fully containerized. The included Dockerfile uses a lightweight node:14-alpine base image.

To build and run locally using Docker:

Bash
docker build -t devops-dashboard .
docker run -p 3000:3000 devops-dashboard
⚙️ Configuration Management & Testing
Puppet: The install_docker.pp file contains a declarative Puppet manifest to automate the installation and enabling of the Docker engine on an Ubuntu/Debian virtual machine.

Testing: Run npm test locally or in the CI pipeline to verify the integrity of the data source before the application boots.

🔄 CI/CD Pipeline
This project uses a declarative Jenkins pipeline (Jenkinsfile) to automate integration and delivery.

Checkout Code: Pulls the latest commit from the main branch.

Install & Test: Runs dependencies and executes the verification test.

Build Docker Image: Containerizes the app and tags it dynamically.

Push to Docker Hub: Authenticates via Jenkins credential binding and pushes the image to the remote registry.

☁️ Cloud Deployment & Monitoring
Cloud Hosting: The application is deployed as a Web Service on Render, which automatically pulls and runs the compiled Docker image from Docker Hub.

Prometheus Monitoring: A local Prometheus instance (configured via the included prometheus.yml) scrapes the live cloud deployment (/metrics endpoint) every 15 seconds to track application uptime and hardware performance.
