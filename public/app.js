// Global variable to store tools data
let allTools = [];

// Function to fetch tools data from API
async function fetchTools() {
  try {
    const response = await fetch('/api/tools');
    if (!response.ok) {
      throw new Error('Failed to fetch tools data');
    }
    allTools = await response.json();
    populateDropdowns();
    renderTools(allTools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    document.getElementById('toolsContainer').innerHTML = '<div class="col-12"><div class="alert alert-danger">Failed to load tools data. Please try again later.</div></div>';
  }
}

// Function to populate category and pricing dropdowns
function populateDropdowns() {
  const categories = [...new Set(allTools.map(tool => tool.Category))].sort();
  const pricingTypes = [...new Set(allTools.map(tool => tool['Pricing Type']))].sort();

  const categoryFilter = document.getElementById('categoryFilter');
  const pricingFilter = document.getElementById('pricingFilter');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  pricingTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    pricingFilter.appendChild(option);
  });
}

// Function to render tools
function renderTools(tools) {
  const container = document.getElementById('toolsContainer');
  container.innerHTML = '';

  if (tools.length === 0) {
    container.innerHTML = '<div class="col-12"><div class="alert alert-info">No tools found matching your criteria.</div></div>';
    return;
  }

  tools.forEach(tool => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.textContent = tool['Tool Name'];

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const badgesDiv = document.createElement('div');
    badgesDiv.className = 'mb-3';

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'badge bg-primary me-2';
    categoryBadge.textContent = tool.Category;

    const pricingBadge = document.createElement('span');
    pricingBadge.className = `badge me-2 ${getPricingBadgeClass(tool['Pricing Type'])}`;
    pricingBadge.textContent = tool['Pricing Type'];

    badgesDiv.appendChild(categoryBadge);
    badgesDiv.appendChild(pricingBadge);

    const featuresP = document.createElement('p');
    featuresP.innerHTML = `<strong>Features:</strong> ${tool.Features}`;

    const pricingP = document.createElement('p');
    pricingP.innerHTML = `<strong>Pricing Details:</strong> ${tool['Pricing Details']}`;

    const supportP = document.createElement('p');
    supportP.innerHTML = `<strong>Community Support:</strong> ${tool['Community Support']}`;

    cardBody.appendChild(badgesDiv);
    cardBody.appendChild(featuresP);
    cardBody.appendChild(pricingP);
    cardBody.appendChild(supportP);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
}

// Function to get badge class based on pricing type
function getPricingBadgeClass(pricingType) {
  switch (pricingType.toLowerCase()) {
    case 'open source':
      return 'bg-success';
    case 'freemium':
      return 'bg-warning text-dark';
    case 'premium':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}

// Function to filter data
function filterData() {
  const searchQuery = document.getElementById('searchBar').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;
  const selectedPricing = document.getElementById('pricingFilter').value;

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool['Tool Name'].toLowerCase().includes(searchQuery);
    const matchesCategory = !selectedCategory || tool.Category === selectedCategory;
    const matchesPricing = !selectedPricing || tool['Pricing Type'] === selectedPricing;
    return matchesSearch && matchesCategory && matchesPricing;
  });

  renderTools(filteredTools);
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchTools);

document.getElementById('searchBar').addEventListener('input', filterData);
document.getElementById('categoryFilter').addEventListener('change', filterData);
document.getElementById('pricingFilter').addEventListener('change', filterData);