const rolesGrid = document.getElementById('roles-grid');
const roleDetail = document.getElementById('role-detail');
const roleTitle = document.getElementById('role-title');
const roleFullDescription = document.getElementById('role-full-description');
const roleBulletsList = document.getElementById('role-bullets-list');

let selectedCard = null;

fetch('./roles.json')
  .then(res => res.json())
  .then(roleData => {
    roleData.forEach(role => {
      const card = document.createElement('div');
      card.classList.add('role-card');
      card.innerHTML = `
        <h3>${role.title}</h3>
        <p>${role.brief}</p>
      `;

      card.addEventListener('click', () => {
        // highlight selected card
        if (selectedCard) selectedCard.classList.remove('selected');
        selectedCard = card;
        card.classList.add('selected');

        // show details
        roleTitle.textContent = role.title;
        roleFullDescription.textContent = role.description;
        roleBulletsList.innerHTML = '';
        role.bullets.forEach(b => {
          const li = document.createElement('li');
          li.textContent = b;
          roleBulletsList.appendChild(li);
        });

        // Animate to 2-column layout
        document.querySelector('.opportunities-section').classList.add('show-detail');
      });

      rolesGrid.appendChild(card);
    });
  })
  .catch(err => console.error(err));
