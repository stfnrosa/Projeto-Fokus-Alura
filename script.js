const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBotao = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBotao = document.querySelector('#start-pause span')
const imagemBotao = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

// objetos audio
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somBeep = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId= null;

// ativando e desativando a música
musica.loop=true;
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

// adicionando evento click no botão de foco
focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBotao.classList.add('active');
})

// adicionando evento click no botão de descanso curto
curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBotao.classList.add('active');
})

// adicionando evento click no botão de descanso longo
longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBotao.classList.add('active');
})

// alterando os atributos da interface de acordo com o contexto
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    // alterando o titulo pelo contexto
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;  
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somBeep.play();
        alert('Tempo Finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBotao.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        somPause.play();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000); 
    iniciarOuPausarBotao.textContent = "Pausar";
    imagemBotao.setAttribute('src',`/imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBotao.textContent = "Começar";
    imagemBotao.setAttribute('src',`/imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute:'2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();