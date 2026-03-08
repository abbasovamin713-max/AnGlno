// MATRIX EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "LOVE0123456789";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff2d75";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);

// START
function startLove() {
  document.querySelector(".start-screen").style.display = "none";
  document.querySelector(".message").classList.remove("hidden");
  document.querySelector(".gallery").classList.remove("hidden");
  document.getElementById("music").play();
  setTimeout(createHeart, 4000);
}

// Привязка события к кнопке
document.getElementById('startButton').addEventListener('click', startLove);

// HEART ANIMATION
function createHeart() {
  const heart = document.getElementById("heart");
  heart.classList.remove("hidden");

  // Генерируем позиции в форме сердца
  const heartPositions = generateHeartPositions(8, 400, 350);

  const images = document.querySelectorAll(".gallery img");

  images.forEach((img, i) => {
    if (i < heartPositions.length) {
      const clone = img.cloneNode();
      clone.style.left = heartPositions[i].x + "px";
      clone.style.top = heartPositions[i].y + "px";
      // Начинаем с полной прозрачности
      clone.style.opacity = "0";
      clone.style.transition = "opacity 0.8s ease-in";
      heart.appendChild(clone);

      // Плавное появление с задержкой
      setTimeout(() => {
        clone.style.opacity = "1";
      }, i * 150);
    }
  });

  // Добавляем анимацию пульсации с задержкой
  setTimeout(() => {
    heart.classList.add("pulsing");
  }, 1000);

  document.querySelector(".gallery").style.display = "none";
}

// Функция для генерации координат в форме сердца
function generateHeartPositions(count, width, height) {
  const positions = [];
  const centerX = width / 2;
  const centerY = height / 2;

  // Коэффициенты масштабирования для лучшей пропорции
  const scaleX = width / 30;
  const scaleY = height / 25;

  for (let i = 0; i < count; i++) {
    // Параметрическое уравнение сердца
    const t = (i / count) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    // Масштабируем и центрируем
    const scaledX = centerX + (x * scaleX);
    const scaledY = centerY - (y * scaleY);

    positions.push({ x: scaledX, y: scaledY });
  }

  return positions;
}

