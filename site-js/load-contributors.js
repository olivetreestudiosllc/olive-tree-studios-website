// contributors.js
// Dynamically loads contributor cards from contributors.json

async function loadContributors() {
    try {
        const response = await fetch('/about/contributors.json');
        const contributors = await response.json();

        const grid = document.getElementById('contributors-grid');
        if (!grid) return;

        contributors.forEach(contributor => {
            const card = document.createElement('div');
            card.className = 'contributor-card';

            card.innerHTML = `
                <div class="contributor-img-wrapper">
                    <img src="${contributor.image}" alt="${contributor.name}" />
                </div>
                <h3>${contributor.name}</h3>
                <p>${contributor.role}</p>
            `;

            grid.appendChild(card);
        });
    } catch (err) {
        console.error('Failed to load contributors:', err);
    }
}

// Run after page loads
document.addEventListener('DOMContentLoaded', loadContributors);
