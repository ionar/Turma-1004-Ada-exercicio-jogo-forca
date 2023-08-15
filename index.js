/*
* Jogo da forca - Ionar
*/

// Lista de palavras para a forca
const palavras = ["banana", "brocolis", "camaro", "marron", "picanha", "violeta", "computador", "leitura", "vinho"]

// Funcao para sortear uma palavra
function sortearPalavra() {
    const palavraSorteada = Math.floor(Math.random() * palavras.length);
    return palavras[palavraSorteada]
}

let palavra = sortearPalavra();
// console.log(palavra);
// document.querySelector('#gabarito').textContent = palavra;

// Convertendo a palavra em um array para poder manipudar cada letra
let palavraArray = palavra.split('');

palavraArray.forEach((element, index) => {
    let span = document.createElement('span');
    span.innerHTML = element;
    span.setAttribute('class', "letrinhas");
    span.setAttribute('id', index);
    document.getElementById('letras-gabarito').appendChild(span); 
});

// Verificar se existe uma letra no array
let letraProcurada = "a"

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

    letrasReveladas.forEach((element, index) => {
        let letra = document.getElementById(element)
        letra.classList.add("letra-descoberta");
        //console.log(element)
    });
}

// Capturar clique no botão e disparar a funcao de busca de letra

window.onload=function(){
    // Definindo o foco no input do usuário
    document.getElementById("input-usuario").focus();
    let inputBtn = document.getElementById("tentar-btn");
    let input = document.getElementById("input-usuario");
    let texto = input.value;

    inputBtn.onclick = function() {
        tentativa();
        console.log("tentei");
    };

    function tentativa() {
        console.log(texto);
    }
}

