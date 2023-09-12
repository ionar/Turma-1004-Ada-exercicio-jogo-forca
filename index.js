"use strict";
class JogoDaForca {
    sortearPalavra() {
        const palavraSorteada = Math.floor(Math.random() * this.palavras.length);
        return this.palavras[palavraSorteada].toLowerCase();
    }
    constructor() {
        this.palavras = [
            "Banana",
            "Laranja",
            "Morango",
            "Uva",
            "Pera",
            "Abacaxi",
            "Melancia",
            "Kiwi",
            "Manga",
            "Cereja",
            "Abacate",
            "Coco",
            "Framboesa",
            "Goiaba",
            "Amora",
            "Pitanga",
        ];
        this.palavra = this.sortearPalavra();
        this.palavraArray = this.palavra.split("");
        this.procuradasArray = [];
        this.errosDoUsuario = 0;
        this.acertosDoUsuario = 0;
        this.palavraArray.forEach((element, index) => {
            let spanWrap = document.createElement("span");
            spanWrap.setAttribute("class", "letrinhasWrap");
            let indexStr = index.toString() + "-wrapper";
            spanWrap.setAttribute("id", indexStr);
            let span = document.createElement("span");
            span.innerHTML = element;
            span.setAttribute("class", "letrinhas");
            span.setAttribute("id", index.toString());
            document.getElementById("letras-gabarito").appendChild(spanWrap);
            document.getElementById(indexStr).appendChild(span);
        });
        document.getElementById("input-usuario").focus();
        let inputBtn = document.getElementById("tentar-btn");
        inputBtn.onclick = () => {
            this.tentativa();
            this.limpaInput();
        };
        let input = document.getElementById("input-usuario");
        input.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.tentativa();
                this.limpaInput();
            }
        });
    }
    tentativa() {
        let input = document.getElementById("input-usuario");
        let letraProcurada = input.value.toLowerCase();
        if (!/^[a-zA-Z]+$/.test(letraProcurada)) {
            alert("Por favor, digite apenas letras.");
            return;
        }

        if (this.procuradasArray.includes(letraProcurada)) {
            alert("Essa já foi, tente outra");
        } else {
            this.procuradasArray.push(letraProcurada);
            let procuradasDiv = document.getElementById("letras-tentadas");
            procuradasDiv.innerHTML = this.procuradasArray.toString();
            const found = this.palavraArray.includes(letraProcurada);
            if (found) {
                const indexesOf = (arr, item) =>
                    arr.reduce((acc, v, i) => (v === item && acc.push(i), acc), []);
                const letrasReveladas = indexesOf(this.palavraArray, letraProcurada);
                letrasReveladas.forEach((element, index) => {
                    let letra = document.getElementById(element);
                    letra.classList.add("letra-descoberta");
                    this.acertosDoUsuario++;
                });
            } else {
                this.errosDoUsuario++;
                this.desenhaForca(this.errosDoUsuario);
            }
            if (this.palavraArray.length == this.acertosDoUsuario) {
                this.youWin();
            }
        }
    }
    limpaInput() {
        let input = document.getElementById("input-usuario");
        input.value = "";
        input.focus();
    }
    desenhaForca(qtdErros) {
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
                this.gameOver();
                break;
        }
    }
    animacaoGameOver() {
        let forca = document.getElementById("id-corpinho-pre");
        forca.classList.add("palitinhos-game-over");
    }
    animacaoVenceu() {
        let forca = document.getElementById("id-corpinho-pre");
        forca.classList.add("palitinhos-venceu");
    }
    gameOver() {
        this.desabilitaControles();
        this.animacaoGameOver();
        this.exibirMensagem("GAME OVER!!!");
        this.revelaPalavraFn();
    }
    youWin() {
        this.desabilitaControles();
        this.exibirMensagem("ACERTÔ MISERAVI!!");
        this.animacaoVenceu();
        this.revelaPalavraFn();
    }
    revelaPalavraFn() {
        let revelaResposta = document.getElementById("revelada");
        revelaResposta.innerHTML = this.palavra;
    }
    desabilitaControles() {
        let input = document.getElementById("input-usuario");
        let btn = document.getElementById("tentar-btn");
        input.disabled = true;
        btn.disabled = true;
    }
    exibirMensagem(msg) {
        let mensagem = document.getElementById("mensagem");
        mensagem.innerHTML = msg;
    }
}
let Jogo = new JogoDaForca();
