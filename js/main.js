const mario = document.querySelector('.mario');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;


// Pressionar tecla seta para cima
function handleKeyUp(event) {
   if (event.keyCode === 38) {
      if (!isJumping) {
         jump();
      }
   }
}

function jump() {
   isJumping = true;

   let upInterval = setInterval(() => {
      if (position >= 150) {
         clearInterval(upInterval);

         // Descendo
         let downInterval = setInterval(() => {
            if (position <= 90) {
               clearInterval(downInterval);
               isJumping = false;
            } else {
               position -= 90;
               mario.style.bottom = position + 'px';
            }
         }, 100);
      } else {
         // Subindo
         position += 90;
         mario.style.bottom = position + 'px';
      }
   },100);
}

function createEnemy() {
   const enemy = document.createElement('div');
   let enemyPosition = 2000;
   let randomTime = Math.random() * 7000;;



   enemy.classList.add('enemy');
   enemy.style.left = 7000 + 'px';
   background.appendChild(enemy);

   let leftInterval = setInterval(() => {
      if (enemyPosition < 10) {
         clearInterval(leftInterval);
         background.removeChild(enemy);
      } else if (enemyPosition > 0 && enemyPosition < 50 && position < 150) {
         // Game over
         clearInterval(background);
         document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
      } else {
         // velocidade do enemy
         enemyPosition -= 10;
         enemy.style.left = enemyPosition + 'px';
      }
   }, 30);

   setTimeout(createEnemy, randomTime)

}

createEnemy();

document.addEventListener('keyup', handleKeyUp);