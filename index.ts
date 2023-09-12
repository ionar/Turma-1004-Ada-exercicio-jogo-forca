/*
* Jogo da forca - Ionar, Vinicius Souza, Julio Silvestre, Murilo Medeiros
*/
// Convertendo o codigo para TypeScript

class JogoDaForca {
    // Lista de palavras para a forca
    palavras: string[] = ["volksvagen", "banana", "brocolis", "camaro", "marrom", "picanha", "violeta", "cadeira", "leitura", "vinho", "camisa", "repolho", "caixa", "careca", "sapo", "terremoto", "comprimido", "livro", "cachorro", "faca", "biscoito"];
    palavra: string = this.sortearPalavra();
    palavraArray: string[] = this.palavra.split('');
    procuradasArray: string[] = [];
    errosDoUsuario: number = 0;
    acertosDoUsuario: number = 0;
    
    sortearPalavra() {
        const palavraSorteada: number = Math.floor(Math.random() * this.palavras.length);
        return this.palavras[palavraSorteada];
    }

    constructor() {
        // Preenchendo os elementos do DOM com a palavra sorteada, simulando os tracejados
        this.palavraArray.forEach((element, index) => {
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
        
        // Capturando o clique do botao
        let inputBtn = document.getElementById("tentar-btn");
        inputBtn.onclick = () => {
            this.tentativa();
            this.limpaInput();
        };

        let input = document.getElementById("input-usuario");
        input.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.tentativa();
                this.limpaInput();
            }
        })
    }

    tentativa() {
        // Verificar se existe uma letra no array 
        let input = (document.getElementById("input-usuario") as HTMLInputElement);
        // Executo as funcoes em lowercase, mas exibo em tela em uppercase
        let letraProcurada: string = input.value.toLowerCase();
        //console.log(letraProcurada);

        // Jogar a letra da tentativa em um array e exibi-lo em tela
        //Mas antes verificar se ela ja foi tentada
        if (this.procuradasArray.includes(letraProcurada)) {
            alert("Essa já foi, tente outra")
        } else if (input.value == '' || input.value == ' ' || input.value == '*'){
            alert("Digite uma letra")
        } else {
            this.procuradasArray.push(letraProcurada);
            let procuradasDiv = <HTMLElement>document.getElementById('letras-tentadas');
            procuradasDiv.innerHTML = this.procuradasArray.toString();
            // console.log(procuradasArray.toString());

            const found: boolean = this.palavraArray.includes(letraProcurada)
            // console.log("FOUND " + found);

            // Se encontrou, preciso saber as posicões no array
            if (found) {
                const indexesOf = (arr: string[], item: string) => 
                arr.reduce(
                (acc, v, i) => (v === item && acc.push(i), acc),
                []);
                const letrasReveladas: string[] = indexesOf(this.palavraArray, letraProcurada)
                // console.log(letrasReveladas);

                //Adiciono uma classe css para poder manipular a letra descoberta
                letrasReveladas.forEach((element, index) => {
                    let letra = document.getElementById(element)
                    letra.classList.add("letra-descoberta");
                    //console.log(element)
                    this.acertosDoUsuario++
                });
            } else {
                this.errosDoUsuario++
                this.desenhaForca(this.errosDoUsuario)
            }

            // Conferindo o contador de acertos
            // console.log("acertos " + acertosDoUsuario)
            // Se a quantidade de acertos for igual ao tamanho da palavra, venceu o jogo
            if (this.palavraArray.length == this.acertosDoUsuario) {
                this.youWin()
            }
        }
    }

    limpaInput() {
        let input = <HTMLInputElement>document.getElementById("input-usuario");
        input.value = '';
        input.focus();
    }

    desenhaForca(qtdErros: number) {
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

    gameOver(){
        // console.log("Você perdeu")
        this.desabilitaControles();
        this.animacaoGameOver();
        this.exibirMensagem("GAME OVER!!!");
        this.revelaPalavraFn();
    }

    youWin(){
        // console.log("Você venceu")
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
        let input = <HTMLInputElement>document.getElementById("input-usuario");
        let btn = <HTMLButtonElement>document.getElementById("tentar-btn");
        input.disabled = true;
        btn.disabled = true;
    }

    exibirMensagem(msg: string) {
        let mensagem = <HTMLDivElement>document.getElementById("mensagem");
        mensagem.innerHTML = msg;
    }
}

let Jogo = new JogoDaForca;