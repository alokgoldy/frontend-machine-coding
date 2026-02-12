/**
 * Senior Level Captcha Generator
 * Features: Canvas rendering, Noise injection, Rotation, Random colors/fonts
 */

class CaptchaGenerator {
    constructor() {
        this.canvas = document.getElementById('captchaCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.input = document.getElementById('captchaInput');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.form = document.getElementById('captchaForm');
        this.statusMsg = document.getElementById('statusMessage');
        
        this.captchaText = '';
        this.options = {
            length: 6,
            fonts: ['Verdana', 'Arial', 'Courier New', 'Georgia', 'Tahoma'],
            chars: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789' // Removed confusing chars like I, l, 1, O, 0
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.generate();
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => {
            this.generate();
            this.resetForm();
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate();
        });

        // Optional: Regenerate on canvas click
        this.canvas.addEventListener('click', () => {
            this.generate();
            this.resetForm();
        });
    }

    // Generate random alphanumeric string
    generateRandomText(length) {
        let str = '';
        for (let i = 0; i < length; i++) {
            str += this.options.chars.charAt(Math.floor(Math.random() * this.options.chars.length));
        }
        return str;
    }

    // Random integer helper
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Random color helper
    randomColor(min = 50, max = 150) {
        const r = this.randomInt(min, max);
        const g = this.randomInt(min, max);
        const b = this.randomInt(min, max);
        return `rgb(${r},${g},${b})`;
    }

    // Clear canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw interference lines and dots (Noise)
    drawNoise() {
        // Dots
        for (let i = 0; i < 50; i++) {
            this.ctx.fillStyle = this.randomColor(150, 220);
            this.ctx.beginPath();
            this.ctx.arc(
                this.randomInt(0, this.canvas.width),
                this.randomInt(0, this.canvas.height),
                1, 0, 2 * Math.PI
            );
            this.ctx.fill();
        }

        // Lines
        for (let i = 0; i < 7; i++) {
            this.ctx.strokeStyle = this.randomColor(180, 220);
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.randomInt(0, this.canvas.width), this.randomInt(0, this.canvas.height));
            this.ctx.lineTo(this.randomInt(0, this.canvas.width), this.randomInt(0, this.canvas.height));
            this.ctx.stroke();
        }
    }

    // Main render function
    generate() {
        this.clearCanvas();
        this.drawNoise();
        
        this.captchaText = this.generateRandomText(this.options.length);
        const charWidth = this.canvas.width / (this.options.length + 2); // Spread out characters
        
        for (let i = 0; i < this.captchaText.length; i++) {
            this.ctx.save();
            
            // Positioning
            const x = (i + 1) * charWidth;
            const y = this.canvas.height / 1.5;
            
            // Transformations
            this.ctx.translate(x, y);
            const rotation = this.randomInt(-25, 25) * Math.PI / 180;
            this.ctx.rotate(rotation);
            
            // Styling
            const fontSize = this.randomInt(30, 40);
            const fontName = this.options.fonts[this.randomInt(0, this.options.fonts.length - 1)];
            this.ctx.font = `bold ${fontSize}px ${fontName}`;
            this.ctx.fillStyle = this.randomColor(50, 100); // Darker text for contrast
            this.ctx.textAlign = 'center';
            
            // Draw Character
            this.ctx.fillText(this.captchaText[i], 0, 0);
            
            this.ctx.restore();
        }
    }

    resetForm() {
        this.input.value = '';
        this.statusMsg.className = 'status-message';
        this.statusMsg.textContent = '';
        this.input.parentElement.classList.remove('error', 'success');
    }

    validate() {
        const userInput = this.input.value.trim();
        
        if (!userInput) {
            this.showStatus('Please enter the text shown above.', 'error');
            return;
        }

        if (userInput === this.captchaText) {
            this.showStatus('Success! Captcha matched.', 'success');
            // Simulate API call or form submission
            setTimeout(() => {
                alert('Form verified successfully!');
                this.generate();
                this.resetForm();
            }, 500);
        } else {
            this.showStatus('Incorrect captcha. Please try again.', 'error');
            this.generate();
            this.input.value = '';
        }
    }

    showStatus(message, type) {
        this.statusMsg.textContent = message;
        this.statusMsg.className = `status-message show ${type}`;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.statusMsg.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CaptchaGenerator();
});