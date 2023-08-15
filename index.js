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
// document.querySelector('#gabarito').textContent = palavra;

// Convertendo a palavra em um array para poder manipudar cada letra
let palavraArray = palavra.split('');

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

function tentativa() {
    // Verificar se existe uma letra no array 
    let input = document.getElementById("input-usuario");
    let letraProcurada = input.value;
    console.log(letraProcurada);

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
    }
}

function limpaInput() {
    let input = document.getElementById("input-usuario");
     input.value = '';
     input.focus();
}