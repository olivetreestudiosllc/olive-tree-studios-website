    document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.divider-rail .rails').forEach(rails => {
        const tile = rails.innerHTML;
        for (let i = 0; i < 6; i++) {
        rails.innerHTML += tile;
        }
    });
    });