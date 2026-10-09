window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('opacity-0');
        setTimeout(() => loader.remove(), 700);
    }, 1000);
});

const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
});

// Dynamic Theme Switcher Controller
const themes = {
    blue: { bg: '#050816', secondary: '#0F172A', accent: '#2563EB', accentHex: '#2563EB' },
    emerald: { bg: '#041511', secondary: '#062820', accent: '#059669', accentHex: '#059669' },
    purple: { bg: '#11041c', secondary: '#1c072e', accent: '#7c3aed', accentHex: '#7c3aed' }
};

function setTheme(themeName) {
    const t = themes[themeName];
    if (!t) return;
    const root = document.documentElement;
    root.style.setProperty('--bg-main', t.bg);
    root.style.setProperty('--bg-secondary', t.secondary);
    root.style.setProperty('--primary-accent', t.accent);
    
    if (typeof updateParticleColor === 'function') {
        updateParticleColor(t.accentHex);
    }
}

// Typing Animation for Role
const strings = ["AI Engineer & Student at VIT", "Full-Stack Web Developer", "Python Systems Architect", "Creative Technologist", "Growing & Building Daily"];
let stringIdx = 0, charIdx = 0, isDeleting = false;
const targetEl = document.getElementById('typed-text');

function type() {
    const currentString = strings[stringIdx];
    if (isDeleting) {
        targetEl.textContent = currentString.substring(0, charIdx - 1);
        charIdx--;
    } else {
        targetEl.textContent = currentString.substring(0, charIdx + 1);
        charIdx++;
    }
    let typeSpeed = isDeleting ? 30 : 70;
    if (!isDeleting && charIdx === currentString.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        stringIdx = (stringIdx + 1) % strings.length;
        typeSpeed = 300;
    }
    setTimeout(type, typeSpeed);
}
setTimeout(type, 1500);

// Scroll-Linked Diagonal Splitting & Dynamic Transition Effects
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const pfpWrapper = document.getElementById('hero-pfp-wrapper');
    const nameWrapper = document.getElementById('hero-name-wrapper');
    const metricsBar = document.getElementById('hero-metrics-bar');

    const splitProgress = Math.min(scrollY / 300, 1);
    
    if (pfpWrapper && nameWrapper) {
        pfpWrapper.style.transform = `translate(${-splitProgress * 60}px, ${-splitProgress * 30}px) scale(${1 - splitProgress * 0.05})`;
        pfpWrapper.style.opacity = `${1 - splitProgress * 0.2}`;

        nameWrapper.style.transform = `translate(${splitProgress * 60}px, ${-splitProgress * 30}px) scale(${1 - splitProgress * 0.05})`;
        nameWrapper.style.opacity = `${1 - splitProgress * 0.2}`;
    }

    if (metricsBar) {
        if (scrollY > 80) {
            metricsBar.classList.remove('opacity-0', 'translate-y-10');
            metricsBar.classList.add('opacity-100', 'translate-y-0');
        } else {
            metricsBar.classList.add('opacity-0', 'translate-y-10');
            metricsBar.classList.remove('opacity-100', 'translate-y-0');
        }
    }
});

const cursor = document.getElementById('custom-cursor');
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

function bindCursorHover() {
    document.querySelectorAll('.cursor-hover').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '45px';
            cursor.style.height = '45px';
            cursor.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}
bindCursorHover();

const revealElements = document.querySelectorAll('.reveal');
const revealCheck = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) el.classList.add('active');
    });
};
window.addEventListener('scroll', revealCheck);
window.addEventListener('load', revealCheck);

function switchArchive(type) {
    const webGrid = document.getElementById('archive-web');
    const pythonGrid = document.getElementById('archive-python');
    const btnWeb = document.getElementById('tab-btn-web');
    const btnPy = document.getElementById('tab-btn-python');
    if (type === 'web') {
        webGrid.classList.remove('hidden');
        pythonGrid.classList.add('hidden');
        btnWeb.className = "px-5 py-2.5 rounded-lg text-sm font-semibold bg-accent text-white shadow-md cursor-hover transition-all";
        btnPy.className = "px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-slate-400 border border-slate-800 cursor-hover transition-all";
    } else {
        pythonGrid.classList.remove('hidden');
        webGrid.classList.add('hidden');
        btnPy.className = "px-5 py-2.5 rounded-lg text-sm font-semibold bg-accent text-white shadow-md cursor-hover transition-all";
        btnWeb.className = "px-5 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-slate-400 border border-slate-800 cursor-hover transition-all";
    }
    bindCursorHover();
}

const projectMetaDb = {
    'pg-life': { title: 'PG Life Hub', type: 'Full-Stack Ecosystem Web Deployment', desc: 'A full-stack PG accommodation platform designed to manage city-wise housing listings, user onboarding, and property discovery workflows.', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'attendance-system': { title: 'Attendance Management System', type: 'Web Application Portal Module', desc: 'A secure web-based attendance tracking system implementing identity verification, structured logging, and real-time attendance marking.', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'wsm': { title: 'Wildlife Sanctuary Management System', type: 'Python Command Line Engine Core', desc: 'A CLI-based management system for tracking wildlife records, medical history logs, and reservation data.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', isTerminal: true },
    'banking-system': { title: 'Banking Management System', type: 'Web Application UI Architecture', desc: 'A simulated banking system handling account creation, deposits, withdrawals, and transaction tracking.', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'expense-tracker': { title: 'Expense Tracker UI', type: 'Web Finance Module Interface', desc: 'A personal finance tracking application that records daily expenses, categorizes spending, and visualizes budget flow.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'weather-app': { title: 'Weather Forecasting App', type: 'REST API Synchronization Module', desc: 'A real-time weather application integrating external APIs to fetch and display dynamic climate data.', img: 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'calculator-web': { title: 'Calculator Suite', type: 'Web Interface Core', desc: 'A responsive calculator application supporting arithmetic operations.', img: 'https://images.unsplash.com/photo-1594980595371-d645a6f89b2e?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'currency': { title: 'Currency Converter Portal', type: 'REST API Web Application', desc: 'A currency conversion tool integrating exchange-rate APIs.', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'clock': { title: 'Digital Clock Component', type: 'Native Web DOM Unit', desc: 'A live digital clock interface synchronized with system time.', img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'mothersday': { title: 'Mothers Day Platform', type: 'Static Creative Project', desc: 'A visually expressive tribute page built with animations.', img: 'https://images.unsplash.com/photo-1520975928316-7b4b9d7f3a0f?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'notes': { title: 'Notes Application Module', type: 'Local Storage Infrastructure', desc: 'A lightweight note-taking application using browser local storage.', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'password': { title: 'Password Generator Matrix', type: 'Crypt Security Utility', desc: 'A secure password generator that creates randomized strings.', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'qr-code': { title: 'QR Code Generator Hub', type: 'Asset Engineering Portal', desc: 'A QR generator that converts user input strings into scannable QR codes.', img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'quiz-game': { title: 'Quiz Game Platform', type: 'Dynamic State Interface', desc: 'An interactive quiz application featuring score tracking.', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'snake-game': { title: 'Snake Retro Game Loop', type: 'Canvas Engine Blueprint', desc: 'A classic snake game implemented using canvas rendering.', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'tic-tac-toe': { title: 'Tic Tac Toe Engine', type: 'Conditional State Array Logic', desc: 'A two-player game implementing win-condition algorithms.', img: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80', isTerminal: false },
    'todo-web': { title: 'To Do List Dashboard', type: 'CRUD UI Web Component', desc: 'A task management tool supporting CRUD operations.', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80', isTerminal: false }
};

function triggerScreenshotModal(key) {
    const data = projectMetaDb[key];
    if (!data) return;
    const imgFrame = document.getElementById('modal-img-frame');
    const termMock = document.getElementById('modal-terminal-mock');

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-subtitle').textContent = data.type;
    document.getElementById('modal-description').textContent = data.desc;
    imgFrame.classList.add('hidden');
    termMock.classList.add('hidden');

    if (data.isTerminal) {
        termMock.classList.remove('hidden');
        document.getElementById('modal-script-name').textContent = key + ".py";
    } else {
        imgFrame.src = data.img;
        imgFrame.classList.remove('hidden');
    }

    document.getElementById('screenshot-lightbox').classList.remove('hidden');
    document.getElementById('screenshot-lightbox').classList.add('flex');
}

function closeScreenshotModal() {
    const modal = document.getElementById('screenshot-lightbox');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

const timelineRange = document.getElementById('timeline-range');
const slides = {
    2024: document.getElementById('slide-2024'),
    2025: document.getElementById('slide-2025'),
    2026: document.getElementById('slide-2026')
};
const ticks = {
    2024: document.getElementById('tick-2024'),
    2025: document.getElementById('tick-2025'),
    2026: document.getElementById('tick-2026')
};

timelineRange.addEventListener('input', (e) => {
    const val = e.target.value;
    Object.keys(slides).forEach(year => {
        if(year == val) {
            slides[year].classList.remove('hidden');
            slides[year].classList.add('block');
            ticks[year].classList.add('text-accent');
            ticks[year].classList.remove('text-slate-500');
        } else {
            slides[year].classList.remove('block');
            slides[year].classList.add('hidden');
            ticks[year].classList.remove('text-accent');
            ticks[year].classList.add('text-slate-500');
        }
    });
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particleColor = '#60A5FA';

function updateParticleColor(color) {
    particleColor = color;
}

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
function initParticles() {
    particles = [];
    const density = Math.floor((canvas.width * canvas.height) / 9000);
    for (let i = 0; i < Math.min(density, 120); i++) particles.push(new Particle());
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
