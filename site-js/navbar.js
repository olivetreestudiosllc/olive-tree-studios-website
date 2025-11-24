document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-block');

    // Collapse nav initially
    nav.classList.remove('show');

    // Hamburger click
    toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
        toggle.classList.toggle('active');
    });

    // Mobile dropdown toggle
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const dropdown = btn.nextElementSibling;
                dropdown.classList.toggle('show-mobile');
                btn.classList.toggle('active');
            }
        });
    });
});
