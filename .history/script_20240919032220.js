document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const logo = nav.querySelector('.logo');
    const navLinks = document.querySelector('.nav-links');
    const dropMenuP = document.querySelector('.drop-menu-p');
    const dropdown = document.querySelector('.dropdown');

    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';

    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header-wrapper';
    headerWrapper.append(logo.cloneNode(true), navToggle);
    logo.replaceWith(headerWrapper);

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    dropMenuP.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navLinks.classList.remove('show');
            dropdown.classList.remove('show');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('show');
            dropdown.classList.remove('show');
        }
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
});
