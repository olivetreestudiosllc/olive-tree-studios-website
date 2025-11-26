fetch('productions.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('productions-grid');
    data.forEach(item => {
      const card = document.createElement('a');
      card.className = 'production-card';
      card.href = item.link;

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title} Poster">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      `;

      grid.appendChild(card);
    });
  });