
let score = 0;
let attempts = 3;
let isGuessed = false;


function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function startGame() {
    const buttons = document.querySelectorAll('.color-btn');
    const rgbCodeDisplay = document.getElementById('rgbCode');
    const header = document.querySelector('header'); 
    const correctColor = generateRandomColor();
    isGuessed = false; 
    let selectedColor = false;

   
    const colors = [];
    for (let i = 0; i < 4; i++) {
        colors.push(generateRandomColor());
    }

    
    const correctIndex = Math.floor(Math.random() * 4);
    colors[correctIndex] = correctColor;

    
    rgbCodeDisplay.textContent = correctColor.toUpperCase();

    
    buttons.forEach((btn, index) => {
        btn.style.backgroundColor = colors[index];
        btn.onclick = function () {
            if (attempts > 0) {
                if (colors[index] === correctColor && !isGuessed) {
                   
                    score += 1; 
                    document.getElementById('score').textContent = `Score: ${score}`;
                    document.getElementById('status').textContent = 'Correct!';
                    selectedColor = true;
                    isGuessed = true; 
                    
                    
                    header.style.backgroundColor = correctColor;

                    
                    buttons.forEach((btn) => {
                        btn.style.backgroundColor = correctColor;
                    });
                } else if (!isGuessed) {
                    
                    attempts -= 1;
                    document.getElementById('attempts').textContent = `Attempt: ${attempts}`;
                    document.getElementById('status').textContent = 'Try Again!';
                    
                    if (attempts === 0) {
                        endGame(buttons); 
                    }
                }
            }
        };
    });
}


function endGame(buttons) {
    buttons.forEach((btn) => {
        btn.style.backgroundColor = 'white'; 
        btn.disabled = true; 
    });
    document.getElementById('status').textContent = 'Game Over! Press Refresh to try again.';
}


document.getElementById('refresh').addEventListener('click', function () {
    document.getElementById('status').textContent = 'Your status:';
    const header = document.querySelector('header');
    header.style.backgroundColor = '#87ceeb';

    const buttons = document.querySelectorAll('.color-btn');
    buttons.forEach((btn) => {
        btn.disabled = false; 
    });

    attempts = 3;
    document.getElementById('attempts').textContent = `Attempt: ${attempts}`;
    startGame();
});


startGame();
