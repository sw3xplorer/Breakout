const framerate = 60;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// skapa paddeln

const paddleHeight = 15;
const paddleWidht = 80;
let paddleX = (canvas.width - paddleWidht) /2;
let paddleY = canvas.height*0.9;

// skapa bollen

const ballHeight = 5;
const ballWidht = ballHeight;
let ballX = paddleX + (paddleWidht/2);
let ballY = paddleY - 50; 


// boll saker

const radius = 10;
let velocityX = 0;
let velocityY = -7;


// collision

function collision() {
    
}

function play() {
    let playing = true;
    if (playing)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        ballX += velocityX;
        ballY += velocityY;
        setTimeout(play, 1000 / framerate);
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