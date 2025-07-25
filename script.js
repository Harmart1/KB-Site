document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    // Toggle mobile navigation
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
    });

    // Smooth scrolling for all anchor links and close mobile menu on click
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Close mobile nav if it's open
                if (mobileNavMenu.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    mobileNavMenu.classList.remove('active');
                }
            }
        });
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Optional: Close all other items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Estimator functionality
    const roomCheckboxes = document.querySelectorAll('input[name="room"]');
    const estimatedTimeEl = document.getElementById('estimated-time');
    const estimatedCostEl = document.getElementById('estimated-cost');

    const roomHours = {
        kitchen: 8,
        pantry: 4,
        closet: 6,
        bedroom: 6,
        basement: 12,
        garage: 12
    };
    const hourlyRate = 50; // Example hourly rate

    function updateEstimate() {
        let totalHours = 0;
        roomCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalHours += roomHours[checkbox.value] || 0;
            }
        });

        const totalCost = totalHours * hourlyRate;

        estimatedTimeEl.textContent = `${totalHours} hours`;
        estimatedCostEl.textContent = `$${totalCost}`;
    }

    roomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateEstimate);
    });

    // Initial calculation on page load
    updateEstimate();
});