// Theme toggle (dark/light)
const btn = document.getElementById('themeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if(saved === 'light'){ root.classList.add('light'); }
btn?.addEventListener('click', ()=>{
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});
/* ============================= */
/* STAR BACKGROUND */
/* ============================= */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars(){
  stars = [];
  for(let i=0;i<STAR_COUNT;i++){
    stars.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      size:Math.random()*2,
      speed:0.2 + Math.random()*0.6
    });
  }
}
createStars();

function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const starColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--fg');

  ctx.fillStyle = starColor;

  stars.forEach(star=>{
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
    ctx.fill();

    star.y += star.speed;
    if(star.y > canvas.height){
      star.y = 0;
      star.x = Math.random()*canvas.width;
    }
  });

  requestAnimationFrame(animateStars);
}

animateStars();

/* ============================= */
/* CAROUSEL STACK ANIMATION */
/* ============================= */

/* ============================= */
/* CAROUSEL STACK HORIZONTAL */
/* ============================= */

const track = document.querySelector(".carousel-track");

let x = 0;
const speed = 0.6;

function moveCarousel() {
  x -= speed;

  const firstCard = track.children[0];
  const cardWidth = firstCard.offsetWidth + 25;

  if (Math.abs(x) >= cardWidth) {
    track.appendChild(firstCard);
    x = 0;
  }

  track.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(moveCarousel);
}

moveCarousel();
