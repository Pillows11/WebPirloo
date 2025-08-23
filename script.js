// Portfolio data
const portfolioData = {
    website: {
        title: "Responsive Portfolio Website",
        slides: [
            {
                type: "image",
                content: "🖥️ Desktop View",
                description: "Landing page dengan hero section yang menarik, menggunakan gradient background dan animasi CSS yang smooth. Navbar sticky dengan efek blur dan hover animations."
            },
            {
                type: "image",
                content: "📱 Mobile Responsive",
                description: "Design yang fully responsive dengan hamburger menu, optimized touch interactions, dan typography yang scalable untuk semua device sizes."
            },
            {
                type: "video",
                content: "🎥 Interactive Demo",
                description: "Demonstrasi fitur interaktif termasuk smooth scrolling, hover effects, form validation, dan loading animations yang memberikan user experience yang premium."
            },
            {
                type: "image",
                content: "⚡ Performance Optimized",
                description: "Website dioptimasi untuk kecepatan loading dengan lazy loading images, minified CSS/JS, dan efficient DOM manipulation untuk performa terbaik."
            }
        ]
    },
    mobile: {
        title: "E-Commerce Mobile App UI",
        slides: [
            {
                type: "image",
                content: "📱 App Overview",
                description: "Mockup aplikasi e-commerce dengan design modern menggunakan Material Design principles. Clean interface dengan fokus pada user experience dan conversion rate."
            },
            {
                type: "image",
                content: "🛍️ Shopping Flow",
                description: "User journey dari browse products hingga checkout yang intuitif. Implementasi search filters, wishlist, dan cart management dengan smooth animations."
            },
            {
                type: "video",
                content: "🎨 UI Animations",
                description: "Micro-interactions dan transition animations yang membuat app terasa alive. Termasuk loading states, pull-to-refresh, dan gesture-based navigation."
            },
            {
                type: "image",
                content: "💳 Payment Integration",
                description: "Design untuk payment gateway integration dengan multiple payment methods, security indicators, dan confirmation flows yang user-friendly."
            }
        ]
    },
    game: {
        title: "Interactive Web Game",
        slides: [
            {
                type: "video",
                content: "🎮 Gameplay Demo",
                description: "Puzzle game dengan mechanics yang challenging namun mudah dipelajari. Menggunakan HTML5 Canvas untuk smooth graphics dan responsive controls."
            },
            {
                type: "image",
                content: "🏆 Scoring System",
                description: "Implementasi high score system dengan local storage, level progression, dan achievement badges untuk meningkatkan engagement dan replayability."
            },
            {
                type: "image",
                content: "🎨 Visual Effects",
                description: "Particle effects, screen transitions, dan visual feedback menggunakan pure JavaScript. Optimized animations untuk maintain 60fps performance."
            },
            {
                type: "video",
                content: "📊 Game Analytics",
                description: "Built-in analytics untuk track player behavior, completion rates, dan difficulty balancing. Data visualization untuk game improvement insights."
            }
        ]
    },
    dashboard: {
        title: "Admin Dashboard System",
        slides: [
            {
                type: "image",
                content: "📊 Main Dashboard",
                description: "Comprehensive admin panel dengan real-time metrics, KPI indicators, dan interactive charts menggunakan Chart.js dan D3.js untuk data visualization."
            },
            {
                type: "video",
                content: "👥 User Management",
                description: "Complete CRUD operations untuk user management dengan role-based access control, bulk actions, dan advanced filtering capabilities."
            },
            {
                type: "image",
                content: "📈 Analytics & Reports",
                description: "Advanced reporting system dengan customizable date ranges, export functionality, dan automated report generation. Real-time data updates via WebSocket."
            },
            {
                type: "video",
                content: "🔧 System Configuration",
                description: "Flexible system settings dengan theme customization, notification preferences, dan system health monitoring dashboard."
            }
        ]
    }
};

let currentSlide = 0;
let currentPortfolio = null;

// Enhanced Navigation functionality
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navIndicator = document.querySelector('.nav-indicator');
        this.navProgressBar = document.querySelector('.nav-progress-bar');
        this.themeToggle = document.querySelector('.theme-toggle');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveLink();
        this.updateScrollProgress();
    }
    
    bindEvents() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
            link.addEventListener('mouseenter', () => this.handleNavHover(link));
        });
        
        // Scroll events
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
            this.updateNavbarStyle();
            this.updateActiveLink();
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const link = e.currentTarget;
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu
            this.closeMobileMenu();
            
            // Update active link
            this.setActiveLink(link);
        }
    }
    
    handleNavHover(link) {
        const rect = link.getBoundingClientRect();
        const navRect = this.navbar.getBoundingClientRect();
        
        this.navIndicator.style.width = rect.width + 'px';
        this.navIndicator.style.left = (rect.left - navRect.left) + 'px';
        this.navIndicator.style.opacity = '0.3';
    }
    
    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
        
        const rect = activeLink.getBoundingClientRect();
        const navRect = this.navbar.getBoundingClientRect();
        
        this.navIndicator.style.width = rect.width + 'px';
        this.navIndicator.style.left = (rect.left - navRect.left) + 'px';
        this.navIndicator.style.opacity = '1';
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
            if (activeLink && !activeLink.classList.contains('active')) {
                this.setActiveLink(activeLink);
            }
        }
    }
    
    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / documentHeight) * 100;
        
        this.navProgressBar.style.width = progress + '%';
    }
    
    updateNavbarStyle() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('light-theme');
        
        if (isDark) {
            body.classList.remove('light-theme');
            this.themeToggle.textContent = '🌙';
        } else {
            body.classList.add('light-theme');
            this.themeToggle.textContent = '☀️';
        }
        
        // Add rotation animation
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }
}

// Form handling
class FormManager {
    constructor() {
        this.form = document.querySelector('form');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const btn = e.target.querySelector('.btn');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<span>⏳</span> Sending...';
        btn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        btn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            // Show success state
            btn.innerHTML = '<span>✅</span> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                e.target.reset();
            }, 2000);
        }, 1500);
    }
}

// Portfolio Modal Manager
class ModalManager {
    constructor() {
        this.modal = document.getElementById('portfolioModal');
        this.closeBtn = document.querySelector('.close');
        this.init();
    }
    
    init() {
        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    openModal(portfolioType) {
        currentPortfolio = portfolioType;
        currentSlide = 0;
        
        const modalTitle = document.getElementById('modalTitle');
        const data = portfolioData[portfolioType];
        
        modalTitle.textContent = data.title;
        this.loadSlide();
        this.modal.style.display = 'block';
        
        // Animation
        this.modal.style.opacity = '0';
        requestAnimationFrame(() => {
            this.modal.style.opacity = '1';
        });
    }
    
    closeModal() {
        this.modal.style.opacity = '0';
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
    }
    
    loadSlide() {
        if (!currentPortfolio) return;
        
        const data = portfolioData[currentPortfolio];
        const slide = data.slides[currentSlide];
        const mediaContainer = document.getElementById('mediaContainer');
        const modalDescription = document.getElementById('modalDescription');
        const slideIndicator = document.getElementById('slideIndicator');
        
        // Update media container
        if (slide.type === 'video') {
            mediaContainer.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 1rem;">${slide.content}</div>
                <div style="background: rgba(139, 92, 246, 0.1); padding: 2rem; border-radius: 10px; border: 2px dashed rgba(139, 92, 246, 0.3);">
                    <p style="color: var(--text-gray); margin: 0;">🎬 Video content would be embedded here</p>
                    <p style="color: var(--text-gray); font-size: 0.9rem; margin: 0.5rem 0 0 0;">In a real implementation, this would show actual video/GIF demos</p>
                </div>
            `;
        } else {
            mediaContainer.innerHTML = `
                <div style="font-size: 6rem; margin-bottom: 1rem;">${slide.content}</div>
                <div style="background: rgba(139, 92, 246, 0.1); padding: 1.5rem; border-radius: 10px; border: 2px dashed rgba(139, 92, 246, 0.3);">
                    <p style="color: var(--text-gray); margin: 0;">📸 Screenshot/Image would be displayed here</p>
                    <p style="color: var(--text-gray); font-size: 0.9rem; margin: 0.5rem 0 0 0;">High-resolution mockups and actual screenshots in real implementation</p>
                </div>
            `;
        }
        
        // Update description
        modalDescription.innerHTML = `
            <div style="background: var(--gradient-glow); padding: 2rem; border-radius: 15px; border: 1px solid rgba(139, 92, 246, 0.2); margin-top: 2rem;">
                <h3 style="color: var(--accent-purple-light); margin-bottom: 1rem;">📝 Description</h3>
                <p style="color: var(--text-gray); line-height: 1.8; margin: 0;">${slide.description}</p>
            </div>
        `;
        
        // Update slide indicator
        slideIndicator.textContent = `${currentSlide + 1} / ${data.slides.length}`;
        
        // Show/hide controls based on slide count
        const controls = document.getElementById('sliderControls');
        controls.style.display = data.slides.length > 1 ? 'block' : 'none';
    }
    
    changeSlide(direction) {
        if (!currentPortfolio) return;
        
        const data = portfolioData[currentPortfolio];
        currentSlide += direction;
        
        if (currentSlide < 0) currentSlide = data.slides.length - 1;
        if (currentSlide >= data.slides.length) currentSlide = 0;
        
        this.loadSlide();
        
        // Add slide transition effect
        const mediaContainer = document.getElementById('mediaContainer');
        mediaContainer.style.transform = direction > 0 ? 'translateX(20px)' : 'translateX(-20px)';
        mediaContainer.style.opacity = '0.7';
        
        setTimeout(() => {
            mediaContainer.style.transform = 'translateX(0)';
            mediaContainer.style.opacity = '1';
        }, 200);
    }
    
    handleKeydown(e) {
        if (this.modal.style.display === 'block') {
            if (e.key === 'Escape') {
                this.closeModal();
            } else if (e.key === 'ArrowLeft') {
                this.changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                this.changeSlide(1);
            }
        }
    }
}

// Animation observer for scroll animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    entry.target.style.opacity = '1';
                    
                    // Add stagger effect for multiple cards
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        document.querySelectorAll('.card, .timeline-item, .portfolio-card').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
}

// Typing effect for subtitle
class TypingEffect {
    constructor(element, text, speed = 80) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }
    
    start() {
        this.element.textContent = '';
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Particle system enhancement
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }
    
    init() {
        // Create additional floating particles
        this.createFloatingParticles();
        
        // Add mouse interaction
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    createFloatingParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(139, 92, 246, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            hero.appendChild(particle);
        }
    }
    
    handleMouseMove(e) {
        const hero = document.querySelector('.hero');
        if (!hero.contains(e.target)) return;
        
        // Create cursor trail particles occasionally
        if (Math.random() > 0.9) {
            this.createTrailParticle(e.clientX, e.clientY);
        }
    }
    
    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(139, 92, 246, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'fadeOut 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Smooth scrolling utility
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Enhanced smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Global functions for modal (called from HTML)
function openPortfolioModal(portfolioType) {
    window.modalManager.openModal(portfolioType);
}

function changeSlide(direction) {
    window.modalManager.changeSlide(direction);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all managers
    window.navigationManager = new NavigationManager();
    window.formManager = new FormManager();
    window.modalManager = new ModalManager();
    window.animationObserver = new AnimationObserver();
    window.particleSystem = new ParticleSystem();
    window.smoothScroll = new SmoothScroll();
    
    // Initialize typing effect for subtitle
    setTimeout(() => {
        const subtitle = document.querySelector('.hero .subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            const typingEffect = new TypingEffect(subtitle, originalText);
            typingEffect.start();
        }
    }, 1000);
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Performance optimization: Reduce animations on mobile
    if (window.innerWidth < 768) {
        document.documentElement.style.setProperty('--animation-speed', '0.5s');
    }
});

// Add CSS for additional animations
const additionalStyles = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.3); }
    }
    
    .floating-particle {
        filter: blur(0.5px);
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
    
    .nav-link::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s;
    }
    
    .nav-link:hover::after {
        left: 100%;
    }
    
    .card, .portfolio-card, .timeline-item {
        transform: translateY(30px);
        transition: all 0.3s ease;
    }
    
    .card:hover, .portfolio-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export for global access
window.PortfolioApp = {
    NavigationManager,
    FormManager,
    ModalManager,
    AnimationObserver,
    ParticleSystem,
    SmoothScroll,
    TypingEffect
};