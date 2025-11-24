document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-block');

    // Ensure nav starts collapsed
    nav.classList.remove('show');

    // Hamburger click
    toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Mobile dropdown toggles
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        const btn = drop.querySelector('.dropdown-btn');
        const content = drop.querySelector('.dropdown-content');

        btn.addEventListener('click', (e) => {
            // Only apply on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                content.classList.toggle('show-mobile');
                btn.classList.toggle('active');
            }
        });
    });

    // Optional: collapse dropdowns if resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown-content').forEach(dc => {
                dc.classList.remove('show-mobile');
            });
            document.querySelectorAll('.dropdown-btn').forEach(db => {
                db.classList.remove('active');
            });
        }
    });
});
