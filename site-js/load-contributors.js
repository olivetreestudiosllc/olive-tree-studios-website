    fetch('/contributors/contributors.json')
        .then(res => res.json())
        .then(list => {
            const grid = document.getElementById('contributors-grid');
            list.forEach(person => {
                const card = document.createElement('div');
                card.className = 'contributor-card';
                card.innerHTML = `
                    <img src="${person.image}" alt="${person.name}">
                    <h3>${person.name}</h3>
                    <p>${person.role}</p>
                `;
                grid.appendChild(card);
            });
        });