const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const personagem = {
  x: 100,
  y: 300,
  largura: 50,
  altura: 50,
  cor: "red",
  velocidade: 5,
  velocidadeY: 0,
  noChao: true,
  esquerda: false,
  direita: false
};

const gravidade = 1;
const forcaPulo = -15;

function desenharPersonagem() {
  ctx.fillStyle = personagem.cor;
  ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function desenharChao() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 350, canvas.width, 50); // chão embaixo
}

function atualizar() {
  // Movimento lateral
  if (personagem.direita) personagem.x += personagem.velocidade;
  if (personagem.esquerda) personagem.x -= personagem.velocidade;

  // Gravidade
  personagem.y += personagem.velocidadeY;
  personagem.velocidadeY += gravidade;

  // Parar no chão
  if (personagem.y + personagem.altura >= 350) {
    personagem.y = 350 - personagem.altura;
    personagem.velocidadeY = 0;
    personagem.noChao = true;
  }
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  desenharChao();
  desenharPersonagem();
}

function loop() {
  atualizar();
  desenhar();
  requestAnimationFrame(loop);
}

// Teclas
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") personagem.direita = true;
  if (e.key === "ArrowLeft") personagem.esquerda = true;
  if (e.key === "ArrowUp" && personagem.noChao) {
    personagem.velocidadeY = forcaPulo;
    personagem.noChao = false;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") personagem.direita = false;
  if (e.key === "ArrowLeft") personagem.esquerda = false;
});

loop();
