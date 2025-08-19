// Navbar functionality
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on overlay
overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Highlight active section in navbar
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const setupIntersectionObserver = () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    // Timeline items animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

    // Skill cards animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const percentageText = entry.target.querySelector('.skill-percentage');
                
                // Animate progress bar
                progressBar.style.width = progressBar.dataset.width || progressBar.style.width;
                
                // Animate percentage count
                animatePercentage(percentageText);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });
};

// Percentage counting animation
const animatePercentage = (element) => {
    const target = parseInt(element.textContent);
    let current = 0;
    const duration = 1000; // Animation duration in ms
    const startTime = performance.now();
    
    const updatePercentage = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(progress * target);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updatePercentage);
        }
    };
    
    requestAnimationFrame(updatePercentage);
};

// Typewriter effect for hero section
const initTypewriter = () => {
    const heroTexts = [
        "Java Developer",
        "Frontend Developer",
        "Prompt Engineer",
        "Problem Solver"
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetween = 2000;
    
    const type = () => {
        const heroSubtitle = document.querySelector('.hero h2');
        
        if (count === heroTexts.length) {
            count = 0;
        }
        
        currentText = heroTexts[count];
        
        if (isDeleting) {
            heroSubtitle.textContent = `I build things as ${currentText.substring(0, index--)}`;
            if (index < 0) {
                isDeleting = false;
                count++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(type, deletingSpeed);
            }
        } else {
            heroSubtitle.textContent = `I build things as ${currentText.substring(0, index++)}`;
            if (index > currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseBetween);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    };
    
    setTimeout(type, 1000);
};

// Particle animation for background
const initParticles = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.querySelector('.bg-animation').appendChild(canvas);
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.fillStyle = `rgba(100, 255, 218, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
        
        requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// Project card tilt effect
const initProjectTilt = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
            card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(0, 0, 0, 0.4)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
        });
    });
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupIntersectionObserver();
    initTypewriter();
    initParticles();
    initProjectTilt();
    
    // Store original width for skill progress bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.dataset.width = bar.style.width;
        bar.style.width = '0';
    });
});
