/*
* Jogo da forca - Ionar
*/

// Convertendo o codigo para TypeScript

// Lista de palavras para a forca
const palavras = ["banana", "brocolis", "camaro", "marrom", "picanha", "violeta", "cadeira", "leitura", "vinho", "camisa", "repolho", "caixa", "careca", "sapo", "terremoto", "comprimido", "livro", "cachorro"]

// Funcao para sortear uma palavra
function sortearPalavra() {
    const palavraSorteada = Math.floor(Math.random() * palavras.length);
    return palavras[palavraSorteada];
}

let palavra = sortearPalavra();
// console.log(palavra);


// Convertendo a palavra em um array para poder manipudar cada letra
let palavraArray = palavra.split('');

// Preenchendo os elementos do DOM com a palavra sorteada, simulando os tracejados
palavraArray.forEach((element, index) => {
    let spanWrap = document.createElement('span');
    spanWrap.setAttribute('class', "letrinhasWrap");
    let indexStr: string = index.toString() + "100";
    spanWrap.setAttribute('id', indexStr);

    let span = document.createElement('span');
    span.innerHTML = element;
    span.setAttribute('class', "letrinhas");
    span.setAttribute('id', index.toString());
    document.getElementById('letras-gabarito').appendChild(spanWrap); 
    
    document.getElementById(indexStr).appendChild(span);
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

let input = document.getElementById("input-usuario");
input.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        tentativa();
        limpaInput();
    }
})

let procuradasArray: string[] = [];
let errosDoUsuario = 0;
let acertosDoUsuario = 0;

function tentativa() {
    // Verificar se existe uma letra no array 
    let input = document.getElementById("input-usuario");
    // Executo as funcoes em lowercase, mas exibo em tela em uppercase
    let letraProcurada = input.value.toLowerCase();
    //console.log(letraProcurada);

    // Jogar a letra da tentativa em um array e exibi-lo em tela
    //Mas antes verificar se ela ja foi tentada
    if (procuradasArray.includes(letraProcurada)) {
        alert("Essa já foi, tente outra")
    } else if (input.value == '' || input.value == ' ' || input.value == '*'){
        alert("Digite uma letra")
    } else {
        procuradasArray.push(letraProcurada)
        let procuradasDiv = document.getElementById('letras-tentadas')
        procuradasDiv.innerHTML = procuradasArray

        const found = palavraArray.includes(letraProcurada)
        // console.log("FOUND " + found);

        // Se encontrou, preciso saber as posicões no array
        if (found) {
            const indexesOf = (arr, item) => 
            arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
            const letrasReveladas = indexesOf(palavraArray, letraProcurada)
            // console.log(letrasReveladas);

            //Adiciono uma classe css para poder manipular a letra descoberta
            letrasReveladas.forEach((element, index) => {
                let letra = document.getElementById(element)
                letra.classList.add("letra-descoberta");
                //console.log(element)
                acertosDoUsuario++
            });
        } else {
            errosDoUsuario++
            desenhaForca(errosDoUsuario)
        }

        // Conferindo o contador de acertos
        //console.log("acertos " + acertosDoUsuario)

        // Se a quantidade de acertos for igual ao tamanho da palavra, venceu o jogo
        if (palavraArray.length == acertosDoUsuario) {
            youWin()
        }
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
            let cabeca = document.getElementById("cabeca");
            cabeca.classList.add("palitinho-visivel");
        break;

        case 2:
            let bracoEsquerdo = document.getElementById("braco-esquerdo");
            bracoEsquerdo.classList.add("palitinho-visivel");
        break;

        case 3:
            let tronco = document.getElementById("tronco");
            tronco.classList.add("palitinho-visivel");
        break;

        case 4:
            let bracoDireito = document.getElementById("braco-direito");
            bracoDireito.classList.add("palitinho-visivel");
        break;

        case 5:
            let pernaEsquerda = document.getElementById("perna-esquerda");
            pernaEsquerda.classList.add("palitinho-visivel");
        break;

        case 6:
            let pernaDireita = document.getElementById("perna-direita");
            pernaDireita.classList.add("palitinho-visivel");
            gameOver();
        break;
    }
}

function animacaoGameOver() {
    let forca = document.getElementById("id-corpinho-pre");
    forca.classList.add("palitinhos-game-over");
}

function animacaoVenceu() {
    let forca = document.getElementById("id-corpinho-pre");
    forca.classList.add("palitinhos-venceu");
}

function gameOver(){
    // console.log("Você perdeu")
    desabilitaControles()
    animacaoGameOver()
    exibirMensagem("GAME OVER!!!")
    revelaPalavraFn()
}

function youWin(){
    // console.log("Você venceu")
    desabilitaControles()
    exibirMensagem("ACERTÔ MISERAVI!!")
    animacaoVenceu()
    revelaPalavraFn()
}

function revelaPalavraFn() {
    let revelaResposta = document.getElementById("revelada");
    revelaResposta.innerHTML = palavra;
}

function desabilitaControles() {
    let input = document.getElementById("input-usuario");
    let btn = document.getElementById("tentar-btn");
    input.disabled = true;
    btn.disabled = true;
}

function exibirMensagem(msg) {
    let mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = msg;
}
