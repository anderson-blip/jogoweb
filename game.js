let game, player, scoreEl, livesEl, finalScore;
let score = 0;
let lives = 3;
let gravity = 1;
let velocity = 0;
let isJumping = false;
let gameLoop;
let obstacleInterval;

function startGame() {
  document.getElementById('menu').hidden = true;
  document.getElementById('game').hidden = false;
  player = document.getElementById('player');
  scoreEl = document.getElementById('score');
  livesEl = document.getElementById('lives');
  finalScore = document.getElementById('final-score');
  score = 0;
  lives = 3;
  velocity = 0;
  isJumping = false;

  document.addEventListener('keydown', jump);
  gameLoop = setInterval(updateGame, 20);
  obstacleInterval = setInterval(spawnObstacle, 1500);
}

function jump(e) {
  if (e.code === 'Space' && !isJumping) {
    velocity = 15;
    isJumping = true;
  }
}

function updateGame() {
  // gravidade
  let bottom = parseInt(window.getComputedStyle(player).bottom);
  velocity -= gravity;
  bottom += velocity;

  if (bottom <= 0) {
    bottom = 0;
    isJumping = false;
  }

  player.style.bottom = `${bottom}px`;

  // pontuação
  score++;
  scoreEl.textContent = `Pontos: ${score}`;

  // colisões
  document.querySelectorAll('.obstacle').forEach(obs => {
    let obsLeft = parseInt(obs.style.left);
    let playerLeft = parseInt(player.style.left);

    let obsRect = obs.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      obsRect.left < playerRect.right &&
      obsRect.right > playerRect.left &&
      obsRect.bottom > playerRect.top &&
      obsRect.top < playerRect.bottom
    ) {
      obs.remove();
      lives--;
      livesEl.textContent = `Vidas: ${lives}`;
      if (lives <= 0) endGame();
    }
  });
}

function spawnObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = '800px';

  document.getElementById('obstacles').appendChild(obstacle);

  // remover após animação
  setTimeout(() => {
    if (obstacle.parentNode) obstacle.remove();
  }, 3100);
}

function endGame() {
  clearInterval(gameLoop);
  clearInterval(obstacleInterval);
  document.getElementById('game').hidden = true;
  document.getElementById('game-over').hidden = false;
  finalScore.textContent = score;
}

function restartGame() {
  document.getElementById('game-over').hidden = true;
  document.getElementById('menu').hidden = false;
  document.getElementById('obstacles').innerHTML = '';
}
let personagem = {
  vida: 100,
  dano: 10,
  velocidade: 5,
  pulo: 30
};

function mostrarBotaoIniciar() {
  document.getElementById("iniciarJogo").style.display = "inline-block";
}

function mudarPersonagem1() {
  personagem.vida = 70;
  personagem.dano = 10;
  personagem.velocidade = 5;
  personagem.pulo = 50;
  mostrarBotaoIniciar();
}

function mudarPersonagem2() {
  personagem.vida = 100;
  personagem.dano = 5;
  personagem.velocidade = 8;
  personagem.pulo = 30;
  mostrarBotaoIniciar();
}

function mudarPersonagem3() {
  personagem.vida = 100;
  personagem.dano = 10;
  personagem.velocidade = 5;
  personagem.pulo = 30;
  mostrarBotaoIniciar();
}

document.getElementById("iniciarJogo").addEventListener("click", () => {
  alert("Jogo começando!");
  window.location.href = "fase1.html";
});
