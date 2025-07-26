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

    // Virtual Organizing Tool functionality
    const organizeItems = document.querySelectorAll('.organize-item');
    const clutteredArea = document.getElementById('cluttered-area');
    const organizedArea = document.getElementById('organized-area');

    if (organizeItems.length > 0 && clutteredArea && organizedArea) {
        organizeItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
                setTimeout(() => {
                    e.target.style.display = 'none';
                }, 0);
            });

            item.addEventListener('dragend', (e) => {
                e.target.style.display = 'block';
            });
        });

        organizedArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            organizedArea.classList.add('over');
        });

        organizedArea.addEventListener('dragleave', () => {
            organizedArea.classList.remove('over');
        });

        organizedArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text');
            const draggableElement = document.getElementById(id);
            if (draggableElement) {
                organizedArea.appendChild(draggableElement);
            }
            organizedArea.classList.remove('over');
        });

        clutteredArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            clutteredArea.classList.add('over');
        });

        clutteredArea.addEventListener('dragleave', () => {
            clutteredArea.classList.remove('over');
        });

        clutteredArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text');
            const draggableElement = document.getElementById(id);
            if (draggableElement) {
                clutteredArea.appendChild(draggableElement);
            }
            clutteredArea.classList.remove('over');
        });
    }
});
