// Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Add stagger effect to feature cards
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Button click handlers
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.textContent.includes('Login')) {
                    // Don't prevent default for login button with href
                    if (btn.getAttribute('href')) {
                        return; // Allow normal href navigation
                    }
                } else if (btn.textContent.includes('Sign Up')) {
                    e.preventDefault();
                    console.log('Sign Up clicked');
                    // Add your sign up logic here
                }
            });
        });

        // Mobile menu toggle (basic implementation)
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Add floating animation to feature icons
        document.querySelectorAll('.feature-icon').forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.5}s`;
            icon.classList.add('float');
        });

        // Counter animation for hero stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                let current = 0;
                const increment = target / 100;
                const suffix = counter.textContent.replace(/[\d,]/g, '');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (suffix.includes('K')) {
                        counter.textContent = Math.floor(current / 1000) + 'K+';
                    } else if (suffix.includes('M')) {
                        counter.textContent = Math.floor(current / 1000000) + 'M+';
                    } else if (suffix.includes('%')) {
                        counter.textContent = Math.floor(current) + '%';
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString() + suffix;
                    }
                }, 50);
            });
        }

        // Start counter animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        });

        heroObserver.observe(document.querySelector('.hero-stats'));