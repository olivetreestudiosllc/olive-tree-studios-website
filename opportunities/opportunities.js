// Load roles from JSON file and render them
document.addEventListener('DOMContentLoaded', function() {
  const rolesGrid = document.getElementById('rolesGrid');
  const roleDetail = document.getElementById('roleDetail');
  const roleDetailInner = document.getElementById('roleDetailInner');
  const opportunitiesSection = document.getElementById('opportunitiesSection');
  const closeDetail = document.getElementById('closeDetail');

  let currentSelectedCard = null;

  // Fetch roles data from JSON file
  fetch('roles.json')
    .then(response => response.json())
    .then(data => {
      renderRoles(data.categories);
    })
    .catch(error => {
      console.error('Error loading roles:', error);
      rolesGrid.innerHTML = '<p style="color: #fff;">Failed to load opportunities. Please try again later.</p>';
    });

  // Render all roles by category
  function renderRoles(categories) {
    rolesGrid.innerHTML = '';

    categories.forEach(category => {
      // Create category section container
      const categorySection = document.createElement('div');
      categorySection.className = 'category-section';

      // Create category heading
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      categoryDiv.innerHTML = `<h3>${category.name}</h3>`;
      categorySection.appendChild(categoryDiv);

      // Create cards container
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'category-cards';

      // Create role cards
      category.roles.forEach(role => {
        const roleCard = document.createElement('div');
        roleCard.className = 'role-card';
        roleCard.dataset.roleId = role.id;
        roleCard.innerHTML = `
          <div class="role-name">${role.title}</div>
          <div class="role-brief">${role.brief}</div>
        `;

        // Add click handler
        roleCard.addEventListener('click', function() {
          showRoleDetail(role, roleCard);
        });

        cardsContainer.appendChild(roleCard);
      });

      categorySection.appendChild(cardsContainer);
      rolesGrid.appendChild(categorySection);
    });
  }

  // Show role detail panel
  function showRoleDetail(role, cardElement) {
    // Remove selection from previously selected card
    if (currentSelectedCard) {
      currentSelectedCard.classList.remove('selected');
    }

    // Add selection to clicked card
    cardElement.classList.add('selected');
    currentSelectedCard = cardElement;

    // Populate detail panel
    roleDetailInner.innerHTML = `
      <h3 class="role-title">${role.title}</h3>
      <p class="role-brief">${role.brief}</p>
      <div class="role-full-description">${role.description}</div>
      <div class="role-bullets">
        <ul>
          ${role.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
        </ul>
      </div>
      <a href="${role.applyLink}" class="a-tag-button">Apply Now</a>
    `;

    // Show detail panel
    opportunitiesSection.classList.add('show-detail');
  }

  // Close detail panel
  function hideRoleDetail() {
    opportunitiesSection.classList.remove('show-detail');
    
    // Remove selection from card
    if (currentSelectedCard) {
      currentSelectedCard.classList.remove('selected');
      currentSelectedCard = null;
    }
  }

  // Close button handler
  closeDetail.addEventListener('click', hideRoleDetail);

  // Optional: Close when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && opportunitiesSection.classList.contains('show-detail')) {
      hideRoleDetail();
    }
  });
});