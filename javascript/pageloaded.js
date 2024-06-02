const toUmum = document.getElementById('toUmum');
const toKnowledge = document.getElementById('toKnowledge');
const toKocak = document.getElementById('toKocak');
const newGame = document.getElementById('new-game-button');

toUmum.addEventListener('click', function() {
    const audio = new Audio('res/select.mp3');
    audio.play();
    setTimeout(function() {
        window.location.href = 'umum.html';
    }, 300);
})
toKnowledge.addEventListener('click', function() {
    const audio = new Audio('res/select.mp3');
    audio.play();
    setTimeout(function() {
        window.location.href = 'knowledge.html';
    }, 300);
})
toKocak.addEventListener('click', function() {
    const audio = new Audio('res/select.mp3');
    audio.play();
    setTimeout(function() {
        window.location.href = 'kocak.html';
    }, 300);
})
function back() {
    const audio = new Audio('res/select.mp3');
    audio.play();
    setTimeout(function() {
        window.location.href = 'main.html';
    }, 300);
}
newGame.addEventListener('click', function() {
    
})