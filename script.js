// Main JavaScript for Bright Minds Academy Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }
    
    // Tab functionality for Programs page
    const programTabs = document.querySelectorAll('.program-tab');
    const programSections = document.querySelectorAll('.program-section');
    
    programTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all tabs and sections
            programTabs.forEach(t => t.classList.remove('active'));
            programSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Tab functionality for Schedule page
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleSections = document.querySelectorAll('.schedule-section');
    
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all tabs and sections
            scheduleTabs.forEach(t => t.classList.remove('active'));
            scheduleSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Grade selector functionality for Schedule page
    const gradeButtons = document.querySelectorAll('.grade-btn');
    const gradeSchedules = document.querySelectorAll('.grade-schedule');
    
    if (gradeButtons.length > 0) {
        gradeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetGrade = this.getAttribute('data-grade');
                
                // Remove active class from all buttons and schedules
                gradeButtons.forEach(b => b.classList.remove('active'));
                gradeSchedules.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked button and corresponding schedule
                this.classList.add('active');
                document.getElementById(`${targetGrade}-schedule`).classList.add('active');
            });
        });
    }
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on clicked question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle active class on answer
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
            } else {
                // Close other open answers
                faqQuestions.forEach(q => {
                    if (q !== this && q.classList.contains('active')) {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('active');
                    }
                });
                
                answer.classList.add('active');
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formMessage = document.getElementById('formMessage');
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });
            
            if (!isValid) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Show success message (in a real app, you would send data to server here)
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Scroll to form message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.style.opacity = '1';
                }, 300);
            }, 5000);
        });
        
        // Real-time validation for form fields
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#e2e8f0';
                }
            });
            
            field.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        });
    }
    
    // Add to Calendar functionality
    const calendarButtons = document.querySelectorAll('.btn-small');
    
    calendarButtons.forEach(button => {
        if (button.textContent.includes('Add to Calendar')) {
            button.addEventListener('click', function() {
                const eventItem = this.closest('.event-item');
                const eventTitle = eventItem.querySelector('h4').textContent;
                const eventTime = eventItem.querySelector('p').textContent;
                
                // Create a simple alert (in a real app, this would create an actual calendar event)
                alert(`Adding "${eventTitle}" to your calendar.\n\nEvent details: ${eventTime}`);
                
                // Change button text temporarily
                const originalText = this.textContent;
                this.textContent = 'Added to Calendar!';
                this.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            });
        }
    });
    
    // Scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    // Highlight nav link on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Check if the link is to a section on the same page
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Apply Now button functionality
    const applyButtons = document.querySelectorAll('a.btn-outline, .hero-buttons .btn-primary');
    
    applyButtons.forEach(button => {
        if (button.textContent.includes('Apply Now') || button.textContent.includes('Explore Programs')) {
            button.addEventListener('click', function(e) {
                // If it's the "Explore Programs" button on the homepage, let it navigate normally
                if (this.textContent.includes('Explore Programs') && this.getAttribute('href') === 'programs.html') {
                    return;
                }
                
                e.preventDefault();
                
                // In a real app, this would redirect to an application form
                // For this demo, show a message
                alert('Thank you for your interest in Bright Minds Academy! The application process will open in a new window. For this demo, please navigate to the Contact page to send us a message.');
                
                // Optionally redirect to contact page
                // window.location.href = 'contact.html';
            });
        }
    });
    
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3, .ap-stat h3');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, 20);
    }
    
    // Initialize counters when they come into view
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.textContent);
                    
                    if (!isNaN(target)) {
                        animateCounter(element, target);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Back to top button (add dynamically)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 999;
        display: none;
        transition: var(--transition);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.justifyContent = 'center';
            backToTopButton.style.alignItems = 'center';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for back to top button
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-5px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary)';
        this.style.transform = 'translateY(0)';
    });
    
    // Initialize any animations that should run on page load
    function initAnimations() {
        // Add animation classes to elements that should animate on load
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in');
        
        animatedElements.forEach((element, index) => {
            // Set delay based on index for staggered animations
            if (element.classList.contains('fade-in') || element.classList.contains('scale-in')) {
                element.style.animationDelay = `${index * 0.1}s`;
            }
        });
        
        // Add float animation to floating elements with different delays
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Call initialization function
    initAnimations();
});