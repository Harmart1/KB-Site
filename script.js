document.addEventListener('DOMContentLoaded', () => {
    // Accessibility toolbar functionality
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    const highContrastButton = document.getElementById('high-contrast');
    const body = document.body;

    increaseFontButton.addEventListener('click', () => {
        changeFontSize(1);
    });

    decreaseFontButton.addEventListener('click', () => {
        changeFontSize(-1);
    });

    highContrastButton.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
    });

    function changeFontSize(direction) {
        const currentSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
        body.style.fontSize = (currentSize + direction) + 'px';
    }

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    // Toggle mobile navigation
    hamburgerMenu.addEventListener('click', () => {
        const isActive = hamburgerMenu.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
        hamburgerMenu.setAttribute('aria-expanded', isActive);
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
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items for a cleaner accordion experience
            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    i.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            }
        });
    });

    // Before/After slider functionality
    const slider = document.querySelector('.before-after-slider');
    if (slider) {
        const handle = slider.querySelector('.slider-handle');
        const beforeImageContainer = slider.querySelector('.before-image-container');

        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
            slider.classList.add('dragging');
            updateSlider(e);
        };

        const stopDrag = () => {
            isDragging = false;
            slider.classList.remove('dragging');
        };

        const updateSlider = (e) => {
            if (!isDragging) return;

            const sliderRect = slider.getBoundingClientRect();
            let offsetX = (e.clientX || e.touches[0].clientX) - sliderRect.left;
            let percentage = (offsetX / sliderRect.width) * 100;

            // Clamp the percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));

            handle.style.left = `${percentage}%`;
            beforeImageContainer.style.width = `${percentage}%`;
        };

        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mouseleave', stopDrag);
        slider.addEventListener('mousemove', updateSlider);

        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchend', stopDrag);
        slider.addEventListener('touchmove', updateSlider);
    }
});
