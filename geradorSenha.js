let comprSenha = "10" //quarda o comprimento da senha selecionada.

const senhaGerada = document.querySelector("#senha") // input onde a senha sera mostrada.
const inTamaSenha = document.querySelector("#senha-tamanho") //input slide que controla o tamanho da senha.

// funcao que gera a senha e controla a seguranca.
function geraSenha() {
    //caracteres separados em minusculas, maiusculas, numeros e caracteres especiais.
    let caracters = "abcdefghjklmnpqrstuvwxyz" // caracters padrao
    const caractMaiusculas = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const caractNum = "123456789"
    const caractSimbolo = "!@#$&*()[]"

    // Verifica se a opcao de letras maiusculas esta selecionado.
    if (checkMaiusculas.checked) {
        caracters += caractMaiusculas // se sim add os caracteres de letra maiusculas.
    }
    // Verifica se a opcao de letras minusculs esta selecionado.
    if (checkNum.checked) {
        caracters += caractNum // se sim add os caracteres de letras minusculas.
    }
    // Verifica se a opcao de caracteres especias esta selecionado.
    if (checkSimbolo.checked) {
        caracters += caractSimbolo //se sim add os caracters especias.
    }

    let senha = "" //gurada a senha q vai ser gerada

    // intera n qtd de acordo cm o comprimento da senha sobre os caracteres selecionados.
    for (i = 0; i < comprSenha; i++) {
        const numAleat = Math.floor(Math.random() * caracters.length)  // "numAleat" guarda um numero gerado aleatoriamente entre 0 e 1 e multiplica pelo tamanho dos caracteres totais e arredonda pro inteiro mais proximo.
        const letra = caracters[numAleat] // "letra" guarda a letra q foi gerada pelo num aleat da lista de caracteres.
        senha += letra // add a letra a senha.
        // senhaMaior += caracters.substring(numAleat, numAleat + 1) // outra maneira de pega a letra e add.
    }

    senhaGerada.value = senha //recebe a senha e guarda cm valor a exibir.
    nivelSeguranca() // faz a verificacao de seguranca.
    controlaFonte() // controla o tamanho da fonte dependendo da quantidade de letras.
    console.log(senha)
}

// evendo do input slide que recebe o valor do tamnho da senha 
inTamaSenha.addEventListener("input", () => {
    comprSenha = inTamaSenha.value // recebe o compremento da senha.
    document.querySelector("#tamanho-senha-texto").innerText = comprSenha // valor do comprimento da senha em texto.
    geraSenha() // chama a funcao geraSenha de acordo cm o comprimento da senha muda.
})

const barraSeguranca = document.querySelector("#barra-seguranca") // div que vai exebir o nivel de segranca.

// funcao que faz o controle do nivel de seguranca.
function nivelSeguranca() {
    const por100 = Math.round(( // coloca um peso em cada variavel da senha que qualifica se a senha e fraca ou forte.
        (inTamaSenha.value / 64) * 100) * 0.45 + //peso 45/100
        (checkMaiusculas.checked ? 10 : 0) + //peso 10/100
        (checkNum.checked ? 25 : 0) + //peso 25/100
        (checkSimbolo.checked ? 20 : 0) // peso 20/100
    )

    barraSeguranca.style.width = `${por100}%` //ajusta o tamanho da div de acordo cm o peso da senha.
    console.log(por100)

    //verifica o nivel de seguranca que aplica classes que indiqcam o nivel de seguranca .
    if (por100 <= 39) { // se tiver menor ou igual 39 classifica cm perigo.
        barraSeguranca.classList.remove("seguro")
        barraSeguranca.classList.remove("atencao")
        barraSeguranca.classList.add("perigo")

    } else if (por100 >= 40 && por100 <= 69) { // se tiver maior ou igual a 40 e menor ou igual a 69 classifica cm atencao.
        barraSeguranca.classList.remove("seguro")
        barraSeguranca.classList.add("atencao")
        barraSeguranca.classList.remove("perigo")

    } else { // se maior ou igual a 70 clasifica cm seguro .
        if (por100 == 100) { // se for 100 estiliza a barra para completa .
            barraSeguranca.classList.add("completo")
        } else { //se nao remove
            barraSeguranca.classList.remove("completo")
        }
        barraSeguranca.classList.add("seguro")
        barraSeguranca.classList.remove("atencao")
        barraSeguranca.classList.remove("perigo")
    }

}

//funcao que controla o tamanho da fonte que aplica classes.
function controlaFonte() {
    if (comprSenha > 60) { // se maior que 60 aplica a fonte pquena.
        senhaGerada.classList.add("font-pequena")
        senhaGerada.classList.remove("font-media")
        senhaGerada.classList.remove("font-grande")

    } else if (comprSenha > 55) { // se maior que 55 aplica fonte media.
        senhaGerada.classList.remove("font-pequena")
        senhaGerada.classList.add("font-media")
        senhaGerada.classList.remove("font-grande")

    } else if (comprSenha > 48) { // se maior que 48 aplica fonte grande
        senhaGerada.classList.remove("font-pequena")
        senhaGerada.classList.remove("font-media")
        senhaGerada.classList.add("font-grande")

    } else {  // se menor que 48 remove todas as classes e fica no padrao.
        senhaGerada.classList.remove("font-pequena")
        senhaGerada.classList.remove("font-media")
        senhaGerada.classList.remove("font-grande")
    }

}

// input`s da verificacao dos caracteres
const checkMaiusculas = document.querySelector("#uppercase-check")
const checkNum = document.querySelector("#numero-check")
const checkSimbolo = document.querySelector("#simbolo-check")

//evendo de click em cada check pra a geracao de senha de acordo cm os caracteres selecinados.
checkMaiusculas.addEventListener("click", geraSenha)
checkNum.addEventListener("click", geraSenha)
checkSimbolo.addEventListener("click", geraSenha)

//botyao de copiar a senha gerada no input no click do botao
const btnCopySenha = document.querySelector("#btn-copiar-senha")
btnCopySenha.addEventListener("click", () => {
    navigator.clipboard.writeText(senhaGerada.value) // copia na area de trasferencia
})

// botao que refaz a senha a cada click
const btnRefazer = document.querySelector("#refazer")
btnRefazer.addEventListener("click", function () {
    geraSenha()
    var botao = this; //especifica que var botao e o resmo botaobj
    botao.classList.add("clicked")
    setTimeout(function () {
        botao.classList.remove("clicked")
    }, 500)
})

const sectionListaSenha = document.querySelector("#lista-senhas")

const btnSalvarSenha = document.querySelector("#btnsalvar-senha")

let conta = 0
btnSalvarSenha.addEventListener("click", function salvarSenha() {
    function criaTabela() {
        const tabelaLinha = document.createElement("tr")
        const tabelaCelulaId = document.createElement("td")
        const tabelaCelulaDescricao = document.createElement("td")
        const tabelaCelulaSenha = document.createElement("td")

        // tabelaCelulaId.classList.add("centraliza-celula")
        // tabelaCelulaDescricao.classList.add("centraliza-celula")
        // tabelaCelulaSenha.classList.add("centraliza-celula")

        sectionListaSenha.appendChild(tabelaLinha)
        tabelaLinha.append(tabelaCelulaId , tabelaCelulaDescricao, tabelaCelulaSenha)

        return [tabelaCelulaId, tabelaCelulaDescricao, tabelaCelulaSenha]
    }

    const [celulaId, celulaDescricao, celulaSenha] = criaTabela()

    const descreiSenha = prompt("Descricao da senha:")

    celulaId.classList.add("centraliza-celula")
    celulaDescricao.classList.add("centraliza-celula")
    celulaSenha.classList.add("centraliza-celula")

    celulaId.innerText = ++conta
    celulaDescricao.innerText = descreiSenha
    celulaSenha.innerText = senhaGerada.value

})

