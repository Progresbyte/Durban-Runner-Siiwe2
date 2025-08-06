// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Lazy loading for gallery images
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Intersection Observer for animations
    const animateOnScroll = (elements, animationClass) => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        elements.forEach(el => observer.observe(el));
    };

    // Animate headers and images
    animateOnScroll(document.querySelectorAll('.animate-header'), 'fade-in');
    animateOnScroll(document.querySelectorAll('.gallery img'), 'slide-up');

    // Modal (lightbox) for gallery images
    const createModal = (src, alt) => {
        const modal = document.createElement('div');
        modal.className = 'modal-lightbox';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}" />
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = e => { if (e.target === modal) modal.remove(); };
    };

    document.querySelectorAll('.gallery img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            createModal(img.src, img.alt || '');
        });
    });

    // Load placeholder images for clothing categories
    const categoryImages = {
        jeans: 'https://source.unsplash.com/600x600/?jeans',
        shirts: 'https://source.unsplash.com/600x600/?shirt',
        jackets: 'https://source.unsplash.com/600x600/?jacket',
        shoes: 'https://source.unsplash.com/600x600/?shoes',
        hats: 'https://source.unsplash.com/600x600/?hat'
    };

    document.querySelectorAll('.gallery img[data-category]').forEach(img => {
        const cat = img.getAttribute('data-category');
        if (categoryImages[cat]) {
            img.setAttribute('data-src', categoryImages[cat]);
        } else {
            img.setAttribute('data-src', `https://picsum.photos/300/300?random=${Math.floor(Math.random()*1000)}`);
        }
    });

    // Lazy load images using Intersection Observer
    const lazyImgs = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    lazyImgs.forEach(img => imgObserver.observe(img));

    // Scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
});

// Example CSS (add to your stylesheet for smooth animations and modal)
/*
.fade-in { opacity: 1; transform: none; transition: opacity 0.8s, transform 0.8s; }
.animate-header, .gallery img { opacity: 0; transform: translateY(30px); }
.slide-up { opacity: 1; transform: translateY(0); transition: opacity 0.8s, transform 0.8s; }
.modal-lightbox { position: fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal-content { position:relative; }
.modal-content img { max-width:90vw; max-height:80vh; border-radius:8px; }
.modal-close { position:absolute; top:10px; right:10px; background:#fff; border:none; font-size:2rem; cursor:pointer; border-radius:50%; }
.scroll-to-top { position:fixed; bottom:30px; right:30px; background:#333; color:#fff; border:none; border-radius:50%; width:40px; height:40px; font-size:1.5rem; cursor:pointer; z-index:999; }
*/