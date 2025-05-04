document.addEventListener('DOMContentLoaded', async function () {
  const ftContainer = document.getElementById('features-container');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const subtitle = document.querySelector('.features-subtitle');
  let allFeatures = [];
  let featureVersion = 'v?';
  let currentCategory = 'all';

  async function fetchFeatures() {
    try {
      const response = await fetch('/assets/menufeatures.txt');
      if (!response.ok) throw new Error('Failed to fetch features');
      const text = await response.text();
      return text.split('\n').filter(line => line.trim() !== '');
    } catch {
      return [];
    }
  }

  function parseFeatures(lines) {
    const parsedFeatures = [];
    lines.forEach(line => {
      if (line.startsWith('// version:')) {
        featureVersion = line.replace('// version:', '').trim();
        return;
      }
      const tag = line.includes('#') ? line.split('#').pop().trim() : null;
      const parts = line.split('#')[0].split(':');
      let category = 'Misc', name = '', description = 'No description available.';
      
      if (parts.length >= 3) {
        [category, name] = parts;
        description = parts.slice(2).join(':').trim();
      } else if (parts.length === 2) {
        [category, name] = parts;
      } else if (parts.length === 1) {
        name = parts[0].trim();
      }
      
      category = category.trim();
      name = name.trim();      
      if (!name || category === "Settings") return;
      const validCategories = ['Assignments', 'GradedPractice', 'Quizzes/Grammar', 'Misc', 'Interface'];
      if (!validCategories.includes(category)) category = 'Misc';
      parsedFeatures.push({ name, description, category, tag });
    });
    return parsedFeatures;
  }

  function displayFeatures(features) {
    ftContainer.innerHTML = '';
    if (features.length === 0) {
      ftContainer.innerHTML = `
        <div class="error-container">
          <i class="fas fa-search error-icon"></i>
          <h3 class="error-title">No Features Found</h3>
          <p class="error-message">No features match your filter.</p>
        </div>
      `;
      return;
    }
    features.forEach((feature, index) => {
      const card = document.createElement('div');
      card.className = 'feature-card';
      card.style.animationDelay = `${index * 50}ms`;
      const badges = `
        <div class="feature-badges">
          <span class="feature-category-tag">${feature.category}</span>
          ${feature.tag ? `<span class="feature-extra-tag">${feature.tag}</span>` : ''}
        </div>
      `;
      card.innerHTML = `
        ${badges}
        <h3 class="feature-name">${feature.name}</h3>
        <p class="feature-description">${feature.description}</p>
      `;
      ftContainer.appendChild(card);
    });
  }

  function updateFeatureSubtitle(count, version) {
    if (subtitle) {
      subtitle.textContent = `Explore our extensive features list that makes Hackemos the ultimate Conjuguemos menu. (${count} features as of update ${version})`;
    }
  }

  function filterFeatures() {
    const filtered = currentCategory === 'all'
      ? allFeatures
      : allFeatures.filter(feature => feature.category === currentCategory);
    displayFeatures(filtered);
  }

  categoryBtns.forEach(button => {
    button.addEventListener('click', () => {
      categoryBtns.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.getAttribute('data-category');
      filterFeatures();
    });
  });

  const lines = await fetchFeatures();
  allFeatures = parseFeatures(lines);
  displayFeatures(allFeatures);
  updateFeatureSubtitle(allFeatures.length, featureVersion);
});
