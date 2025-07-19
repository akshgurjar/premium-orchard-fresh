// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.offsetTop - navHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Navigation highlight on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Product collections data
const productCollections = {
    'ultra-premium': [
        {
            name: 'Honeycrisp Premium',
            price: '₹550/kg',
            origin: 'Kashmir Valley',
            description: 'Crisp, sweet, and juicy with excellent shelf life',
            features: ['Extra Large Size', 'Premium Grade', '48hr Fresh', 'Gift Packaging']
        },
        {
            name: 'Envy Ultra',
            price: '₹600/kg',
            origin: 'Himachal Pradesh',
            description: 'Sweet, crispy apple with beautiful red color',
            features: ['Limited Season', 'Premium Grade', 'Cold Chain', 'Certified Organic']
        },
        {
            name: 'Jazz Premium',
            price: '₹480/kg',
            origin: 'Kashmir Valley',
            description: 'Tangy-sweet flavor with exceptional crunch',
            features: ['High Antioxidants', 'Premium Grade', '24hr Delivery', 'Eco Packaging']
        }
    ],
    'premium-domestic': [
        {
            name: 'Kashmir Red Delicious',
            price: '₹320/kg',
            origin: 'Srinagar Orchards',
            description: 'Classic red apple with sweet flavor and crisp texture',
            features: ['Traditional Variety', 'Premium Grade', 'Local Pride', 'Fresh Harvest']
        },
        {
            name: 'Himachal Gala',
            price: '₹280/kg',
            origin: 'Shimla Hills',
            description: 'Sweet and crisp with beautiful red stripes',
            features: ['Hill Grown', 'Natural Sweet', 'Vitamin Rich', 'Family Pack']
        },
        {
            name: 'Rich-A-Red',
            price: '₹350/kg',
            origin: 'Kullu Valley',
            description: 'Deep red color with excellent taste and aroma',
            features: ['Premium Color', 'Aromatic', 'Long Lasting', 'Gift Quality']
        }
    ],
    'organic-luxury': [
        {
            name: 'Organic Fuji',
            price: '₹420/kg',
            origin: 'Certified Organic Orchards',
            description: 'Sweet, dense, and crispy organic apple',
            features: ['100% Organic', 'Certified', 'Chemical Free', 'Sustainable']
        },
        {
            name: 'Organic Golden',
            price: '₹380/kg',
            origin: 'Bio-Dynamic Farms',
            description: 'Golden yellow with sweet and tangy flavor',
            features: ['Bio-Dynamic', 'Natural', 'Nutrient Dense', 'Eco-Friendly']
        }
    ],
    'seasonal': [
        {
            name: 'Early Harvest Special',
            price: '₹650/kg',
            origin: 'Select Orchards',
            description: 'First pick of the season with exceptional freshness',
            features: ['Limited Edition', 'First Pick', 'Ultra Fresh', 'Collectors Item']
        },
        {
            name: 'Heritage Ambri',
            price: '₹580/kg',
            origin: 'Traditional Kashmir',
            description: 'Rare heritage variety with unique flavor profile',
            features: ['Heritage Variety', 'Rare', 'Traditional', 'Authentic Taste']
        }
    ]
};

// Show products in modal
function showProducts(collectionType) {
    const modal = document.getElementById('productModal');
    const productContainer = document.getElementById('productContainer');
    const products = productCollections[collectionType];
    
    let html = `<h2>${collectionType.replace('-', ' ').toUpperCase()} COLLECTION</h2>`;
    html += '<div class="product-grid">';
    
    products.forEach(product => {
        html += `
            <div class="product-card">
                <div class="product-image"></div>
                <h3>${product.name}</h3>
                <p class="product-origin">${product.origin}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="product-price">${product.price}</div>
                <div class="product-actions">
                    <button class="quantity-btn" onclick="changeQuantity(this, -1)">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn" onclick="changeQuantity(this, 1)">+</button>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.name}', '${product.price}')">Add to Cart</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    productContainer.innerHTML = html;
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Quantity management
function changeQuantity(button, change) {
    const quantitySpan = button.parentNode.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;
}

// Cart management
let cart = [];
let cartCount = 0;

function addToCart(productName, price) {
    const quantityElement = event.target.parentNode.querySelector('.quantity');
    const quantity = parseInt(quantityElement.textContent);
    
    cart.push({
        name: productName,
        price: price,
        quantity: quantity
    });
    
    cartCount += quantity;
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Show success message
    showNotification(`${productName} added to cart!`);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
});

// Newsletter subscription
document.querySelector('.newsletter button').addEventListener('click', () => {
    const email = document.querySelector('.newsletter input').value;
    if (email) {
        showNotification('Successfully subscribed to our newsletter!');
        document.querySelector('.newsletter input').value = '';
    }
});

// Add CSS for product modal
const additionalCSS = `
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.product-card {
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.product-image {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    border-radius: 50%;
    margin: 0 auto 1rem;
}

.product-card h3 {
    font-family: 'Playfair Display', serif;
    color: #2c5530;
    margin-bottom: 0.5rem;
}

.product-origin {
    color: #27ae60;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    font-style: italic;
}

.product-description {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.product-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.feature-tag {
    background: #f8f9fa;
    color: #2c5530;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    border: 1px solid #eee;
}

.product-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e74c3c;
    margin-bottom: 1.5rem;
}

.product-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.quantity-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #27ae60;
    background: white;
    color: #27ae60;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.quantity-btn:hover {
    background: #27ae60;
    color: white;
}

.quantity {
    font-size: 1.2rem;
    font-weight: 600;
    min-width: 30px;
    text-align: center;
}

.add-to-cart-btn {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.3s;
}

.add-to-cart-btn:hover {
    transform: translateY(-2px);
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(section);
    });
});
