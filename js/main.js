// Mock Data
const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'farmer',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=2ecc71&color=fff'
    }
];

const mockProducts = [
    {
        id: 1,
        name: 'Organic Wheat',
        price: 25.99,
        category: 'Grains',
        farmer: 'John Doe',
        location: 'Gujarat',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        description: 'High-quality organic wheat grown with sustainable farming practices.'
    },
    {
        id: 2,
        name: 'Fresh Tomatoes',
        price: 12.50,
        category: 'Vegetables',
        farmer: 'Rajesh Patel',
        location: 'Maharashtra',
        image: 'https://images.unsplash.com/photo-1592841209382-3b1b368d9b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.2,
        description: 'Freshly picked organic tomatoes from our farm.'
    },
    {
        id: 3,
        name: 'Basmati Rice',
        price: 45.99,
        category: 'Grains',
        farmer: 'Amit Sharma',
        location: 'Punjab',
        image: 'https://images.unsplash.com/photo-1598373182192-9a5c6d2c5a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.8,
        description: 'Premium quality basmati rice with long grains and rich aroma.'
    }
];

// Utility Functions
function getCurrentUser() {
    const userId = localStorage.getItem('currentUser');
    return mockUsers.find(user => user.id === Number(userId)) || null;
}

function setCurrentUser(userId) {
    localStorage.setItem('currentUser', userId);
}

function isLoggedIn() {
    return !!localStorage.getItem('currentUser');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in for protected pages
    const protectedPages = ['dashboard.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update UI based on authentication status
    updateAuthUI();
    
    // Initialize page-specific functionality
    if (typeof initPage === 'function') {
        initPage();
    }
});

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfile = document.querySelector('.user-profile');
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (userProfile) {
            userProfile.querySelector('span').textContent = user.name;
            userProfile.style.display = 'flex';
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'none';
    }
}

// Mobile Menu Toggle
const navLinks = document.getElementById('navLinks');

function showMenu() {
    navLinks.style.right = '0';
    document.body.style.overflow = 'hidden';
}

function hideMenu() {
    navLinks.style.right = '-300px';
    document.body.style.overflow = 'auto';
}

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-links ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hideMenu();
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .section-title, .hero-content, .hero-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });
    
    // Set up section title animation
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(30px)';
        sectionTitle.style.transition = 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s';
    }
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
});

// Form Submission Handler (for future implementation)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

// Show/Hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
        setTimeout(() => {
            if (window.pageYOffset <= 300) {
                backToTopButton.style.display = 'none';
            }
        }, 300);
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add styles for back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
        z-index: 999;
    }
    
    .back-to-top:hover {
        background-color: var(--primary-dark);
        transform: translateY(-3px);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background-color: #27ae60;
    }
    
    .notification.error {
        background-color: #e74c3c;
    }
    
    .notification.info {
        background-color: #3498db;
    }
    
    .notification.warning {
        background-color: #f39c12;
    }
`;
document.head.appendChild(style);

// Make functions available globally
window.showNotification = showNotification;
window.logout = logout;
