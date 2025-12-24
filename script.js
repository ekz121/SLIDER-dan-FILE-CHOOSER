particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100 },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "move": { "speed": 2, "direction": "none", "out_mode": "out" }
    },
    "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" } }
    }
});

const taskBoxes = document.querySelectorAll('.task-box');
const backdrop = document.getElementById('backdrop');

const toggleExpand = (element) => {
    taskBoxes.forEach(box => {
        if (box !== element && box.classList.contains('expanded')) {
            box.classList.remove('expanded');
        }
    });
    element.classList.toggle('expanded');
    if (element.classList.contains('expanded')) {
        backdrop.classList.add('active');
    } else {
        backdrop.classList.remove('active');
    }
};

taskBoxes.forEach(box => {
    const viewBtn = box.querySelector('.view-btn');
    viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpand(box);
    });
    box.addEventListener('click', (e) => {
        if (!e.target.classList.contains('copy-btn')) {
            toggleExpand(box);
        }
    });
});

backdrop.addEventListener('click', () => {
    taskBoxes.forEach(box => box.classList.remove('expanded'));
    backdrop.classList.remove('active');
});

const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeBox = button.closest('.code-box');
        const code = codeBox.querySelector('pre, ul')?.textContent || '';
        navigator.clipboard.writeText(code).then(() => {
            button.classList.add('copied');
            setTimeout(() => button.classList.remove('copied'), 2000);
        }).catch(err => console.error('Gagal menyalin: ', err));
    });
});