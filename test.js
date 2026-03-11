const fs = require('fs');
const path = require('path');

// Define the path to the data file
const dataPath = path.join(__dirname, 'data', 'devops_data.csv');

// Check if the file exists
if (fs.existsSync(dataPath)) {
  console.log('✅ CI Test Passed: devops_data.csv exists. The application can start.');
  process.exit(0); // Exit code 0 means success for Jenkins
} else {
  console.error('❌ CI Test Failed: devops_data.csv is missing!');
  process.exit(1); // Exit code 1 means failure for Jenkins
}