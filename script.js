document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const logo = nav.querySelector('.logo');
    
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.className = 'nav-toggle';
    
    // Create a wrapper for the logo and toggle
    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header-wrapper';
    
    // Move the logo into the wrapper and add the toggle
    headerWrapper.appendChild(logo.cloneNode(true));
    headerWrapper.appendChild(navToggle);
    
    // Replace the logo with the new wrapper
    logo.parentNode.replaceChild(headerWrapper, logo);

    const navLinks = document.querySelector('.nav-links');
    const dropMenuP = document.querySelector('.drop-menu-p');
    const dropdown = document.querySelector('.dropdown');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Handle dropdown menu
    dropMenuP.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('show');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('show');
            dropdown.classList.remove('show');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }
});
