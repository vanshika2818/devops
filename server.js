const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

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

// API endpoint to get tools data
app.get('/api/tools', (req, res) => {
  try {
    if (toolsData.length === 0) {
      return res.status(500).json({ error: 'Data not available. Please check if the CSV file exists and is properly formatted.' });
    }
    res.json(toolsData);
  } catch (error) {
    console.error('Error fetching tools data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});