// O'yin ma'lumotlari
let score = 0;
let attempts = 3;
let isGuessed = false; // Флаг, отслеживающий, угадал ли игрок правильный цвет

// Rang generatsiya qilish funktsiyasi
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// O'yinni boshlash funktsiyasi
function startGame() {
    const buttons = document.querySelectorAll('.color-btn');
    const rgbCodeDisplay = document.getElementById('rgbCode');
    const header = document.querySelector('header'); // Headerni tanlab olish
    const correctColor = generateRandomColor();
    isGuessed = false; // Сбрасываем флаг на начало нового раунда
    let selectedColor = false;

    // Делаем кнопку "Refresh" неактивной в начале игры
    const refreshButton = document.getElementById('refresh');
    refreshButton.disabled = true;

    // Random 4 ta rang tanlash
    const colors = [];
    for (let i = 0; i < 4; i++) {
        colors.push(generateRandomColor());
    }

    // To'g'ri rangni random joyga qo'yish
    const correctIndex = Math.floor(Math.random() * 4);
    colors[correctIndex] = correctColor;

    // To'g'ri rang kodini ekranga chiqarish
    rgbCodeDisplay.textContent = correctColor.toUpperCase();

    // Buttonlarga ranglarni berish va event qo'shish
    buttons.forEach((btn, index) => {
        btn.style.backgroundColor = colors[index];
        btn.onclick = function () {
            if (attempts > 0) {
                if (colors[index] === correctColor && !isGuessed) {
                    // Если правильный цвет угадан впервые
                    score += 1; // Увеличиваем счет на 1
                    document.getElementById('score').textContent = `Score: ${score}`;
                    document.getElementById('status').textContent = 'Correct!';
                    selectedColor = true;
                    isGuessed = true; // Устанавливаем флаг, что угадано правильно
                    
                    // To'g'ri rang topilganda header rangini o'zgartirish
                    header.style.backgroundColor = correctColor;

                    // To'g'ri rang topilganda barcha tugmalarni to'g'ri rangga o'zgartirish
                    buttons.forEach((btn) => {
                        btn.style.backgroundColor = correctColor;
                    });

                    // Активируем кнопку "Refresh" после победы
                    refreshButton.disabled = false;

                } else if (!isGuessed) {
                    // Если неправильный цвет и еще не угадано
                    attempts -= 1;
                    document.getElementById('attempts').textContent = `Attempt: ${attempts}`;
                    document.getElementById('status').textContent = 'Try Again!';
                    
                    if (attempts === 0) {
                        endGame(buttons); // Agar urinishlar tugasa, tugmalarni o'chirish
                    }
                }
            }
        };
    });
}

// O'yinni yakunlash funktsiyasi
function endGame(buttons) {
    buttons.forEach((btn) => {
        btn.style.backgroundColor = 'white'; // Tugmalarni oq rangga o'zgartirish
        btn.disabled = true; // Tugmalarni bloklash
    });
    document.getElementById('status').textContent = 'Game Over! Press Refresh to try again.';

    // Обнуление счёта при Game Over
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`; // Обновляем отображение счёта

    // Активируем кнопку "Refresh" после проигрыша
    document.getElementById('refresh').disabled = false;
}

// Refresh tugmasi event
document.getElementById('refresh').addEventListener('click', function () {
    document.getElementById('status').textContent = 'Your status:';
    const header = document.querySelector('header');
    header.style.backgroundColor = '#87ceeb'; // Headerni asl rangiga qaytarish

    const buttons = document.querySelectorAll('.color-btn');
    buttons.forEach((btn) => {
        btn.disabled = false; // Tugmalarni yana faol qilish
    });

    attempts = 3;
    document.getElementById('attempts').textContent = `Attempt: ${attempts}`;
    
    startGame(); // Начинаем новый раунд
});

// O'yinni yuklaganda boshlash
startGame();
