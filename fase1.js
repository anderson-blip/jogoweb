const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const gravidade = 1.5;

const personagem = {
  x: 50,
  y: 300,
  largura: 40,
  altura: 40,
  cor: "cyan",
  velocidadeY: 0,
  noChao: true
};

const chao = {
  x: 0,
  y: 350,
  largura: canvas.width,
  altura: 50,
  cor: "#444"
};

let teclas = {};

document.addEventListener("keydown", (e) => {
  teclas[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  teclas[e.key] = false;
});

function atualizar() {
  if (teclas["ArrowRight"]) personagem.x += 5;
  if (teclas["ArrowLeft"]) personagem.x -= 5;

  if (teclas[" "] && personagem.noChao) {
    personagem.velocidadeY = -20;
    personagem.noChao = false;
  }

  personagem.y += personagem.velocidadeY;
  personagem.velocidadeY += gravidade;

  if (personagem.y + personagem.altura >= chao.y) {
    personagem.y = chao.y - personagem.altura;
    personagem.velocidadeY = 0;
    personagem.noChao = true;
  }
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = chao.cor;
  ctx.fillRect(chao.x, chao.y, chao.largura, chao.altura);

  ctx.fillStyle = personagem.cor;
  ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function loop() {
  atualizar();
  desenhar();
  requestAnimationFrame(loop);
}

loop();
