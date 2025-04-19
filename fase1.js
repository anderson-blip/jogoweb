const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const personagem = {
  x: 100,
  y: 300,
  largura: 50,
  altura: 50,
  cor: "blue",
  velocidade: 5,
  esquerda: false,
  direita: false
};

function desenharPersonagem() {
  ctx.fillStyle = personagem.cor;
  ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function desenharChao() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 350, canvas.width, 50); // chão
}

function atualizar() {
  if (personagem.direita) personagem.x += personagem.velocidade;
  if (personagem.esquerda) personagem.x -= personagem.velocidade;
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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") personagem.direita = true;
  if (e.key === "ArrowLeft") personagem.esquerda = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") personagem.direita = false;
  if (e.key === "ArrowLeft") personagem.esquerda = false;
});

loop();
