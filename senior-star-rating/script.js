/**
 * Senior Level Star Rating Component
 * 
 * Key Features:
 * 1. Accessibility (a11y): 
 *    - Uses ARIA roles (radiogroup, radio) for screen readers.
 *    - Implements 'Roving Tabindex' to manage focus efficiently (only one tab stop).
 *    - Full keyboard support (Arrow keys, Enter, Space).
 * 
 * 2. Performance:
 *    - Event Delegation: Listeners are attached to the container, not individual stars.
 *    - minimal DOM manipulation: Only toggling classes.
 *    - Inline SVGs: No external font/icon requests.
 * 
 * 3. User Experience (UX):
 *    - 'Hover Intent': Distinguishes between current selection and hover preview.
 *    - Immediate feedback with animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('.stars');
    const ratingText = document.querySelector('.rating-text');
    const ratingInput = document.getElementById('rating-value');
    const totalStars = 5;
    let currentRating = 0;

    // Create stars dynamically
    for (let i = 1; i <= totalStars; i++) {
        // Create SVG Star
        // 'createElementNS' is required for SVG elements. 
        // Without this namespace URI ('http://www.w3.org/2000/svg'), 
        // the browser would create a generic HTML element instead of a proper SVG element, 
        // and it wouldn't render the graphic correctly.
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        star.setAttribute('viewBox', '0 0 24 24');
        star.classList.add('star');
        star.setAttribute('data-rating', i);
        star.setAttribute('role', 'radio');
        star.setAttribute('aria-label', `${i} out of ${totalStars} stars`);
        star.setAttribute('aria-checked', 'false');
        star.setAttribute('tabindex', i === 1 ? '0' : '-1');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'); // Standard star shape
        star.appendChild(path);

        starsContainer.appendChild(star);
    }

    const stars = document.querySelectorAll('.star');

    // Helper to update star visuals
    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Helper to update text
    function updateText(rating) {
        const messages = ['Select a rating', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
        ratingText.textContent = messages[rating] || messages[0];
    }

    // Helper to set focus and tabindex
    function setFocus(star) {
        stars.forEach(s => s.setAttribute('tabindex', '-1'));
        star.setAttribute('tabindex', '0');
        star.focus();
    }

    // Event Delegation for better performance
    starsContainer.addEventListener('mouseenter', () => {
        starsContainer.classList.add('is-hovering');
    });

    starsContainer.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('star')) {
            const hoverRating = parseInt(e.target.getAttribute('data-rating'));
            stars.forEach(star => {
                const starRating = parseInt(star.getAttribute('data-rating'));
                if (starRating <= hoverRating) {
                    star.classList.add('hovered');
                } else {
                    star.classList.remove('hovered');
                }
            });
            updateText(hoverRating);
        }
    });

    starsContainer.addEventListener('mouseleave', () => {
        starsContainer.classList.remove('is-hovering');
        // Reset to current rating state
        stars.forEach(star => star.classList.remove('hovered'));
        updateStars(currentRating);
        updateText(currentRating);
    });

    starsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
            const selectedRating = parseInt(e.target.getAttribute('data-rating'));

            if (currentRating !== selectedRating) {
                currentRating = selectedRating;
                ratingInput.value = currentRating;

                updateStars(currentRating);
                updateText(currentRating);

                // Animation effect
                e.target.style.transform = 'scale(1.4)';
                setTimeout(() => e.target.style.transform = 'scale(1)', 200);

                // Update ARIA
                stars.forEach(s => s.setAttribute('aria-checked', 'false'));
                e.target.setAttribute('aria-checked', 'true');

                console.log(`Rating set to: ${currentRating}`);
            }

            // Ensure focus is managed (though click usually focuses)
            setFocus(e.target);
        }
    });

    // Keyboard Accessibility with Roving Tabindex
    starsContainer.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('star')) {
            const currentStar = e.target;
            const currentRatingValue = parseInt(currentStar.getAttribute('data-rating'));

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentStar.click();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextStar = stars[currentRatingValue]; // index is 0-based, rating is 1-based. Next is at index `rating`.
                if (nextStar) {
                    setFocus(nextStar);
                    // Optional: update hover state visually while navigating?
                    // Standard radiogroup: usually selects or just moves focus.
                    // Let's just move focus.
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevStar = stars[currentRatingValue - 2]; // index is 0-based. Prev star is rating - 2.
                if (prevStar) {
                    setFocus(prevStar);
                }
            }
        }
    });
});
