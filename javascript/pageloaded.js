const toUmum = document.getElementById('toUmum');
const toKnowledge = document.getElementById('toKnowledge');
const toKocak = document.getElementById('toKocak');

toUmum.addEventListener('click', function() {
    const audio = new Audio('res/select.mp3');
    audio.play();
    setTimeout(function() {
        window.location.href = 'umum.html';
    }, 500);
})
toKnowledge.addEventListener('click', function() {
    window.location.href = 'knowledge.html'
})
toKocak.addEventListener('click', function() {
    window.location.href = 'kocak.html'
})
function back() {
    window.location.href = 'main.html'
}
