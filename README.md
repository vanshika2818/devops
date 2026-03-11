# DevOps Tool Comparison Dashboard

## 🚀 Project Overview

The DevOps Tool Comparison Dashboard is a web application that provides a dynamic catalog of DevOps tools. Users can browse, search, and filter tools by category and pricing type to find the right DevOps solutions for their needs.

## 🛠️ Tech Stack Used

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript (ES6+), Bootstrap 5, FontAwesome
- **Data**: CSV parsing with csv-parser
- **Styling**: Custom CSS with Bootstrap components

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 💻 Local Setup & Installation Instructions

1. **Clone or download the project**:
   ```bash
   cd /path/to/your/projects
   # Assuming you have the devops-dashboard folder
   cd devops-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

The application will automatically load the DevOps tools data from the CSV file and display them in an interactive dashboard.

## 🌐 API Documentation

### GET /api/tools

Returns a JSON array of all DevOps tools with their details.

**Response Format**:
```json
[
  {
    "Category": "Version Control",
    "Tool Name": "GitHub",
    "Pricing Type": "Freemium",
    "Features": "Repository hosting, issue tracking, collaboration",
    "Pricing Details": "Free for public repositories, premium plans for private repos and advanced features",
    "Community Support": "Extensive community, GitHub Community forums, Stack Overflow"
  }
]
```

**Error Response** (500):
```json
{
  "error": "Data not available. Please check if the CSV file exists and is properly formatted."
}
```

## 🐳 Docker Support

To containerize this application, create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Then build and run:

```bash
docker build -t devops-dashboard .
docker run -p 3000:3000 devops-dashboard
```