const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios'); // Added Axios for API calls

const client = require('prom-client');

// Enable default metric collection (CPU, Memory, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Store parsed CSV data in memory
let toolsData = [];

// Function to load CSV data
const loadCSVData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('./data/devops_data.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        toolsData = results;
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Load CSV data on server startup
loadCSVData()
  .then(() => {
    console.log('CSV data loaded successfully');
  })
  .catch((error) => {
    console.error('Error loading CSV data:', error);
  });

// Helper function to fetch live GitHub stars
async function getGitHubStars(repoPath) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
    return response.data.stargazers_count.toLocaleString(); // Adds commas to the number
  } catch (error) {
    console.error(`Failed to fetch stars for ${repoPath}`);
    return 'N/A';
  }
}

// Map tool names to their actual GitHub repository paths
const repoMapping = {
  'Jenkins': 'jenkinsci/jenkins',
  'Kubernetes': 'kubernetes/kubernetes',
  'Prometheus': 'prometheus/prometheus'
};

// API endpoint to get tools data
app.get('/api/tools', async (req, res) => {
  try {
    if (toolsData.length === 0) {
      return res.status(500).json({ error: 'Data not available. Please check if the CSV file exists and is properly formatted.' });
    }

    // Deep clone the array so we don't permanently modify the base CSV data in memory
    let enrichedTools = JSON.parse(JSON.stringify(toolsData));

    // Loop through our tools and fetch live stars if we have a mapping for them
    for (let tool of enrichedTools) {
      const repoPath = repoMapping[tool['Tool Name']];
      if (repoPath) {
        const stars = await getGitHubStars(repoPath);
        // Append the live stars to the end of the features string so it shows on the UI
        tool['Features'] += `<br><br><span style="color: #e3b341;">★</span> <strong>Live GitHub Stars:</strong> ${stars}`;
      }
    }

    res.json(enrichedTools);
  } catch (error) {
    console.error('Error fetching tools data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Expose the /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});