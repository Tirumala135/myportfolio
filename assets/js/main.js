document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 15 + 'px';
            follower.style.top = e.clientY - 15 + 'px';
        }, 50);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(10, 10, 12, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(10, 10, 12, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal, .skill-category, .project-card, .timeline-item');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            burger.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#28a745';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

// Add keyframes for mobile nav animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        right: 0;
        height: 92vh;
        top: 8vh;
        background-color: var(--bg-dark);
        width: 50%;
        align-items: center;
        justify-content: space-around;
        transform: translateX(0%);
        transition: transform 0.5s ease-in;
        z-index: 100;
    }
    
    .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .toggle .line2 { opacity: 0; }
    .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
    
    .burger { display: none; cursor: pointer; }
    .burger div { width: 25px; height: 3px; background-color: var(--text-main); margin: 5px; transition: all 0.3s ease; }
    
    @media (max-width: 768px) {
        .burger { display: block; }
        .nav-links { position: absolute; right: 0px; height: 92vh; top: 8vh; background-color: var(--bg-dark); display: none; flex-direction: column; align-items: center; width: 50%; transform: translateX(100%); transition: transform 0.5s ease-in; }
        .nav-links li { opacity: 0; margin-left: 0; }
    }
`;
document.head.appendChild(style);
