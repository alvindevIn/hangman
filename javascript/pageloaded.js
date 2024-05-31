const toUmum = document.getElementById('toUmum');
const toKnowledge = document.getElementById('toKnowledge');
const toKocak = document.getElementById('toKocak');

toUmum.addEventListener('click', function() {
    window.location.href = 'umum.html'
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
