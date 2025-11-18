    // toggle navbar for mobile script
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.navbar-toggle');
        const nav = document.querySelector('.navbar-block');

        // Ensure nav starts collapsed
        nav.classList.remove('show');

        // Toggle on click
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    });