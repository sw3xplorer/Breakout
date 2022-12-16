class brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// canvas

const framerate = 60;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// poäng och liv

let score = 100;
let lives = 3;

// bricks

let brickColumns = 15;
let brickRows = 8;
let brickWidth = canvas.width / brickColumns - 10;
let brickHeight = 15;

let bricks = [];

for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
        bricks.push(new brick(83 * c, 30 * r + 10));
    }
}

// skapa paddeln

const paddleHeight = 15;
const paddleWidht = 80;
let paddleX = (canvas.width - paddleWidht) / 2;
let paddleY = canvas.height * 0.9;
let dir = 0;

// skapa bollen

let ballX = paddleX + (paddleWidht / 2);
let ballY = paddleY - 50;
const radius = 10;
let velocityX = Math.random() > 0.5 ? 2 : -2;
let velocityY = -3;

let playing = true;
function play() {
    if (playing && lives && score != (brickColumns*brickRows)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scoreAndLives();
        drawPaddle();
        drawBricks();
        drawBall();
        brickCollision();
        miss();
        update();
        setTimeout(play, 1000 / framerate);
    }
    winLose();
}

function scoreAndLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff"
    ctx.fillText(`Score: ${score}`, 8, canvas.height * 0.95);
    ctx.fillText(`Lives left: ${lives}`, canvas.width * 0.93, canvas.height * 0.95);

}

function miss() {
    if (ballY > canvas.height) 
    {
        lives -= 1;
        paddleX = (canvas.width - paddleWidht) / 2;
        ballX = paddleX + (paddleWidht / 2);
        ballY = paddleY - 50;
        velocityX = Math.random() > 0.5 ? 2 : -2;
        velocityY = -3;
    }
    
}

function winLose() {
    if (!lives) {
        ctx.font = "24px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.fillText("Game over", canvas.width * 0.45, canvas.height / 2);
    }
    else if (score == brickColumns*brickRows) {
        ctx.font = "24px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.fillText("You win!!!", canvas.width * 0.45, canvas.height / 2);
    }
}

function drawPaddle() {
    ctx.fillStyle = "green";
    ctx.fillRect(paddleX, paddleY, paddleWidht, paddleHeight);

}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath()
    ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawBricks() {
    bricks.forEach(brick => {
        ctx.fillStyle = "hsl(" + (53 + 35 / (brick.y / 100)) + ",100%, 57%)"
        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
    });
}

function update() {
    if (ballY < 0) {
        velocityY = -velocityY;
    }
    if (ballX < 0 || ballX > canvas.width) {
        velocityX = -velocityX;
    }
    if (ballY > paddleY && (ballX > paddleX && ballX < (paddleX + paddleWidht))) {
        velocityY = Math.abs(paddleX + (paddleWidht / 2) - ballX) / 10 - 13;
        velocityX = (ballX - (paddleX + (paddleWidht / 2))) / 5;

    }
    ballX += velocityX;
    ballY += velocityY;
    paddleX += dir;

}

function brickCollision() {
    bricks.forEach((b, i) => {
        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
            velocityY = -velocityY
            bricks.splice(i, 1);
            score++;
        }
    });
}

var button = document.getElementById("show-button");
button.addEventListener("click", () => {
    button.style.display = "none";
})
document.addEventListener('keydown', function (e) {
    if (e.key == "d" || e.key == "ArrowRight") {
        dir = 10;
    }
    if (e.key == "a" || e.key == "ArrowLeft") {
        dir = -10
    }
});
document.addEventListener("keyup", function (e) {
    dir = 0;
});