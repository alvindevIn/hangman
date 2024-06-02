const button = document.querySelectorAll('button')
button.forEach(btn => {
    btn.addEventListener('click', () => {
        const audio = new Audio('res/select.mp3');
        audio.play();
});
});
