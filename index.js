/*
* Jogo da forca - Ionar
*/

//window.onload=function(){}

// Lista de palavras para a forca
const palavras = ["banana", "brocolis", "camaro", "marron", "picanha", "violeta", "computador", "leitura", "vinho", "camisa"]

// Funcao para sortear uma palavra
function sortearPalavra() {
    const palavraSorteada = Math.floor(Math.random() * palavras.length);
    return palavras[palavraSorteada];
}

let palavra = sortearPalavra();
console.log(palavra);


// Convertendo a palavra em um array para poder manipudar cada letra
let palavraArray = palavra.split('');

// Preenchendo os elementos do DOM com a palavra sorteada

palavraArray.forEach((element, index) => {
    let spanWrap = document.createElement('span');
    spanWrap.setAttribute('class', "letrinhasWrap");
    spanWrap.setAttribute('id', index+100);

    let span = document.createElement('span');
    span.innerHTML = element;
    span.setAttribute('class', "letrinhas");
    span.setAttribute('id', index);
    document.getElementById('letras-gabarito').appendChild(spanWrap); 
    
    document.getElementById(index+100).appendChild(span);
});

// Capturar clique no botão e disparar a funcao de busca de letra

// Definindo o foco no input do usuário
document.getElementById("input-usuario").focus();

// Capturando o clique no botao
let inputBtn = document.getElementById("tentar-btn");
inputBtn.onclick = function() {
    tentativa();
    limpaInput();
};

const procuradasArray = []
let errosDoUsuario = 0;

function tentativa() {
    // Verificar se existe uma letra no array 
    let input = document.getElementById("input-usuario");
    let letraProcurada = input.value;
    //console.log(letraProcurada);

    // Jogar a letra da tentativa em um array e exibi-lo em tela
    procuradasArray.push(letraProcurada)
    let procuradasDiv = document.getElementById('letras-tentadas')
    procuradasDiv.innerHTML = procuradasArray

    const found = palavraArray.includes(letraProcurada)
    //console.log(found);

    // Se encontrou, preciso saber as posicões no array
    if (found) {
        const indexesOf = (arr, item) => 
        arr.reduce(
        (acc, v, i) => (v === item && acc.push(i), acc),
        []);
        const letrasReveladas = indexesOf(palavraArray, letraProcurada)
        console.log(letrasReveladas);

        //Adiciono uma classe css para poder manipular a letra descoberta
        letrasReveladas.forEach((element, index) => {
            let letra = document.getElementById(element)
            letra.classList.add("letra-descoberta");
            //console.log(element)
        });
    } else {
        errosDoUsuario++
        desenhaForca(errosDoUsuario)
    }
}

function limpaInput() {
    let input = document.getElementById("input-usuario");
     input.value = '';
     input.focus();
}

function desenhaForca(qtdErros) {
    switch (qtdErros) {
        case 1:
            console.log("desenha: " + 1);
            let cabeca = document.getElementById("cabeca");
            cabeca.classList.add("palitinho-visivel");
        break;

        case 2:
            let bracoEsquerdo = document.getElementById("braco-esquerdo");
            bracoEsquerdo.classList.add("palitinho-visivel");
            console.log("desenha: " + 2);
        break;

        case 3:
            let tronco = document.getElementById("tronco");
            tronco.classList.add("palitinho-visivel");
            console.log("desenha: " + 3);
        break;

        case 4:
            let bracoDireito = document.getElementById("braco-direito");
            bracoDireito.classList.add("palitinho-visivel");
            console.log("desenha: " + 4);
        break;

        case 5:
            let pernaEsquerda = document.getElementById("perna-esquerda");
            pernaEsquerda.classList.add("palitinho-visivel");
            console.log("desenha: " + 5);
        break;

        case 6:
            let pernaDireita = document.getElementById("perna-direita");
            pernaDireita.classList.add("palitinho-visivel");
            console.log("game over : " + 6);
            animacaoGameOver();
        break;
    }
}

function animacaoGameOver() {
    let forca = document.getElementById("id-corpinho-pre");
    forca.classList.add("palitinhos-game-over");

}