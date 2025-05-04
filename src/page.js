const nav = document.querySelector('header nav');
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        nav.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature, .about-card, .review-card ').forEach(el => {
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
});