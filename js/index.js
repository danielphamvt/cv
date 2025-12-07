document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Initialize Typed.js
    const typed = new Typed('#typing-text', {
        strings: [
            'Full-Stack Data Scientist',
            'Ph.D. in Computer Science',
            'Production Driven AI Engineer',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded);

            // Animate hamburger
            const bars = mobileMenu.querySelectorAll('.bar');
            if (mobileMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');

            // Reset hamburger
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Function to set theme
    const setTheme = (theme) => {
        if (theme === 'light') {
            htmlElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Initial Load
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to dark regardless of system preference
        setTheme('dark');
    }

    // Event Listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Using CSS variables for background to respect theme
            navbar.style.background = 'var(--bg-glass)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.background = 'var(--bg-glass)'; // Consistent glass effect
            navbar.style.boxShadow = 'none';
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Changed from sectionHeight / 3 to a fixed offset (e.g., 150px)
            // This prevents long sections (like Experience) from triggering too early
            // when the previous section (Skills) is short.
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Visitor Counter
    const baseCount = 1000;
    const displayElement = document.getElementById('visit-count');
    const sourceElement = document.getElementById('busuanzi_value_site_pv');

    if (displayElement && sourceElement) {
        const updateCounter = () => {
            const realCount = parseInt(sourceElement.innerText.replace(/,/g, '')) || 0;
            if (realCount > 0) {
                displayElement.textContent = (baseCount + realCount).toLocaleString();
            }
        };

        const observer = new MutationObserver(updateCounter);
        observer.observe(sourceElement, { childList: true, characterData: true, subtree: true });
        updateCounter();
    }
});
