
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
      chars: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
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
    })

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate();
    })

    this.canvas.addEventListener('click', () => {
      this.generate();
      this.resetForm();
    })
  }

  generateRandomtext(length) {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += this.options.chars.charAt(Math.floor(Math.random() * this.options.chars.length));
    }
    return str;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  randomColor(min = 50, max = 150) {
    const r = this.randomInt(min, max);
    const g = this.randomInt(min, max);
    const b = this.randomInt(min, max);

    return `rgb(${r}, ${g}, ${b})`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CaptchaGenerator();
})