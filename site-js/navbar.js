document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-block');

    // Ensure nav starts collapsed
    nav.classList.remove('show');

    // Toggle main navbar
    toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Mobile dropdown toggle
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Only on mobile
            if (window.innerWidth < 768) {
                e.preventDefault(); // stop link from navigating
                const content = btn.nextElementSibling;
                content.classList.toggle('show-mobile');
                btn.classList.toggle('active'); // rotate arrow
            }
        });
    });
});
