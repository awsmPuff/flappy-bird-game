// Game states
let GRAVITY = 5;
let BIRD_POS = 200;
let JUMP = 40;
let SCORE = 0;

// Game elements
const bird = document.querySelector('.bird');
const pipes = [...document.querySelectorAll('.pipe')];
const score = document.querySelector('.score span');
const start = document.querySelector(".start");

start.addEventListener("click", () => {
    play();
    start.style.display = "none";
})

function play() {
    setInterval(() => {
        BIRD_POS += GRAVITY;
        bird.style.top = `${BIRD_POS}px`;
        score.innerText = SCORE;
        if(BIRD_POS >= 550) gameOver();
        if(BIRD_POS <= 0) BIRD_POS = 0;
        if(collided(bird, pipes[0]) || collided(bird, pipes[1])) gameOver();
    }, 100);
    setInterval(() => {
        const randomHeight = Math.floor(Math.random() * 50);
        pipes[0].style.height = `${randomHeight}%`;
        pipes[1].style.height = `${100 - (randomHeight + 30)}%`;
        pipes[1].style.top = `${randomHeight + 30}%`;
    }, 6000);
    setInterval(() => {
        SCORE += 10;
    }, 1500);
}

function collided(source, target) {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return (
        sourceRect.right >= targetRect.left &&
        sourceRect.left <= targetRect.right &&
        sourceRect.bottom >= targetRect.top &&
        sourceRect.top <= targetRect.bottom
    );
}

function gameOver() {
    window.location.reload();
}

window.addEventListener('keyup', function(e) {
    if (e.code !== 'Space') return;
    BIRD_POS -= JUMP;
})
window.addEventListener('click', function() {
    BIRD_POS -= JUMP;
})

