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

    // AI Organizer functionality
    const aiOrganizerForm = document.getElementById('ai-organizer-form');
    if (aiOrganizerForm) {
        aiOrganizerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const roomType = document.getElementById('room-type').value;
            const clutterLevel = document.getElementById('clutter-level').value;
            const timeCommitment = document.getElementById('time-commitment').value;

            // This is a simplified plan generator. A real implementation would use a more complex algorithm or an AI model.
            const plan = generatePlan(roomType, clutterLevel, timeCommitment);

            const planContainer = document.getElementById('ai-plan-container');
            const planElement = document.getElementById('ai-plan');

            planElement.innerText = plan;
            planContainer.style.display = 'block';
        });
    }

    function generatePlan(room, clutter, time) {
        let plan = `Here is your personalized plan for organizing your ${room.replace('-', ' ')}:\n\n`;

        switch (clutter) {
            case 'low':
                plan += 'Since your room is only a little cluttered, you can probably get it organized in a day or two. ';
                break;
            case 'medium':
                plan += 'With a moderately cluttered room, it might take a weekend to get everything in order. ';
                break;
            case 'high':
                plan += 'Your room is very cluttered, so it will likely take several days to a week to fully organize. Don\'t get discouraged! ';
                break;
        }

        plan += `You've committed to spending ${time.replace('-', ' ')} per day on this project.\n\n`;

        plan += 'Here are your first three steps:\n';
        plan += '1. Start by removing any trash or items that clearly don\'t belong in the room.\n';
        plan += '2. Next, sort the remaining items into three piles: Keep, Donate, and Discard.\n';
        plan += '3. Finally, put away the items you are keeping in a logical and organized manner.\n\n';
        plan += 'Good luck!';

        return plan;
    }
});
